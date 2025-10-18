const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");

const Category = connection.define('category', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
});

module.exports = { Category };