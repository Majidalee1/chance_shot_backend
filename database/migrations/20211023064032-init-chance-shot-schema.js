"use strict";
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;

// createTableUsers
const createTableUsers = (queryInterface) => {
  return queryInterface.createTable("users", {
    id: {
      type: DataTypes.STRING,
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
};

// /creteTableUserRoles
const createTableUserRoles = (queryInterface) => {
  return queryInterface.createTable("UserRoles", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      refrences: {
        model: "Users",
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// create table draws
const createTableDraws = (queryInterface) => {
  return queryInterface.createTable("Draws", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    //name,drawCode,typeId,totalTickets,ticketsAvaliable,status,createdAt,updatedAt,winnerEntry
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    drawCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      // drawType references to DrawTypes table
      allowNull: false,
      refrences: {
        model: "DrawTypes",
        key: "id",
      },
    },
    totalTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketsAvaliable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "open",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    winnerEntryId: {
      type: DataTypes.STRING,
      allowNull: true,
      // refrences to DrawEntries table
      refrences: {
        model: "DrawEntries",
        key: "id",
      },
    },
  });
};

// drawInfo
const createTableDrawInfo = (queryInterface) => {
  return queryInterface.createTable("DrawInfo", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    drawId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: "Draws",
        key: "id",
      },
    },
    // city,country,address,area(m2),noOfBedrooms,description,videoUrls,imagesUrls,longitude,latitude,createdAt,updatedAt
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    noOfBedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrls: {
      // array of strings
      type: DataTypes.JSON([]),
      allowNull: true,
    },
    imagesUrls: {
      // array of strings
      type: DataTypes.JSON([]),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
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
};

// create table drawEntries
const createTableDrawEntries = (queryInterface) => {
  return queryInterface.createTable("DrawEntries", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    drawId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: "Draws",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refrences: {
        model: "Users",
        key: "id",
      },
    },
    //entryCode,entryStatus,createdAt,updatedAt
    entryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
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
};

// DrawTypes
const createTableDrawTypes = (queryInterface) => {
  return queryInterface.createTable("DrawTypes", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    // run all migrations within a transaction and rollback on error
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        createTableUserRoles(queryInterface),
        createTableUsers(queryInterface),
        createTableDrawTypes(queryInterface),
        createTableDraws(queryInterface),
        createTableDrawInfo(queryInterface),
        createTableDrawEntries(queryInterface),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    // reverse all migrations
    // rollback all migrations
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable("UserRoles"),
        queryInterface.dropTable("Users"),
        queryInterface.dropTable("DrawTypes"),
        queryInterface.dropTable("Draws"),
        queryInterface.dropTable("DrawInfo"),
        queryInterface.dropTable("DrawEntries"),
      ]);
    });
  },
};
