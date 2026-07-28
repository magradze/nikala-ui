import fs from "fs-extra";
import path from "node:path";
import { readConfig } from "../file.js";
import type { CheckResult } from "./check-config.js";

/**
 * Diagnostic check verifying existence and Tailwind v4 setup in target CSS file.
 *
 * @param cwd - Working directory path of the target project
 */
export async function checkCss(cwd: string = process.cwd()): Promise<CheckResult> {
  const config = await readConfig(cwd);
  const cssPathRelative = config?.css || "src/index.css";
  const cssPath = path.resolve(cwd, cssPathRelative);

  if (!(await fs.pathExists(cssPath))) {
    return {
      passed: false,
      message: `CSS file missing: ${cssPathRelative}`,
      details: "Ensure the primary CSS file specified in nikala.config.json exists.",
    };
  }

  try {
    const cssContent = await fs.readFile(cssPath, "utf-8");

    if (!cssContent.includes('@import "tailwindcss"') && !cssContent.includes("@import 'tailwindcss'")) {
      return {
        passed: false,
        message: `Tailwind CSS import missing in ${cssPathRelative}`,
        details: 'Add `@import "tailwindcss";` to the top of your CSS file.',
      };
    }

    const requiredTokens = ["--primary", "--background", "--foreground", "--border"];
    const missingTokens = requiredTokens.filter((token) => !cssContent.includes(token));

    if (missingTokens.length > 0) {
      return {
        passed: false,
        message: `Incomplete CSS theme tokens in ${cssPathRelative}`,
        details: `Missing variables: ${missingTokens.join(", ")}. Run \`nikala theme set\` to regenerate CSS setup.`,
      };
    }

    return {
      passed: true,
      message: `CSS theme configuration valid in ${cssPathRelative}`,
    };
  } catch (error) {
    return {
      passed: false,
      message: `Failed to read ${cssPathRelative}`,
      details: String(error),
    };
  }
}