import { test, expect } from "@playwright/test";

test.describe("3. Command Palette (Search Dialog)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should open command palette via trigger button click", async ({ page }) => {
    const searchBtn = page.getByRole("button", { name: "Search..." });
    await searchBtn.click();

    const dialog = page.getByPlaceholder("Search documentation, CLI, components...");
    await expect(dialog).toBeVisible();
  });

  test("should open command palette via Ctrl+K hotkey", async ({ page }) => {
    await page.keyboard.press("Control+k");

    const input = page.getByPlaceholder("Search documentation, CLI, components...");
    await expect(input).toBeVisible();
  });

  test("should filter results and navigate on item click", async ({ page }) => {
    await page.keyboard.press("Control+k");

    const input = page.getByPlaceholder("Search documentation, CLI, components...");
    await input.fill("Accordion");

    // Verify filtered result
    const accordionItem = page.locator("div[role='button']:has-text('Accordion')").first();
    await expect(accordionItem).toBeVisible();

    await accordionItem.click();
    await expect(page).toHaveURL(/\/docs\/components\/accordion/);
  });

  test("should show empty state for non-matching queries", async ({ page }) => {
    await page.keyboard.press("Control+k");

    const input = page.getByPlaceholder("Search documentation, CLI, components...");
    await input.fill("nonexistentcomponent123");

    const emptyMessage = page.locator("text=No results found for");
    await expect(emptyMessage).toBeVisible();
  });
});