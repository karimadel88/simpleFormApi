const { Sequelize } = require('sequelize')


const createDB = new Sequelize("test_db", "user", "pass", {
  dialect: 'sqlite',
  host:'./config/db.sqlite'
});

module.exports = createDB