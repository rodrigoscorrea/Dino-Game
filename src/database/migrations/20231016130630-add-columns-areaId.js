'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Cursos','areaId',{type: Sequelize.INTEGER})
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Cursos','areaId')
  }
};
