'use strict';

const { FIELDS_STUDY } = require('../constants/fieldsStudy');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'fieldStudy', {
      allowNull: false,
      type: Sequelize.DataTypes.ENUM(Object.values(FIELDS_STUDY))
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('courses', 'fieldStudy')
  }
};
