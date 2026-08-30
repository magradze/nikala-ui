import { test, expect } from "@playwright/test";

test.describe("4. Interactive Playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/playground");
    await page.waitForLoadState("networkidle");
  });

  test("should render component sidebar and load default stage", async ({ page }) => {
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();
    await expect(page.locator("h1")).toContainText("Playground");
  });

  test("should select different component from sidebar", async ({ page }) => {
    const sidebar = page.locator("aside");
    const feedbackTrigger = sidebar.getByRole("button", { name: /Feedback & Status/i });
    if (await feedbackTrigger.isVisible()) {
      await feedbackTrigger.click();
    }
    const alertBtn = sidebar.locator("button:has-text('Alert')").first();

    await alertBtn.scrollIntoViewIfNeeded();
    await alertBtn.click();
    await expect(page.locator("h1")).toContainText("Alert Playground");
  });

  test("should update prop controls and reflect in generated code", async ({ page }) => {
    const sidebar = page.locator("aside");
    const feedbackTrigger = sidebar.getByRole("button", { name: /Feedback & Status/i });
    if (await feedbackTrigger.isVisible()) {
      await feedbackTrigger.click();
    }
    const alertBtn = sidebar.locator("button:has-text('Alert')").first();

    await alertBtn.scrollIntoViewIfNeeded();
    await alertBtn.click();

    const titleInput = page.locator("input").first();
    await titleInput.clear();
    await titleInput.fill("Custom E2E Title");

    const codeViewer = page.locator("pre");
    await expect(codeViewer).toContainText("Custom E2E Title");
  });
});