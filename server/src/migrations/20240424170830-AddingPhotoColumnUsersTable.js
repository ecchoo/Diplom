'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'photo', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      defaultValue: '/avatar.jpg'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'photo')
  }
};
