const { expect } = require("@playwright/test");

async function registerUser(page, username, email, password) {
  await page.goto("http://localhost:3000");

  await page.click(".linkButton");
  await expect(page).toHaveURL("http://localhost:3000/register");

  await page.fill('input[placeholder="username"]', username);
  await page.fill('input[placeholder="mail"]', email);
  await page.fill('input[placeholder="password"]', password);

  await page.click(".inputButton");

  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(page.locator(".titleContainer")).toHaveText(
    "Hello, welcome to ShelfTalk!"
  );
}

async function loginUser(page, username, password) {
  await page.goto("http://localhost:3000");

  await page.fill(
    'input[placeholder="example_username / example@mail.com"]',
    username
  );
  await page.fill('input[placeholder="examplepassword123"]', password);

  await page.click(".loginButton");

  await expect(page).toHaveURL("http://localhost:3000/home");
  await expect(page.locator(".navbar-custom")).toBeVisible();
}

module.exports = { registerUser, loginUser };
