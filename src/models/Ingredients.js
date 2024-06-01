module.exports = (sequelize, DataTypes) => {
    const Ingredients = sequelize.define('Ingredients', {
      ingredient_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'ingredients',
      timestamps: false,
    });
  
    return Ingredients;
  };
  