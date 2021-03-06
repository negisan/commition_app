'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const appRoot = require('app-root-path')
    const icon_path = appRoot + '/public/static/default_icon.jpg'
    return Promise.all([
      queryInterface.addColumn('Users', 'icon', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: icon_path,
      }),
      queryInterface.addColumn('Users', 'default_order_price', {
        type: Sequelize.INTEGER,
        defaultValue: 1000,
      }),
      queryInterface.addColumn('Users', 'accepting_order', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('Users', 'cash', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'isCreator', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn('Users', 'isClient', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      queryInterface.removeColumn('Users', 'isCreator'),
      queryInterface.removeColumn('Users', 'isClient'),
    ])
  },
}
