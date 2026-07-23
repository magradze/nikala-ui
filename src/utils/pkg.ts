import fs from "fs-extra";
import path from "node:path";
import { execSync } from "node:child_process";
import pc from "picocolors";

export type PackageManager = "bun" | "pnpm" | "yarn" | "npm";

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

  // Fallback default
  return "bun";
}

/**
 * Automatically installs missing NPM dependencies using the detected package manager.
 *
 * @param dependencies - Array of NPM package names to install
 * @param cwd - Target directory path
 */
export async function installDependencies(dependencies: string[], cwd: string = process.cwd()) {
  if (!dependencies || dependencies.length === 0) return;

  const pkgManager = await detectPackageManager(cwd);
  const depsString = dependencies.join(" ");

  let command = "";
  switch (pkgManager) {
    case "bun":
      command = `bun add ${depsString}`;
      break;
    case "pnpm":
      command = `pnpm add ${depsString}`;
      break;
    case "yarn":
      command = `yarn add ${depsString}`;
      break;
    case "npm":
    default:
      command = `npm install ${depsString}`;
      break;
  }

  console.log(pc.yellow(`\n📦 Installing required component dependencies (${pkgManager})...`));
  console.log(pc.white(`   ${command}\n`));

  try {
    execSync(command, { cwd, stdio: "inherit" });
    console.log(pc.green("  ✓ Dependencies installed successfully."));
  } catch (error) {
    console.log(pc.red(`❌ Failed to install dependencies automatically.`));
    console.log(pc.yellow(`   Please run manually: ${command}`));
  }
}