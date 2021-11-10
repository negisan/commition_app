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
    const artworks = []
    for (let i = 0; i < 5; i++) {
      artworks.push({
        creatorId: 1,
        content: __dirname + `/images/wallpaper${i + 1}.jpg`,
        createdAt: now,
        updatedAt: now,
      })
    }
    for (let i = 5; i < 20; i++) {
      artworks.push({
        creatorId: 2,
        content: __dirname + `/images/wallpaper${i + 1}.jpg`,
        createdAt: now,
        updatedAt: now,
      })
    }
    return queryInterface.bulkInsert('Artworks', artworks)
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
