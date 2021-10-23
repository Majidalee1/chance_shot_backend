import { Instance } from "sequelize";

export interface IMemberAttributes {
  memberid?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  subscribed?: string;
  valid_flag?: string;
  sort_by?: string;
  list_order?: string;
  int_rate?: number;
  loan_term?: number;
  down?: number;
  points?: number;
  min_cash_flow?: number;
  min_cap_rate?: number;
  min_coc?: number;
  min_roi?: number;
  min_noi?: number;
  min_irr?: number;
  min_eq_mult?: number;
  min_rent_mult?: number;
  create_date?: Date;
  last_modified?: Date;
}

export interface IMemberInstance extends Instance<IMemberAttributes> {
  dataValues: IMemberAttributes;
}
