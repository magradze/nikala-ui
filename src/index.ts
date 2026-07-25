#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { themeCommand } from "./commands/theme.js";
import { validateCommand } from "./commands/validate.js";

console.log(`\n🎨 ${pc.bold(pc.red("Nikala UI"))} ${pc.dim("v0.4.0")} — SolidJS + Tailwind v4 components`);
console.log(`   ${pc.italic(pc.dim("Honoring Niko Pirosmani (Nikala)"))}\n`);

const program = new Command();

program
  .name("nikala")
  .description("Nikala UI — SolidJS + Tailwind v4 components")
  .version("0.4.0");

program
  .command("init")
  .description("Initialize Nikala UI in your project")
  .option("-d, --defaults", "Skip prompts and use defaults")
  .action(init);

program
  .command("add [components...]")
  .description("Add components to your project")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("--all", "Add all available components")
  .action(add);

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

program.parse();