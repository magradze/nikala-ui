import pc from "picocolors";
import { checkConfig } from "../utils/validate/check-config.js";
import { checkDeps } from "../utils/validate/check-deps.js";
import { checkCss } from "../utils/validate/check-css.js";

/**
 * Command handler for `nikala validate` (or `nikala doctor`).
 * Executes diagnostic checks verifying configuration, installed dependencies, and CSS theme tokens.
 */
export async function validateCommand() {
  const cwd = process.cwd();

  console.log(pc.cyan("\nDiagnostic Health Check — Nikala UI Workspace\n"));

  const checks = [
    { name: "Project Configuration", fn: () => checkConfig(cwd) },
    { name: "Dependencies & Packages", fn: () => checkDeps(cwd) },
    { name: "CSS Setup & Theme Tokens", fn: () => checkCss(cwd) },
  ];

  let totalPassed = 0;

  for (const check of checks) {
    const result = await check.fn();

    if (result.passed) {
      totalPassed++;
      console.log(`  ✓ ${pc.bold(check.name)}: ${result.message}`);
    } else {
      console.log(`  ✗ ${pc.bold(check.name)}: ${result.message}`);
      if (result.details) {
        console.log(`    ↳ ${pc.yellow(result.details)}`);
      }
    }
  }

  console.log("");
  if (totalPassed === checks.length) {
    console.log(pc.green(`Workspace health check passed (${totalPassed}/${checks.length} checks valid).\n`));
  } else {
    console.log(
      pc.yellow(
        `Workspace health check finished with warnings (${totalPassed}/${checks.length} passed).\n`
      )
    );
  }
}