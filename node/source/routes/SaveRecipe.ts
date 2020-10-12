import express,{ Request,Response } from "express";
import verifyToken from "../util/VerifyToken";
import User from "../models/User";

const route = express.Router();

route.get("/save", verifyToken, async(req:Request,res:Response) =>{
    const {
        id,
    } = req.body.user;
    const { recipe } = req.body
    await User.updateOne(
        { _id:id },
        {
            $push: {
                recipes: recipe
            }
        }
    )
    res.send("Done");
})

export default route;
