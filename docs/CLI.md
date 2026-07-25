# Nikala UI — Command Line Interface (CLI) Guide

This document provides a comprehensive command reference for the Nikala UI CLI tool (`nikala`). It covers workspace initialization, interactive component management, project health diagnostics, code diffing, and CLI theme customization.

---

## Command Summary

| Command | Alias | Description |
| :--- | :--- | :--- |
| `nikala init` | — | Initializes Nikala UI configuration, CSS design tokens, and path aliases. |
| `nikala add` | — | Installs components directly into your project via arguments or interactive menu. |
| `nikala validate` | `nikala doctor` | Runs workspace health diagnostics on configuration, packages, and CSS tokens. |
| `nikala diff` | — | Compares local installed components against the latest registry manifests. |
| `nikala theme` | `nikala theme set` | Customizes project base gray palettes and primary brand accent colors. |

---

## 1. `nikala add` — Component Installation

The `add` command installs component source code directly into your `src/components/ui` directory and automatically resolves required NPM dependencies.

### Interactive Autocomplete Multiselect Mode

Running `nikala add` without arguments launches an interactive, searchable menu displaying all available components in the registry index.

```bash
nikala add
```

- **Filter/Search:** Type characters to filter components dynamically (e.g., type `dia` to locate `Dialog`).
- **Toggle Selection:** Press `Space` to select or deselect components.
- **Confirm Installation:** Press `Enter` to install all selected components simultaneously.

### Direct Component Installation

Specify component names as arguments to install them directly:

```bash
nikala add button input dialog
```

### Installing All Components

To install the entire component suite at once:

```bash
nikala add all
# or
nikala add --all
```

### Overwriting Existing Files

By default, the CLI prevents accidentally overwriting local component modifications. To overwrite existing files with fresh registry templates, pass the `--overwrite` flag:

```bash
nikala add button --overwrite
```

### Installing from Custom Remote URLs

Nikala UI supports installing components directly from arbitrary HTTP(S) JSON manifests:

```bash
nikala add https://example.com/registry/custom-widget.json
```

---

## 2. `nikala validate` / `nikala doctor` — Health Diagnostics

The `validate` command (or its alias `doctor`) inspects your project workspace for configuration issues, missing dependencies, or corrupted CSS tokens.

```bash
nikala validate
# or
nikala doctor
```

### Diagnostic Checks Performed

1. **Project Configuration Check:** Verifies existence of `nikala.config.json` and checks if configured aliases (`alias.components`, `alias.utils`) point to valid directories on disk.
2. **Dependencies & Packages Check:** Verifies that required core packages (`clsx`, `tailwind-merge`, `class-variance-authority`, `tailwindcss`, `@tailwindcss/vite`) are installed in `package.json`.
3. **CSS Setup & Theme Tokens Check:** Verifies existence of the target CSS file (`src/index.css` or `src/app.css`), confirms `@import "tailwindcss";` presence, and checks core CSS variable tokens (`--primary`, `--background`, `--foreground`, `--border`).

---

## 3. `nikala diff` — Component Code Inspector

The `diff` command compares your local component implementations against the latest official manifests on the GitHub Raw CDN registry. This allows you to inspect upstream bug fixes or style updates without losing custom changes.

### Inspecting All Local Components

Running `nikala diff` scans all `.tsx` files in your components directory and compares them against the registry:

```bash
nikala diff
```

### Inspecting a Specific Component

To inspect differences for a single component:

```bash
nikala diff button
```

### Interactive Output & Actions

When differences are detected, the CLI displays color-coded line-by-line output:

- **Green (`+`):** Upstream additions in the latest registry version.
- **Red (`-`):** Upstream deletions or local modifications.

After displaying the diff, the CLI offers an interactive prompt:

- **Keep local version (skip):** Preserves your local custom implementation.
- **Overwrite with latest registry version:** Replaces your local file with the latest upstream code.

---

## 4. `nikala theme` — CLI Theme Customization

The `theme` command allows switching base gray palettes and primary brand accent colors directly from the terminal without re-running initialization.

```bash
# Interactive selection menu
nikala theme

# Programmatically set primary accent color and base palette
nikala theme set sky slate
```
