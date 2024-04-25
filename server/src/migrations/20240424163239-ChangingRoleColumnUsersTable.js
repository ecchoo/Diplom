'use strict';

const { ROLES } = require('../constants/roles');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.DataTypes.STRING, 
      allowNull: false,
      defaultValue: ROLES.STUDENT,
    });

    await queryInterface.addConstraint('users', {
      fields: ['role'],
      type: 'foreign key',
      name: 'users_role_fk',
      references: {
        table: 'roles',
        field: 'name'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'users_role_fk');

    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM(Object.values(ROLES)),
      allowNull: false,
      defaultValue: ROLES.STUDENT,
    });
  }
};
