'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('teacher_courses', 'teacher_courses_teacherId_fkey')

    await queryInterface.addConstraint('teacher_courses', {
      fields: ['teacherId'],
      type: 'foreign key',
      name: 'teacher_courses_teacherId_fkey',
      references: {
        table: 'teachers',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('teacher_courses', 'teacher_courses_teacherId_fkey')

    await queryInterface.addConstraint('teacher_courses', {
      fields: ['teacherId'],
      type: 'foreign key',
      name: 'teacher_courses_teacherId_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  }
};
