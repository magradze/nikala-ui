// packages/docs/scripts/build.ts
import path from "node:path";
import { execSync } from "node:child_process";
import fs from "fs-extra";
import pc from "picocolors";

const rootDir = path.resolve(import.meta.dirname, "..");
const distDir = path.resolve(rootDir, "dist");
const srcClientDir = path.resolve(rootDir, "src/client");
const distClientDir = path.resolve(distDir, "client");
const cliDistFile = path.resolve(distDir, "cli/index.js");
console.log(pc.cyan("📦 Building @nikala-ui/docs..."));

// 1. Run TypeScript compiler
try {
  execSync("bunx tsc -p tsconfig.build.json", {
    cwd: rootDir,
    stdio: "inherit",
  });
} catch (err) {
  console.error(pc.red("✗ TypeScript build failed"));
  process.exit(1);
}

// 2. Copy client template assets (index.html, style.css)
try {
  fs.ensureDirSync(distClientDir);

  const indexHtmlSrc = path.join(srcClientDir, "index.html");
  const indexHtmlDist = path.join(distClientDir, "index.html");
  if (fs.existsSync(indexHtmlSrc)) {
    fs.copyFileSync(indexHtmlSrc, indexHtmlDist);
    console.log(`  ${pc.green("✓")} Synced ${pc.dim("dist/client/index.html")}`);
  }

  const styleCssSrc = path.join(srcClientDir, "style.css");
  const styleCssDist = path.join(distClientDir, "style.css");
  if (fs.existsSync(styleCssSrc)) {
    fs.copyFileSync(styleCssSrc, styleCssDist);
    console.log(`  ${pc.green("✓")} Synced ${pc.dim("dist/client/style.css")}`);
  }
} catch (err: any) {
  console.error(pc.red(`✗ Failed to sync client assets: ${err.message}`));
  process.exit(1);
}

// 3. Make CLI binary executable
try {
  if (fs.existsSync(cliDistFile)) {
    fs.chmodSync(cliDistFile, 0o755);
    console.log(`  ${pc.green("✓")} Chmod executable permissions set on ${pc.dim("dist/cli/index.js")}`);
  }
} catch (err: any) {
  console.error(pc.red(`✗ Failed to set executable permissions: ${err.message}`));
  process.exit(1);
}

console.log(pc.green("✨ @nikala-ui/docs build complete!"));
