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
      // creator user1
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper1.jpg')
          .toString('base64'),
      },
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper2.jpg')
          .toString('base64'),
      },
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper3.jpg')
          .toString('base64'),
      },
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper4.jpg')
          .toString('base64'),
      },
      {
        creatorId: 1,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper5.jpg')
          .toString('base64'),
      },

      // creator user2
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper6.jpg')
          .toString('base64'),
      },
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper7.jpg')
          .toString('base64'),
      },
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper8.jpg')
          .toString('base64'),
      },
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper9.jpg')
          .toString('base64'),
      },
      {
        creatorId: 2,
        content: fs
          .readFileSync(__dirname + '/images/wallpaper10.jpg')
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
