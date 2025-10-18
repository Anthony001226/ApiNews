const express = require('express');
const app = express();
const cors = require('cors'); // <--- 1. Importar
const { PORT } = require("./config"); // Importa el puerto desde config.js

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Importar todas las rutas
const profile_routes = require('./routes/ProfileRoute');
const state_routes = require('./routes/StateRoute');
const category_routes = require('./routes/CategoryRoute');
const new_routes = require('./routes/NewRoute');
const user_routes = require('./routes/UserRoute');
const auth_routes = require('./routes/AuthRoute');
// Usar todas las rutas bajo el prefijo /api
app.use('/api', profile_routes, state_routes, category_routes, new_routes, user_routes, auth_routes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;