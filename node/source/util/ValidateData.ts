import { Request,Response } from "express";
import { email_pattern,username_pattern } from "../global/EmailPattern";

function isValidUserName(username:String):Boolean {
    if((username.length >= 8) && (username.match(username_pattern))) return true
    return false
}

function isValidEmail(email:String) {
    if(email.match(email_pattern)) return true
    return false
}

function isValidPassword(password:String) {
    if(password.length >= 8) return true
    return false
}

export default function(res:Response,username:String,email:String,password:String):(Response|void) {
    if(!username) return res.status(400).send({ error: "UserName Must Be Provided" })
    if(!email) return res.status(400).send({ error: "Email Must Be Provided" })
    if(!password) return res.status(400).send({ error: "Password Must Be Provided" })
    const validUserName = isValidUserName(username);
    const validEmail = isValidEmail(email)
    const validPassword = isValidPassword(password)
    if(!validUserName) return res.status(400).send({ error: "Invalid UserName" })
    if(!validEmail) return res.status(400).send({ error: "Invalid Email" })
    if(!validPassword) return res.status(400).send({ error: "Invalid Password" })
    return 
}
