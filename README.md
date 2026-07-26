# Nikala UI Web

Official website, documentation portal, and interactive playground for **Nikala UI** — a copy-paste component system for SolidJS built natively for Tailwind CSS v4.

## Features

- **Documentation**: Comprehensive guides for installation, CLI usage, and theming.
- **Interactive Component Viewer**: Live component preview with code toggle and copy functionality.
- **Theme Playground**: Real-time accent color, base gray palette, and border radius switcher.
- **Performance First**: Built on SolidStart with SSR, fine-grained reactivity, and zero-FOUC theme initialization.

## Tech Stack

- **Framework**: SolidStart / SolidJS
- **Styling**: Tailwind CSS v4
- **Component System**: Nikala UI
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

Ensure you have Node.js (v18+) or Bun installed.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/magradze/nikala-web.git
cd nikala-web

# Install dependencies using Bun, pnpm, or npm
bun install
```

### Development Server

Start the local development server:

```bash
bun dev
# or
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build

Build the application for production deployment:

```bash
bun run build
# or
npm run build
```

Preview the production build locally:

```bash
bun run start
```

## Project Structure

```text
nikala-web/
├── public/                 # Static assets and llms.txt definition
├── src/
│   ├── components/
│   │   ├── partials/       # Header, Footer, and layout partials
│   │   ├── ui/             # Installed Nikala UI components
│   │   ├── code-block.tsx  # Shiki-powered code block component
│   │   └── component-preview.tsx # Interactive component viewer
│   ├── lib/                # Utility helpers and syntax highlighter
│   ├── providers/          # ThemeProvider and state context
│   └── routes/             # SolidStart file-based pages and layouts
├── app.config.ts           # SolidStart & Vite configuration
└── app.css                 # Global Tailwind CSS v4 theme entry
```

## Contributing

Contributions to documentation, bug fixes, and component examples are welcome. Please open an issue or submit a pull request.

## License

[MIT](LICENSE)
