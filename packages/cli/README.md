# @nikala-ui/cli

Command Line Interface (CLI) for **Nikala UI** — a copy-paste component system for **SolidJS** built natively for **Tailwind CSS v4**.

Honoring the iconic Georgian painter **Niko Pirosmani (Nikala)**.

Official Documentation & Interactive Demos: [nikala.dev](https://nikala.dev)

---

## Installation & Usage

Execute directly using your preferred package manager:

```bash
# Add components
bunx @nikala-ui/cli add button dialog

# Upgrade / update installed components & hooks to latest registry versions
bunx @nikala-ui/cli upgrade
bunx @nikala-ui/cli update button --all

# Remove / uninstall installed components or hooks
bunx @nikala-ui/cli remove button
bunx @nikala-ui/cli uninstall -h create-clipboard

# Initialize project
bunx @nikala-ui/cli init
```

---

## Available Commands

- `nikala init` — Initializes configuration, `@` path aliases, and Tailwind CSS v4 variables.
- `nikala add` — Interactive searchable multiselect menu for component installation.
- `nikala validate` (or `nikala doctor`) — Runs health diagnostics on workspace configuration, packages, and CSS design tokens.
- `nikala diff` — Inspects line-by-line code differences between local components and upstream registry manifests.
- `nikala theme set [primary] [base]` — Customizes primary brand accent colors and base gray palettes directly from the terminal.

---

## Documentation

For full documentation, component lists, and theming guides, visit the official repository at [github.com/nikala-ui/ui](https://github.com/nikala-ui/ui).

## License

[MIT](https://github.com/nikala-ui/ui/blob/main/LICENSE)
