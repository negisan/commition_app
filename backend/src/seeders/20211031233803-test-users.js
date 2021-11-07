'use strict'
const bcrypt = require('bcrypt')

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
    const hash = await bcrypt.hash('string', 10)
    return queryInterface.bulkInsert(
      'Users',
      [
        // creator & client sample
        {
          name: 'john',
          email: 'string@email.com',
          hash: hash,
          icon: null,
          default_order_price: 1000,
          accepting_order: true,
          cash: 5000,
          isCreator: true,
          isClient: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'vodka',
          email: 'string2@email.com',
          hash: hash,
          icon: null,
          default_order_price: 5000,
          accepting_order: true,
          cash: 1000,
          isCreator: true,
          isClient: true,
          createdAt: now,
          updatedAt: now,
        },
        // client sample
        {
          name: 'whisky',
          email: 'string3@email.com',
          hash: hash,
          icon: null,
          default_order_price: 12000,
          accepting_order: true,
          cash: 1000,
          isCreator: false,
          isClient: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'wine',
          email: 'string4@email.com',
          hash: hash,
          icon: null,
          default_order_price: 5000,
          accepting_order: true,
          cash: 1000,
          isCreator: false,
          isClient: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'pisco',
          email: 'string5@email.com',
          hash: hash,
          icon: null,
          default_order_price: 9000,
          accepting_order: false,
          cash: 1000,
          isCreator: false,
          isClient: true,
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {})
  },
}
