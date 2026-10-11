import { Page } from '@playwright/test';

export class HeaderLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    createStoryButton = () => this.page.getByTestId('create-story');
    burgerMenu = () => this.page.getByTestId('burger-menu');
    darkModeButton = () => this.page.getByTestId('moon')
    lightModeButton = () => this.page.getByTestId('sun');
}