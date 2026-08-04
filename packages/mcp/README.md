# @nikala-ui/mcp

> Model Context Protocol (MCP) Server for Nikala UI components, reactive primitives, and engineering guidelines.

`@nikala-ui/mcp` connects AI assistants (Cursor, Antigravity, Claude Desktop, Windsurf, GitHub Copilot) directly to the Nikala UI registry. It allows AI models to fetch real-time TSX component source code, reactive SolidJS hooks, and architectural rules without leaving the editor.

---

## Features

- **Dynamic Registry Access**: Real-time access to all 27 UI components and 40 reactive primitives (`createAudio`, `createClipboard`, `createWebSocket`, etc.).
- **Zero Hardcoding**: Dynamically resolves metadata, code manifests, and dependencies directly from official Nikala UI registry manifests.
- **Dual Transport Support**:
  - **Stdio Transport**: Local CLI binary for IDE integration (`npx @nikala-ui/mcp`).
  - **SSE Transport**: Remote HTTP/SSE server endpoint hosted on `nikala.magradze.dev/api/mcp/sse`.
- **Engineering Rule Resources**: Exposes SolidJS fine-grained reactivity rules (`splitProps`, `children()` memoization) and Tailwind CSS v4 design token constraints directly to AI models.

---

## Configuration & Usage

### 1. Stdio Transport (Cursor / Antigravity / Claude Desktop)

Add `@nikala-ui/mcp` to your MCP configuration file (e.g. `mcp.json` or Claude Desktop config):

```json
{
  "mcpServers": {
    "nikala-ui": {
      "command": "npx",
      "args": ["-y", "@nikala-ui/mcp"]
    }
  }
}
```

### 2. Remote SSE Transport (HTTP)

If your AI assistant supports SSE / Remote MCP endpoints:

- **SSE Endpoint URL**: `https://nikala.magradze.dev/api/mcp/sse`
- **Messages Endpoint URL**: `https://nikala.magradze.dev/api/mcp/messages`

---

## Available MCP Tools

| Tool Name | Description | Arguments |
| :--- | :--- | :--- |
| `list_components` | List all available Nikala UI components from the official registry | None |
| `list_hooks` | List all 40 available Nikala UI reactive primitives / hooks | None |
| `get_component_code` | Fetch full source code TSX manifest for a component | `{ "name": "button" }` |
| `get_hook_code` | Fetch full source code TS primitive manifest for a hook | `{ "name": "create-clipboard" }` |
| `search_docs` | Search Nikala UI components, hooks, and guidelines by keywords | `{ "query": "modal" }` |

---

## Available MCP Resources

- **`nikala://rules/solidjs`**: SolidJS Reactivity Guidelines (`splitProps`, fine-grained signals, `children()` memoization).
- **`nikala://rules/theming`**: Tailwind CSS v4 Design Tokens, Anti-FOUC `<ThemeScript />`, and maximum `rounded-lg` border radius rule.

---

## License

MIT © [Magradze](https://github.com/magradze) — Honoring Niko Pirosmani (Nikala).
