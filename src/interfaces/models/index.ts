import * as Sequelize from "sequelize";
import { IMemberInstance, IMemberAttributes } from "./user";
import { IPropertyAttributes, IPropertyInstance } from "./properties";
import {
  IVerificationCodeInstance,
  IVerificationCodeAttributes,
} from "./verificationCode";

export interface IModelFactory extends Sequelize.Models {
  user: Sequelize.Model<IMemberInstance, IMemberAttributes>;
  property: Sequelize.Model<IPropertyInstance, IPropertyAttributes>;
  verificationCode: Sequelize.Model<
    IVerificationCodeInstance,
    IVerificationCodeAttributes
  >;
}
