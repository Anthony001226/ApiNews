const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const relations = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
];

const get = (request, response) => {
    const { nombre, apellidos, nick } = request.query;
    const filters = {};
    if (nombre) filters.nombre = nombre;
    if (apellidos) filters.apellidos = apellidos;
    if (nick) filters.nick = nick;

    User.findAll({ where: filters, include: relations })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            response.status(500).send('Error consultando los usuarios');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    User.findByPk(id, { include: relations })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            } else {
                response.status(404).send('Usuario no encontrado');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el usuario');
        });
};

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    User.create(request.body)
        .then(newEntitie => {
            response.status(201).json(newEntitie);
        })
        .catch(err => {
            response.status(500).send('Error al crear el usuario');
        });
};

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    User.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated[0]} usuario actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar el usuario');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    User.destroy({ where: { id: id } })
    .then(numRowsDeleted => {
        response.status(200).send(`${numRowsDeleted} usuario eliminado`);
    })
        .catch(err => {
            response.status(500).send('Error al eliminar el usuario');
        });
};

module.exports = { get, getById, create, update, destroy };