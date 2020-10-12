"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(req, res, next) {
    var token = req.header("token");
    if (!token)
        return res.status(400).send({ error: "You Need To Have An Access Token In Order To Pursuit This Action" });
    var user = jsonwebtoken_1.default.verify(token, "thisisthefoodyapp");
    if (!token)
        return res.status(400).send({ error: "An Invalid Token Has Been Provided" });
    req.body.user = {
        username: user.username,
        email: user.email,
        id: user.id,
    };
    next();
}
exports.default = default_1;
