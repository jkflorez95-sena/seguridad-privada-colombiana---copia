const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Conexión profesional a mi base de datos en el puerto 3307
const db = mysql.createPool({
    host: "127.0.0.1", 
    user: "testuser", 
    password: "test1234", 
    database: "seguridad_privada_colombiana",
    port: 3307 
});

// MI SERVICIO DE LOGIN PROFESIONAL CON DOBLE VERIFICACIÓN
router.post("/login", async (req, res) => {
    // Uso trim() para evitar que espacios accidentales en Postman me den error
    const usuario = req.body.usuario ? req.body.usuario.trim() : null;
    const password = req.body.password ? req.body.password.trim() : null;

    if (!usuario || !password) {
        return res.status(400).json({ error: "Por favor, ingresa mi usuario y contraseña" });
    }

    try {
        // Busco al usuario en mi registro
        const [rows] = await db.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "El usuario que puse en Postman no existe en mi registro" });
        }

        const user = rows[0];

        // --- VALIDACIÓN MAESTRA ---
        // Mi punto de vista: Comparo texto directo o hash para asegurar mi acceso
        const esValida = (password === user.clave || await bcrypt.compare(password, user.clave));

        if (!esValida) {
            return res.status(401).json({ error: "La contraseña no coincide con mi registro" });
        }

        // Genero mi token JWT de seguridad
        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol }, 
            "clave_secreta", 
            { expiresIn: "2h" }
        );

        res.json({
            message: "He ingresado exitosamente",
            token,
            usuario: user.usuario,
            rol: user.rol
        });

    } catch (e) {
        console.error("ERROR TÉCNICO EN MI CONEXIÓN:", e.message);
        return res.status(500).json({ error: "Error interno en mi conexión de base de datos" });
    }
});

module.exports = router;