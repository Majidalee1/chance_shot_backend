import * as Boom from "boom";
import { compareSync, hashSync } from "bcryptjs";
import * as verificationCodeRepo from "../repositories/verficationCode";
import * as profileRepo from "../repositories/profile";

import {
  IUserLogin,
  IUserRegister,
  IForgotPassword,
  IVerifyCode,
} from "../interfaces/auth";
import {
  validateForgotPassword,
  validateLogin,
  validateRegister,
} from "../schema/validations/auth";
// import { User } from "../../models/users";
import { isUserNameExists, checkIfUserIsInactive } from "../repositories/user";
import * as userRepo from "../repositories/user";
import { IMemberInstance } from "../interfaces/models/user";
import { createAndSendResetEmail } from "../helpers/auth";
import { Verification } from "../constants/application";
import { validateVerifyCode } from "../schema/validations/auth";
import { editProfile } from "../controller/profile";

export const loginUser = async (payload: IUserLogin) => {
  payload = await validateLogin?.validateAsync(payload);

  // check if user exists
  const checkIfUserExists = await isUserNameExists(payload.email);
  if (!checkIfUserExists) {
    throw Boom.badRequest("User does not exist");
  }

  // find user by email
  const user = await userRepo.findUserByEmail(payload.email);
  // check if password is correct
  const verified = await compareSync(
    payload.password,
    user?.dataValues.password || ""
  );

  if (!verified) {
    throw Boom.unauthorized("error.user.incorrect_password");
  }
  await throwIfUserIsDisabled(user!);

  return user;
};

// insertUser
export const insertUser = async (payload: IUserRegister) => {
  payload = await validateRegister.validateAsync(payload);

  // check if user exists
  const checkIfUserExists = await isUserNameExists(payload.email);
  if (checkIfUserExists) {
    throw Boom.conflict("error.user.already_exists");
  }
  payload.password = await hashSync(payload.password, 10);
  // insert user into database
  const User = await userRepo.insertUser(payload);

  return User;
};

// forgotPassword;
export const forgotPassword = async (payload: IForgotPassword) => {
  payload = await validateForgotPassword.validateAsync(payload);

  // check if user exists
  const checkIfUserExists = await isUserNameExists(payload.email);
  if (!checkIfUserExists) {
    throw Boom.conflict("user does not exists");
  }
  return await createAndSendResetEmail(
    payload.email,
    Verification.FORGOT_VERIFICATION_CODE
  );
};

// verify
export const verify = async (payload: IVerifyCode) => {
  payload = await validateVerifyCode.validateAsync(payload);

  const verificationCode = await verificationCodeRepo.getVerificationCode({
    email: payload.email,
    code: payload.code,
  });

  // IF NOT verificatin code found throw error
  if (!verificationCode) {
    throw Boom.badRequest("invalid_verification_code");
  }

  if (
    verificationCode?.dataValues.type ==
    Verification.AUTHORIZE_VERIFICATION_CODE
  ) {
    return activateUserAfterActivation({ email: payload.email });
  } else if (
    verificationCode?.dataValues.type == Verification.FORGOT_VERIFICATION_CODE
  ) {
    const password = payload.password;
    if (!password) {
      throw Boom.badRequest("password_required");
    }
    return updatePasswordAfterVerification({
      email: payload.email,
      password: payload.password!,
    });
  }
};

// activateUserAfterActivation

export const throwIfUserIsDisabled = (user: IMemberInstance) => {
  const User = user.dataValues;
  if (!User.validFlag) {
    createAndSendResetEmail(
      User.email,
      Verification.AUTHORIZE_VERIFICATION_CODE
    );
    throw Boom.locked("email unverfied");
  }
};

export const activateUserAfterActivation = async (payload: {
  email: string;
}) => {
  const checkIfUserExists = await isUserNameExists(payload.email);
  if (!checkIfUserExists) {
    throw Boom.conflict("user does not exists");
  }
  const user = await userRepo.findUserByEmail(payload.email);
  await profileRepo.editProfile(user?.dataValues.id!, {
    validFlag: "1",
  });
  return {
    type: Verification.AUTHORIZE_VERIFICATION_CODE,
    message: "Verification Success",
  };
};

export const updatePasswordAfterVerification = async (payload: {
  email: string;
  password: string;
}) => {
  const checkIfUserExists = await isUserNameExists(payload.email);
  if (!checkIfUserExists) {
    throw Boom.conflict("user does not exists");
  }
  const user = await userRepo.findUserByEmail(payload.email);
  await profileRepo.editProfile(user?.dataValues.id!, {
    password: hashSync(payload.password, 10),
  });

  return {
    type: Verification.FORGOT_VERIFICATION_CODE,
    message: "Password Reset sucessfull",
  };
};
