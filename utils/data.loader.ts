import fs from "fs";
import  path from "path";


export function loadJsonWithEnv<T>(relativePath: string):T{
    const fullPath = path.resolve(process.cwd(), relativePath);
    const raw = fs.readFileSync(fullPath, "utf-8");

    const resolved = raw.replace(/\$\{([A-Z0-9_]+)\}/g, (_, key)=>{
        const value = process.env[key];
        if(!value){
            throw new Error(`Missing environment variable : ${key}`);
        }
        return value;
    });
    return JSON.parse(resolved) as T;
}