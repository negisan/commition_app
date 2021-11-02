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
        creator_id: 1,
        client_id: 2,
        progressing: false,
        submitted: true,
        done: true,
        cancel: false,
        order_price: 1000,
        order_content: '完了',
        thanks_comment: 'ありがとうございます',
        createdAt: now,
        updatedAt: now,
      },
      {
        creator_id: 2,
        client_id: 1,
        progressing: false,
        submitted: true,
        done: true,
        cancel: false,
        order_price: 1000,
        order_content: '完了２',
        thanks_comment: 'good',
        createdAt: now,
        updatedAt: now,
      },
      {
        creator_id: 1,
        client_id: 2,
        progressing: false,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 2000,
        order_content: 'デフォルト状態',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creator_id: 1,
        client_id: 2,
        progressing: false,
        submitted: false,
        done: false,
        cancel: true,
        order_price: 3000,
        order_content: 'キャンセルのテスト',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creator_id: 1,
        client_id: 2,
        progressing: true,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 4000,
        order_content: '進行中',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      {
        creator_id: 1,
        client_id: 2,
        progressing: false,
        submitted: true,
        done: false,
        cancel: false,
        order_price: 5000,
        order_content: '納品済み',
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
