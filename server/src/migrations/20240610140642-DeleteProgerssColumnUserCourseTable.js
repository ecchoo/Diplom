'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_courses', 'progress')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_courses', 'progress', {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    })
  }
};
