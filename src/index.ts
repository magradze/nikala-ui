#!/usr/bin/env node
// src/index.ts
import { Command } from "commander";
import pc from "picocolors";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

console.log(pc.red(`
    _   _ _ _             _ 
   | \\ | (_) |           | |
   |  \\| |_| | _____  ___| |
   | . \\ | | |/ / _ \\/ _ \\ |
   | |\\  | |   <  __/  __/ |
   |_| \\_|_|_|\\_\\___|\\___|_|
   
   🎨 Inspired by Niko Pirosmani (Nikala)
`));

const program = new Command();

program
  .name("nikala")
  .description("Nikala UI — SolidJS + Tailwind v4 components")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize Nikala UI in your project")
  .option("-d, --defaults", "Skip prompts and use defaults")
  .action(init);

program
  .command("add <components...>")
  .description("Add components to your project")
  .option("-o, --overwrite", "Overwrite existing files")
  .option("--all", "Add all available components")
  .action(add);

program.parse();