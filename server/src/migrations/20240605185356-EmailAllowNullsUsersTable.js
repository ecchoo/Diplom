'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      unique: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'email', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    })
  }
};
