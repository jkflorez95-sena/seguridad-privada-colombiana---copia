const express = require('express');
const path = require('path');
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // cámbialo por tu usuario
  password: "",      // tu contraseña de MySQL
  database: "seguridad"
});

// Ruta de login
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  db.query("SELECT * FROM empleados WHERE usuario = ?", [usuario], (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el servidor" });
    if (results.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

    const empleado = results[0];

    // Verificar contraseña
    bcrypt.compare(password, empleado.password, (err, isMatch) => {
      if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

      // Generar token
      const token = jwt.sign(
        { id: empleado.id, rol: empleado.rol },
        "clave_secreta_segura", // cámbiala por una fuerte
        { expiresIn: "2h" }
      );

      res.json({ message: "Login exitoso", token, rol: empleado.rol });
    });
  });
});

// Servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});

const jwt = require("jsonwebtoken");

app.post("/verificar", (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ error: "No autorizado" });

  jwt.verify(token, "clave_secreta_segura", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    res.json({ valido: true, rol: decoded.rol });
  });
});
