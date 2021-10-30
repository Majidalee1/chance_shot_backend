import * as Boom from "boom";
import { compareSync, hashSync } from "bcryptjs";

import { IUserLogin, IUserRegister } from "../interfaces/auth";
import { validateLogin, validateRegister } from "../schema/validations/auth";
// import { User } from "../../models/users";
import { isUserNameExists, checkIfUserIsInactive } from "../repositories/user";
import * as userRepo from "../repositories/user";
import { IMemberInstance } from "../interfaces/models/user";

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

export const throwIfUserIsDisabled = (user: IMemberInstance) => {
  if (!user.dataValues.validFlag) {
    throw Boom.forbidden("error.user.is_disabled");
  }
};
