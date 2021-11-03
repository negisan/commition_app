'use strict'
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const now = new Date()
    return queryInterface.bulkInsert('Artworks', [
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/beach1.jpg')
          .toString('base64'),
      },
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/beach2.jpg')
          .toString('base64'),
      },
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/book1.jpg')
          .toString('base64'),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Artworks', null, {})
  },
}
