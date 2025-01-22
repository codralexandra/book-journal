const { test, expect } = require("@playwright/test");
const { registerUser, loginUser } = require("../helpers/authHelpers");

test("register-login-chat-navigate", async ({ page }) => {
  const username = "testuser";
  const email = "testuser@mail.com";
  const password = "testpass123";

  await registerUser(page, username, email, password);

  await loginUser(page, username, password);

  await page.click("text=Community");

  const globalChatroomLink = page.locator('a[href="/chat"]');
  await expect(globalChatroomLink).toBeVisible({ timeout: 5000 });

  await globalChatroomLink.click();

  await expect(page).toHaveURL("http://localhost:3000/chat");

  await expect(page.locator(".chat-container")).toBeVisible();
});
