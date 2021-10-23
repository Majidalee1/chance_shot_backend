import * as Sequelize from "sequelize";
import * as fs from "fs";
import * as path from "path";
import { IModelFactory } from "../interfaces/models/index";

const enableLogging = process.env.MYSQL_LOGGING === "true";
const Op = Sequelize.Op;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const sequelize: Sequelize.Sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "analyzere",

  logging: console.log,
  // tslint:disable-next-line
  //logging: enableLogging ? // console.log : false,
});

const models = {} as any;
fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== "index.ts" &&
      file !== "interfaces" &&
      file.slice(-3) === ".ts"
    );
  })
  .forEach((file: string) => {
    const model = sequelize.import(path.join(__dirname, file));

    models[(model as any).name] = model;
  });

// Execute the associations where defined
Object.keys(models).map((modelName) => {
  const model: Sequelize.Model<any, any> = models[modelName];
  if (model.associate) {
    model.associate(models);
  }
});

export const Database: Sequelize.Sequelize = sequelize;

export const Models: IModelFactory = models;

export const Operators: Sequelize.Operators = Database.Op;
