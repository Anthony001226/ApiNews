const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/UserController');
const { validatorUserCreate, validatorUserUpdate } = require('../validators/UserValidator');
const { authenticateAdmin } = require('../middlewares/jwt');

const api = express.Router();

api.get('/usuarios', get);
api.get('/usuarios/:id', getById);
api.post('/usuarios', authenticateAdmin, validatorUserCreate, create);
api.put('/usuarios/:id', authenticateAdmin, validatorUserUpdate, update);
api.delete('/usuarios/:id', authenticateAdmin, destroy);

module.exports = api;