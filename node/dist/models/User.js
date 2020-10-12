"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    username: String,
    email: String,
    password: String,
    recipes: [
        {
            label: String,
            source: String,
            image: String,
            link: String,
            ingredints: Array,
            calories: Number,
            time: Number,
            totalNutrients: Array
        }
    ]
});
exports.default = mongoose_1.default.model("User", userSchema);
