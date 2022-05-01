import { Models } from "../models/index";
import { IUserRegister } from "../interfaces/auth";
import { IUserAttributes } from "../interfaces/models/user";
import * as uuid from "uuid";
import { IUserRoleAttributes } from "../models/userRoles";

const Member = Models.user;

export const isUserNameExists = async (email: string): Promise<boolean> => {
  return !!(await Member.find({ where: { email } }));
};

// insertUser
export const insertUser = async (
  payload: IUserAttributes,
  role: string = "user"
) => {
  payload.id = uuid.v4();

  payload.userRole = {
    role: role,
    userId: payload.id,
  } as IUserRoleAttributes;
  const user = Member.create(payload, {
    include: [
      {
        model: Models.userRole,
        as: "userRole",
      },
    ],
  });
  return user;
};

// findUserByEmail
export const findUserByEmail = async (email: string) => {
  return Member.find({
    where: { email },
    include: [{ model: Models.userRole, as: "userRole" }],
  });
};

// checkIfUserIsInactive
export const checkIfUserIsInactive = async (email: string) => {
  return !!Member.find({ where: { email, isActive: false } });
};

// findUserById
export const findUserById = async (id: string) => {
  return Member.findById(id);
};
