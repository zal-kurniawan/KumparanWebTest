import { Page, expect } from '@playwright/test';
import { HomePageLocators } from '../object/home.page';
import { HeaderLocators } from '../object/header.page';

export class HomeSteps {
    readonly page: Page;
    readonly locators: HomePageLocators;
    readonly headerLocators: HeaderLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new HomePageLocators(page);
        this.headerLocators = new HeaderLocators(page);
    }

    async openHomePage() {
        await this.page.goto('');
    }

    async closeAdPopup() {
        try {
            await this.locators.closeAdButton().click({ timeout: 3000 });
        } catch (error) {
            console.log('No pop-up found, continuing');
        }
    }

    async closeMobileAd() {
        try {
            await this.locators.closeHeaderAdButton().click({ timeout: 3000 });
            await this.locators.closeStickyAdButton().click({ timeout: 3000 });
        } catch (error) {
            console.log('No mobile ad found, continuing');
        }
    }

    async closeNotifyUpdate() {
        try {
            await this.locators.closeNotifyUpdateButton().click({ timeout: 3000 });
        } catch (error) {
            console.log('No notify update found, continuing');
        }
    }

    async selectArticle(isMobile: boolean) {
        if (isMobile) {
            this.closeMobileAd();
            await this.locators.firstCarouselArticle().scrollIntoViewIfNeeded();
            this.closeNotifyUpdate();
            await this.locators.firstCarouselArticle().click();

        } else {
            await expect(this.locators.firstTrendingArticle()).toBeVisible();
            await this.locators.firstTrendingArticle().click();
        }
    }

    async createStory() {
        await expect(this.headerLocators.createStoryButton()).toBeVisible();
        await this.headerLocators.createStoryButton().click();
    }

    async changeToDarkMode(isMobile: boolean) {
        if (isMobile) {
            await expect(this.headerLocators.burgerMenu()).toBeVisible();
            await this.headerLocators.burgerMenu().click();
        }
        await expect(this.headerLocators.darkModeButton()).toBeVisible();
        await this.headerLocators.darkModeButton().click();
    }

    async changeToLightMode(isMobile: boolean) {
        if (isMobile) {
            await expect(this.headerLocators.darkModeButton()).toBeVisible();
            await this.headerLocators.darkModeButton().click();
        } else {
            await expect(this.headerLocators.lightModeButton()).toBeVisible();
            await this.headerLocators.lightModeButton().click();
        }
    }

    async verifyDarkMode(isMobile: boolean) {
        if (!isMobile) {
            await expect(this.headerLocators.lightModeButton()).toBeVisible();
        }
        await expect(this.locators.homeBody()).toHaveCSS('background-color', 'rgb(24, 24, 24)');
    }

    async verifyLightMode(isMobile: boolean) {
        if (!isMobile) {
            await expect(this.headerLocators.darkModeButton()).toBeVisible();
        }
        await expect(this.locators.homeBody()).toHaveCSS('background-color', 'rgb(238, 238, 238)');
    }

}