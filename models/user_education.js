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
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    educationId: {
     type: DataTypes.STRING,
     references: {
      model: 'Education',
      key: 'id'
    }
    }
  }, {
    sequelize,
    tableName: "Users_Educations",
    modelName: 'User_Education',
  });
  return User_Education;
};