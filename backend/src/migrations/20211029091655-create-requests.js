'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
        },
      },
      progressing: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      submitted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      done: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      cancel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      artwork_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Artworks',
          },
          key: 'id',
        },
      },
      order_content: {
        type: Sequelize.TEXT,
      },
      thanks_comment: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Requests')
  },
}
