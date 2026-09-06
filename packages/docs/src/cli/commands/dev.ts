// packages/docs/src/cli/commands/dev.ts
import pc from "picocolors";
import { createDocsServer } from "../../server/index.js";

export interface DevCommandOptions {
  port?: string;
  host?: string;
  open?: boolean;
}

export async function runDevCommand(dir: string | undefined, options: DevCommandOptions = {}) {
  const port = options.port ? parseInt(options.port, 10) : 1862;
  const host = options.host || "localhost";
  const open = options.open ?? false;

  console.log();
  console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.12.2"));
  console.log(pc.dim("  Honoring Niko Pirosmani (Nikala) — Elegant docs for SolidJS"));
  console.log();

  try {
    const server = await createDocsServer({
      docsDir: dir,
      port,
      host,
      open,
    });

    await server.listen();
    const address = server.httpServer?.address();
    const actualPort = typeof address === "object" && address ? address.port : port;

    console.log(`  ${pc.green("➜")}  ${pc.bold("Local:")}   ${pc.cyan(`http://${host}:${actualPort}/`)}`);
    console.log(`  ${pc.green("➜")}  ${pc.bold("Content:")} ${pc.dim(dir || "configured contentDir")}`);
    console.log(`  ${pc.green("➜")}  ${pc.bold("Press")}   ${pc.yellow("h + enter")} to show help`);
    console.log();
  } catch (err: any) {
    console.error(pc.red(`  ✗ Failed to start docs server: ${err.message}`));
    process.exit(1);
  }
}
