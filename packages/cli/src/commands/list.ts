import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";
import { readConfig } from "../utils/file.js";
import { getRegistryIndex } from "../utils/registry.js";

interface ListOptions {
  installed?: boolean;
  hook?: boolean;
  component?: boolean;
  block?: boolean;
  json?: boolean;
}

/**
 * Command handler to list all available and locally installed Nikala UI components, blocks, and hooks.
 */
export async function listCommand(options: ListOptions = {}) {
  const cwd = process.cwd();
  const config = await readConfig(cwd);

  const registryIndex = await getRegistryIndex();
  if (!registryIndex) {
    console.log(pc.red("❌ Failed to fetch registry index. Ensure network connection."));
    process.exit(1);
  }

  const componentsDir = config ? path.resolve(cwd, config.alias.components) : path.join(cwd, "src/components/ui");
  const blocksDir = path.resolve(path.dirname(componentsDir), "blocks");
  const hooksDir = config && config.alias.hooks ? path.resolve(cwd, config.alias.hooks) : path.join(cwd, "src/hooks");

  // Inspect status for all items
  const items = await Promise.all(
    registryIndex.map(async (item) => {
      const isHook = item.type === "registry:hook";
      const isBlock = item.type === "registry:block";
      const targetDir = isHook ? hooksDir : isBlock ? blocksDir : componentsDir;
      const tsxPath = path.join(targetDir, `${item.name}.tsx`);
      const tsPath = path.join(targetDir, `${item.name}.ts`);
      const isInstalled = (await fs.pathExists(tsxPath)) || (await fs.pathExists(tsPath));

      return {
        ...item,
        isInstalled,
        installedPath: isInstalled ? (await fs.pathExists(tsxPath) ? tsxPath : tsPath) : null,
      };
    })
  );

  // Apply filters
  let filtered = items;
  if (options.installed) {
    filtered = filtered.filter((i) => i.isInstalled);
  }
  if (options.hook) {
    filtered = filtered.filter((i) => i.type === "registry:hook");
  }
  if (options.block) {
    filtered = filtered.filter((i) => i.type === "registry:block");
  }
  if (options.component) {
    filtered = filtered.filter((i) => i.type === "registry:ui");
  }

  // JSON Output mode
  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  const uiComponents = filtered.filter((i) => i.type === "registry:ui");
  const blocks = filtered.filter((i) => i.type === "registry:block");
  const hooks = filtered.filter((i) => i.type === "registry:hook");

  const installedCount = items.filter((i) => i.isInstalled).length;
  const installedCompCount = items.filter((i) => i.isInstalled && i.type === "registry:ui").length;
  const installedBlockCount = items.filter((i) => i.isInstalled && i.type === "registry:block").length;
  const installedHookCount = items.filter((i) => i.isInstalled && i.type === "registry:hook").length;

  console.log(`\n📋 ${pc.bold("Nikala UI Registry Catalog")}\n`);

  // 1. UI Components section
  if (!options.hook && !options.block && uiComponents.length > 0) {
    console.log(pc.bold(pc.cyan(`📦 UI Components (${uiComponents.length}):`)));
    for (const comp of uiComponents) {
      const status = comp.isInstalled
        ? pc.green("✓ Installed")
        : pc.dim("+ Available");
      const name = comp.isInstalled ? pc.bold(pc.white(comp.name)) : pc.white(comp.name);
      const desc = comp.description ? pc.dim(` — ${comp.description}`) : "";
      console.log(`  ${status}  ${name.padEnd(20)} ${desc}`);
    }
    console.log("");
  }

  // 2. Marketing & App Blocks section
  if (!options.hook && !options.component && blocks.length > 0) {
    console.log(pc.bold(pc.yellow(`🧱 Blocks (${blocks.length}):`)));
    for (const block of blocks) {
      const status = block.isInstalled
        ? pc.green("✓ Installed")
        : pc.dim("+ Available");
      const name = block.isInstalled ? pc.bold(pc.white(block.name)) : pc.white(block.name);
      const desc = block.description ? pc.dim(` — ${block.description}`) : "";
      console.log(`  ${status}  ${name.padEnd(20)} ${desc}`);
    }
    console.log("");
  }

  // 3. Hooks section
  if (!options.component && !options.block && hooks.length > 0) {
    console.log(pc.bold(pc.magenta(`⚡ Reactive Primitives / Hooks (${hooks.length}):`)));
    for (const hook of hooks) {
      const status = hook.isInstalled
        ? pc.green("✓ Installed")
        : pc.dim("+ Available");
      const name = hook.isInstalled ? pc.bold(pc.white(hook.name)) : pc.white(hook.name);
      const desc = hook.description ? pc.dim(` — ${hook.description}`) : "";
      console.log(`  ${status}  ${name.padEnd(28)} ${desc}`);
    }
    console.log("");
  }

  // Footer summary
  console.log(
    pc.dim(
      `────────────────────────────────────────────────────────────────────────────`
    )
  );
  console.log(
    `Summary: ${pc.green(`${installedCount} installed`)} (${installedCompCount} UI, ${installedBlockCount} blocks, ${installedHookCount} hooks) · ${pc.cyan(
      `${registryIndex.length} total in registry`
    )}`
  );
  if (!config) {
    console.log(
      pc.yellow(`\n💡 Tip: Run \`nikala init\` in this directory to initialize Nikala UI configuration.`)
    );
  }
}
