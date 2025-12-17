-- database.sql
-- Crear la base de datos (si no existe)
CREATE DATABASE IF NOT EXISTS seguridad_privada_colombiana;
USE seguridad_privada_colombiana;

-- Tabla empresa
CREATE TABLE IF NOT EXISTS empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(100) NOT NULL,
    nit VARCHAR(20) UNIQUE,
    direccion VARCHAR(150),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    mision TEXT,
    vision TEXT
);

-- Tabla empleados
CREATE TABLE IF NOT EXISTS empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE,
    nombres VARCHAR(80),
    apellidos VARCHAR(80),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    cargo VARCHAR(50),
    fecha_ingreso DATE,
    estado ENUM('Activo','Inactivo') DEFAULT 'Activo',
    id_empresa INT,
    CONSTRAINT fk_empleado_empresa FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Tabla usuarios (para autenticación)
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE,
    clave VARCHAR(255) NOT NULL,
    rol ENUM('Administrador','Empleado','Cliente') DEFAULT 'Empleado',
    ultimo_acceso DATETIME,
    id_empleado INT,
    CONSTRAINT fk_usuario_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla servicios
CREATE TABLE IF NOT EXISTS servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100),
    descripcion TEXT,
    tipo ENUM('Vigilancia','Escolta','Seguridad Electrónica','Control de Accesos'),
    id_empresa INT,
    CONSTRAINT fk_servicio_empresa FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Tabla asignaciones (empleados a servicios)
CREATE TABLE IF NOT EXISTS asignaciones (
    id_asignacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha_inicio DATE,
    fecha_fin DATE,
    observaciones TEXT,
    id_empleado INT,
    id_servicio INT,
    CONSTRAINT fk_asignacion_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
    CONSTRAINT fk_asignacion_servicio FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
);

-- Tabla registros / novedades
CREATE TABLE IF NOT EXISTS registro (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(150),
    fecha DATE,
    observaciones TEXT,
    id_empleado INT,
    CONSTRAINT fk_registro_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla ingresos_gastos
CREATE TABLE IF NOT EXISTS ingresos_gastos (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('Ingreso','Gasto'),
    descripcion VARCHAR(150),
    monto DECIMAL(10,2),
    fecha DATE,
    id_empleado INT,
    CONSTRAINT fk_movimiento_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);
