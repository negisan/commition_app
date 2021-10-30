'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      })
      this.belongsTo(Request, {
        foreignKey: 'request_id',
      })
    }
  }
  Artwork.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Artwork',
      tableName: 'Artworks',
    }
  )
  return Artwork
}
