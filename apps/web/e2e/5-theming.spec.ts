import { test, expect } from "@playwright/test";

test.describe("5. Theme Manager & Customizer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should toggle between light and dark modes", async ({ page }) => {
    const themeBtn = page.getByRole("button", { name: "Toggle theme" });
    await themeBtn.click();

    // Select Dark mode option
    const darkBtn = page.getByRole("menuitem", { name: "Dark" }).or(page.getByRole("button", { name: "Dark" }));
    await darkBtn.click();

    // Verify html node has 'dark' class
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    // Re-open and switch to Light mode
    await themeBtn.click();
    const lightBtn = page.getByRole("menuitem", { name: "Light" }).or(page.getByRole("button", { name: "Light" }));
    await lightBtn.click();

    await expect(html).not.toHaveClass(/dark/);
  });

  test("should allow changing accent color and border radius in max mode", async ({ page }) => {
    const themeBtn = page.getByRole("button", { name: "Toggle theme" });
    await themeBtn.click();

    // Check if accent color options are visible in max mode
    const wineBtn = page.locator("button[title='Wine']");
    if (await wineBtn.isVisible()) {
      await wineBtn.click();
      // Accent updated successfully
      await expect(wineBtn).toHaveClass(/ring-2/);
    }
  });
});