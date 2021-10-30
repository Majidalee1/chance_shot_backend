import { IPropertyAttributes } from "../interfaces/models/properties";
import { IPropertyCreate } from "../interfaces/property";

import { irr as nIrr } from "node-irr";

const round = (num: number) => {
  return Math.round(num * 100) / 100;
};

// roundall values of all keys in a given object
const roundAll = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === "number") {
      obj[key] = round(obj[key]);
    } else {
      obj[key] = 0;
    }
  }
  return obj;
};

// convert the null values in a given object to 0
const nullToZero = (obj: any) => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      obj[key] = 0;
    }
  }
  return obj;
};

export const propertyCreationMapper = (
  payload: IPropertyCreate
): IPropertyAttributes => {
  const downPayment = payload.price * payload.down;

  const principal = payload.price - downPayment;

  const interest = payload.interest;

  const months = payload.term * 12;

  // prettier-ignore
  const i = (interest / 100.0) / 12;

  const mortgageMonth = round(
    principal * (i + i / (Math.pow(1 + i, months) - 1))
  );

  const mortgage = calculateMortgage(principal, months, i, mortgageMonth);
  console.log(
    "🚀 ~ file: property-mapper.ts ~ line 31 ~ propertyCreationMapper ~ mortgage",
    mortgage
  );

  const noi =
    payload.rent * 12 -
    payload.taxes -
    payload.insurance -
    payload.maint -
    payload.hoa * 12;

  const cashFlowYear1 = noi - payload.capExp - mortgageMonth * 12;

  const cashFlowYear2 = noi - mortgageMonth * 12;

  const cashFlowYear3 =
    (payload.price * 1.09 - (payload.price - payload.down)) * 0.946 +
    (noi - mortgageMonth * 12);

  const cashFlow = cashFlowYear2 / 12;

  const capRate = noi / payload.price;

  const coc = cashFlowYear2 / (payload.down + payload.closing);

  const roi =
    (noi * 3 - mortgageMonth * 36 + payload.price * 0.09) /
    (payload.down + payload.closing) /
    3;

  const eqMult =
    (cashFlowYear1 + cashFlowYear2 + cashFlowYear3) /
    (payload.down + payload.closing);

  const rentMult = payload.price / (payload.rent * 12);

  const irr = nIrr([cashFlowYear1, cashFlowYear2, cashFlowYear3]);
  console.log(
    "🚀 ~ file: property-mapper.ts ~ line 65 ~ propertyCreationMapper ~ irr",
    irr
  );

  const reponse = {
    ...(payload as IPropertyCreate),
    mortgageMonth,
    cashFlow,
    cashFlowYear1,
    cashFlowYear2,
    cashFlowYear3,
    capRate,
    coc,
    roi,
    noi,
    irr,
    eqMult,
    rentMult,
    createDate: new Date(),
    lastModified: new Date(),
    ...mortgage,
  };
  return nullToZero(reponse);
};

export const calculateMortgage = (
  principal: number,
  months: number,
  i: number,
  mortgageMonth: number
) => {
  console.log(
    "🚀 ~ file: property-mapper.ts ~ line 99 ~  principal: number",
    principal,
    i,
    mortgageMonth,
    months
  );

  // let $m = 0;

  let balance = principal;

  let totalInterest = 0;

  let y01pay, y05pay, y10pay, y15pay, y20pay, y25pay, y30pay;

  for (let $m = 1; $m < months; $m++) {
    const toInterest = round(balance * i);

    totalInterest = round(totalInterest + toInterest);

    const toPrincipal = round(mortgageMonth - toInterest);

    balance = round(balance - toPrincipal);
    if ($m === 12) {
      y01pay = principal - balance;
    } else if ($m == 60) {
      y05pay = principal - balance;
    } else if ($m == 120) {
      y10pay = principal - balance;
    } else if ($m == 180) {
      y15pay = principal - balance;
    } else if ($m == 240) {
      y20pay = principal - balance;
    } else if ($m == 300) {
      y25pay = principal - balance;
    } else if ($m == 360) {
      y30pay = principal - balance;
    } else {
    }
  }

  const data = {
    y01pay,
    y05pay,
    y10pay,
    y15pay,
    y20pay,
    y25pay,
    y30pay,
  };

  return roundAll(data);
};

//
