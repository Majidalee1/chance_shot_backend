// -address, city, state, zip, price, closing_costs, interest, term, down, points, rent, taxes, insurance, repairs, hoa, cap_ex

export interface IPropertyCreate {
  memberId: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  closing: number;
  interest: number;
  term: number;
  down: number;
  points: number;
  rent: number;
  taxes: number;
  insurance: number;
  maint: number;
  hoa: number;
  capExp: number;
}

// -Fields will be pre-populated and available for update: Price, closing_costs, interest, term, down, points, rent, taxes, insurance, repairs, hoa, cap_exp
export interface IPropertyUpdate {
  propertyId?: number;
  price: number;
  closing: number;
  interest: number;
  term: number;
  down: number;
  points: number;
  rent: number;
  taxes: number;
  insurance: number;
  repairs: number;
  hoa: number;
  capExp: number;
}

// IpropertyGet
export interface IPropertyGet {
  memberId: number;
  sortBy: string;
}
