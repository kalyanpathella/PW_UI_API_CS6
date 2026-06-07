import {type Page} from "@playwright/test";
import {BasePage} from "./base.page";

export class SignInPage extends BasePage {
    constructor(page: Page){
        super(page);
    }

    async login(email: string, password: string){
        await this.healFill("Email", email, [
            ()=> this.page.getByPlaceholder("Email"),
            ()=> this.page.locator("input[name=email]")
        ]);

        await this.healFill("Password", password, [
            ()=> this.page.getByPlaceholder("Password"),
            ()=> this.page.locator("input[type=password]")
        ]);

        await this.healClick("Sign in button", [
            ()=> this.page.locator("button[type=submit]"),
            ()=> this.page.getByRole("button", {name:"Sign in"})
        ]);
    }
}

