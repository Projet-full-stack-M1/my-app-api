// // models/Wishlist.js
const { DataTypes } = require('sequelize');

// // const User = require('./User');
// // const Recipe = require('./Recipe');

module.exports = (sequelize) => {
  const Wishlist = sequelize.define('Wishlist', {
    user_id: {
         type: DataTypes.INTEGER,
           allowNull: false,
         },
         recipe_id: {
           type: DataTypes.INTEGER,
           allowNull: false,
         },
  }, {
    tableName: 'wishlists',
    timestamps: false,
  });

  return Wishlist;
};
