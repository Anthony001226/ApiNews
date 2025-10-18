const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');

const validatorCategoryCreate = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isLength({ min: 5, max: 50 }).withMessage('El campo debe tener entre 5 y 50 caracteres')
        .custom(async (value) => {
            const category = await Category.findOne({ where: { nombre: value } });
            if (category) {
                throw new Error('Ya existe una categoría con el mismo nombre');
            }
        }),
    check('descripcion').notEmpty().withMessage('El campo descripcion es obligatorio')
        .isLength({ min: 5, max: 255 }).withMessage('El campo debe tener entre 5 y 255 caracteres'),
];

const validatorCategoryUpdate = [
    check('nombre').optional().isLength({ min: 5, max: 50 }),
    check('descripcion').optional().isLength({ min: 5, max: 255 }),
];

module.exports = {
    validatorCategoryCreate,
    validatorCategoryUpdate
};