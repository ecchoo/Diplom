'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_messages', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      type: {
        references: {
          model: 'message_types',
          key: 'name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.DataTypes.STRING,
      },
      status: {
        references: {
          model: 'message_statuses',
          key: 'name',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.DataTypes.STRING,
      },
      userId: {
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        type: Sequelize.DataTypes.INTEGER,
      },
      messageId: {
        references: {
          model: 'messages',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_messages')
  }
};
