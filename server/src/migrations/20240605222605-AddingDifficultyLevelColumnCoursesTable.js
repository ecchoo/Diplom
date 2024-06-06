'use strict';

const { DIFFICULTY_LEVELS } = require('../constants/difficultyLevels');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'difficultyLevel', {
      allowNull: false,
      type: Sequelize.DataTypes.ENUM(Object.values(DIFFICULTY_LEVELS))
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'difficultyLevel')
  }
};
