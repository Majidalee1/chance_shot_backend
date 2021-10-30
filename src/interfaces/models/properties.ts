import { Instance } from "sequelize";

export interface IPropertyAttributes {
  memberid: number;
  propertyId: number;
  address: string;
  city: string;
  state: string;
  zip: number;
  price: number;
  closing: number;
  rent: number;
  taxes: number;
  insurance: number;
  maint: number;
  hoa: number;
  capExp: number;
  mortgageMonth: number;
  cashFlow: number;
  cashFlowYear1: number;
  cashFlowYear2: number;
  cashFlowYear3: number;
  capRate: number;
  coc: number;
  roi: number;
  noi: number;
  irr: number;
  eqMult: number;
  rentMult: number;
  createDate: Date;
  lastModified: Date;
  y01pay: number;
  y05pay: number;
  y10pay: number;
  y15pay: number;
  y20pay: number;
  y25pay: number;
  y30pay: number;
}

// IpropertyInstance
export interface IPropertyInstance extends Instance<IPropertyAttributes> {
  dataValues: IPropertyAttributes;
}
