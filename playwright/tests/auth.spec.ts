import axios from "axios";

import { test, expect } from "@playwright/test";
import { API_URL, TEST_DATA_API_ENDPOINT } from "../constants";

const apiGraphQL = `${API_URL}/graphql`;

test.describe("User Sign-up and Login", () => {
  test.beforeEach(async ({ page }) => {
    await axios.post(`${TEST_DATA_API_ENDPOINT}/seed`);

    // await page.route(apiGraphQL, (route, req) => {
    //   if (route.request().method() === "POST") {
    //     const { postData } = route.request();
    //     const data = postData();

    //     if (data !== null) {
    //       const body = JSON.parse(data);
    //       if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
    //         req.alias = "gqlCreateBankAccountMutation";
    //       }
    //     }
    //   }

    //   route.continue();
    // });
  });

  test("should redirect unauthenticated user to signin page", async ({ page }) => {
    await page.goto("/personal");

    const currentPath = new URL(page.url()).pathname;
    expect(currentPath).toBe("/signin");

    await page.screenshot({ path: "screenshot-signin.png" });
  });
});
