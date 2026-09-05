// packages/docs/src/cli/commands/preview.ts
import pc from "picocolors";
import { previewDocs } from "../../server/index.js";

export interface PreviewCommandOptions {
  port?: string;
  host?: string;
  outDir?: string;
}

export async function runPreviewCommand(dir = "docs", options: PreviewCommandOptions = {}) {
  const port = options.port ? parseInt(options.port, 10) : 1862;
  const host = options.host || "localhost";
  const outDir = options.outDir || "dist";

  console.log();
  console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.12.1"));
  console.log(pc.dim(`  Previewing production build from ${pc.bold(outDir)}...`));
  console.log();

  try {
    await previewDocs({
      outDir,
      port,
      host,
    });
  } catch (err: any) {
    console.error(pc.red(`  ✗ Preview failed: ${err.message}`));
    process.exit(1);
  }
}
