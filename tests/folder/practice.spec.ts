import { test, expect, Locator } from "@playwright/test";

test("practice on checkboxes and radio button", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const name: Locator = page.locator("Name:");

    await expect(name).toBeVisible();
    await expect(name).toBeEnabled();

});