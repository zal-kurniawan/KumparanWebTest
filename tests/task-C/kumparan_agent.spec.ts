import { test, expect } from '@playwright/test';

test('Ensure system rejects invalid email format', async ({ page }) => {
  await page.goto('https://kumparan.com/login');

  const emailInput = page.getByTestId('email').or(page.locator('input[type="email"], input[name="email"]'));
  await emailInput.fill('invalid-email');

  const submitButton = page.getByRole('button', { name: /masuk|login|sign in|submit/i }).or(page.getByTestId('submit-login'));
  await submitButton.click();

  const errorMessage = page.getByText(/invalid.*email|email.*invalid|format.*email|valid email|email tidak valid/i).first();
  await expect(errorMessage).toBeVisible();
});

test('Verify user can toggle dark mode theme', async ({ page }) => {
  await page.goto('https://kumparan.com');

  const isMobile = (await page.evaluate(() => window.innerWidth)) < 768;
  if (isMobile) {
    const burgerMenu = page.getByTestId('burger-menu').or(page.locator('button[aria-label*="menu" i], button:has-text("Menu")'));
    await burgerMenu.first().click();
  }

  const themeToggle = page.getByTestId('moon').or(page.getByText(/Mode Gelap/i));
  const bodyBefore = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);

  await themeToggle.first().click();

  await expect.poll(async () => {
    return await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor);
  }).not.toBe(bodyBefore);
});

test('Ensure system displays an error page for invalid URLs', async ({ page }) => {
  await page.goto('https://kumparan.com/invalid-url-for-test');

  const notFoundMessage = page.getByText(/not found|halaman tidak ditemukan|tidak ditemukan|404/i).first();
  await expect(notFoundMessage).toBeVisible();
});

test('Verify user cannot like an article without logging in', async ({ page }) => {
  await page.goto('https://kumparan.com');

  const articleLink = page.locator('a[href*="/story/"], a[href*="/news/"], [data-qa-id="article-card"]').first();
  await expect(articleLink).toBeVisible();
  await articleLink.click();

  await page.waitForLoadState('domcontentloaded');

  const likeButton = page.getByTestId('like-button').or(page.getByRole('button', { name: /like|suka/i }));
  await likeButton.first().click();

  await expect.poll(async () => {
    const modalVisible = await page.getByTestId('login-modal').isVisible().catch(() => false);
    const url = page.url();
    return modalVisible || /\/login/i.test(url);
  }).toBeTruthy();
});

test('Verify user cannot comment an article without logging in', async ({ page }) => {
  await page.goto('https://kumparan.com');

  const articleLink = page.locator('a[href*="/story/"], a[href*="/news/"], [data-qa-id="article-card"]').first();
  await expect(articleLink).toBeVisible();
  await articleLink.click();

  await page.waitForLoadState('domcontentloaded');

  const commentInput = page.getByTestId('comment-input').or(
    page.locator('textarea[placeholder*="comment" i], textarea[placeholder*="komentar" i], textarea[name*="comment" i]'),
  );
  const submitCommentButton = page.getByTestId('submit-comment').or(page.getByRole('button', { name: /comment|komentar|kirim|post/i }));

  await commentInput.first().fill('This is a test comment');
  await submitCommentButton.first().click();

  await expect.poll(async () => {
    const modalVisible = await page.getByTestId('login-modal').isVisible().catch(() => false);
    const url = page.url();
    return modalVisible || /\/login/i.test(url);
  }).toBeTruthy();
});

test('Verify user cannot create a new post without logging in', async ({ page }) => {
  const isMobile = (await page.evaluate(() => window.innerWidth)) < 768;
  test.skip(isMobile, 'Desktop only');

  await page.goto('https://kumparan.com');

  const createStoryButton = page.getByTestId('create-story').or(page.getByRole('button', { name: /create story|buat cerita|new story/i }));
  await createStoryButton.first().click({ force: true });

  await expect.poll(async () => {
    const modalVisible = await page.getByTestId('login-modal').isVisible().catch(() => false);
    const url = page.url();
    return modalVisible || /\/login/i.test(url);
  }).toBeTruthy();
});
