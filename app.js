const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { Recipe } = require('./models/index');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	next();
});

app.get('/', async (req, res) => {
	const topTenRec = await Recipe.findAll({
		limit: 5,
		order: [['likes', 'DESC']]
	});
	res.json(topTenRec);
});

app.get('/:id', async (req, res) => {
	const { id } = req.params;
	const recipe = await Recipe.findOne({ where: { id } });
	return res.json(recipe ? recipe.likes : 0);
});

app.post('/', async (req, res) => {
	const recipe = req.body;
	const foundRecipe = await Recipe.findOne({
		where: {
			id: recipe.id
		}
	});
	if (foundRecipe) {
		if (!foundRecipe.likes && !recipe.likes) {
			foundRecipe.destroy()
			return res.json({});
		}

		const updated = recipe.likes ? await foundRecipe.increment('likes') :
			await foundRecipe.decrement('likes');
		!updated.likes && updated.destroy();
		return res.json(updated);
	} else {
		recipe.likes = 1;
		const created = await Recipe.create(recipe);
		return res.json(created);
	}
})

module.exports = app;