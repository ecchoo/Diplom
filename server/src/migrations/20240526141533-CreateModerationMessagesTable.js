'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('moderation_messages', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      moderatorId: {
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      messageId: {
        references: {
          model: 'messages',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('moderation_messages')
  }
};
