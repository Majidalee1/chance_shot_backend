import { Context } from "koa";
import {
  IForgotPassword,
  IUserLogin,
  IUserRegister,
  IVerifyCode,
} from "../interfaces/auth";
// import as authService
import { generateAccessToken } from "../helpers/auth";
import * as authService from "../services/auth";

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

  const payload: IUserRegister = {
    firstName: ctx.request.body.firstName,
    lastName: ctx.request.body.lastName,
    email: ctx.request.body.email,
    phone: ctx.request.body.phone,
    password: ctx.request.body.password,
    role: ctx.request.body.role || "user",
    isActive: true,
  };

  const { password, ...response } = await authService.insertUser(payload);

  ctx.state.data = response;
  next();
};

// forgotPassword;
export const forgotPassword = async (ctx: Context, next: () => void) => {
  const payload: IForgotPassword = {
    email: ctx.request.body.email,
  };

  ctx.state.data = await authService.forgotPassword(payload);
  // ctx.state.data = { message: "Password reset email sent" };
  next();
};

// verify
export const verify = async (ctx: Context, next: () => void) => {
  const payload: IVerifyCode = {
    email: ctx.request.body.email,
    code: ctx.request.body.code,
    password: ctx.request.body.password,
  };
  ctx.state.data = await authService.verify(payload);
  // ctx.state.data = { message: "Password reset email sent" };
  next();
};

// setPassword;
// export const setPassword = async (ctx: Context, next: () => void) => {
//   await services.setPassword(ctx.request.body);
//   ctx.state.data = { message: "Your password has been changed successfully." };
//   next();
// };
