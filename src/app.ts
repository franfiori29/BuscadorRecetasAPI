import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { Recipe } from "./models/index";
const app: Application = express();
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use((_: Request, res: Response, next) => {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Credentials", "true");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

app.get("/", async (_: Request, res: Response) => {
	const topThreeRec = await Recipe.findAll({
		limit: 3,
		order: [["likes", "DESC"]],
	});
	res.json(topThreeRec);
});

app.get("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const recipe = await Recipe.findOne({ where: { id } });
	return res.json(recipe ? recipe.likes : 0);
});

app.post("/", async (req: Request, res: Response) => {
	const recipe = req.body;
	const foundRecipe = await Recipe.findOne({
		where: {
			id: recipe.id,
		},
	});
	if (foundRecipe) {
		if (!foundRecipe.likes && !recipe.likes) {
			foundRecipe.destroy();
			return res.json({});
		}

		const updated = recipe.likes
			? await foundRecipe.increment("likes")
			: await foundRecipe.decrement("likes");
		!updated.likes && updated.destroy();
		return res.json(updated);
	} else {
		recipe.likes = 1;
		const created = await Recipe.create(recipe);
		return res.json(created);
	}
});

export default app;
