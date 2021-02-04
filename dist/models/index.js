"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = exports.RecipeFactory = exports.db = void 0;
const sequelize_1 = require("sequelize");
exports.db = new sequelize_1.Sequelize('postgres://postgres:asdasd123@localhost:5432/recipeBack', {
    logging: false,
});
function RecipeFactory(sequelize) {
    return sequelize.define('recipe', {
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        likes: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        }
    });
}
exports.RecipeFactory = RecipeFactory;
exports.Recipe = RecipeFactory(exports.db);
//# sourceMappingURL=index.js.map