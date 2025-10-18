const { DataTypes } = require('sequelize');
const { connection } = require("../config.db");
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const New = connection.define('new', {
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_publicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT, // Usamos TEXT para descripciones largas
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
});

// Relaciones: Una Noticia pertenece a...
New.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' });
New.belongsTo(State, { as: 'estado', foreignKey: 'estado_id' });
New.belongsTo(User, { as: 'usuario', foreignKey: 'usuario_id' });

module.exports = { New };