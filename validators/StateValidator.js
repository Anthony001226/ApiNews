const { check } = require('express-validator');
const { State } = require('../models/StateModel');

// Reglas para cuando se crea un estado (campos obligatorios)
const validatorStateRequire = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres')
                   .custom(async (value) => {
                        const state = await State.findOne({ where: { nombre: value } });
                        if (state) {
                            throw new Error('Ya existe un estado con el mismo nombre');
                        }
                   }),

    check('abreviacion').notEmpty().withMessage('El campo abreviacion es obligatorio')
                        .isString().withMessage('El campo abreviacion debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres'),
];

// Reglas para cuando se actualiza un estado (campos opcionales)
const validatorStateOptional = [
    check('nombre').optional()
                   .isString().withMessage('El campo nombre debe ser texto')
                   .isLength({ min: 2, max: 50 }).withMessage('El campo debe tener entre 2 y 50 caracteres'),

    check('abreviacion').optional()
                        .isString().withMessage('El campo abreviacion debe ser texto')
                        .isLength({ min: 2, max: 5 }).withMessage('El campo debe tener entre 2 y 5 caracteres'),
];

module.exports = {
    validatorStateRequire,
    validatorStateOptional
};