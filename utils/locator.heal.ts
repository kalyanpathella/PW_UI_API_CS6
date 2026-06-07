import {type Locator, type Page} from "@playwright/test";

type LocatorFactory = () => Locator;

export async function healLocator(
    page:Page, options:{name:string; candidates: LocatorFactory[]; timeoutMs?: number;}):Promise<Locator>{

        const timeoutMs = options.timeoutMs ?? 1500;

        for(const create of options.candidates)
        {
            const loc= create();
            try{
                await loc.first().waitFor({state: "visible", timeout:timeoutMs})
                return loc.first();
            }
            catch{
                //try next locator
            }
        }

        throw new Error(`Auto-heal failedfor "${options.name}". None of the locator candidate become visible.`);
}