import { Context } from "koa";
import { IMemberAttributes } from "../interfaces/models/user";
import * as profileService from "../services/profile";
// get current user profile
// getProfile;

export const getProfile = async (ctx: Context, next: () => void) => {
  const UserAttribs: IMemberAttributes = ctx.state.user;
  console.log(
    "🚀 ~ file: profile.ts ~ line 9 ~ getProfile ~ UserAttribs",
    UserAttribs
  );
  ctx.state.data = await profileService.getProfile(UserAttribs);
  next();
};

// editProfile;
export const editProfile = async (ctx: Context, next: () => void) => {
  const UserAttribs: IMemberAttributes = ctx.state.user;
  const payload = ctx.request.body;
  ctx.state.data = await profileService.editProfile(UserAttribs.id!, payload);
  next();
};
