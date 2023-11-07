'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Areas', [
      {
        id:1,  
        nome: 'Ciências Exatas',
        createdAt: new Date(), 
        updatedAt: new Date(), 
      },
      {
        id:2,  
        nome: 'Ciências Humanas',
        createdAt: new Date(), 
        updatedAt: new Date(), 
      },
      {
        id:3,  
        nome: 'Ciências Biológicas',
        createdAt: new Date(), 
        updatedAt: new Date(), 
      },

    ], {});
  },

  async down (queryInterface, Sequelize) { 
    await queryInterface.bulkDelete('Areas', null, {});
  }
};
