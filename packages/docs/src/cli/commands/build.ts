// packages/docs/src/cli/commands/build.ts
import pc from "picocolors";
import { buildDocs } from "../../server/index.js";

export interface BuildCommandOptions {
  outDir?: string;
}

export async function runBuildCommand(dir: string | undefined, options: BuildCommandOptions = {}) {
  const outDir = options.outDir || "dist";

  console.log();
  console.log(pc.bold(pc.cyan("  Nikala Docs Engine ")) + pc.dim("v0.12.1"));
  console.log(pc.dim(`  Building documentation bundle from ${pc.bold(dir || "configured contentDir")} to ${pc.bold(outDir)}...`));
  console.log();

  const startTime = Date.now();

  try {
    await buildDocs({
      docsDir: dir,
      outDir,
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log();
    console.log(`  ${pc.green("✓")} ${pc.bold("Build complete")} in ${pc.cyan(elapsed + "s")}`);
    console.log(`  ${pc.green("➜")} Output directory: ${pc.cyan(outDir)}`);
    console.log();
  } catch (err: any) {
    console.error(pc.red(`  ✗ Build failed: ${err.message}`));
    process.exit(1);
  }
}
