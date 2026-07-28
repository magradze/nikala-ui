import fs from "fs-extra";
import path from "node:path";
import { readConfig } from "../file.js";

export interface CheckResult {
  passed: boolean;
  message: string;
  details?: string;
}

/**
 * Diagnostic check verifying existence and valid alias mapping in nikala.config.json.
 *
 * @param cwd - Working directory path of the target project
 */
export async function checkConfig(cwd: string = process.cwd()): Promise<CheckResult> {
  const configPath = path.join(cwd, "nikala.config.json");

  if (!(await fs.pathExists(configPath))) {
    return {
      passed: false,
      message: "nikala.config.json manifest missing",
      details: "Run `nikala init` to initialize workspace configuration.",
    };
  }

  try {
    const config = await readConfig(cwd);
    if (!config || !config.alias || !config.alias.components || !config.alias.utils) {
      return {
        passed: false,
        message: "Invalid nikala.config.json structure",
        details: "Required properties (alias.components, alias.utils) are missing.",
      };
    }

    const componentsDir = path.resolve(cwd, config.alias.components);
    if (!(await fs.pathExists(componentsDir))) {
      return {
        passed: false,
        message: `Components directory not found: ${config.alias.components}`,
        details: "Create the folder manually or update nikala.config.json alias.",
      };
    }

    return {
      passed: true,
      message: "nikala.config.json configuration valid",
    };
  } catch (error) {
    return {
      passed: false,
      message: "Failed to parse nikala.config.json",
      details: String(error),
    };
  }
}