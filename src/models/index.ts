import { Sequelize, DataTypes, Model, BuildOptions } from "sequelize";
require("dotenv").config();
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

export const db =
	process.env.NODE_ENV === "production"
		? new Sequelize({
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
						// Ref.: https://github.com/brianc/node-postgres/issues/2009
						rejectUnauthorized: false,
					},
					keepAlive: true,
				},
				ssl: true,
		  })
		: new Sequelize(
				`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
				{ logging: false, native: false }
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
