import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import { generateThemeCss } from "../theme.js";

/**
 * Resolves target CSS file path (app.css vs index.css), generates theme setup, and injects entry import.
 */
export async function setupCssTheme(
  cwd: string,
  baseColor: string,
  primaryColor: string
): Promise<string> {
  let cssPathRelative = "src/index.css";

  if (await fs.pathExists(path.join(cwd, "src", "app.css"))) {
    cssPathRelative = "src/app.css";
  } else if (await fs.pathExists(path.join(cwd, "src", "index.css"))) {
    cssPathRelative = "src/index.css";
  } else {
    const isSolidStart =
      (await fs.pathExists(path.join(cwd, "src", "app.tsx"))) ||
      (await fs.pathExists(path.join(cwd, "app.config.ts")));

    if (isSolidStart) {
      cssPathRelative = "src/app.css";
    }
  }

  const cssPath = path.join(cwd, cssPathRelative);
  const generatedCss = generateThemeCss(baseColor, primaryColor);

  await fs.ensureDir(path.dirname(cssPath));
  await fs.writeFile(cssPath, generatedCss, "utf-8");
  console.log(pc.green(`✓ Generated Tailwind CSS v4 theme setup in ${cssPathRelative}`));

  // Inject CSS import statement into project's main entry point
  const entryCandidates = [
    path.join(cwd, "src", "app.tsx"),
    path.join(cwd, "src", "app.jsx"),
    path.join(cwd, "src", "entry-client.tsx"),
    path.join(cwd, "src", "index.tsx"),
    path.join(cwd, "src", "index.jsx"),
    path.join(cwd, "src", "index.ts"),
    path.join(cwd, "src", "main.tsx"),
    path.join(cwd, "src", "main.ts"),
  ];

  let targetEntryPath: string | null = null;
  for (const candidate of entryCandidates) {
    if (await fs.pathExists(candidate)) {
      targetEntryPath = candidate;
      break;
    }
  }

  if (targetEntryPath) {
    let entryContent = await fs.readFile(targetEntryPath, "utf-8");
    const cssFileName = path.basename(cssPathRelative);
    const cssImportStatement = `import "./${cssFileName}";`;

    if (!entryContent.includes(cssFileName)) {
      entryContent = `${cssImportStatement}\n${entryContent}`;
      await fs.writeFile(targetEntryPath, entryContent, "utf-8");
      console.log(
        pc.green(`✓ Injected ${cssImportStatement} into ${path.relative(cwd, targetEntryPath)}`)
      );
    }
  }

  return cssPathRelative;
}