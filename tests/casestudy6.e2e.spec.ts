import {test, expect} from '@playwright/test';
import {loadJsonWithEnv} from "../utils/data.loader";
import {RealWorldApi} from "../api/realworld.api";
import {unique} from "../utils/random";
import {HomePage} from "../pages/home.page";
import {ArticlePage} from "../pages/article.page";  
import {SignInPage} from "../pages/sigin.page";


type TestData={
    config:{
        defaultDescription: string;
        defaultTagList: string[];
    };
    scenarios:Array<{
        title: string;
        tags:string[],
        user:{usernamePrefix: string; emailDomain: string; passwordPattern: string;};
        article: {titleprefix:string; bodyPrefix: string};
    }>;
};
const data = loadJsonWithEnv<TestData>("data/casestudy6.e2e.json");

test.describe("CaseStudt-6: Entrprise E2E Automation", ()=>{
    for(const scenario of data.scenarios){
        const testName = `${scenario.tags.join(" ")} ${scenario.title}`;
        test(testName, async ({page, request}, testInfo)=>{
            const api = new RealWorldApi(request, process.env.API_BASE_URL!);

            const uid = unique(`w${testInfo.workerIndex}`);

            const userName = `${scenario.user.usernamePrefix}_$uid`;
            const email = `${uid}@${scenario.user.emailDomain}`;
            const password = `${scenario.user.passwordPattern}_${uid}`

            console.log(email, password);

            const articleTitle = `${scenario.article.titleprefix}`;
            const articleBody = `${scenario.article.bodyPrefix}`;
            const articleDescription = data.config.defaultDescription;

            //API Data Factory 
            await api.register(email, userName, password);
            const response = await api.login(email, password);
            const token=response.user.token;

            const article = await api.createArticale(token, articleTitle, articleDescription, articleBody);

            expect(article.article.title).toBe(articleTitle);

            //UI Validation

            const homePage = new HomePage(page);
            const signInPage = new SignInPage(page);
            const articlePage = new ArticlePage(page);

            await homePage.open();
            await homePage.header.clickSigin();
            await signInPage.login(email, password);
            await homePage.header.expectLoggedIsAs(userName);

            await homePage.openGlobalfeed();
            await homePage.expectArticleVisible(articleTitle);
            await homePage.openArticle(articleTitle);
            await articlePage.expectTitle(articleTitle);
            await articlePage.expectBodyContains(articleBody);

            //Logout
            await homePage.header.openSettings();
            await homePage.header.logoutFromSettings();

            await expect(page.getByRole("link",{name:"Sign in"})).toBeVisible();

        });
    }
});

