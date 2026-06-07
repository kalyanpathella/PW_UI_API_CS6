import {expect, type APIRequestContext} from "@playwright/test";

export class RealWorldApi{

    private readonly request: APIRequestContext;
    private readonly apiBaseUrl: string;

    constructor(request: APIRequestContext, apiBaseUrl: string){
        this.request= request;
        this.apiBaseUrl = apiBaseUrl;
    }

    async register(email: string, username: string, password: string){
        const response = await this.request.post(`${this.apiBaseUrl}/users`,{
            data:{
                user:{email, username, password},
            }
        });
    expect(response.ok(), `Register failed: ${response.status()}`).toBeTruthy();
    return response.json();
    }

    async login(email:string, password:string){
        const response = await this.request.post(`${this.apiBaseUrl}/users/login`,{
            data:{
                user:{email,password},
            },
        });
        expect(response.ok(), `login failed: ${response.status()}`).toBeTruthy();
        return response.json();
    }

    async createArticale(token: string, title: string, description: string, body: string){
        const response = await this.request.post(`${this.apiBaseUrl}/articles`,{
            headers:{
                Authorization: `Token ${token}`
            },
            data:{
                article:{title, description, body, tagList:["pw-e2e"]}
            }
    });
    expect(response.ok(), `create article failed: ${response.status()}`).toBeTruthy();
    return response.json();
    }


}