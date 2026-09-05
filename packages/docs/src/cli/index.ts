#!/usr/bin/env node
import { Command } from "commander";
import { runDevCommand } from "./commands/dev.js";
import { runBuildCommand } from "./commands/build.js";
import { runPreviewCommand } from "./commands/preview.js";
import { runInitCommand } from "./commands/init.js";
import { runServeCommand } from "./commands/serve.js";

const program = new Command();

program
  .name("@nikala-ui/docs")
  .description("Zero-config, fast, and elegant documentation engine for SolidJS")
  .version("0.12.1");

program
  .command("dev [dir]")
  .description("Start local development server with live MDX reload")
  .option("-p, --port <port>", "Port to listen on (default: 1862)")
  .option("--host [host]", "Specify host address")
  .option("--open", "Open browser automatically")
  .action((dir, options) => {
    runDevCommand(dir, options);
  });

program
  .command("build [dir]")
  .description("Build static documentation site for production")
  .option("-o, --outDir <outDir>", "Output directory (default: dist)")
  .action((dir, options) => {
    runBuildCommand(dir, options);
  });

program
  .command("preview [dir]")
  .description("Locally preview production build")
  .option("-p, --port <port>", "Port to listen on (default: 1862)")
  .option("--host [host]", "Specify host address")
  .action((dir, options) => {
    runPreviewCommand(dir, options);
  });

program
  .command("serve [dir]")
  .description("Serve the built docs with runtime SSR")
  .option("-p, --port <port>", "Port to listen on (default: 4173)")
  .option("--host <host>", "Host to bind to (default: localhost)")
  .option("-o, --outDir <outDir>", "Build output directory (default: dist)")
  .action((dir, options) => {
    runServeCommand(dir, options);
  });

program
  .command("init [dir]")
  .description("Scaffold a new Nikala Docs project with sample content")
  .action((dir) => {
    runInitCommand(dir);
  });

program.parse(process.argv);
