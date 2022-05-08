import * as Sequelize from "sequelize";
import { of } from "../helpers/types";
import { IDrawInfo } from "./draw-Info";

export type IDrawAttributes = {
  id: number;
  name: string;
  drawCode: string;
  typeId: number;
  totalTickets: number;
  ticketsAvaliable: number;
  status: string;
  drawInfo: IDrawInfo;
  createdAt: Date;
  updatedAt: Date;
  winnerEntryId: string | null;
};

export type IDraw = of<IDrawAttributes>;
export type IDrawInstance = Sequelize.Instance<IDrawAttributes> & {
  dataValues: IDrawAttributes;
};

export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IDrawInstance, IDrawAttributes> {
  const Draw = sequelize.define<IDrawInstance, IDrawAttributes>("draw", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //name,drawCode,typeId,totalTickets,ticketsAvaliable,status,createdAt,updatedAt,winnerEntry
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    drawCode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    typeId: {
      type: Sequelize.INTEGER,
      // drawType references to DrawTypes table
      allowNull: false,
      references: {
        model: "drawTypes",
        key: "id",
      },
    },
    totalTickets: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ticketsAvaliable: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "open",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    winnerEntryId: {
      type: Sequelize.STRING,
      allowNull: true,
      // refrences to DrawEntries table
      references: {
        model: "DrawEntries",
        key: "id",
      },
    },
  });
  Draw.associate = (models) => {
    Draw.belongsTo(models.drawType, {
      foreignKey: "typeId",
      as: "drawType",
    });
    Draw.hasMany(models.drawEntries, {
      foreignKey: "drawId",
      as: "drawEntries",
    });
    Draw.hasOne(models.drawEntries, {
      foreignKey: "id",
      as: "winnerEntry",
    });
    Draw.hasOne(models.drawInfo, {
      foreignKey: "drawId",
      as: "drawInfo",
    });
  };
  return Draw;
}
