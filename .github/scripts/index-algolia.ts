import * as fs from "node:fs";
import * as path from "node:path";
import { algoliasearch } from "algoliasearch";

interface SearchRecord {
  [key: string]: unknown;
  objectID: string;
  type: "component" | "hook" | "block" | "doc";
  title: string;
  description: string;
  category: string;
  url: string;
  content: string;
  hierarchy: {
    lvl0: string;
    lvl1: string;
    lvl2?: string;
  };
}

const APP_ID = process.env.ALGOLIA_APP_ID || "3OJO76EK9R";
const ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || "nikala_docs";

// Dynamically scan registry files (components, hooks, blocks)
function getRegistryRecords(rootDir: string): SearchRecord[] {
  const records: SearchRecord[] = [];
  const registryDir = path.join(rootDir, "packages/core/registry");

  if (!fs.existsSync(registryDir)) return records;

  const files = fs.readdirSync(registryDir).filter((f) => f.endsWith(".json") && f !== "index.json");

  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(registryDir, file), "utf-8"));
      const isHook = file.startsWith("create-") || content.type === "hook";
      const isBlock = content.type === "block" || file.includes("-01.json");

      if (isHook) {
        records.push({
          objectID: `hook-${content.name}`,
          type: "hook",
          title: content.title || content.name,
          description: content.description || "Reactive SolidJS primitive hook.",
          category: "Hooks & Primitives",
          url: `/docs/hooks/${content.name}`,
          content: `${content.title || content.name} ${content.description || ""} SolidJS reactive primitive hook fine-grained reactivity signal`,
          hierarchy: {
            lvl0: "Hooks & Primitives",
            lvl1: content.title || content.name,
          },
        });
      } else if (isBlock) {
        records.push({
          objectID: `block-${content.name}`,
          type: "block",
          title: content.title || content.name,
          description: content.description || "Pre-built production-ready page block.",
          category: "Blocks & Templates",
          url: `/blocks/${content.name}`,
          content: `${content.title || content.name} ${content.description || ""} responsive block template`,
          hierarchy: {
            lvl0: "Blocks & Templates",
            lvl1: content.title || content.name,
          },
        });
      } else {
        records.push({
          objectID: `component-${content.name}`,
          type: "component",
          title: content.title || content.name,
          description: content.description || "Accessible SolidJS UI component styled with Tailwind CSS v4.",
          category: content.category || "Components",
          url: `/docs/components/${content.name}`,
          content: `${content.title || content.name} ${content.description || ""} ${content.category || ""} ${content.dependencies?.join(" ") || ""}`,
          hierarchy: {
            lvl0: "Components",
            lvl1: content.title || content.name,
            lvl2: content.category || "UI Elements",
          },
        });
      }
    } catch (err) {
      console.warn(`Failed to parse registry file ${file}:`, err);
    }
  }

  return records;
}

// Dynamically scan documentation routes from apps/web/src/routes/docs/
function getDocRouteRecords(rootDir: string): SearchRecord[] {
  const records: SearchRecord[] = [];
  const docsRoutesDir = path.join(rootDir, "apps/web/src/routes/docs");

  if (!fs.existsSync(docsRoutesDir)) return records;

  function scanDirectory(dir: string, baseRoute: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip components and hooks folders since they are already indexed from registry
        if (entry.name === "components" || entry.name === "hooks") continue;
        scanDirectory(fullPath, `${baseRoute}/${entry.name}`);
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const routeName = entry.name.replace(/\.tsx$/, "");
        const routeUrl = routeName === "index" ? baseRoute : `${baseRoute}/${routeName}`;

        // Dynamically extract title and description from Seo or DocPageHeader in TSX
        const titleMatch = fileContent.match(/title="([^"]+)"/);
        const descMatch = fileContent.match(/description="([^"]+)"/);

        const title = titleMatch ? titleMatch[1] : routeName.charAt(0).toUpperCase() + routeName.slice(1);
        const description = descMatch ? descMatch[1] : `Nikala UI ${title} documentation.`;
        const slug = routeUrl.replace(/^\/docs\/?/, "") || "introduction";

        records.push({
          objectID: `doc-${slug.replace(/\//g, "-")}`,
          type: "doc",
          title,
          description,
          category: baseRoute.includes("desktop") ? "Desktop & Tauri" : "Documentation",
          url: routeUrl,
          content: `${title} ${description} Nikala UI documentation guide SolidJS Tailwind CSS v4`,
          hierarchy: {
            lvl0: "Documentation",
            lvl1: title,
          },
        });
      }
    }
  }

  scanDirectory(docsRoutesDir, "/docs");
  return records;
}

async function buildAllRecords(): Promise<SearchRecord[]> {
  const rootDir = process.cwd();
  const registryRecords = getRegistryRecords(rootDir);
  const docRecords = getDocRouteRecords(rootDir);

  return [...registryRecords, ...docRecords];
}

async function indexAlgolia() {
  console.log("🔍 Dynamically Scanning Nikala UI codebase for Algolia Search...");
  const records = await buildAllRecords();
  console.log(`✓ Scanned ${records.length} records dynamically (${records.filter(r => r.type === "component").length} components, ${records.filter(r => r.type === "hook").length} hooks, ${records.filter(r => r.type === "doc").length} docs, ${records.filter(r => r.type === "block").length} blocks)`);

  if (!ADMIN_API_KEY) {
    console.log("⚠️  ALGOLIA_ADMIN_API_KEY is not set.");
    console.log("   Dry run finished successfully. Pass ALGOLIA_ADMIN_API_KEY to sync records to Algolia Cloud.");
    return;
  }

  console.log(`📡 Connecting to Algolia App ID: ${APP_ID}, Index: ${INDEX_NAME}...`);
  const client = algoliasearch(APP_ID, ADMIN_API_KEY);

  await client.setSettings({
    indexName: INDEX_NAME,
    indexSettings: {
      searchableAttributes: [
        "title",
        "category",
        "description",
        "content",
        "url",
      ],
      customRanking: [
        "desc(type)",
      ],
      attributesForFaceting: [
        "type",
        "category",
      ],
      highlightPreTag: "<mark class=\"bg-primary/20 text-primary font-semibold px-0.5 rounded-xs\">",
      highlightPostTag: "</mark>",
    },
  });

  await client.saveObjects({
    indexName: INDEX_NAME,
    objects: records,
  });

  console.log(`✅ Successfully indexed ${records.length} records to Algolia!`);
}

indexAlgolia().catch((err) => {
  console.error("❌ Algolia Indexing failed:", err);
  process.exit(1);
});
