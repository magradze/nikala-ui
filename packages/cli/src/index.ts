#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { themeCommand } from "./commands/theme.js";
import { validateCommand } from "./commands/validate.js";
import { diffCommand } from "./commands/diff.js";
import { upgradeCommand } from "./commands/upgrade.js";
import { removeCommand } from "./commands/remove.js";

import { setupAiRules } from "./utils/init/setup-ai-rules.js";

console.log(`\n🎨 ${pc.bold(pc.red("Nikala UI"))} ${pc.dim("v0.11.0")} — SolidJS + Tailwind v4 components`);
console.log(`   ${pc.italic(pc.dim("Honoring Niko Pirosmani (Nikala)"))}\n`);
console.log(`   ${pc.dim("Docs:")} ${pc.underline(pc.cyan("https://nikala.dev"))}\n`);

const program = new Command();

program
  .name("nikala")
  .description("Nikala UI — SolidJS + Tailwind v4 components")
  .version("0.11.0");

program
  .command("init")
  .description("Initialize Nikala UI in your project")
  .option("-d, --defaults", "Skip prompts and use defaults")
  .option("--ai", "Generate AI assistant rules (.cursor/rules/nikala.mdc, .cursorrules, AGENTS.md)")
  .action(init);

program
  .command("rules")
  .alias("ai")
  .description("Generate or update AI assistant rules (.cursor/rules/nikala.mdc, .cursorrules, AGENTS.md)")
  .action(() => setupAiRules(process.cwd()));

program
  .command("add [components...]")
  .description("Add components or reactive hooks to your project")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("--all", "Add all available items")
  .option("-h, --hook", "Add reactive hook primitive(s) instead of UI components")
  .action(add);

// Upgrade / Update command
program
  .command("upgrade [components...]")
  .alias("update")
  .description("Upgrade locally installed components and hooks to the latest registry version")
  .option("--all", "Upgrade all installed items")
  .action((components, options) => upgradeCommand(components, options));

// Remove / Uninstall command
program
  .command("remove [components...]")
  .alias("uninstall")
  .alias("clean")
  .description("Remove or uninstall installed components or reactive hooks from your project")
  .option("-h, --hook", "Remove reactive hook primitive(s) instead of UI components")
  .option("--all", "Remove all installed components or hooks")
  .action((components, options) => removeCommand(components, options));

// Parent theme command
const themeProg = program
  .command("theme")
  .description("Customize project theme colors and design tokens")
  .action(() => themeCommand());

// Sub-command: nikala theme set [primary] [base]
themeProg
  .command("set [primary] [base]")
  .description("Set project primary accent color and base palette")
  .action((primary, base) => themeCommand(primary, base));

// Diagnostic command
program
  .command("validate")
  .alias("doctor")
  .description("Run health diagnostics on Nikala UI configuration, packages, and CSS tokens")
  .action(validateCommand);

// Diff command
program
  .command("diff [component]")
  .description("Compare local component files against latest registry manifests and view differences")
  .action((component) => diffCommand(component));

program.parse();
