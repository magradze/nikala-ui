import { test, expect } from "@playwright/test";

test.describe("1. Landing Page & Main Navigation", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.addInitScript(() => {
      const dummyClipboard = {
        writeText: async (text: string) => {
          (window as any).__copiedTexts = (window as any).__copiedTexts || [];
          (window as any).__copiedTexts.push(text);
        },
        readText: async () => "",
        addEventListener: () => { },
        removeEventListener: () => { },
        dispatchEvent: () => true,
      };

      try {
        Object.defineProperty(navigator, "clipboard", {
          value: dummyClipboard,
          configurable: true,
          writable: true,
        });
      } catch (e) {
        (navigator as any).clipboard = dummyClipboard;
      }
    });
    await page.goto("/");
    // Wait for hydration to finish. Without this, Playwright can click a
    // server-rendered button before its onClick handler is attached client-side,
    // and the click silently does nothing (no error — the DOM node is there,
    // just not "alive" yet).
    await page.waitForLoadState("networkidle");
  });

  test("should render hero heading and version badge", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toContainText("Copy-Paste UI Components for");
    await expect(heading).toContainText("SolidJS");

    const badge = page.locator("section a[href='/docs']").first();
    await expect(badge).toContainText("Nikala UI v0.5.0 is now live");
  });

  test("should copy CLI init command to clipboard", async ({ page }) => {
    const copyBtn = page.locator("section button:has-text('Copy')").first();
    await copyBtn.click();

    // UI feedback: label should flip to some "copied" state.
    // Using a case-insensitive regex instead of an exact string in case the
    // real wording differs slightly ("Copied", "Copied!", "Copied to clipboard"...).
    await expect(page.locator("section button", { hasText: /copied/i }).first()).toBeVisible();

    // Functional check, independent of the exact label text above.
    const copiedTexts = await page.evaluate(() => (window as any).__copiedTexts ?? []);
    expect(copiedTexts.length).toBeGreaterThan(0);
  });

  test("should navigate via CTA buttons", async ({ page }) => {
    const exploreBtn = page.getByRole("link", { name: "Explore Components" });
    await exploreBtn.click();
    await expect(page).toHaveURL(/\/docs\/components\/button/);
  });
});
