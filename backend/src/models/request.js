'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Artwork }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'creator_id',
        onDelete: 'CASCADE',
      })
      this.belongsTo(User, {
        foreignKey: 'client_id',
      })
      this.hasOne(Artwork, {
        foreignKey: 'artwork_id',
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
      creator_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      client_id: {
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
        defaultValue: false
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      cancel: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      artwork_id: DataTypes.INTEGER,
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
