import { Models } from "../models";
import { IVerificationCodeInstance } from "../interfaces/models/verificationCode";
import { IVerifyCode } from "../interfaces/auth";
import {
  IVerificationCodeInsert,
  IVerificationCodeGet,
} from "../interfaces/verficationCode";

const VerificationCode = Models.verificationCode;

export const insertVerificationCode = async (
  payload: IVerificationCodeInsert
): Promise<IVerificationCodeInstance> => {
  return VerificationCode.create({
    id: 0,
    ...payload,
  });
};

export const getVerificationCode = async (
  params: IVerifyCode
): Promise<IVerificationCodeInstance | null> => {
  return VerificationCode.findOne({ where: params });
};

export const removeVerificationCode = async (id: number): Promise<number> => {
  return VerificationCode.destroy({
    where: {
      id,
    },
  });
};

// removeVerificationCodeByParams;
export const removeVerificationCodeByParams = async (
  params: any
): Promise<number> => {
  return VerificationCode.destroy({
    where: params,
  });
};
