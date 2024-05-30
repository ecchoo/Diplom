'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locked_users', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      userId: {
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      chatId: {
        references: {
          model: 'chats',
          key: 'id'
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      reason: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      duration: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
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
    await queryInterface.dropTable('locked_users')
  }
};
