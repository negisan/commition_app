'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn('Users', 'icon', {
        type: Sequelize.STRING(65535),
        defaultValue: null,
      }),
      queryInterface.addColumn('Users', 'default_order_price', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'accepting_order', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('Users', 'cash', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('Users', 'icon'),
      queryInterface.removeColumn('Users', 'default_order_price'),
      queryInterface.removeColumn('Users', 'accepting_order'),
      queryInterface.removeColumn('Users', 'cash'),
    ])
  },
}
