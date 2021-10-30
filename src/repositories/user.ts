import { Models } from "../models/index";
import { IUserRegister } from "../interfaces/auth";

const Member = Models.user;

export const isUserNameExists = async (email: string): Promise<boolean> => {
  return !!(await Member.find({ where: { email } }));
};

// insertUser
export const insertUser = async (payload: IUserRegister) => {
  const user = Member.create(payload);
  return user;
};

// findUserByEmail
export const findUserByEmail = async (email: string) => {
  return Member.find({ where: { email } });
};

// checkIfUserIsInactive
export const checkIfUserIsInactive = async (email: string) => {
  return !!Member.find({ where: { email, isActive: false } });
};

// findUserById
export const findUserById = async (id: number) => {
  return Member.findById(id);
};
