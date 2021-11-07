import { Context } from "koa";
import {
  IPropertyCreate,
  IPropertyUpdate,
  IPropertyGet,
} from "../interfaces/property";
import * as propertyService from "../services/properties";
import { findUserById } from "../repositories/user";
import * as Boom from "boom";
import { IMemberAttributes } from "../interfaces/models/user";
import { USER_SEARCH_PREFERENCES } from "../constants/application";
// create propeties

export const create = async (ctx: Context, next: () => void) => {
  const userAttribs: IMemberAttributes = ctx.state.user;
  if (!userAttribs) {
    Boom.badRequest("user doesn't exists");
  }

  const payload: IPropertyCreate = {
    memberId: userAttribs.id!,
    address: ctx.request.body.address,
    city: ctx.request.body.city,
    state: ctx.request.body.state,
    zip: ctx.request.body.zip,
    price: ctx.request.body.price,
    closing: ctx.request.body.closing,
    interest: userAttribs.intRate!,
    term: userAttribs.loanTerm!,
    down: userAttribs.down!,
    points: userAttribs.points!,
    rent: ctx.request.body.rent,
    taxes: ctx.request.body.taxes,
    insurance: ctx.request.body.insurance,
    maint: ctx.request.body.maint,
    hoa: ctx.request.body.hoa,
    capExp: ctx.request.body.capExp,
  };

  ctx.state.data = await propertyService.create(payload);
  await next();
};

// edit
export const edit = async (ctx: Context, next: () => void) => {
  // implement interface IPropertyUpdate
  // const payload: IPropertyUpdate = {
  //   propertyId: ctx.request.body.propertyId,
  //   price: ctx.request.body.price,
  //   closing: ctx.request.body.closing,
  //   interest: ctx.request.body.interest,
  //   term: ctx.request.body.term,
  //   down: ctx.request.body.down,
  //   points: ctx.request.body.points,
  //   rent: ctx.request.body.rent,
  //   taxes: ctx.request.body.taxes,
  //   insurance: ctx.request.body.insurance,
  //   repairs: ctx.request.body.repairs,
  //   hoa: ctx.request.body.hoa,
  //   capExp: ctx.request.body.capExp,
  // };

  const payload = ctx.request.body;

  ctx.state.data = await propertyService.update(payload);
  next();
};

// getById;
export const getById = async (ctx: Context, next: () => void) => {
  const response = await propertyService.getById(ctx.params.id);
  ctx.state.data = response;
  await next();
};

// getALLproperties
export const getAll = async (ctx: Context, next: () => void) => {
  const userAttribs: IMemberAttributes = ctx.state.user;

  const payload: IPropertyGet = {
    memberId: userAttribs.id!,
    sortBy: USER_SEARCH_PREFERENCES[+userAttribs.sortBy!],
  };

  const reponse = await propertyService.getAll(payload);
  ctx.state.data = await reponse;
  await next();
};
