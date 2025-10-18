const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const State = connection.define('state', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  abreviacion: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
});

module.exports = { State };