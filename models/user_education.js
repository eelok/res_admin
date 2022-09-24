'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Education.belongsTo(models.User, {
        foreignKey: 'userId', 
        as: 'user'
      });
      User_Education.belongsTo(models.Education, {
        foreignKey: 'educationId', 
        as: 'education'
      })
    }
  }
  User_Education.init({
    uderId: DataTypes.STRING,
    educationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_Education',
  });
  return User_Education;
};