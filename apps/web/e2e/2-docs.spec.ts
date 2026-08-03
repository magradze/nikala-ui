import { test, expect } from "@playwright/test";

test.describe("2. Documentation & Component Viewer", () => {
  test("should navigate through sidebar menu items", async ({ page }) => {
    await page.goto("/docs/components/button");

    // Check sidebar active status
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    const buttonLink = sidebar.getByRole("link", { name: "Button" });
    await expect(buttonLink).toHaveClass(/bg-primary/);

    // Click on Card link in sidebar
    const cardLink = sidebar.getByRole("link", { name: "Card" });
    await cardLink.click();
    await expect(page).toHaveURL(/\/docs\/components\/card/);
  });

  test("should switch between Preview and Code tabs in ComponentPreview", async ({ page }) => {
    await page.goto("/docs/components/button");

    // Default tab is Preview
    const previewTab = page.getByRole("tab", { name: "Preview" }).first();
    const codeTab = page.getByRole("tab", { name: "Code" }).first();

    await expect(previewTab).toBeVisible();
    await expect(codeTab).toBeVisible();

    // Switch to Code tab
    await codeTab.click();
    const codeBlock = page.locator("pre").first();
    await expect(codeBlock).toBeVisible();
  });

  test("should copy component add command in ComponentPreview", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/docs/components/button");

    const cliCopyBtn = page.locator("button:has-text('add button')").first();
    await cliCopyBtn.click();

    await expect(page.locator("button:has-text('Copied command!')").first()).toBeVisible();
  });

  test("should navigate using DocNextSteps pagination", async ({ page }) => {
    await page.goto("/docs/components/button");

    const nextLink = page.locator("a:has-text('Next →')");
    await expect(nextLink).toBeVisible();
    await nextLink.click();
    await expect(page.url()).not.toContain("/button");
  });
});