import * as Sequelize from "sequelize";
import { IUserRoleAttributes, IUserRoleInstance } from "../../models/userRoles";
import { IUserAttributes, IUserInstance } from "./user";

import {
  IVerificationCodeAttributes,
  IVerificationCodeInstance,
} from "./verificationCode";

export interface IModelFactory extends Sequelize.Models {
  user: Sequelize.Model<IUserInstance, IUserAttributes>;
  verificationCode: Sequelize.Model<
    IVerificationCodeInstance,
    IVerificationCodeAttributes
  >;
  userRole: Sequelize.Model<IUserRoleInstance, IUserRoleAttributes>;
}
