'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Users', [{
        nome: 'Max Costa',
        email: 'max@uhull.net',
        celular: '(855) 99746-8372',
        is_Admin: true,
        senha: bcrypt.hashSync('12345', 10),
      },
      {
        nome: 'Hallex Abreu',
        email: 'hallex@uhull.net',
        celular: '(855) 99999-3333',
        is_Admin: false,
        senha: bcrypt.hashSync('12345', 10),
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
