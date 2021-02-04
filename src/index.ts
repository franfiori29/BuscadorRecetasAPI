import { db } from "./models";
import app from "./app.js";
require("dotenv").config();
const { PORT } = process.env;
const force = false;
db.sync({ force }).then(function () {
	app.listen(PORT, function () {
		console.log("Servidor funcionando");
	});
});
