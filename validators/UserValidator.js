const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

const validatorUserCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio'),
    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio'),
    check('nick').notEmpty().withMessage('El campo nick es obligatorio'),
    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido')
        .custom(async (value) => {
            const user = await User.findOne({ where: { correo: value } });
            if (user) {
                throw new Error('Ya existe un usuario con el mismo correo');
            }
        }),
    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener mínimo 8 caracteres'),
    check('perfil_id').notEmpty().withMessage('El campo perfil_id es obligatorio').isInt()
        .custom(async (value) => {
            const profile = await Profile.findByPk(value);
            if (!profile) {
                throw new Error('No existe un perfil con ese id');
            }
        }),
];

const validatorUserUpdate = [
    check('nombre').optional(),
    check('apellidos').optional(),
    check('nick').optional(),
    check('contraseña').optional().isLength({ min: 8 }),
    check('perfil_id').optional().isInt(),
];

module.exports = {
    validatorUserCreate,
    validatorUserUpdate
};