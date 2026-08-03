import { test, expect } from "@playwright/test";

test.describe("1. Landing Page & Main Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render hero heading and version badge", async ({ page }) => {
    // 1. Hero Title check
    const heading = page.locator("h1");
    await expect(heading).toContainText("Copy-Paste UI Components for");
    await expect(heading).toContainText("SolidJS");
    await expect(heading).toContainText("Tailwind v4");

    // 2. Version Badge link
    const badge = page.locator("a[href='/docs']").first();
    await expect(badge).toContainText("Nikala UI v0.5.0 is now live");
  });

  test("should copy CLI init command to clipboard", async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);

    const copyBtn = page.getByRole("button", { name: "Copy" });
    await expect(copyBtn).toBeVisible();

    await copyBtn.click();
    await expect(page.getByRole("button", { name: "Copied!" })).toBeVisible();

    // Verify clipboard content
    const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
    const clipboardText = await handle.jsonValue();
    expect(clipboardText).toBe("npx @nikala-ui/cli init");
  });

  test("should navigate via CTA buttons and Bento cards", async ({ page }) => {
    // Explore Components button
    const exploreBtn = page.getByRole("link", { name: "Explore Components" });
    await exploreBtn.click();
    await expect(page).toHaveURL(/\/docs\/components\/button/);
  });

  test("should navigate via Header links", async ({ page }) => {
    const docsLink = page.getByRole("link", { name: "Documentation" }).first();
    await docsLink.click();
    await expect(page).toHaveURL(/\/docs/);

    await page.goto("/");
    const playgroundLink = page.getByRole("link", { name: "Playground" }).first();
    await playgroundLink.click();
    await expect(page).toHaveURL(/\/playground/);
  });
});