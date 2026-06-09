import { test, expect } from '@playwright/test';

async function login(page) {
  await page.goto('/');

  await page.getByPlaceholder('Enter mobile number')
    .fill('9876543210');

  await page.getByPlaceholder('Enter password')
    .fill('password123');

  await page.getByRole('button', { name: 'Sign In' })
    .click();

  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible();
}

test.describe('Recharge Module', () => {

  test.beforeEach(async ({ page }) => {
    await login(page);

    await page.locator('//a[text()="Recharge"]').click();

    await expect(page)
      .toHaveURL('http://localhost:8000/recharge');
  });

  test('Verify user is navigated to Recharge page', async ({ page }) => {

    await expect(page.locator("//h1[text()='Mobile Recharge']")).toBeVisible();

  });

  test('Verify all recharge fields are displayed', async ({ page }) => {

    await expect(
      page.getByPlaceholder('Enter mobile number')
    ).toBeVisible();

    await expect(
      page.locator('select')
    ).toBeVisible();

    await expect(
      page.getByPlaceholder('Enter amount')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Recharge Now' })
    ).toBeVisible();

  });

  test('Verify successful recharge with valid data', async ({ page }) => {

    const amount = '10';

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill(amount);

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

    await expect(
      page.getByText(`Recharge of ₹${amount} successful!`)
    ).toBeVisible();

  });

  test('Mobile number should accept digits only', async ({ page }) => {

    const mobileField =
      page.getByPlaceholder('Enter mobile number');

    await mobileField.fill('abcde12345');

    await expect(mobileField)
      .toHaveValue('12345');

  });

  test('Mobile number should not accept special characters', async ({ page }) => {

    const mobileField =
      page.getByPlaceholder('Enter mobile number');

    await mobileField.fill('@#$%987654');

    await expect(mobileField)
      .toHaveValue('987654');

  });

  test('Mobile number should not accept more than 10 digits', async ({ page }) => {

    const mobileField =
      page.getByPlaceholder('Enter mobile number');

    await mobileField.fill('98765432101234');

    await expect(mobileField)
      .toHaveValue('9876543210');

  });

  test('Mobile number less than 10 digits should show validation', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('98765');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill('10');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

    await expect(
      page.getByText('Mobile number must be 10 digits')
    ).toBeVisible();

  });

  test('Mobile number field should be mandatory', async ({ page }) => {

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill('10');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

  });

  test('Operator field should be mandatory', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.getByPlaceholder('Enter amount')
      .fill('10');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

  });

  test('Amount field should be mandatory', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

  });

  test('Should not allow negative recharge amount', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('5353545454');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill('-100');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

    await expect(
      page.getByText('The amount field must be at least 0.')
    ).toBeVisible();

  });

  test('Should not allow recharge with zero amount', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill('0');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

    await expect(
      page.getByText('Amount must be greater than 0')
    ).toBeVisible();

  });

  test('Recharge amount should not exceed available wallet balance', async ({ page }) => {

    await page.getByPlaceholder('Enter mobile number')
      .fill('9876543210');

    await page.locator('select')
      .selectOption('Jio');

    await page.getByPlaceholder('Enter amount')
      .fill('6000');

    await page.getByRole('button', { name: 'Recharge Now' })
      .click();

    await expect(
      page.getByText('Insufficient wallet balance')
    ).toBeVisible();

  });

});