const { Sequelize } = require('sequelize');
require('dotenv').config(); // <--- Carga las variables del archivo .env
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('./config.js');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mariadb', // o 'mysql' según tu caso
});

connection.authenticate()
    .then(() => {
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la base de datos:', err);
    });

module.exports = { connection };