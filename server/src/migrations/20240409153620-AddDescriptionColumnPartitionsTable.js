'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('partitions', 'description', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING 
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('partitions', 'description')
  }
};
