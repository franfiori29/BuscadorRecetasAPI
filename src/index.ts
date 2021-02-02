import { db }  from './models';
import app from './app.js';

const force = false;
db.sync({ force })
	.then(function () {
		app.listen(4000, function () {
			console.log('Servidor funcionando');
		});
	});