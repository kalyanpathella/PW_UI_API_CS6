import {expect, type Page, type Locator} from "@playwright/test";
import {BaseComponent} from "./base.component";

export class HeaderComponent extends BaseComponent{
    constructor(page:Page){
        super(page);
    }

    async clickSigin(){
        await this.healClick("Header Sigin in",[
            () => this.page.getByRole("link", {name:"Sign in"}),
            () => this.page.locator("a.nav-link", {hasText:"Sign in"}),
            () =>this.page.getByText("Sign in")
        ]);
    }

    async expectLoggedIsAs(userName: string){
        await expect(this.page.getByRole("link",{name:userName})).toBeVisible();
    }

    async openSettings(){
        await this.healClick("Header Settings",[
            ()=> this.page.getByRole("link", {name:"Settings"}),
            ()=> this.page.locator('a.nav-link',{hasText:"Settings"}),
            ()=> this.page.getByText("Settings")
        ]);
    }

    async logoutFromSettings(){
        await this.healClick("Logout out",[
            ()=>this.page.getByRole("button",{name:"Or click here to logout."}),
            ()=> this.page.locator("button",{hasText:"Or click here to logout."}),
            ()=>this.page.getByText("Or click here to logout."),
        ]);
    }

}

