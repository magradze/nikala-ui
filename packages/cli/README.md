# @nikala-ui/cli

The Nikala UI CLI initializes SolidJS projects and copies Nikala UI components, application blocks, and reactive hooks directly into the consuming project. It is designed for Tailwind CSS v4 and a local source ownership workflow.

Nikala UI honors the work of Georgian painter Niko Pirosmani (Nikala).

Documentation and interactive examples: [nikala.dev](https://nikala.dev)

## Installation

Run the CLI without installing it globally:

```bash
bunx @nikala-ui/cli <command>
```

The package also exposes the `nikala` binary when installed as a project dependency.

## Initialize a project

Run `init` from the root of a SolidJS project:

```bash
bunx @nikala-ui/cli init
```

Initialization creates or updates the Nikala project configuration, path aliases, Tailwind CSS v4 theme tokens, and the local `cn` helper. It installs the runtime and styling dependencies required by the generated setup.

Options:

```bash
# Skip interactive prompts and use defaults
bunx @nikala-ui/cli init --defaults

# Skip dependency installation
bunx @nikala-ui/cli init --skip-dependencies

# Generate AI assistant rules
bunx @nikala-ui/cli init --ai
```

AI rules can also be generated or updated independently:

```bash
bunx @nikala-ui/cli rules
bunx @nikala-ui/cli ai
```

## Add components, blocks, and hooks

Add one or more UI components:

```bash
bunx @nikala-ui/cli add button dialog
```

Add reactive hooks with `--hook` or `-h`:

```bash
bunx @nikala-ui/cli add --hook create-clipboard create-debounce
bunx @nikala-ui/cli add -h create-scroll-into-view
```

Add marketing or application blocks with `--block` or `-b`:

```bash
bunx @nikala-ui/cli add --block hero-01
```

If no item names are provided, the CLI opens an interactive searchable selector. Dependencies declared by the selected registry items are installed automatically.

Options:

```bash
# Add every available item in the selected category
bunx @nikala-ui/cli add --all

# Overwrite existing local files
bunx @nikala-ui/cli add button --overwrite
```

The CLI copies source files into the configured local directories. The project owns those files and can modify them without importing a runtime Nikala UI component package.

## Upgrade installed items

Upgrade selected locally installed components or hooks to the latest registry versions:

```bash
bunx @nikala-ui/cli upgrade button
bunx @nikala-ui/cli update button
bunx @nikala-ui/cli upgrade --all
```

`update` is an alias for `upgrade`. Without item names, the CLI opens a selector containing installed items.

## Remove installed items

Remove local components or hooks:

```bash
bunx @nikala-ui/cli remove button
bunx @nikala-ui/cli uninstall button
bunx @nikala-ui/cli clean --hook create-clipboard
```

Options:

```bash
# Remove hooks instead of UI components
bunx @nikala-ui/cli remove -h create-clipboard

# Remove all items in the selected category
bunx @nikala-ui/cli remove --all
```

The CLI asks for confirmation before deleting local source files. `uninstall` and `clean` are aliases for `remove`.

## List registry items

List available registry items and show which ones are installed locally:

```bash
bunx @nikala-ui/cli list
bunx @nikala-ui/cli ls
```

Filters and output options:

```bash
bunx @nikala-ui/cli list --installed
bunx @nikala-ui/cli list --component
bunx @nikala-ui/cli list --block
bunx @nikala-ui/cli list --hook
bunx @nikala-ui/cli list --json
```

## Customize the theme

Open the interactive theme selector:

```bash
bunx @nikala-ui/cli theme
```

Set the primary accent and base palette directly:

```bash
bunx @nikala-ui/cli theme set amber zinc
```

The command updates the local Tailwind CSS v4 design tokens defined by the project setup.

## Validate a project

Run diagnostics for the Nikala configuration, required dependencies, and CSS design tokens:

```bash
bunx @nikala-ui/cli validate
bunx @nikala-ui/cli doctor
```

`doctor` is an alias for `validate`.

## Inspect local differences

Compare a locally installed component with its current registry source:

```bash
bunx @nikala-ui/cli diff button
bunx @nikala-ui/cli diff
```

The command prints line-by-line differences between local source files and the latest registry manifest.

## Local project structure

After initialization and component installation, a typical project contains:

```text
src/
├── components/
│   ├── blocks/
│   └── ui/
├── hooks/
├── index.css
└── lib/
    └── cn.ts
nikala.config.json
```

The exact directories are controlled by `nikala.config.json`. Components, blocks, and hooks remain local source files that can be customized by the project owner.

## License

[MIT](https://github.com/nikala-ui/ui/blob/main/LICENSE)
