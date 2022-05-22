import * as Sequelize from "sequelize";
import { IUserRoleAttributes, IUserRoleInstance } from "../../models/userRoles";
import { IUserAttributes, IUserInstance } from "./user";
import { IDrawInstance, IDraw } from "../../models/draws";

import {
  IVerificationCodeAttributes,
  IVerificationCodeInstance,
} from "./verificationCode";
import { IDrawInfoInstance, IDrawInfo } from "../../models/draw-Info";
import { IDrawEntry, drawEntriesInstance } from "../../models/draw-entries";
import { IDrawType, IDrawTypeInstance } from "../../models/draw-types";

declare module "sequelize" {
  interface Model<TInstance, TAttributes> {
    increment(fields: any, options: any): Promise<TInstance>;
    decrement(fields: any, options: any): Promise<TInstance>;
  }
}

export interface IModelFactory extends Sequelize.Models {
  user: Sequelize.Model<IUserInstance, IUserAttributes>;
  verificationCode: Sequelize.Model<
    IVerificationCodeInstance,
    IVerificationCodeAttributes
  >;
  userRole: Sequelize.Model<IUserRoleInstance, IUserRoleAttributes>;
  draw: Sequelize.Model<IDrawInstance, IDraw>;
  drawInfo: Sequelize.Model<IDrawInfoInstance, IDrawInfo>;
  drawEntries: Sequelize.Model<drawEntriesInstance, IDrawEntry>;
  drawType: Sequelize.Model<IDrawTypeInstance, IDrawType>;
}
