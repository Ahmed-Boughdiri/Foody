import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function(req:Request,res:Response,next:NextFunction) {
    const token = req.header("token");
    if(!token) return res.status(400).send({ error: "You Need To Have An Access Token In Order To Pursuit This Action" });
    const user:any = jwt.verify(token,"thisisthefoodyapp");
    if(!token) return res.status(400).send({ error: "An Invalid Token Has Been Provided" })
    req.body.user = {
        username: user.username,
        email: user.email,
        id: user.id,
    }
    next()
}
