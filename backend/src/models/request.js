'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here

      this.belongsTo(User, {
        as: 'client',
        foreignKey: 'clientId',
        onDelete: 'CASCADE'
      })

      this.belongsTo(User, {
        as: 'creator',
        foreignKey: 'creatorId',
        onDelete: 'CASCADE'
      })
    }

    toJSON() {
      return {
        ...this.get(),
      }
    }
  }
  Request.init(
    {
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      progressing: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      submitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      cancel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      order_price: DataTypes.INTEGER,
      order_content: DataTypes.TEXT,
      thanks_comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Request',
      tableName: 'Requests',
    }
  )
  return Request
}
