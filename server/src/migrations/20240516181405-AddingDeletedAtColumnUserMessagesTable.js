'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_messages', 'deletedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true
    })  
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_messages', 'deletedAt')
  }
};
