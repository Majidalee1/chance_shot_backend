import { Instance } from "sequelize";
import { IUserRoleInstance, IUserRoleAttributes } from "../../models/userRoles";

export interface IUserAttributes {
  id: string;
  email: string;
  firstName: string;
  lastName: string;

  password: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  idOrPassportNumber: string;
  isProfileCompleted: boolean;
  isActive: boolean;
  createdAt: String;
  updatedAt: String;
  userRole?: IUserRoleAttributes;
}
export interface IUserInstance extends Instance<IUserAttributes> {
  dataValues: IUserAttributes;
}
