import {expect, type Page, type Locator} from "@playwright/test";
import {BasePage} from "./base.page";
import {HeaderComponent} from "../components/header.component";

export class HomePage extends BasePage {
    readonly header: HeaderComponent;

    constructor(page: Page){
        super(page);
        this.header = new HeaderComponent(page);
    }

    async open(){
        await this.goto("/");
    }

    async openGlobalfeed(){
        await this.healClick("Global Feed tab", [
            ()=> this.page.getByRole("link", {name:"Global Feed"}),
            ()=> this.page.locator("a.nav-link",{hasText:"Global Feed"}),
            ()=> this.page.getByText("Global Feed")
        ]);
    }

    articlePreviewByTitle(title:string):Locator{
        return this.page.locator(".article-preview").filter({hasText:title}).first();
    }

    async expectArticleVisible(title:string){
        await expect(this.articlePreviewByTitle(title)).toBeVisible();
    }

    async openArticle(title:string){
        const articlePriview = this.articlePreviewByTitle(title);
        await expect(articlePriview).toBeVisible();
        await articlePriview.getByRole("link",{name:title}).click();
    } 
}