const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT, 
  logging: false,
});

// const User = sequelize.define('User', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
// });
const Recipe = require('./Recipe');
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchro');
});

module.exports = {
  sequelize,
  // User,
  Recipe,
};
