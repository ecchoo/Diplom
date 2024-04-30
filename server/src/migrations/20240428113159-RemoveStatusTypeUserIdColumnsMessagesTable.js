'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('messages', 'messages_status_fkey')
    await queryInterface.removeColumn('messages', 'status')

    await queryInterface.removeConstraint('messages', 'messages_type_fkey')
    await queryInterface.removeColumn('messages', 'type')

    await queryInterface.removeConstraint('messages', 'messages_userId_fkey')
    await queryInterface.removeColumn('messages', 'userId')
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('messages', 'status', {
      references: {
        model: 'message_statuses',
        key: 'name',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: Sequelize.DataTypes.STRING,
    })

    await queryInterface.addColumn('messages', 'type', {
      references: {
        model: 'message_types',
        key: 'name',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: Sequelize.DataTypes.STRING,
    })

    await queryInterface.addColumn('messages', 'userId', {
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      type: Sequelize.DataTypes.INTEGER,
    })
  }
};
