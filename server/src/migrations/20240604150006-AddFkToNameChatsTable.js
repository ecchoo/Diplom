'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('chats', {
      fields: ['name'],
      type: 'foreign key',
      name: 'course_name_fk',
      references: {
        table: 'courses',
        field: 'name'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('chats', 'course_name_fk')
  }
};
