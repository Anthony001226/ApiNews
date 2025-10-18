const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
    check('categoria_id').notEmpty().isInt().withMessage('categoria_id es obligatorio y numérico')
        .custom(async (value) => {
            const category = await Category.findByPk(value);
            if (!category) throw new Error('ID de categoría no válido');
        }),
    check('usuario_id').notEmpty().isInt().withMessage('usuario_id es obligatorio y numérico')
        .custom(async (value) => {
            const user = await User.findByPk(value);
            if (!user) throw new Error('ID de usuario no válido');
        }),
    check('estado_id').notEmpty().isInt().withMessage('estado_id es obligatorio y numérico')
        .custom(async (value) => {
            const state = await State.findByPk(value);
            if (!state) throw new Error('ID de estado no válido');
        }),
    check('titulo').notEmpty().withMessage('El campo titulo es obligatorio'),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio'),
    check('imagen').notEmpty().withMessage('El campo imagen es obligatorio'),
];

const validatorNewUpdate = [
    check('categoria_id').optional().isInt(),
    check('usuario_id').optional().isInt(),
    check('estado_id').optional().isInt(),
    check('titulo').optional(),
    check('descripcion').optional(),
    check('imagen').optional(),
];

module.exports = {
    validatorNewCreate,
    validatorNewUpdate
};