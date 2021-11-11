'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Artwork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Request }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: 'creatorId',
        onDelete: 'CASCADE',
      })
    }
  }
  Artwork.init(
    {
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
