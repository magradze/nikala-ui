import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const versionConfigPath = path.join(rootDir, "version.config.json");
let version = "";

const argVersion = process.argv[2];

if (argVersion) {
  version = argVersion.replace(/^v/, "");
  // Update version.config.json with the passed argument
  fs.writeFileSync(versionConfigPath, JSON.stringify({ version }, null, 2) + "\n");
  console.log(`✅ Updated version.config.json -> ${version}`);
} else {
  // Read version directly from version.config.json
  if (fs.existsSync(versionConfigPath)) {
    const config = JSON.parse(fs.readFileSync(versionConfigPath, "utf-8"));
    version = config.version.replace(/^v/, "");
    console.log(`📖 Reading version from version.config.json -> ${version}`);
  } else {
    console.error("❌ version.config.json not found and no version provided.");
    process.exit(1);
  }
}

// Helper to update JSON version field
function updateJsonVersion(filePath: string) {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    const content = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    content.version = version;
    fs.writeFileSync(fullPath, JSON.stringify(content, null, 2) + "\n");
    console.log(`✅ Updated ${filePath} -> ${version}`);
  }
}

function updateJsonDependency(filePath: string, dependency: string, value: string) {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    const content = JSON.parse(fs.readFileSync(fullPath, "utf-8"));
    content.dependencies ??= {};
    content.dependencies[dependency] = value;
    fs.writeFileSync(fullPath, JSON.stringify(content, null, 2) + "\n");
    console.log(`✅ Updated ${filePath} dependency ${dependency} -> ${value}`);
  }
}

// 2. Update package.json files
updateJsonVersion("packages/cli/package.json");
updateJsonVersion("packages/core/package.json");
updateJsonVersion("packages/docs/package.json");
updateJsonVersion("packages/hooks/package.json");
updateJsonVersion("packages/mcp/package.json");
updateJsonDependency("packages/docs/package.json", "@nikala-ui/cli", version);

// Helper to replace pattern in text file
function replaceInFile(filePath: string, searchRegex: RegExp, replacement: string) {
  const fullPath = path.join(rootDir, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf-8");
    content = content.replace(searchRegex, replacement);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Updated ${filePath} -> ${version}`);
  }
}

// 3. Update Docs CLI version output and Commander metadata
replaceInFile(
  "packages/docs/src/cli/index.ts",
  /\.version\("\d+\.\d+\.\d+"\)/g,
  `.version("${version}")`
);

for (const filePath of [
  "packages/docs/src/cli/commands/build.ts",
  "packages/docs/src/cli/commands/dev.ts",
  "packages/docs/src/cli/commands/init.ts",
  "packages/docs/src/cli/commands/preview.ts",
  "packages/docs/src/cli/commands/serve.ts",
]) {
  replaceInFile(filePath, /v\d+\.\d+\.\d+/g, `v${version}`);
}

// 4. Update CLI src/index.ts
replaceInFile(
  "packages/cli/src/index.ts",
  /v\d+\.\d+\.\d+/g,
  `v${version}`
);
replaceInFile(
  "packages/cli/src/index.ts",
  /\.version\("\d+\.\d+\.\d+"\)/g,
  `.version("${version}")`
);

// 5. Update MCP src/server.ts
replaceInFile(
  "packages/mcp/src/server.ts",
  /version:\s*"\d+\.\d+\.\d+"/g,
  `version: "${version}"`
);

// 6. Update Web Header badge, Mobile Nav & Hero section
replaceInFile(
  "apps/web/src/components/partials/header.tsx",
  /v\d+\.\d+\.\d+/g,
  `v${version}`
);
replaceInFile(
  "apps/web/src/components/partials/mobile-nav.tsx",
  /v\d+\.\d+\.\d+/g,
  `v${version}`
);
replaceInFile(
  "apps/web/src/components/sections/hero.tsx",
  /v\d+\.\d+\.\d+/g,
  `v${version}`
);

// 7. Update Web Intro docs page
replaceInFile(
  "apps/web/src/routes/docs/index.tsx",
  /badge="v\d+\.\d+\.\d+"/g,
  `badge="v${version}"`
);

// 8. Update Web public/llms.txt
replaceInFile(
  "apps/web/public/llms.txt",
  /Current Version:\s*v\d+\.\d+\.\d+/g,
  `Current Version: v${version}`
);

console.log(`\n🎉 Nikala UI successfully bumped to v${version}!`);
