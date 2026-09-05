import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawn } from "node:child_process";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(packageRoot, "../..");
const fixtureRoot = process.env.NIKALA_DOCS_FIXTURE;
const port = process.env.NIKALA_DOCS_TEST_PORT || "4183";

if (!fixtureRoot) {
  throw new Error("NIKALA_DOCS_FIXTURE must point to a built documentation project");
}

const playwright = await import(
  pathToFileURL(path.join(repoRoot, "node_modules/.bun/playwright@1.62.1/node_modules/playwright/index.mjs")).href
);
const browser = await playwright.chromium.launch({ headless: true });
const server = spawn(
  "bun",
  [path.join(packageRoot, "dist/cli/index.js"), "preview", "--port", port],
  { cwd: fixtureRoot, stdio: ["ignore", "pipe", "pipe"] }
);

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += String(chunk); });
server.stderr.on("data", (chunk) => { serverOutput += String(chunk); });

try {
  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Preview did not start:\n${serverOutput}`)), 15_000);
    const onData = () => {
      if (serverOutput.includes(`http://localhost:${port}/`)) {
        clearTimeout(timeout);
        resolve();
      }
    };
    server.stdout.on("data", onData);
    server.stderr.on("data", onData);
    server.once("exit", (code) => reject(new Error(`Preview exited with ${code}:\n${serverOutput}`)));
  });

  const page = await browser.newPage();
  const pageErrors: string[] = [];
  page.on("pageerror", (error: { message: string; stack?: string }) => pageErrors.push(error.stack || error.message));
  page.on("console", (message: { type: () => string; text: () => string }) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });

  const baseUrl = `http://localhost:${port}`;
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await assertText(page, "Introduction");
  await assertText(page, "What is Nikala UI?");

  await page.getByRole("link", { name: "CLI Reference" }).first().click();
  await page.waitForURL(/\/cli\/?$/);
  await assertText(page, "CLI Reference");
  await page.reload({ waitUntil: "networkidle" });
  await assertText(page, "CLI Reference");

  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobilePage.on("pageerror", (error: { message: string; stack?: string }) => pageErrors.push(error.stack || error.message));
  mobilePage.on("console", (message: { type: () => string; text: () => string }) => {
    if (message.type() === "error") pageErrors.push(message.text());
  });
  await mobilePage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  const viewportFits = await mobilePage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  assert.equal(viewportFits, true, "Mobile page must not overflow horizontally");
  await mobilePage.getByRole("button", { name: "Toggle documentation sidebar" }).click();
  await mobilePage.getByRole("button", { name: "Close documentation sidebar" }).waitFor({ state: "visible" });
  await mobilePage.getByRole("link", { name: "CLI Reference" }).first().click();
  await mobilePage.waitForURL(/\/cli\/?$/);
  await mobilePage.getByRole("button", { name: "Close documentation sidebar" }).waitFor({ state: "detached" });
  await mobilePage.close();

  assert.equal(pageErrors.length, 0, `Browser errors:\n${pageErrors.join("\n")}`);
  console.log("SSR preview smoke test passed: SSR content, client mount, navigation, and refresh.");
} finally {
  await browser.close();
  server.kill("SIGTERM");
}

async function assertText(page: any, text: string) {
  await page.getByText(text, { exact: false }).first().waitFor({ state: "visible" });
}
