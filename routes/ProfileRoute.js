const express = require('express');
const { get, getById, create, update, destroy } = require('../controllers/ProfileController');
const { validatorProfileCreate, validatorProfileUpdate } = require('../validators/ProfileValidator');
const { authenticateAdmin } = require('../middlewares/jwt');

const api = express.Router();

api.get('/perfiles', get);
api.get('/perfiles/:id', getById);
api.post('/perfiles', authenticateAdmin, validatorProfileCreate, create);
api.put('/perfiles/:id', authenticateAdmin, validatorProfileUpdate, update);
api.delete('/perfiles/:id', authenticateAdmin, destroy);

module.exports = api;