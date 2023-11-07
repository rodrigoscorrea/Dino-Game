'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Partidas',{
      type:'foreign key',
      fields:['userId'],
      name: 'partidas_users_fk',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })  //user não pode nem deletar nem atualizar diretamente
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Partidas',
      'partidas_users_fk'
    )
  }
};
