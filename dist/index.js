"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const app_js_1 = __importDefault(require("./app.js"));
require("dotenv").config();
const { PORT } = process.env;
const force = false;
models_1.db.sync({ force }).then(function () {
    app_js_1.default.listen(PORT, function () {
        console.log("Servidor funcionando");
    });
});
//# sourceMappingURL=index.js.map