import { test, expect } from '@playwright/test';

test.describe('Login Module', () => {

  test('User should login successfully with correct Uname and PAss', async ({ page }) => {

    await page.goto('/');

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.getByPlaceholder('Enter password')
      .fill('password123');

    await page.getByRole('button', { name: 'Sign In' })
      .click();

    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
  });

});