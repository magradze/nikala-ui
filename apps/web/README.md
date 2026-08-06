# Nikala UI Web Portal

Official documentation website and interactive playground for **Nikala UI** — a copy-paste component system for SolidJS built natively for Tailwind CSS v4.

Official Site: [nikala.dev](https://nikala.dev)

## Features

- **Documentation**: Detailed guides for CLI commands, theming engine, and 26 core UI components.
- **Interactive Component Viewer**: Live component preview cards with code toggle, package runner switcher (`bunx`, `npx`, `pnpm`, `yarn`), and CLI copy buttons.
- **Dynamic Playground**: Real-time component props customizer, stage previewer, and TSX code exporter powered by Vite dynamic stage auto-discovery.
- **Command Palette (`Ctrl + K`)**: Global modal search powered by Kobalte Dialog primitives.
- **Performance First**: Built on SolidStart 2.0 with SSR, fine-grained reactivity, zero-FOUC theme initialization, and pre-rendered static deployment.

## Tech Stack

- **Framework**: SolidStart 2.0 / SolidJS
- **Styling**: Tailwind CSS v4
- **Component System**: Nikala UI (`@nikala-ui/core`)
- **Syntax Highlighting**: Prism.js (SSR-safe post-hydration rendering)
- **Icons**: Lucide Icons (`lucide-solid` optimized with `vite-plugin-lucide-preprocess`)
- **Testing**: Vitest unit and integration test suite

## Local Development

### Prerequisites

Ensure you have [Bun](https://bun.sh) (v1.1+) or Node.js (v20+) installed.

### Installation

Clone the monorepo and install workspace dependencies:

```bash
git clone https://github.com/nikala-ui/ui.git
cd nikala-ui
bun install
```

### Development Server

Start the local development server for the web portal:

```bash
cd apps/web
bun dev
```

Open `http://localhost:3000` in your browser.

### Production Build

Build the static web portal for production deployment:

```bash
cd apps/web
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Directory Structure

```text
apps/web/
├── public/                 # Static assets, favicon, and llms.txt definition
├── src/
│   ├── components/
│   │   ├── docs/           # Reusable documentation layout components
│   │   ├── partials/       # Header, Footer, and MobileNav components
│   │   ├── playground/     # Playground UI controls, stage, and 26 stage modules
│   │   ├── ui/             # Installed Nikala UI components
│   │   ├── code-block.tsx  # Prism-powered code block component
│   │   └── component-preview.tsx # Interactive component viewer
│   ├── config/             # Centralized docs registry and playground config
│   ├── hooks/              # usePackageManager hook with localStorage persistence
│   ├── lib/                # Utility helpers and Prism syntax highlighter
│   ├── providers/          # ThemeProvider and ThemeScript
│   ├── routes/             # SolidStart file-based pages and layouts
│   └── types/              # Centralized TypeScript domain type definitions
├── tests/                  # Vitest unit and integration test suites
├── netlify.toml            # Netlify deployment configuration
├── tsconfig.json           # TypeScript configuration with @/* path alias
└── vite.config.ts          # SolidStart, Tailwind v4, and Lucide Vite plugins
```

## Contributing

Contributions to documentation, bug fixes, and component examples are welcome. Please review our guides before submitting a pull request:

- [Component Documentation Guide](docs/COMPONENT_DOCS_GUIDE.md) — How to add documentation pages for new components.
- [Playground Stage Guide](docs/PLAYGROUND_STAGE_GUIDE.md) — How to add interactive stage modules to the playground.

For general guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
