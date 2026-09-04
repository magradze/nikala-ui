// packages/docs/src/cli/commands/init.ts
import path from "node:path";
import fs from "fs-extra";
import pc from "picocolors";

export async function runInitCommand(targetDir = "docs") {
  const root = process.cwd();
  const docsPath = path.resolve(root, targetDir);
  const configPath = path.resolve(root, "nikala.config.ts");

  console.log();
  console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.11.0"));
  console.log(pc.dim(`  Scaffolding starter documentation in ${pc.bold(targetDir)}...`));
  console.log();

  await fs.ensureDir(docsPath);

  // 1. Create nikala.config.ts if not exists
  if (!(await fs.pathExists(configPath))) {
    const configContent = `import { defineDocsConfig } from "@nikala-ui/docs";

export default defineDocsConfig({
  title: "My Project Docs",
  description: "High-performance documentation built with Nikala Docs and SolidJS",
  repository: {
    url: "https://github.com/my-org/my-project",
  },
  search: {
    enabled: true,
  },
});
`;
    await fs.writeFile(configPath, configContent, "utf-8");
    console.log(`  ${pc.green("✓")} Created ${pc.cyan("nikala.config.ts")}`);
  }

  // 2. Create docs/index.mdx
  const indexPath = path.join(docsPath, "index.mdx");
  if (!(await fs.pathExists(indexPath))) {
    const indexContent = `---
title: Introduction
description: Welcome to your modern documentation website.
order: 1
---

# Introduction

Welcome to your new documentation site built on **Nikala Docs**, **SolidJS**, and **Tailwind CSS v4**.

<Callout type="tip">
  Nikala Docs compiles Markdown and MDX with fine-grained reactive SolidJS components and Shiki syntax highlighting.
</Callout>

## Features

- **Fine-Grained Reactivity**: Powered directly by SolidJS signals without Virtual DOM overhead.
- **Tailwind CSS v4**: Built natively with modern CSS custom property tokens.
- **Copy-Paste Ownership**: 100% component transparency honoring Niko Pirosmani.
`;
    await fs.writeFile(indexPath, indexContent, "utf-8");
    console.log(`  ${pc.green("✓")} Created ${pc.cyan(path.join(targetDir, "index.mdx"))}`);
  }

  // 3. Create docs/quick-start.mdx
  const quickStartPath = path.join(docsPath, "quick-start.mdx");
  if (!(await fs.pathExists(quickStartPath))) {
    const quickStartContent = `---
title: Quick Start
description: Get up and running in less than 5 minutes.
order: 2
---

# Quick Start

Get your project running in seconds with simple shell commands.

## Installation

\`\`\`bash
bun install
\`\`\`

## Development Server

Start the live development server with hot-reloading:

\`\`\`bash
bunx nikala-docs dev
\`\`\`
`;
    await fs.writeFile(quickStartPath, quickStartContent, "utf-8");
    console.log(`  ${pc.green("✓")} Created ${pc.cyan(path.join(targetDir, "quick-start.mdx"))}`);
  }

  console.log();
  console.log(`  ${pc.bold(pc.green("Success!"))} Documentation initialized.`);
  console.log(`  Run ${pc.cyan("bunx nikala-docs dev")} to start your docs.`);
  console.log();
}
