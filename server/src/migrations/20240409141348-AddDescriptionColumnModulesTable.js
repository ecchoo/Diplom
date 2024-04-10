'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('modules', 'description', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('modules', 'description')
  }
};
