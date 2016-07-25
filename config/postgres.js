var Sequelize = require('sequelize');

//Estabelece a Conexão com o Postgres
module.exports = new Sequelize('app-agenda', 'postgres', 'postgres', {
  host: 'database',
  port: '5432',
  dialect: 'postgres',

  pool: {
    maxConnections: 10,
    minConnections: 0,
    idle: 10000
  },

  timezone: '-03:00'
});
