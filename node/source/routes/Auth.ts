import express,{ Request,Response } from "express";
import validateData from "../util/ValidateData";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../util/VerifyToken";

const route = express.Router();

route.post("/login", async(req:Request,res:Response) =>{
    const {
        email,
        password,
        username
    } = req.body;
    const user:any = await User.findOne({ email });
    if(!user) return res.status(400).send({ error: "Email Doesn't Exists" })
    const comparedPassword = await bcrypt.compare(password, user.password);
    if(!comparedPassword) return res.status(400).send({ error: "Email And Password Doesn't Match" });
    if(username !== user.username ) return res.status(400).send({ error: "UserName Doen't Match" })
    const token = jwt.sign({
        email,
        username,
        password,
        id: user._id
    },"thisisthefoodyapp") 
    res.status(200).send({
        username,
        email,
        id: user._id, 
        token
    })
})



route.post("/register", async(req:Request,res:Response) =>{
    const {
        username,
        email,
    } = req.body;
    let { password } = req.body;
    validateData(res,username,email,password)
    const userExists = await User.findOne({ email })
    if(userExists) return res.status(400).send({ error: "Email Already Exists" })
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt)
    const user = new User({username, email, password})
    await user.save()
    const token = jwt.sign({
        email,
        username,
        id: user._id
    },"thisisthefoodyapp")
    res.status(201).send({
        username,
        email,
        id: user._id, 
        token
    })
})

route.post("/token",(req:Request,res:Response) =>{
    const {
        token
    } = req.body;
    if(!token) return res.status(400).send({ error: "You Must Provide a Token" })
    const tokenExists = jwt.verify(token,"thisisthefoodyapp")
    if(!token) return res.status(400).send({ error: "Invalid" })
    res.status(200).send(token);
})

export default route;
