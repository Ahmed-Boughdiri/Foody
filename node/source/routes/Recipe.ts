import express,{ Request,Response } from "express";
import checkToken from "../util/CheckToken";
import axios from "axios";

const route = express.Router();

async function getRecipes(q:String):Promise<any[]> {
    const APP_ID = "0faeefbf";
    const API_KEY = "ae758b479c800856ac49746567f3fb3e";
    const API = `https://api.edamam.com/search?q=${q}&app_id=${APP_ID}&app_key=${API_KEY}`;
    const req = await axios(API);
    const res = await req.data;
    return res.hits;
}

function filterRecipes(recipes: any[]):any[] {
    const result:any = [];
    recipes.map(recipe =>{
        const recipeData = {
            label: recipe.recipe.label,
            source: recipe.recipe.source,
            image: recipe.recipe.image,
            link: recipe.recipe.url,
            ingredints: [...recipe.recipe.ingredients],
            calories: recipe.recipe.calories,
            time: recipe.recipe.totalTime,
            totalNutrients: Object.entries(recipe.recipe.totalNutrients).map((item:any) =>({ label:item[1].label,quantity:item[1].quantity,unit:item[1].unit }))

        }
        result.push(recipeData)
    })
    return result
}

function getSearch() {
    const searches = ["chicken","sushi","banana","orange","burger","carrot"];
    return searches[Math.floor(Math.random()*searches.length - 1)]
}

route.get("/get", checkToken, async(req:Request,res:Response) =>{
    const {
        search
    } = req.body
    const q = search ? search : getSearch()
    const recipes = await getRecipes(q);
    const results = filterRecipes(recipes);
    res.send(results);
})

export default route
