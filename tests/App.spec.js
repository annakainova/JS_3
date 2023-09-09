// @ts-check
const { test, expect } = require("@playwright/test");
import { emailValue, passwordValue } from "./user";

test.beforeEach(async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
});

test.describe("Login", () => {
  test("Unsuccesfull login", async ({ page }) => {
    //find and fill email field
    const email = page.getByPlaceholder("Email");
    await email.fill("email@email.ru");

    //find and fill password field
    const password = page.getByPlaceholder("Пароль");
    await password.fill("password");

    //click enter
    await page.getByTestId("login-submit-btn").click();

    //check message
    await page.screenshot({
      path: "screenshots/test_UnsLogin/screenshot.png",
    });

    await expect(page.getByTestId("login-error-hint")).toBeVisible();
    await expect(page.getByTestId("login-error-hint")).toContainText(
      "Вы ввели неправильно логин или пароль"
    );
  });

  test("Succesfull login", async ({ page }) => {
    //find and fill email field
    const email = page.getByPlaceholder("Email");
    await email.fill(emailValue);

    //find and fill password field
    const password = page.getByPlaceholder("Пароль");
    await password.fill(passwordValue);

    //click enter
    await page.getByTestId("login-submit-btn").click();

    //check result
    await expect(page.locator("h2")).toContainText("Моё обучение");
    await page.screenshot({
      path: "screenshots/test_SucLogin/screenshot.png",
    });
  });
});
