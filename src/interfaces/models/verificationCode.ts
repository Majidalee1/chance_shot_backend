import { Instance } from "sequelize";

export interface IVerificationCodeAttributes {
  id: number;
  code: string;
  type: string;
  email?: string;
  expiresAt: number;
}

export interface IVerificationCodeInstance
  extends Instance<IVerificationCodeAttributes> {
  dataValues: IVerificationCodeAttributes;
}
