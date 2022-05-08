import * as Sequelize from "sequelize";
import { of } from "../helpers/types";

export interface IDrawInfoAttributes {
  id: number;
  drawId: number;
  city: string;
  country: string;
  address: string;
  area: number;
  noOfBedrooms: number;
  description: string;
  videoUrls: string[];
  imagesUrls: string[];
  longitude: number;
  latitude: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDrawInfoInstance
  extends Sequelize.Instance<IDrawInfoAttributes> {
  dataValues: IDrawInfoAttributes;
}

export type IDrawInfo = of<IDrawInfoAttributes>;

export default function (
  sequelize: Sequelize.Sequelize
): Sequelize.Model<IDrawInfoInstance, IDrawInfoAttributes> {
  const DrawInfo = sequelize.define<IDrawInfoInstance, IDrawInfoAttributes>(
    "drawInfo",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      drawId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Draws",
          key: "id",
        },
      },
      // city,country,address,area(m2),noOfBedrooms,description,videoUrls,imagesUrls,longitude,latitude,createdAt,updatedAt
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      noOfBedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      videoUrls: {
        // array of strings
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      imagesUrls: {
        // array of strings
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: [],
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.FLOAT,
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
    }
  );
  DrawInfo.associate = (models) => {
    DrawInfo.belongsTo(models.draw, {
      foreignKey: "drawId",
      as: "draw",
    });
  };
  return DrawInfo;
}
