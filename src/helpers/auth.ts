import { unauthorized } from "boom";
import { decode, sign, verify } from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_TOKEN_EXPIRATION,
  JWT_ISSUER,
} from "../constants/application";
import { IMemberAttributes } from "../interfaces/models/user";

export type IAccessTokenAttr = {
  userId: number;
  email: string;
  userName: string;
};
export const validateLocalToken = async (token: string) => {
  try {
    verify(token, JWT_SECRET, { ignoreExpiration: true });
  } catch (err) {
    throw unauthorized("error.token.invalid");
  }
  const decodedJwt: any = decode(token, { complete: true });
  return decodedJwt.payload;
};

export const generateAccessToken = async (payload: IMemberAttributes) => {
  const user: IAccessTokenAttr = {
    userId: payload.id!,
    email: payload.email,
    userName: payload.firstName + payload.lastName,
    // cognitoId: payload.id,
  };
  return sign(user, JWT_SECRET, {
    expiresIn: JWT_TOKEN_EXPIRATION,
    issuer: JWT_ISSUER,
  });
};
