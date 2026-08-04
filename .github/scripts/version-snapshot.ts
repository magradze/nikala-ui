import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const packages = [
  "packages/cli/package.json",
  "packages/core/package.json",
  "packages/hooks/package.json",
];

try {
  /* Get current short git commit hash */
  const gitHash = execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();

  for (const pkgPath of packages) {
    const fullPath = path.resolve(process.cwd(), pkgPath);
    if (fs.existsSync(fullPath)) {
      const pkg = JSON.parse(fs.readFileSync(fullPath, "utf8"));
      const baseVersion = pkg.version.split("-")[0]; // e.g. "0.9.0" from "0.9.0" or "0.9.0-nightly"
      const snapshotVersion = `${baseVersion}-nightly.${gitHash}`;
      pkg.version = snapshotVersion;
      fs.writeFileSync(fullPath, JSON.stringify(pkg, null, 2) + "\n");
      console.log(`Updated ${pkgPath} version to ${snapshotVersion}`);
    }
  }
} catch (error) {
  console.error("Failed to stamp snapshot version:", error);
  process.exit(1);
}