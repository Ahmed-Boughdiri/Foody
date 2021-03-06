"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CheckToken_1 = __importDefault(require("../util/CheckToken"));
var axios_1 = __importDefault(require("axios"));
var route = express_1.default.Router();
function getRecipes(q) {
    return __awaiter(this, void 0, void 0, function () {
        var APP_ID, API_KEY, API, req, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    APP_ID = "0faeefbf";
                    API_KEY = "ae758b479c800856ac49746567f3fb3e";
                    API = "https://api.edamam.com/search?q=" + q + "&app_id=" + APP_ID + "&app_key=" + API_KEY;
                    return [4 /*yield*/, axios_1.default(API)];
                case 1:
                    req = _a.sent();
                    return [4 /*yield*/, req.data];
                case 2:
                    res = _a.sent();
                    return [2 /*return*/, res.hits];
            }
        });
    });
}
function filterRecipes(recipes) {
    var result = [];
    recipes.map(function (recipe) {
        var recipeData = {
            label: recipe.recipe.label,
            source: recipe.recipe.source,
            image: recipe.recipe.image,
            link: recipe.recipe.url,
            ingredints: __spreadArrays(recipe.recipe.ingredients),
            calories: recipe.recipe.calories,
            time: recipe.recipe.totalTime,
            totalNutrients: Object.entries(recipe.recipe.totalNutrients).map(function (item) { return ({ label: item[1].label, quantity: item[1].quantity, unit: item[1].unit }); })
        };
        result.push(recipeData);
    });
    return result;
}
function getSearch() {
    var searches = ["chicken", "sushi", "banana", "orange", "burger", "carrot"];
    return searches[Math.floor(Math.random() * searches.length - 1)];
}
route.get("/get", CheckToken_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, q, recipes, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.body.search;
                q = search ? search : getSearch();
                return [4 /*yield*/, getRecipes(q)];
            case 1:
                recipes = _a.sent();
                results = filterRecipes(recipes);
                res.send(results);
                return [2 /*return*/];
        }
    });
}); });
exports.default = route;
