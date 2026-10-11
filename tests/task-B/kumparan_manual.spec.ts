import { test } from '@playwright/test';
import { LoginSteps } from '../../steps/login.steps';
import { NotFoundSteps } from '../../steps/notFound.steps';
import { HomeSteps } from '../../steps/home.steps';
import { ArticleSteps } from '../../steps/article.steps';

test.describe('Kumparan Web Automation', () => {

  test('Ensure system rejects invalid email format', async ({ page }) => {
    const loginSteps = new LoginSteps(page);
    await loginSteps.openLoginPage();
    await loginSteps.setCredentials('invalid', 'wrongpassword');
    await loginSteps.verifyErrorMessageEmailDisplayed();
  });

  test('Verify user can toggle dark mode theme', async ({ page, isMobile }) => {
    const homeSteps = new HomeSteps(page);
    await homeSteps.openHomePage();
    await homeSteps.closeAdPopup();
    await homeSteps.changeToDarkMode(isMobile);
    await homeSteps.verifyDarkMode(isMobile);
  });

  test('Verify user can toggle light mode theme', async ({ page, isMobile }) => {
    const homeSteps = new HomeSteps(page);
    await homeSteps.openHomePage();
    await homeSteps.closeAdPopup();
    await homeSteps.changeToDarkMode(isMobile);
    await homeSteps.changeToLightMode(isMobile);
    await homeSteps.verifyLightMode(isMobile);
  });

  test('Ensure system displays an error page for invalid URLs', async ({ page }) => {
    const notFoundSteps = new NotFoundSteps(page);
    await notFoundSteps.openNotFoundPage('testKumparanWeb');
    await notFoundSteps.verifyPageNotFoundDisplayed();
  });

  test('Verify user cannot like an article without logging in', async ({ page, isMobile }) => {
    const homeSteps = new HomeSteps(page);
    const articleSteps = new ArticleSteps(page);
    await homeSteps.openHomePage();
    await homeSteps.closeAdPopup();
    await homeSteps.selectArticle(isMobile);
    await articleSteps.likeArticle();
    await articleSteps.verifyRedirectedToLogin();
  });

  test('Verify user cannot comment an article without logging in', async ({ page, isMobile }) => {
    const homeSteps = new HomeSteps(page);
    const articleSteps = new ArticleSteps(page);
    await homeSteps.openHomePage();
    await homeSteps.closeAdPopup();
    await homeSteps.selectArticle(isMobile);
    await articleSteps.commentArticle();
    await articleSteps.sendComment('Test Comment');
    await articleSteps.verifyRedirectedToLogin();
  });

  test('Verify user cannot create a new post without logging in', async ({ page, isMobile }) => {
    test.skip(isMobile, 'This scenario is only valid for Desktop Web platform');
    const homeSteps = new HomeSteps(page);
    const articleSteps = new ArticleSteps(page);
    await homeSteps.openHomePage();
    await homeSteps.closeAdPopup();
    await homeSteps.createStory();
    await articleSteps.verifyRedirectedToLogin();
  });

});