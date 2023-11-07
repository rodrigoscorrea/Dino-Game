'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Curso)
    }
  }
  Area.init({
    nome: {allowNull: false,type:DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Area',
  });
  return Area;
};