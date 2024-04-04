'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lectures', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      leassonId: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'leassons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      theme: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      readingTime: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      material: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING, //alter
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
    await queryInterface.dropTable('lectures')
  }
};
