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
    if (obj.hasOwnProperty(key) && !obj[key]) {
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

export const cumilativeNetCashFlow = (payload: IPropertyAttributes) => {
  const $time = 30;
  // $rate = 3;
  const $rate = 3;
  // $n = 1;
  let $n = 1;
  // $expenses = $taxes + $insurance + $maint + $hoa;
  const expenses =
    payload.taxes + payload.insurance + payload.maint + payload.hoa;

  let $next_rent = 0;
  let $next_exps = 0;
  let $next_cash = 0;
  let $cum_cash = 0;

  let $cumcash01 = 0;
  let $cumcash05 = 0;
  let $cumcash10 = 0;
  let $cumcash15 = 0;
  let $cumcash20 = 0;
  let $cumcash25 = 0;
  let $cumcash30 = 0;

  for ($n = 1; $n <= $time; $n++) {
    if ($n == 1) {
      $next_rent = payload.rent;
      $next_exps = expenses;
    } else {
      $next_rent = $next_rent * (1 + $rate / 100);
      $next_exps = $next_exps * (1 + $rate / 100);
    }

    $next_cash = ($next_rent - $next_exps - payload.mortgageMonth) * 12;
    $cum_cash = $cum_cash + $next_cash;

    if ($n == 1) {
      $cumcash01 = $cum_cash;
    } else if ($n == 5) {
      $cumcash05 = $cum_cash;
    } else if ($n == 10) {
      $cumcash10 = $cum_cash;
    } else if ($n == 15) {
      $cumcash15 = $cum_cash;
    } else if ($n == 20) {
      $cumcash20 = $cum_cash;
    } else if ($n == 25) {
      $cumcash25 = $cum_cash;
    } else if ($n == 30) {
      $cumcash30 = $cum_cash;
    } else {
      //nothing
    }
  }

  return nullToZero({
    $cum_cash,
    $cumcash01,
    $cumcash05,
    $cumcash10,
    $cumcash15,
    $cumcash20,
    $cumcash25,
    $cumcash30,
  });
  //console
};

export const cumilativeAppreciation = (payload: IPropertyAttributes) => {
  let $apprec01 = 0;
  let $apprec05 = 0;
  let $apprec10 = 0;
  let $apprec15 = 0;
  let $apprec20 = 0;
  let $apprec25 = 0;
  let $apprec30 = 0;

  let $time = 30;
  let $rate = 3;
  let $n = 1;
  for ($n = 1; $n <= $time; $n++) {
    let $next_appr =
      payload.price * Math.pow(1 + $rate / 100, $n) - payload.price;

    if ($n == 1) {
      $apprec01 = $next_appr;
    } else if ($n == 5) {
      $apprec05 = $next_appr;
    } else if ($n == 10) {
      $apprec10 = $next_appr;
    } else if ($n == 15) {
      $apprec15 = $next_appr;
    } else if ($n == 20) {
      $apprec20 = $next_appr;
    } else if ($n == 25) {
      $apprec25 = $next_appr;
    } else if ($n == 30) {
      $apprec30 = $next_appr;
    } else {
      //nothing
    }
  }

  return nullToZero({
    $apprec01,
    $apprec05,
    $apprec10,
    $apprec15,
    $apprec20,
    $apprec25,
    $apprec30,
  });
};
