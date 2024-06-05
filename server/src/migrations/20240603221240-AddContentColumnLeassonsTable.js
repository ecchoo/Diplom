'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('leassons', 'content', {
      allowNull: false,
      type: Sequelize.DataTypes.TEXT
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('leassons', 'content')
  }
};
