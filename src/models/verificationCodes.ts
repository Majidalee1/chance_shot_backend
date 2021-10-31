import * as Sequelize from "sequelize";
import {
  IVerificationCodeAttributes,
  IVerificationCodeInstance,
} from "../interfaces/models/verificationCode";
import { Verification as AppSettings } from "../constants/application";

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IVerificationCodeAttributes, IVerificationCodeInstance> {
  const verificationCode = sequelize.define<
    IVerificationCodeAttributes,
    IVerificationCodeInstance
  >("verificationCode", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100],
      },
    },
    code: {
      type: Sequelize.STRING(10),
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM(
        AppSettings.FORGOT_VERIFICATION_CODE,
        AppSettings.AUTHORIZE_VERIFICATION_CODE
      ),
      validate: {
        isIn: [
          [
            AppSettings.FORGOT_VERIFICATION_CODE,
            AppSettings.AUTHORIZE_VERIFICATION_CODE,
          ],
        ],
      },
      allowNull: true,
    },
    expiresAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });

  return verificationCode;
}
