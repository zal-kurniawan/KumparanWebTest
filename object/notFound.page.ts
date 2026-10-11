import { Page } from '@playwright/test';

export class NotFoundPageLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    imageNotFound = () => this.page.getByTestId('not-found-page').getByTestId('image');
    titleNotFound = () => this.page.getByTestId('not-found-page').locator('//span[text() = "Maaf, halaman tidak ditemukan"]');
    descNotFound = () => this.page.getByTestId('not-found-page').locator('//span[text() = "Tapi tenang, masih banyak konten menarik lainnya"]');
    backToHomeButton = () => this.page.getByTestId('not-found-page').getByTestId('back-to-home');
}