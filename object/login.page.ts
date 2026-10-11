import { Page } from '@playwright/test';

export class LoginPageLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    emailInput = () => this.page.getByTestId('input-email');
    passwordInput = () => this.page.getByTestId('input-password');
    emailErrorMessage = () => this.page.getByTestId('input-email-errorMessage');
}