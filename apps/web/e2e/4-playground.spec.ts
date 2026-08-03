import { test, expect } from "@playwright/test";

test.describe("4. Interactive Playground", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/playground");
  });

  test("should render component sidebar and load default stage", async ({ page }) => {
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeVisible();

    const heading = page.locator("h1");
    await expect(heading).toContainText("Playground");
  });

  test("should select different component from sidebar", async ({ page }) => {
    const sidebar = page.locator("aside");
    const alertBtn = sidebar.getByRole("button", { name: "Alert" });

    await alertBtn.click();
    await expect(page.locator("h1")).toContainText("Alert Playground");
  });

  test("should update prop controls and reflect in generated code", async ({ page }) => {
    // Select Alert component
    const sidebar = page.locator("aside");
    await sidebar.getByRole("button", { name: "Alert" }).click();

    // Find Title text control input
    const titleInput = page.locator("input").first();
    await titleInput.clear();
    await titleInput.fill("Custom E2E Title");

    // Verify Generated Code updates dynamically
    const codeViewer = page.locator("pre");
    await expect(codeViewer).toContainText("Custom E2E Title");
  });
});