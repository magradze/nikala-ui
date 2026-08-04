#!/usr/bin/env node
import { runStdioServer } from "./server.js";

runStdioServer().catch((err) => {
  console.error("Fatal error running Nikala UI MCP server:", err);
  process.exit(1);
});
