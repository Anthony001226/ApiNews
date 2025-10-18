const { Category } = require('../models/CategoryModel');
const { validationResult } = require('express-validator');

const get = (request, response) => {
    const filters = request.query;
    Category.findAll({ where: filters })
      .then(entities => {
        response.json(entities);
      })
      .catch(err => {
        response.status(500).send('Error consultando las categorías');
      });
};

const getById = (request, response) => {
    const id = request.params.id;
    Category.findByPk(id)
      .then(entitie => {
        if (entitie) {
          response.json(entitie);
        } else {
          response.status(404).send('Categoría no encontrada');
        }
      })
      .catch(err => {
        response.status(500).send('Error al consultar la categoría');
      });
};
  
const create = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    Category.create(request.body)
      .then(newEntitie => {
        response.status(201).json(newEntitie);
      })
      .catch(err => {
        response.status(500).send('Error al crear la categoría');
      });
};
  
const update = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id = request.params.id;
    Category.update(request.body, { where: { id: id } })
      .then(numRowsUpdated => {
        response.status(200).send(`${numRowsUpdated[0]} categoría actualizada`);
      })
      .catch(err => {
        response.status(500).send('Error al actualizar la categoría');
      });
};

const destroy = (request, response) => {
    const id = request.params.id;
    Category.destroy({ where: { id: id } })
      .then(numRowsDeleted => {
        response.status(200).send(`${numRowsDeleted} categoría eliminada`);
      })
      .catch(err => {
        response.status(500).send('Error al eliminar la categoría');
      });
};
  
module.exports = { get, getById, create, update, destroy };