const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); // <--- Importamos jwt

const login = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    User.findOne({
        where: {
            correo: request.body.correo,
            contraseña: request.body.contraseña,
            activo: true
        },
        attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick']
    }).then(usuario => {
        if (usuario) {
            // Si el usuario existe, creamos y firmamos el token
            const token = jwt.sign({ usuario }, 'mi_llave_secreta', { expiresIn: '24h' });
            response.status(200).json({ message: "Login con éxito", token: token });
        }
        else {
            response.status(401).json({ message: "Credenciales incorrectas o usuario inactivo" });
        }
    }).catch(err => {
        response.status(500).send('Error al consultar el dato');
    });
};

const register = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    // Asignamos el perfil de "Contribuidor" (ID 2) por defecto
    request.body.perfil_id = 2;

    User.create(request.body).then(
        newEntitie => {
            response.status(201).json(newEntitie);
        }
    ).catch(err => {
        response.status(500).send('Error al crear');
    });
};

module.exports = { login, register };