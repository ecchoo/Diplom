'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_practical_tasks', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      practicalTaskId: {
        references: {
          model: 'practical_tasks',
          key: 'id',
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      filePath: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      userId: {
        references: {
          model: 'users',
          key: 'id',
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
      }
    })

    await queryInterface.addConstraint('user_practical_tasks', {
      fields: ['practicalTaskId', 'userId'],
      type: 'unique',
      name: 'unique_practicalTaskId_userId'
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_practical_tasks')
    await queryInterface.removeConstraint('user_practical_tasks', 'unique_practicalTaskId_userId');
  }
};
