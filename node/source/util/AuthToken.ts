import jwt from "jsonwebtoken";
import { Request,Response,NextFunction } from "express";

export default function(req:Request,res:Response,next:NextFunction) {
    const token = req.header("token");
    if(!token) return next()
    const user:any = jwt.verify(token,"thisisthefoodyapp");
    if(!user) return next()
    delete user.iat;
    res.status(200).send({ ...user,token })
}
