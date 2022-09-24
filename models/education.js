'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Education.belongsToMany(models.User, {
        foreignKey: 'educationId',
        through: "Users_Educations",
        as: 'user'
      });
    }
  }
  Education.init({
    start:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    end:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortName:{ 
      type: DataTypes.STRING,
      allowNull: true,
    },
    longName:{ 
      type: DataTypes.STRING,
      allowNull: true,
    },
    division: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    tableName: 'Educations',
    sequelize,
    modelName: 'Education',
  });
  return Education;
};