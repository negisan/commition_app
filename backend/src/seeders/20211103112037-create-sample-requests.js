'use strict'

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
    return queryInterface.bulkInsert('Requests', [
      {
        creatorId: 1,
        clientId: 2,
        state_default: false,
        progressing: false,
        submitted: false,
        done: true,
        cancel: false,
        order_price: 1000,
        order_content: 'creator1 client2 完了',
        artworkId: 1,
        thanks_comment: 'ありがとうございます',
        createdAt: now,
        updatedAt: now,
      },
      {
        creatorId: 2,
        clientId: 1,
        state_default: false,
        progressing: false,
        submitted: false,
        done: true,
        cancel: false,
        order_price: 1000,
        order_content: 'creator2 client1 完了',
        artworkId: 2,
        thanks_comment: 'good',
        createdAt: now,
        updatedAt: now,
      },
      {
        creatorId: 1,
        clientId: 2,
        state_default: true,
        progressing: false,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 2000,
        order_content: 'creator1 client2 デフォルト',
        artworkId: null,
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creatorId: 1,
        clientId: 2,
        state_default: false,
        progressing: false,
        submitted: false,
        done: false,
        cancel: true,
        order_price: 3000,
        order_content: 'creator1 client2 キャンセル',
        artworkId: null,
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creatorId: 1,
        clientId: 2,
        state_default: false,
        progressing: true,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 4000,
        order_content: 'creator1 client2 進行中',
        artworkId: null,
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creatorId: 1,
        clientId: 2,
        state_default: false,
        progressing: false,
        submitted: true,
        done: false,
        cancel: false,
        order_price: 5000,
        order_content: 'creator1 client2 納品済み',
        artworkId: 3,
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
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
    return queryInterface.bulkDelete('Requests', null, {})
  },
}
