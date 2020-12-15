const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Recipe } = require('./models/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.get('/', async (req, res) => {
	const topTenRec = await Recipe.findAll({
		limit: 10,
		order: [['likes', 'DESC']]
	});
	res.json(topTenRec);
});

app.get('/:id', async (req, res) => {
	const { id } = req.params;

	const

});

app.post('/', async (req, res) => {
	const recipe = req.body;
	const foundRecipe = await Recipe.findOne({
		where: {
			id: recipe.id
		}
	});
	if (foundRecipe) {
		const updated = await foundRecipe.increment('likes');
		return res.json(updated);
	} else {
		const created = await Recipe.create(recipe);
		return res.json(created);
	}
})

module.exports = app;