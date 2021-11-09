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
    const requests = []
    requests.push(
      // === 納品前のリクエスト
      // user1の全フラグパターンのサンプル
      // 未受注
      {
        creatorId: 1,
        clientId: 2,
        artworkId: null,
        state_default: true,
        progressing: false,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 2000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      // キャンセル
      {
        creatorId: 1,
        clientId: 2,
        artworkId: null,
        state_default: false,
        progressing: false,
        submitted: false,
        done: false,
        cancel: true,
        order_price: 3000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      // 進行中
      {
        creatorId: 1,
        clientId: 2,
        artworkId: null,
        state_default: false,
        progressing: true,
        submitted: false,
        done: false,
        cancel: false,
        order_price: 4000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      },
      // === 納品済みで作品が作成されているリクエストサンプルsubmitted
      {
        creatorId: 1,
        clientId: 2,
        artworkId: 1,
        state_default: false,
        progressing: false,
        submitted: true,
        done: false,
        cancel: false,
        order_price: 1000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: '',
        createdAt: now,
        updatedAt: now,
      }
    )
    // === 取引が完了しているサンプルdone
    // creatorはuser1
    // artworkId 2 ~ 5
    for (let i = 1; i < 5; i++) {
      requests.push({
        creatorId: 1,
        clientId: 2,
        artworkId: i + 1,
        state_default: false,
        progressing: false,
        submitted: false,
        done: true,
        cancel: false,
        order_price: 6000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: 'ありがとうございます',
        createdAt: now,
        updatedAt: now,
      })
    }
    // creatorはuser2
    // artworkId 6 ~ 21
    for (let i = 5; i < 21; i++) {
      requests.push({
        creatorId: 2,
        clientId: 1,
        artworkId: i + 1,
        state_default: false,
        progressing: false,
        submitted: false,
        done: true,
        cancel: false,
        order_price: 3000,
        order_content: '渾身の１枚をお願いします',
        thanks_comment: 'ありがとうございます',
        createdAt: now,
        updatedAt: now,
      })
    }
    return queryInterface.bulkInsert('Requests', requests)
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
