module.exports = (sequelize, DataTypes) => {
    const Recipe_ingredients = sequelize.define('Recipe_ingredients', {
      recipe_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'recipe',
          key: 'recipe_id'
        }
      },
      ingredient_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'ingredients',
          key: 'ingredient_id'
        }
      }
    }, {
      tableName: 'recipe_ingredients',
      timestamps: false,
    });
  
    return Recipe_ingredients;
  };
  