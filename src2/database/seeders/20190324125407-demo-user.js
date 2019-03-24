'use strict';
const data = require('../../models/users');
module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log(data);
      return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};

