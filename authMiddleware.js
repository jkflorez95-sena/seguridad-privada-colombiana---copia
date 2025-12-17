// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Esta función se pasa como un "interceptor" antes de las rutas protegidas
const verificarToken = (req, res, next) => {
  // 1. Intentamos obtener el token del header 'authorization' (Bearer TOKEN)
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token no proporcionado' });

  // Separamos "Bearer" de "TOKEN"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Formato de token incorrecto' });
  }

  // 2. Verificamos el token usando la misma clave secreta del login
  jwt.verify(token, "clave_secreta_segura", (err, decoded) => {
    if (err) {
      // Si hay error, el token es inválido o expiró
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    
    // 3. Si es válido, guardamos la info del usuario (id, rol) en el objeto request
    req.usuario = decoded; 
    // Llamamos a next() para que continúe a la ruta original
    next(); 
  });
};

module.exports = verificarToken;
