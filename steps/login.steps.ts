import { Page, expect } from '@playwright/test';
import { LoginPageLocators } from '../object/login.page';

export class LoginSteps {
    readonly page: Page;
    readonly locators: LoginPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new LoginPageLocators(page);
    }

    async openLoginPage() {
        await this.page.goto('/login');
    }

    async setCredentials(email: string, password: string) {
        await this.locators.emailInput().fill(email);
        await this.locators.passwordInput().fill(password);
    }

    async verifyErrorMessageEmailDisplayed() {
        await expect(this.locators.emailErrorMessage()).toBeVisible();
    }
}