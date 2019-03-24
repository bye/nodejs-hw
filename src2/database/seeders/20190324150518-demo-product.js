'use strict';
const data = require('../../models/products');

module.exports = {
  up: (queryInterface, Sequelize) => {
   
      return queryInterface.bulkInsert('Products', data, {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Products', null, {});
  }
};

