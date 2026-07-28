import fs from "fs-extra";
import path from "node:path";
import stripJsonComments from "strip-json-comments";
import type { CheckResult } from "./check-config.js";

/**
 * Diagnostic check verifying required runtime and Tailwind CSS v4 packages in target package.json.
 *
 * @param cwd - Working directory path of the target project
 */
export async function checkDeps(cwd: string = process.cwd()): Promise<CheckResult> {
  const pkgPath = path.join(cwd, "package.json");

  if (!(await fs.pathExists(pkgPath))) {
    return {
      passed: false,
      message: "package.json file missing",
      details: "Ensure you are running the command in the root of a Node/Bun workspace.",
    };
  }

  try {
    const raw = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(stripJsonComments(raw));
    const installed = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    };

    const coreDeps = [
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "tailwindcss",
      "@tailwindcss/vite",
    ];

    const missing = coreDeps.filter((dep) => !installed[dep]);

    if (missing.length > 0) {
      return {
        passed: false,
        message: `Missing ${missing.length} core dependencies`,
        details: `Missing packages: ${missing.join(", ")}. Run \`bun add ${missing.join(" ")}\` to install.`,
      };
    }

    return {
      passed: true,
      message: "All core runtime and Tailwind CSS v4 packages installed",
    };
  } catch (error) {
    return {
      passed: false,
      message: "Failed to parse package.json",
      details: String(error),
    };
  }
}