'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_courses', 'progress', {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_courses', 'progress', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    })
  }
};
