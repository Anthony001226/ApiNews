const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const get = (request, response) => {
    const filters = request.query;
    Profile.findAll({ where: filters })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            response.status(500).send('Error consultando los perfiles');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    Profile.findByPk(id)
        .then(entity => {
            if (entity) {
                response.json(entity);
            } else {
                response.status(404).send('Perfil no encontrado');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar el perfil');
        });
};

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    Profile.create(request.body)
        .then(newEntity => {
            response.status(201).json(newEntity);
        })
        .catch(err => {
            response.status(500).send('Error al crear el perfil');
        });
};

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    Profile.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated[0]} perfil actualizado`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar el perfil');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    Profile.destroy({ where: { id: id } })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} perfil eliminado`);
        })
        .catch(err => {
            response.status(500).send('Error al eliminar el perfil');
        });
};

module.exports = { get, getById, create, update, destroy };