import * as Sequelize from "sequelize";
import { IMemberInstance, IMemberAttributes } from "./user";

export interface IModelFactory extends Sequelize.Models {
  user: Sequelize.Model<IMemberInstance, IMemberAttributes>;
}
