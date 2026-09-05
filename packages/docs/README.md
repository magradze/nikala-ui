# @nikala-ui/docs

Zero-config documentation engine for SolidJS, built on Nikala UI and Tailwind CSS v4.

## Features

- Vite-powered dev server and static build engine.
- Nested file-based routing generated from `content/**/*.mdx`.
- Pre-built Nikala UI theme with dark/light mode and Tailwind CSS v4 tokens.
- Automatic Table of Contents and breadcrumbs extracted from headings and folder structure.
- Shiki code syntax highlighting with language tabs and clipboard copy actions.
- Integrated documentation components: Callout, Tabs, Steps, CodeGroup, FileTree, ApiTable.

## Usage

```bash
# Start local docs dev server
bunx @nikala-ui/docs dev

# Build production static output
bunx @nikala-ui/docs build
```
