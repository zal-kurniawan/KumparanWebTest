import { Page } from '@playwright/test';

export class HomePageLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    closeAdButton = () => this.page.getByTestId('otp-ads-close-modal-btn');
    closeHeaderAdButton = () => this.page.locator('//div[@onclick = "closeMegbill()"]');
    closeStickyAdButton = () => this.page.locator('//aside[@aria-label = "sticky bottom ads"]//button');
    firstTrendingArticle = () => this.page.getByTestId('trending-section').locator('//ul/li[1]');
    firstCarouselArticle = () => this.page.getByTestId('carousel-pane').first().getByTestId('title');
    closeNotifyUpdateButton = () => this.page.locator('//button[@id = "onesignal-slidedown-cancel-button"]');
    homeBody = () => this.page.locator('body');
}