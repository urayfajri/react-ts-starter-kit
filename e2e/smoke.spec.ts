import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("landing shows hero headline", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /build something/i }),
    ).toBeVisible();
  });

  test("login route shows sign-in entry point", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("button", { name: /^sign in$/i })).toBeVisible();
  });
});
