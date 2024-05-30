'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('chats', 'name', {
      allowNull: true,
      type: Sequelize.DataTypes.STRING
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('chats', 'name', {
      allowNull: false,
      type: Sequelize.DataTypes.STRING
    })
  }
};
