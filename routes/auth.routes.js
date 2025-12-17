const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Conexión MySQL
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "seguridad_privada_colombiana"
});

// LOGIN
router.post("/login", async (req, res) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    const query = `
        SELECT u.id_usuario, u.usuario, u.clave, u.rol,
               e.nombres, e.apellidos
        FROM usuarios u
        LEFT JOIN empleados e ON u.id_empleado = e.id_empleado
        WHERE u.usuario = ?
    `;

    try {
        const [resultados] = await db.query(query, [usuario]);

        if (resultados.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const user = resultados[0];

        const ok = await bcrypt.compare(password, user.clave);

        if (!ok) return res.status(401).json({ error: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: user.id_usuario, rol: user.rol },
            "clave_secreta_segura",
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login exitoso",
            token,
            rol: user.rol,
            nombres: user.nombres,
            apellidos: user.apellidos,
        });

    } catch (e) {
        return res.status(500).json({ error: "Error en servidor" });
    }
});

// VERIFICAR TOKEN
router.post("/verificar", (req, res) => {
    const { token } = req.body;

    if (!token) return res.status(401).json({ error: "No autorizado" });

    jwt.verify(token, "clave_secreta_segura", (err, decoded) => {
        if (err) return res.status(403).json({ error: "Token inválido" });

        res.json({ valido: true, rol: decoded.rol });
    });
});

module.exports = router;
