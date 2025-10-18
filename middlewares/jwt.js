const jwt = require('jsonwebtoken');

// Middleware para verificar que el usuario sea Administrador
const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    if (!authorization_header || !authorization_header.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token no proporcionado o formato incorrecto' });
    }
    const token = authorization_header.split(' ')[1];

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido o expirado' });
        }
        // Verificamos si el perfil del usuario es 1 (Administrador)
        if (decoded.usuario && decoded.usuario.perfil_id === 1) {
            req.user = decoded.usuario; // Opcional: guardamos el usuario en la request
            next(); // El usuario es admin, puede continuar
        } else {
            return res.status(403).send({ message: 'Sin autorización: se requieren permisos de administrador' });
        }
    });
};

// Middleware para verificar que haya un token válido (cualquier perfil)
const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    if (!authorization_header || !authorization_header.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Token no proporcionado o formato incorrecto' });
    }
    const token = authorization_header.split(' ')[1];

    jwt.verify(token, 'mi_llave_secreta', (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Token inválido o expirado' });
        }
        req.user = decoded.usuario;
        next(); // El token es válido, puede continuar
    });
};

module.exports = {
    authenticateAdmin,
    authenticateAny
};