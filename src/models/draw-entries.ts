import * as Sequelize from "sequelize";
import { of } from "../helpers/types";

export interface IdrawEntriesAttributes {
  id: number;
  drawId: number;
  userId: string;
  entryCode: string;
  entryStatus: string;
  createdAt: String;
  updatedAt: String;
}

export type drawEntriesInstance = Sequelize.Instance<IdrawEntriesAttributes> &
  IdrawEntriesAttributes;

export type drawEntriesModel = Sequelize.Model<
  drawEntriesInstance,
  IdrawEntriesAttributes
>;

export type IDrawEntry = of<IdrawEntriesAttributes>;

// type Partial<T> = { [P in keyof T]?: T[P] | undefined; }

//   SequelizeAttributes;
export type SequelizeAttributes<T> = {
  [P in keyof T]: Sequelize.DefineAttributeColumnOptions;
};

export default function (sequelize: Sequelize.Sequelize): drawEntriesModel {
  const attributes: SequelizeAttributes<IdrawEntriesAttributes> = {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    drawId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    entryCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    entryStatus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  };

  const drawEntries = sequelize.define<
    drawEntriesInstance,
    IdrawEntriesAttributes
  >("drawEntries", attributes, {
    timestamps: true,
  });

  drawEntries.associate = (models) => {
    drawEntries.belongsTo(models.draw, {
      foreignKey: "drawId",
      as: "draw",
    });
    drawEntries.belongsTo(models.user, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return drawEntries;
}
