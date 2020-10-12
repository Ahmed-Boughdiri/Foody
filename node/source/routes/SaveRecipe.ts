import express,{ Request,Response } from "express";
import verifyToken from "../util/VerifyToken";
import User from "../models/User";

const route = express.Router();

route.post("/save", verifyToken, async(req:Request,res:Response) =>{
    const {
        id,
    } = req.body.user;
    const { recipe } = req.body
    try{
        await User.updateOne(
            { _id:id },
            {
                $push: {
                    recipes: recipe
                }
            }
        )
    } catch(err) {
        return res.status(400).send({ error: "An Error Has Occured Please Try Again" })
    }
    return res.status(200).send(recipe);
})

route.get("/get", verifyToken, async(req:Request,res:Response) =>{
    const {
        id
    } = req.body.user;
    try{
        const user:any = await User.findById(id);
        return res.status(200).send(user?.recipes)
    } catch(err) {
        return res.status(400).send({ error: "An Error Has Occured Please Try Again" })
    }
})

route.delete("/delete", verifyToken, async(req:Request,res:Response) =>{
    const { id } = req.body.user;
    const { recipe } = req.body;
    try{
        const user:any = await User.findById(id);
        const newRecipes = user?.recipes.filter((userRecipe:any) => userRecipe.label !== recipe.label);
        await User.updateOne(
            {
                _id: id
            },
            {
                $set: {
                    recipes: [ ...newRecipes ]
                }
            }
        )
        return res.send("Operation Has Completed Successfully")
    } catch(err) {
        return res.status(400).send({ error: "An Error Has Occured Please Try Again Later" })
    }
})

export default route;
