import * as Sequelize from "sequelize";
import { of } from "../helpers/types";

export type IDrawTypeAttributes = {
  id: number;
  type: string;
} & Sequelize.DefineAttributes;

export type IDrawTypeInstance = Sequelize.Instance<IDrawTypeAttributes> & {
  dataValues: IDrawTypeAttributes;
};

export type IDrawType = of<IDrawTypeAttributes>;

export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IDrawTypeInstance, IDrawTypeAttributes> {
  const DrawType = sequelize.define<IDrawTypeInstance, IDrawTypeAttributes>(
    "drawType",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return DrawType;
}
