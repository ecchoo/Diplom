'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'chatId', {
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
    })
    await queryInterface.addConstraint('courses', {
      fields: ['chatId'],
      type: 'foreign key',
      name: 'courses_role_fkey',
      references: {
        table: 'chats',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('courses', 'courses_role_fkey');
    await queryInterface.removeColumn('courses', 'chatId')
  }
};
