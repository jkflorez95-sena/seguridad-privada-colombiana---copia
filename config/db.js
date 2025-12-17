// config/db.js
// Yo configuro y exporto la conexión a la base de datos MySQL

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',        // <- cambia si tu usuario es otro
  password: '',        // <- pon tu contraseña si la tienes
  database: 'seguridad_privada_colombiana',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exporto un objeto que tiene el método .promise() para usar promesas si se necesita
module.exports = pool.promise();
