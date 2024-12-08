import { test, expect } from "@playwright/test";
import { API_URL, TEST_DATA_API_ENDPOINT } from "../constants";

const apiGraphQL = `${API_URL}/graphql`;

test.describe("UnauthenticatedUser Login", () => {
  test("should redirect unauthenticated user to signin page", async ({ page }) => {
    await page.goto("/personal");

    const currentPath = new URL(page.url()).pathname;
    expect(currentPath).toBe("/signin");

    await page.screenshot({ path: "screenshot-signin.png" });
  });
});

test.describe("User Sign-up and Login", () => {
  test("signup", async ({ page }) => {
    await page.goto("/signup");

    const signUpButton = page.locator('button[type="submit"]');
    await page.click('button[type="submit"]');
    await expect(signUpButton).toBeDisabled();
    await expect(page.locator("text=First Name is required")).toBeVisible();

    await page.fill('input[name="firstName"]', "O");
    await page.fill('input[name="lastName"]', "J");
    await page.fill('input[name="username"]', "test1234");
    await page.fill('input[name="password"]', "t");
    await expect(page.locator("text=Password must contain at least 4 characters")).toBeVisible();

    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="confirmPassword"]', "test123");
    await expect(page.locator("text=Password does not match")).toBeVisible();

    await page.fill('input[name="confirmPassword"]', "test1234");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/signin");
  });
});

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ request, page }) => {
    // await request.post(`${TEST_DATA_API_ENDPOINT}/seed`);

    await page.goto("/signup");
    await page.fill('input[name="firstName"]', "O");
    await page.fill('input[name="lastName"]', "J");
    await page.fill('input[name="username"]', "test1234");
    await page.fill('input[name="password"]', "t");
    await expect(page.locator("text=Password must contain at least 4 characters")).toBeVisible();

    await page.fill('input[name="password"]', "test1234");
    await page.fill('input[name="confirmPassword"]', "test123");
    await expect(page.locator("text=Password does not match")).toBeVisible();

    await page.fill('input[name="confirmPassword"]', "test1234");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/signin");
  });

  test("should redirect unauthenticated user to signin page", async ({ page }) => {
    await page.goto("/personal");

    const currentPath = new URL(page.url()).pathname;
    expect(currentPath).toBe("/signin");

    await page.screenshot({ path: "screenshot-signin.png" });
  });

  test("should redirect to the home page after login", async ({ page }) => {
    await page.goto("/signin");

    await page.fill("input[id='username']", "test1234");
    await page.fill("input[id='password']", "test1234");

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/");
  });
});
