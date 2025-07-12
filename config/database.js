const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.BD_NOME, process.env.BD_USUARIO, process.env.BD_SENHA, {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
});

module.exports = sequelize;