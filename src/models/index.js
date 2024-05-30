const sequelize = require('./db');

const Recipe = require('./Recipe')(sequelize);  

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

module.exports = {
  sequelize,
  Recipe,
};
