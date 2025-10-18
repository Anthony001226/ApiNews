const { check } = require('express-validator');
const { Profile } = require('../models/ProfileModel');

const validatorProfileCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 3, max: 50 }).withMessage('El campo debe tener entre 3 y 50 caracteres')
                   .custom(async (value) => {
                        // Verificamos si ya existe un perfil con ese nombre
                        const profile = await Profile.findOne({ where: { nombre: value } });
                        if (profile) {
                            throw new Error('Ya existe un perfil con el mismo nombre');
                        }
                   }),
];

const validatorProfileUpdate = [
    check('nombre').optional() // Opcional porque solo se actualiza si se envía
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 3, max: 50 }).withMessage('El campo debe tener entre 3 y 50 caracteres'),
];

module.exports = {
    validatorProfileCreate,
    validatorProfileUpdate
};