"use strict";
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
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
        type: DataTypes.UUIDV4,
        allowNull: false,
      },
      subscribed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      validFlag: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
