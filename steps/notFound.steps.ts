import { Page, expect } from '@playwright/test';
import { NotFoundPageLocators } from '../object/notFound.page';

export class NotFoundSteps {
    readonly page: Page;
    readonly locators: NotFoundPageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new NotFoundPageLocators(page);
    }

    async openNotFoundPage(url: string) {
        await this.page.goto(url);
    }

    async verifyPageNotFoundDisplayed() {
        await expect(this.locators.imageNotFound()).toBeVisible();
        await expect(this.locators.titleNotFound()).toBeVisible();
        await expect(this.locators.descNotFound()).toBeVisible();
        await expect(this.locators.backToHomeButton()).toBeVisible();
    }
}