import { forbidden } from "boom";
import { Context } from "koa";
import { IAccessTokenAttr, validateLocalToken } from "../helpers/auth";
import { findUserById } from "../repositories/user";
import { IMemberAttributes } from "../interfaces/models/user";
import * as Boom from "boom";

export const authMiddleware = async (ctx: Context, next: () => void) => {
  const token: string | null = (ctx.header.authorization ||
    ctx.request.headers.token ||
    ctx.request.query.token) as string;

  if (!token) {
    throw forbidden("error.token.invalid");
  }

  let decodedJWT = {} as IAccessTokenAttr;
  try {
    decodedJWT = await validateLocalToken(token);
    console.log(
      "🚀 ~ file: auth.ts ~ line 19 ~ authMiddleware ~ decodedJWT",
      decodedJWT
    );
  } catch (e) {
    console.log(e);
  }

  const user = await findUserById(decodedJWT.userId);
  // user || Boom.badRequest("error.user.does_not_exists");

  ctx.state.user = {
    ...(user?.dataValues as IMemberAttributes),
  };
  await next();
};
