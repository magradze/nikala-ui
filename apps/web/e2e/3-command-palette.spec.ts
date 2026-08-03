import { test, expect } from "@playwright/test";

test.describe("3. Command Palette (Search Dialog)", () => {
  test.beforeEach(async ({ page }) => {
    // Surface any client-side JS errors directly in the test output — useful
    // while the navigate-on-select bug below is still unconfirmed.
    page.on("pageerror", (err) => console.log("[pageerror]", err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") console.log("[console.error]", msg.text());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should open command palette via trigger button click", async ({ page }) => {
    const searchBtn = page.locator("header button:has-text('Search...')");
    await searchBtn.click();

    const dialog = page.locator("[role='dialog']");
    await expect(dialog).toBeVisible();

    const input = dialog.locator("input");
    await expect(input).toBeVisible();
  });

  test("should open command palette via hotkey", async ({ page }) => {
    await page.keyboard.press("ControlOrMeta+k");

    const dialog = page.locator("[role='dialog']");
    await expect(dialog).toBeVisible();
  });

  test("should filter results and navigate on item click", async ({ page }) => {
    const searchBtn = page.locator("header button:has-text('Search...')");
    await searchBtn.click();

    const dialog = page.locator("[role='dialog']");
    await expect(dialog).toBeVisible();

    const input = dialog.locator("input");
    await input.fill("Accordion");

    const accordionItem = dialog.locator("a:has-text('Accordion')").first();
    await expect(accordionItem).toBeVisible();
    await accordionItem.click();

    // Split into two checks so a failure tells us *where* the flow breaks:
    // (1) did the palette even treat the click as a selection (dialog closes)?
    await expect(dialog).not.toBeVisible();
    // (2) ...or did selection register but the actual navigation not fire?
    await expect(page).toHaveURL(/\/docs\/components\/accordion/);
  });

  test("should show empty state for non-matching queries", async ({ page }) => {
    const searchBtn = page.locator("header button:has-text('Search...')");
    await searchBtn.click();

    const dialog = page.locator("[role='dialog']");
    await expect(dialog).toBeVisible();

    const input = dialog.locator("input");
    await input.fill("nonexistentcomponent123");

    const emptyMessage = dialog.locator("text=No results found for");
    await expect(emptyMessage).toBeVisible();
  });
});
