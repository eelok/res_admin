'use strict';

const {
  Model,
  Sequelize,
  DataTypes, 
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Education, {
        foreignKey: 'userId', 
        through: models.User_Education,
        as: 'education'
      });
      User.hasMany(models.Hardskill, {
         foreignKey: {
           name: 'userId',
           as: 'hardskill'
         }
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};