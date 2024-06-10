'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('practical_tasks', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      condition: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      leassonId: {
        references: {
          model: 'leassons',
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('practical_tasks')
  }
};