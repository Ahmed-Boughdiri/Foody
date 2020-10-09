"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EmailPattern_1 = require("../global/EmailPattern");
function isValidUserName(username) {
    if ((username.length >= 8) && (username.match(EmailPattern_1.username_pattern)))
        return true;
    return false;
}
function isValidEmail(email) {
    if (email.match(EmailPattern_1.email_pattern))
        return true;
    return false;
}
function isValidPassword(password) {
    if (password.length >= 8)
        return true;
    return false;
}
function default_1(res, username, email, password) {
    if (!username)
        return res.status(400).send({ error: "UserName Must Be Provided" });
    if (!email)
        return res.status(400).send({ error: "Email Must Be Provided" });
    if (!password)
        return res.status(400).send({ error: "Password Must Be Provided" });
    var validUserName = isValidUserName(username);
    var validEmail = isValidEmail(email);
    var validPassword = isValidPassword(password);
    if (!validUserName)
        return res.status(400).send({ error: "Invalid UserName" });
    if (!validEmail)
        return res.status(400).send({ error: "Invalid Email" });
    if (!validPassword)
        return res.status(400).send({ error: "Invalid Password" });
    return;
}
exports.default = default_1;
