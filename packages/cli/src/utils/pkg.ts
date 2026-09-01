import fs from "fs-extra";
import path from "node:path";
import { execFileSync } from "node:child_process";
import pc from "picocolors";
import stripJsonComments from "strip-json-comments";

export type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

// Standard npm package name regex validator (supports scoped packages and version specifiers)
const NPM_PACKAGE_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(@[a-zA-Z0-9^~.*><=-]+)?$/;

/**
 * Detects the package manager used in the target project workspace by checking lockfiles.
 *
 * @param cwd - Working directory path of the target project
 * @returns The detected package manager name
 */
export async function detectPackageManager(cwd: string = process.cwd()): Promise<PackageManager> {
  if (
    (await fs.pathExists(path.join(cwd, "bun.lockb"))) ||
    (await fs.pathExists(path.join(cwd, "bun.lock")))
  ) {
    return "bun";
  }
  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if (await fs.pathExists(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }
  if (await fs.pathExists(path.join(cwd, "package-lock.json"))) {
    return "npm";
  }

  return "bun";
}

/**
 * Safely installs missing NPM dependencies while protecting the user's existing package.json from being clobbered.
 *
 * @param dependencies - Array of NPM package names to install
 * @param cwd - Target directory path
 */
export async function installDependencies(dependencies: string[], cwd: string = process.cwd()) {
  if (!dependencies || dependencies.length === 0) return;

  const pkgManager = await detectPackageManager(cwd);
  const pkgPath = path.join(cwd, "package.json");

  // 1. Backup original package.json contents before running package manager installation
  let originalPkgJson: Record<string, any> | null = null;

  if (await fs.pathExists(pkgPath)) {
    try {
      const rawContent = await fs.readFile(pkgPath, "utf-8");
      originalPkgJson = JSON.parse(stripJsonComments(rawContent));
    } catch {
      // Failed to parse original package.json
    }
  }

  // Validate and sanitize dependency names to prevent any shell metacharacter injection
  const validDeps = dependencies.filter((dep) => NPM_PACKAGE_REGEX.test(dep));
  if (validDeps.length === 0) return;

  const subCommand = pkgManager === "npm" ? "install" : "add";
  const args = [subCommand, ...validDeps];

  console.log(pc.yellow(`\n📦 Installing required component dependencies (${pkgManager})...`));
  console.log(pc.white(`   ${pkgManager} ${args.join(" ")}\n`));

  try {
    execFileSync(pkgManager, args, { cwd, stdio: "inherit" });

    // 2. Validate package.json integrity after installation and restore stripped fields if necessary
    if (originalPkgJson && (await fs.pathExists(pkgPath))) {
      try {
        const currentPkg = await fs.readJson(pkgPath);

        // If package manager wiped out essential fields like name or scripts, merge original back
        if (!currentPkg.name && originalPkgJson.name) {
          const mergedPkg = {
            ...originalPkgJson,
            dependencies: {
              ...originalPkgJson.dependencies,
              ...currentPkg.dependencies,
            },
            devDependencies: {
              ...originalPkgJson.devDependencies,
              ...currentPkg.devDependencies,
            },
          };
          await fs.writeFile(pkgPath, JSON.stringify(mergedPkg, null, 2), "utf-8");
          console.log(pc.green("  ✓ Preserved and merged original package.json structure."));
        }
      } catch {
        // Ignore merge errors
      }
    }

    console.log(pc.green("  ✓ Dependencies installed successfully."));
  } catch (error) {
    console.log(pc.red(`❌ Failed to install dependencies automatically.`));
    console.log(pc.yellow(`   Please run manually: ${pkgManager} ${args.join(" ")}`));
  }
}