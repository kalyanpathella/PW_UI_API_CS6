import {expect, type Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class ArticlePage extends BasePage {
    constructor(page: Page){
        super(page);
    }

    async expectTitle(title: string){
        await expect(this.page.getByRole("heading",{name:title}).first()).toHaveText(title);
    }

    async expectBodyContains(text: string){
        await expect(this.page.locator(".article-content")).toContainText(text);
    }
}