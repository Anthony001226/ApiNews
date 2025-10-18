const { State } = require('../models/StateModel');
const { validationResult } = require('express-validator');

const get = (request, response) => {
  const { nombre, abreviacion } = request.query;
  const filters = {};
  if (nombre) filters.nombre = nombre;
  if (abreviacion) filters.abreviacion = abreviacion;

  State.findAll({ where: filters })
    .then(entities => {
      response.json(entities);
    })
    .catch(err => {
      response.status(500).send('Error consultando los estados');
    });
};

const getById = (request, response) => {
  const id = request.params.id;
  State.findByPk(id)
    .then(entitie => {
      if (entitie) {
        response.json(entitie);
      } else {
        response.status(404).send('Estado no encontrado');
      }
    })
    .catch(err => {
      response.status(500).send('Error al consultar el estado');
    });
};

const create = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  State.create(request.body)
    .then(newEntitie => {
      response.status(201).json(newEntitie);
    })
    .catch(err => {
      response.status(500).send('Error al crear el estado');
    });
};

const update = (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }
  const id = request.params.id;
  State.update(request.body, { where: { id: id } })
    .then(numRowsUpdated => {
      response.status(200).send(`${numRowsUpdated[0]} estado actualizado`);
    })
    .catch(err => {
      response.status(500).send('Error al actualizar el estado');
    });
};

const destroy = (request, response) => {
  const id = request.params.id;
  State.destroy({ where: { id: id } })
  .then(numRowsDeleted => {
    response.status(200).send(`${numRowsDeleted} estado eliminado`);
  })
    .catch(err => {
      response.status(500).send('Error al eliminar el estado');
    });
};

module.exports = { get, getById, create, update, destroy };