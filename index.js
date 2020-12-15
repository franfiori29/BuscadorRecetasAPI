const { db, Recipe } = require('./models');
var app = require('./app.js');

const force = true;
db.sync({ force })
	.then(function () {
		app.listen(4000, function () {
			console.log('Servidor funcionando');
		});
		for (let i = 1; i < 15; i++) {
			Recipe.create({
				id: i,
				title: 'hola',
				image: 'hola',
				likes: i * 2
			})
		}

	});