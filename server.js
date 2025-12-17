// Importación de librerías
const express = require('express');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middleware para permitir que el servidor reciba datos en formato JSON
app.use(express.json());

// "Base de datos" temporal en memoria para almacenar usuarios
const usuarios Registrados = [];

/**
 * SERVICIO DE REGISTRO
 * Recibe: usuario y contraseña
 * Acción: Encripta la contraseña y guarda al usuario
 */
app.post('/registro', async (req, res) => {
    const { usuario, contrasena } = req.body;

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

    // Guardar en nuestro arreglo
    usuariosRegistrados.push({
        usuario: usuario,
        contrasena: contrasenaEncriptada
    });

    res.status(201).send({ mensaje: "Usuario registrado exitosamente" });
});

/**
 * SERVICIO DE INICIO DE SESIÓN (LOGIN)
 * Recibe: usuario y contraseña
 * Acción: Verifica si el usuario existe y si la contraseña coincide
 */
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    // Buscar el usuario en nuestra "base de datos"
    const usuarioEncontrado = usuariosRegistrados.find(u => u.usuario === usuario);

    if (!usuarioEncontrado) {
        return res.status(401).send({ mensaje: "Error en la autenticación: Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la encriptada
    const esValida = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);

    if (esValida) {
        res.status(200).send({ mensaje: "Autenticación satisfactoria" });
    } else {
        res.status(401).send({ mensaje: "Error en la autenticación: Contraseña incorrecta" });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log("Evidencia GA7-220501096-AA5-EV01 lista para pruebas.");
});