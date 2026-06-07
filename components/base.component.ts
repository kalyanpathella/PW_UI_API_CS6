import {expect, type Page, type Locator} from "@playwright/test";
import {healLocator} from "../utils/locator.heal";

export class BaseComponent{
    protected readonly page:Page;

    constructor(page:Page){
        this.page = page;
    }

    protected async healClick(name: string, candidates: Array<() => Locator>){
        const locator = await healLocator(this.page, {name,candidates});
        await expect(locator, `${name} should be visible`).toBeVisible();
        await locator.click();
    }
}