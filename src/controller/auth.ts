import { Context } from "koa";
import { IUserLogin, IUserRegister } from "../interfaces/auth";
// import as authService
import * as authService from "../services/auth";

//  login user from repositories
export const loginUser = async (ctx: Context, next: () => void) => {
  const payload: IUserLogin = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };

  ctx.body = await authService.loginUser(payload);
  await next();
};

export const insertUser = async (ctx: Context, next: () => void) => {
  // cretate payload object type IUserRegister
  console.log(ctx.request.body);

  const payload: IUserRegister = {
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };

  ctx.body = await authService.insertUser(payload);
  next();
};
