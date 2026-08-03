import { test, expect } from "@playwright/test";

test.describe("5. Theme Manager & Customizer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("should toggle between light and dark modes", async ({ page }) => {
    const themeBtn = page.locator("header button:has(svg.lucide-sun), header button:has(svg.lucide-moon)").first();
    await themeBtn.click();

    const menu = page.locator("[role='menu']");
    await expect(menu).toBeVisible();

    const darkBtn = menu.locator("button:has-text('Dark')").first();
    await darkBtn.click();

    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);
  });
});