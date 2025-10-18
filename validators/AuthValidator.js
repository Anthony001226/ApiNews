const { check } = require('express-validator');
const { User } = require('../models/UserModel');

const validatorLogin = [
    check('correo').notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El campo correo debe ser un correo válido'),
    check('contraseña').notEmpty().withMessage('El campo contraseña es requerido'),
];

const validatorRegister = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio'),
    check('nick').notEmpty().withMessage('El campo nick es obligatorio'),
    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { correo: value } });
            if (user) {
                throw new Error('Ya existe un usuario con este correo');
            }
        }),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
];

module.exports = {
    validatorLogin,
    validatorRegister
};