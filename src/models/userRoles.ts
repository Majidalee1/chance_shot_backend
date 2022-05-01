// userRoles model
import * as Sequelize from "sequelize";
import { of } from "../helpers/types";

export type IUserRoleAttributes = {
  id: number;
  userId: string;
  role: string;
} & Sequelize.DefineAttributes;

export type IUserRoleInstance = Sequelize.Instance<IUserRoleAttributes> &
  IUserRoleAttributes;

export type IUserRole = of<IUserRoleAttributes>;

export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IUserRoleInstance, IUserRoleAttributes> {
  const UserRole = sequelize.define<IUserRoleInstance, IUserRoleAttributes>(
    "userRole",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      },
    },
    {
      timestamps: false,
    }
  );

  UserRole.associate = (models) => {
    UserRole.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return UserRole;
}
