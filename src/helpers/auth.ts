import { unauthorized } from "boom";
import { decode, sign, verify } from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_TOKEN_EXPIRATION,
  JWT_ISSUER,
} from "../constants/application";
import { IMemberAttributes } from "../interfaces/models/user";
import * as crypto from "crypto";
import * as verificationCodeRepo from "../repositories/verficationCode";
import { Verification } from "../constants/application";
import * as moment from "moment";
import { removeVerificationCode } from "../repositories/verficationCode";

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

// createAndSendResetEmail;
export const createAndSendResetEmail = async (email: string, type: string) => {
  const code = generateVerificationCode();
  await verificationCodeRepo.removeVerificationCodeByParams({ email, type });
  return await verificationCodeRepo.insertVerificationCode({
    email: email,
    code,
    type: type,
    expiresAt: moment().add(1, "hour").valueOf(),
  });
};

// generateResetToken();
export const generateResetToken = async () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return resetToken;
};

// generate 6 digit random numbers
const generateVerificationCode = () =>
  (Math.floor(Math.random() * 1000000) + 1000000).toString().substring(1);
