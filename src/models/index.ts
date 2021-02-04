import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";

export const db = new Sequelize(
	"postgres://postgres:asdasd123@localhost:5432/recipeBack",
	{
		logging: false,
	}
);

export interface RecipeAttributes {
	id: number;
	title: string;
	likes: number;
	image: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface RecipeModel
	extends Model<RecipeAttributes>,
		RecipeAttributes {}

export type RecipeStatic = typeof Model & {
	new (values?: object, options?: BuildOptions): RecipeModel;
};

export function RecipeFactory(sequelize: Sequelize): RecipeStatic {
	return <RecipeStatic>sequelize.define("recipe", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likes: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
}

export const Recipe = RecipeFactory(db);
