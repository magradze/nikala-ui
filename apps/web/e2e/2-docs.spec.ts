import { test, expect } from "@playwright/test";

test.describe("2. Documentation & Component Viewer", () => {
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
    // All three tests below started with the same goto — hoisted here and
    // paired with a hydration wait (see file 1 for why this matters).
    await page.goto("/docs/components/button");
    await page.waitForLoadState("networkidle");
  });

  test("should navigate through sidebar menu items", async ({ page }) => {
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    const dataDisplayTrigger = sidebar.getByRole("button", { name: "Data Display" });
    if (await dataDisplayTrigger.isVisible()) {
      await dataDisplayTrigger.click();
    }

    const cardLink = sidebar.getByRole("link", { name: "Card", exact: true });
    await cardLink.click();
    await expect(page).toHaveURL(/\/docs\/components\/card/);
  });

  test("should switch between Preview and Code tabs in ComponentPreview", async ({ page }) => {
    const codeTab = page.getByRole("tab", { name: "Code" }).first();
    await codeTab.click();
    await expect(page.locator("pre").first()).toBeVisible();
  });

  test("should copy component add command in ComponentPreview", async ({ page }) => {
    const cliCopyBtn = page.locator("button:has-text('add button')").first();
    await cliCopyBtn.click();

    await expect(page.locator("button", { hasText: /copied/i }).first()).toBeVisible();

    const copiedTexts = await page.evaluate(() => (window as any).__copiedTexts ?? []);
    expect(copiedTexts.length).toBeGreaterThan(0);
  });
});
