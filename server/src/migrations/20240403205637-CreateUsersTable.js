'use strict';

const { ROLES } = require('../constants/roles')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.DataTypes.ENUM(Object.values(ROLES)),
        defaultValue: ROLES.STUDENT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users')
  }
};
