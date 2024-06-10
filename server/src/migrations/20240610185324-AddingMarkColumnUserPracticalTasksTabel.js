'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_practical_tasks', 'mark', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user_practical_tasks', 'mark')
  }
};
