var { Sequelize, DataTypes } = require('sequelize');

var db = new Sequelize('postgres://postgres:asdasd123@localhost:5432/recipeBack', {
	logging: false,
});

const Recipe = db.define('recipe', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	likes: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = {
	Recipe,
	db
}