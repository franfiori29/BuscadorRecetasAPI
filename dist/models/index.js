"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.RecipeFactory = exports.db = void 0;
const sequelize_1 = require("sequelize");
require("dotenv").config();
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
exports.db = process.env.NODE_ENV === "production"
    ? new sequelize_1.Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
            max: 3,
            min: 1,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
            keepAlive: true,
        },
        ssl: true,
    })
    : new sequelize_1.Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false, native: false });
function RecipeFactory(sequelize) {
    return sequelize.define("recipe", {
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
}
exports.RecipeFactory = RecipeFactory;
exports.Recipe = RecipeFactory(exports.db);
//# sourceMappingURL=index.js.map