const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db');
const jwt = require('jsonwebtoken');


const Recipe = require('./Recipe')(sequelize, DataTypes);
const Ingredients = require('./Ingredients')(sequelize, DataTypes);
const Recipe_ingredients = require('./Recipe_ingredients')(sequelize, DataTypes);
const User = require('./User')(sequelize,DataTypes);
const Wishlist = require('./Wishlist')(sequelize,DataTypes);


// les associations
Recipe.belongsToMany(Ingredients, { through: Recipe_ingredients, foreignKey: 'recipe_id' });
Ingredients.belongsToMany(Recipe, { through: Recipe_ingredients, foreignKey: 'ingredient_id' });
User.belongsToMany(Recipe, { through: Wishlist, foreignKey: 'user_id' });
Recipe.belongsToMany(User, { through: Wishlist, foreignKey: 'recipe_id' });

//
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

module.exports = {
  sequelize,
  Recipe,
  Ingredients,
  Recipe_ingredients,
  User,
  Wishlist,
};
