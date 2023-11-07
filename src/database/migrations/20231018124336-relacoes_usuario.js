'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Users',{
      type:'foreign key',
      fields:['cursoId'],
      name: 'usuario_curso_fk',
      references: {
        table: 'Cursos',
        field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
    })  //user não pode nem deletar nem atualizar diretamente
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'Users',
      'usuario_curso_fk'
    )
  }
};
