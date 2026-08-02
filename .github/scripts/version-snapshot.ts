import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const packages = [
  "packages/cli/package.json",
  "packages/core/package.json",
];

try {
  /* Get current short git commit hash */
  const gitHash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  const snapshotVersion = `0.0.0-nightly.${gitHash}`;

  for (const pkgPath of packages) {
    const fullPath = path.resolve(process.cwd(), pkgPath);
    if (fs.existsSync(fullPath)) {
      const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      pkg.version = snapshotVersion;
      fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log(`Updated ${pkgPath} version to ${snapshotVersion}`);
    }
  }
} catch (error) {
  console.error("Failed to stamp snapshot version:", error);
  process.exit(1);
}