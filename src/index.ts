#!/usr/bin/env node
import { Command } from "commander";
import pc from "picocolors";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

// Compact header banner honoring Niko Pirosmani
console.log(`\n🎨 ${pc.bold(pc.red("Nikala UI"))} ${pc.dim("v0.2.1")} — SolidJS + Tailwind v4 components`);
console.log(`   ${pc.italic(pc.dim("Honoring Niko Pirosmani (Nikala)"))}\n`);

const program = new Command();

program
  .name("nikala")
  .description("Nikala UI — SolidJS + Tailwind v4 components")
  .version("0.2.1");

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

program.parse();