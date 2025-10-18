const { New } = require('../models/NewModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const relationsUser = [
    { model: Profile, attributes: ['id', 'nombre'], as: 'perfil' }
];
const relations = [
    { model: Category, attributes: ['id', 'nombre', 'descripcion'], as: 'categoria' },
    { model: State, attributes: ['id', 'nombre', 'abreviacion'], as: 'estado' },
    { model: User, attributes: ['id', 'nick', 'nombre'], as: 'usuario', include: relationsUser }
];

const get = (request, response) => {
    const { titulo, activo } = request.query;
    const filters = {};
    if (titulo) filters.titulo = titulo;
    if (activo) filters.activo = activo;

    New.findAll({ where: filters, include: relations })
        .then(entities => {
            response.json(entities);
        })
        .catch(err => {
            response.status(500).send('Error consultando las noticias');
        });
};

const getById = (request, response) => {
    const id = request.params.id;
    New.findByPk(id, { include: relations })
        .then(entitie => {
            if (entitie) {
                response.json(entitie);
            } else {
                response.status(404).send('Noticia no encontrada');
            }
        })
        .catch(err => {
            response.status(500).send('Error al consultar la noticia');
        });
};

const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    New.create(request.body)
        .then(newEntitie => {
            response.status(201).json(newEntitie);
        })
        .catch(err => {
            response.status(500).send('Error al crear la noticia');
        });
};

const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    New.update(request.body, { where: { id: id } })
        .then(numRowsUpdated => {
            response.status(200).send(`${numRowsUpdated[0]} noticia actualizada`);
        })
        .catch(err => {
            response.status(500).send('Error al actualizar la noticia');
        });
};

const destroy = (request, response) => {
    const id = request.params.id;
    New.destroy({ where: { id: id } })
        .then(numRowsDeleted => {
            response.status(200).send(`${numRowsDeleted} noticia eliminada`);
        })
        .catch(err => {
            response.status(500).send('Error al eliminar la noticia');
        });
};

module.exports = { get, getById, create, update, destroy };