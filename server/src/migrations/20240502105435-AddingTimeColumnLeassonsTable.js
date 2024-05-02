'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('leassons', 'time', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('leassons', 'time')
  }
};
