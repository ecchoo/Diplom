'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: false,
    })
  }
};
