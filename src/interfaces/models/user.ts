import { Instance } from "sequelize";

export interface IMemberAttributes {
  id?: number;
  memberid?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscribed?: string;
  validFlag?: string;
  sortBy?: string;
  listOrder?: string;
  intRate?: number;
  loanTerm?: number;
  down?: number;
  points?: number;
  minCashFlow?: number;
  minCapRate?: number;
  minCoc?: number;
  minRoi?: number;
  minNoi?: number;
  minIrr?: number;
  minEqMult?: number;
  minRentMult?: number;
  createDate?: Date;
  lastModified?: Date;
}

export interface IMemberInstance extends Instance<IMemberAttributes> {
  dataValues: IMemberAttributes;
}
