'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Request, Artwork }) {
      // define association here
      this.hasMany(Request)
      this.hasMany(Artwork)
    }

    toJSON() {
      return {
        ...this.get(),
      }
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.BLOB,
      },
      default_order_price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      accepting_order: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      cash: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'Users',
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['hash'] },
      },
      scopes: {
        withHash: { attributes: {} },
      },
    }
  )
  return User
}
