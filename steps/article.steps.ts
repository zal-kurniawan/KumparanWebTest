import { Page, expect } from '@playwright/test';
import { ArticlePageLocators } from '../object/article.page';

export class ArticleSteps {
    readonly page: Page;
    readonly locators: ArticlePageLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = new ArticlePageLocators(page);
    }

    async likeArticle() {
        await expect(this.locators.likeButton()).toBeVisible();
        await this.locators.likeButton().click();
    }

    async commentArticle() {
        await expect(this.locators.commentButton()).toBeVisible();
        await this.locators.commentButton().click();
    }

    async sendComment(comment: string) {
        await expect(this.locators.commentInput()).toBeVisible();
        await expect(this.locators.sendCommentButton()).toBeVisible();
        await this.locators.commentInput().fill(comment);
        await this.locators.sendCommentButton().click();
    }

    async verifyRedirectedToLogin() {
        await expect(this.page).toHaveURL('/login');
    }

}