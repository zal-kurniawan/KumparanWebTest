import { Page } from '@playwright/test';

export class ArticlePageLocators {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    likeButton = () => this.page.getByTestId('btn-like');
    commentButton = () => this.page.getByTestId('btn-comment');
    commentInput = () => this.page.getByTestId('comment-editor-border').locator('//textarea[@id = "comment-editor"]');
    sendCommentButton = () => this.page.getByTestId('btn-send-comment')
}