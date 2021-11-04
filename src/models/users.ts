// define a sequelize model for users
import * as Sequelize from "sequelize";
import { IMemberAttributes, IMemberInstance } from "../interfaces/models/user";
import { DataTypes } from "sequelize";

const DataTypes = Sequelize;

/**
 * Defining main sequelize function for binding on the model index
 *
 * @param {Sequelize.Sequelize} sequelize
 * @returns
 */
export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IMemberInstance, IMemberAttributes> {
  const User = sequelize.define<IMemberInstance, IMemberAttributes>(
    "user",
    {
      //   implement attributes here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      validFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      sortBy: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "1",
      },
      listOrder: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "1",
      },
      intRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.04,
      },
      loanTerm: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },
      down: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.2,
      },
      points: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      minCashFlow: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 250,
      },
      minCapRate: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.08,
      },
      minCoc: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.08,
      },
      minRoi: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.2,
      },
      minNoi: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000,
      },
      minIrr: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.15,
      },
      minEqMult: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 1.5,
      },
      minRentMult: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 1.5,
      },
      createDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      lastModified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      timestamps: false,
    }
  );

  User.beforeUpdate(async (user, options) => {
    console.log(options);
    // user.sortBy = user.listOrder;
    console.log(user);
  });
  return User;
}
