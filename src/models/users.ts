// define a sequelize model for users
import * as Sequelize from "sequelize";
import { DataTypes } from "sequelize";
import { IUserAttributes, IUserInstance } from "../interfaces/models/user";

const DataTypes = Sequelize;

export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IUserInstance, IUserAttributes> {
  const User = sequelize.define<IUserInstance, IUserAttributes>("user", {
    id: {
      type: DataTypes.UUIDV4,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    // phone,roleId,country,city,address,idOrPassportNumber,isProfileCompleted,isActive,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    idOrPassportNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isProfileCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.userRole, {
      foreignKey: "userId",
      as: "userRole",
    });
  };

  return User;
}
