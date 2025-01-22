const { test, expect } = require("@playwright/test");

test("login-username", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.fill('input[placeholder="example_username / example@mail.com"]', "admin");
  await page.fill('input[placeholder="examplepassword123"]', "admin123");

  await page.click(".loginButton");

  await expect(page).toHaveURL("http://localhost:3000/home");

  await expect(page.locator('.navbar-custom')).toBeVisible();
});

test("login-email", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.fill('input[placeholder="example_username / example@mail.com"]', "admin@mail.com");
  await page.fill('input[placeholder="examplepassword123"]', "admin123");

  await page.click(".loginButton");

  await expect(page).toHaveURL("http://localhost:3000/home");

  //add check for rendered component
});

test("register", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click(".linkButton");

  await expect(page).toHaveURL("http://localhost:3000/register");


  await page.fill('input[placeholder="username"]', "register_test");
  await page.fill('input[placeholder="mail"]', "test@mail.com");
  await page.fill('input[placeholder="password"]', "test1234");

  await page.click(".inputButton");

  await expect(page).toHaveURL("http://localhost:3000/");

  await expect(page.locator(".titleContainer")).toHaveText(
    "Hello, welcome to ShelfTalk!"
  );
});
