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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./models/index");
const app = express_1.default();
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topTenRec = yield index_1.Recipe.findAll({
        limit: 5,
        order: [['likes', 'DESC']]
    });
    res.json(topTenRec);
}));
app.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const recipe = yield index_1.Recipe.findOne({ where: { id } });
    return res.json(recipe ? recipe.likes : 0);
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = req.body;
    const foundRecipe = yield index_1.Recipe.findOne({
        where: {
            id: recipe.id
        }
    });
    if (foundRecipe) {
        if (!foundRecipe.likes && !recipe.likes) {
            foundRecipe.destroy();
            return res.json({});
        }
        const updated = recipe.likes ? yield foundRecipe.increment('likes') :
            yield foundRecipe.decrement('likes');
        !updated.likes && updated.destroy();
        return res.json(updated);
    }
    else {
        recipe.likes = 1;
        const created = yield index_1.Recipe.create(recipe);
        return res.json(created);
    }
}));
exports.default = app;
//# sourceMappingURL=app.js.map