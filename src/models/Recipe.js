const { DataTypes } = require('sequelize');
const {sequelize} = require('./index');

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define('Recipe', {    
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
      name: DataTypes.STRING,
      country: DataTypes.STRING,
      photoUrl: DataTypes.STRING,
      cookingTime: DataTypes.STRING,
      ingredients:DataTypes.STRING,
      preparation: DataTypes.STRING,
      allergens: DataTypes.STRING,
    
    });
    
    return Recipe;
};