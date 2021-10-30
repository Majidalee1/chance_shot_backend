import { Context } from "koa";
import { IUserLogin, IUserRegister } from "../interfaces/auth";
// import as authService
import * as authService from "../services/auth";
import { IMemberAttributes } from "../interfaces/models/user";
import { generateAccessToken } from "../helpers/auth";

//  login user from repositories
export const loginUser = async (ctx: Context, next: () => void) => {
  const payload: IUserLogin = {
    email: ctx.request.body.email,
    password: ctx.request.body.password,
  };

  const response = await authService.loginUser(payload);
  const token = await generateAccessToken(response?.dataValues!);
  ctx.state.data = { token, response };
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

  ctx.state.data = await authService.insertUser(payload);
  next();
};
