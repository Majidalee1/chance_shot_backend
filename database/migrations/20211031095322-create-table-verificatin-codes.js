"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("verificationCodes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(100),
        max: 100,
        allowNull: false,
        isEmail: true,
      },

      code: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM("forgot", "authorize"),
        validate: {
          isIn: [["forgot", "authorize"]],
        },
        allowNull: true,
      },
      expiresAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable("verificationCodes");
  },
};
