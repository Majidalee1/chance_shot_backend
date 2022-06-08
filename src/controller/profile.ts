import { Context } from "koa";
import { IUserAttributes } from "../interfaces/models/user";
import * as profileService from "../services/profile";
// get current user profile
// getProfile;

export const getProfile = async (ctx: Context, next: () => void) => {
  const UserAttribs: IUserAttributes = ctx.state.user;

  ctx.state.data = await profileService.getProfile(UserAttribs);
  next();
};

// editProfile;
export const editProfile = async (ctx: Context, next: () => void) => {
  const UserAttribs: IUserAttributes = ctx.state.user;
  const payload = ctx.request.body;
  ctx.state.data = await profileService.editProfile(UserAttribs.id!, payload);
  next();
};

export const getUsersByAdmin = async (ctx: Context, next: () => void) => {
  ctx.state.data = await profileService.getUsersByAdmin();
  next();
};
