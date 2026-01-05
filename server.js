// Importación de las librerías que decidí usar para mi proyecto
const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path'); 
const cors = require('cors'); 

// IMPORTANTE: He verificado que mi archivo de rutas esté en la carpeta correcta
// Si tu archivo se llama 'auth.js' y está en la raíz, cámbialo a './auth'
const authRoutes = require('./routes/auth.routes'); 

const app = express();
const PORT = 3000;

// Configuro mis middlewares para procesar JSON y permitir CORS
app.use(cors()); 
app.use(express.json());

// Sirvo mis archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static(path.join(__dirname, '/')));

/**
 * INTEGRACIÓN DE MIS SERVICIOS WEB (GA7-220501096-AA5-EV03)
 * Conecto mi servidor con mi lógica de base de datos MySQL (Puerto 3307).
 */
app.use('/api/auth', authRoutes);

// Ruta de prueba para verificar que el servidor me responde
app.get('/test', (req, res) => {
    res.send("Mi servidor está respondiendo correctamente");
});

// Inicio la ejecución de mi servidor de Seguridad Privada
app.listen(PORT, () => {
    console.log(`===========================================================`);
    console.log(`Servidor de Seguridad Privada: http://localhost:${PORT}`);
    console.log(`Estado: Activo y escuchando peticiones.`);
    console.log(`Puerto de Base de Datos: 3307`);
    console.log(`===========================================================`);
});