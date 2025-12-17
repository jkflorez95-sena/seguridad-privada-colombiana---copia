const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// =====================================
// CONEXIÓN A MYSQL
// =====================================
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',        // <- tu usuario MySQL
    password: 'test1234',    // <- tu contraseña MySQL
    database: 'seguridad_privada_colombiana'
});

conexion.connect(err => {
    if (err) {
        console.error('Error al conectar a MySQL:', err);
        return;
    }
    console.log('Conectado a MySQL');
});

// =====================================
// ENDPOINT LOGIN
// =====================================
app.post('/login', (req, res) => {

    const { usuario, clave } = req.body;

    const sql = "SELECT * FROM usuarios WHERE usuario = ?";

    conexion.query(sql, [usuario], (err, results) => {

        if (err) return res.status(500).json({ error: err });

        if (results.length === 0)
            return res.status(404).json({ error: "Usuario no encontrado" });

        const user = results[0];

        const passOk = bcrypt.compareSync(clave, user.clave);

        if (!passOk)
            return res.status(401).json({ error: "Contraseña incorrecta" });

        res.json({
            mensaje: "Login exitoso",
            usuario: user.usuario,
            rol: user.rol
        });
    });
});

// =====================================
// ENDPOINT LISTAR EMPLEADOS
// =====================================
app.get('/empleados', (req, res) => {

    const sql = "SELECT * FROM empleados";

    conexion.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// =====================================
// INICIAR SERVIDOR
// =====================================
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
