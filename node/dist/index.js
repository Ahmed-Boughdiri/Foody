"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
var Auth_1 = __importDefault(require("./routes/Auth"));
var mongoose_1 = __importDefault(require("mongoose"));
var Recipe_1 = __importDefault(require("./routes/Recipe"));
var SaveRecipe_1 = __importDefault(require("./routes/SaveRecipe"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
var PORT = 5000;
app.listen(PORT, function () { return console.log("Server Running On Port " + PORT + "..."); });
mongoose_1.default.connect("mongodb+srv://ahmed:ahmed123@cluster0.w1ypc.mongodb.net/foody?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log("DB Connected Successfully..."); });
app.use(cors_1.default());
app.use(express_1.json());
app.use("/api/auth", Auth_1.default);
app.use("/api/recipe", Recipe_1.default);
app.use("/api/user/recipe", SaveRecipe_1.default);
