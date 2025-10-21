/* ====== empleados.js ====== */

// Claves de almacenamiento
const STORAGE_KEY = "empleadosSPC";
const SESSION_KEY = "usuarioActivo";

/* ==============================
   Funciones de utilidad
============================== */

// Obtener lista de empleados desde localStorage
function obtenerEmpleados() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar lista de empleados en localStorage
function guardarEmpleados(empleados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(empleados));
}

// Registrar un nuevo empleado
function registrarEmpleado(empleado) {
  let empleados = obtenerEmpleados();

  // Verificar si ya existe
  if (empleados.find(e => e.usuario === empleado.usuario)) {
    alert("⚠️ El usuario ya existe, elija otro.");
    return false;
  }

  empleados.push(empleado);
  guardarEmpleados(empleados);
  return true;
}

// Iniciar sesión
function login(usuario, password, rol) {
  const empleados = obtenerEmpleados();
  const empleado = empleados.find(
    e => e.usuario === usuario && e.password === password && e.rol === rol
  );

  if (empleado) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(empleado));

    // Redirección según rol
    switch (empleado.rol) {
      case "Vigilante":
        window.location.href = "empleados_portal/portal_vigilante.html";
        break;
      case "Supervisor":
        window.location.href = "empleados_portal/portal_supervisor.html";
        break;
      case "Escolta":
        window.location.href = "empleados_portal/portal_escolta.html";
        break;
      case "Jefe de Seguridad":
        window.location.href = "empleados_portal/portal_jefe.html";
        break;
      case "Operador de medios tecnológicos":
        window.location.href = "empleados_portal/portal_operador.html";
        break;
      case "Administrador":
        window.location.href = "empleados_portal/portal_admin.html";
        break;
      default:
        alert("Rol no reconocido.");
        logout();
    }
    return true;
  }
  return false;
}

// Obtener usuario activo
function obtenerUsuarioActivo() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

// Cerrar sesión
function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

/* ==============================
   Inicialización con usuarios por defecto
============================== */
(function inicializarUsuarios() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const iniciales = [
      {
        nombre: "Administrador General",
        usuario: "admin",
        password: "1234",
        documento: "CC 100000001",
        rol: "Administrador",
        email: "admin@spc.com"
      },
      {
        nombre: "Pedro López",
        usuario: "vigilante1",
        password: "1111",
        documento: "CC 100000002",
        rol: "Vigilante",
        email: "vigilante@spc.com"
      },
      {
        nombre: "Carlos Gómez",
        usuario: "supervisor1",
        password: "2222",
        documento: "CC 100000003",
        rol: "Supervisor",
        email: "supervisor@spc.com"
      }
    ];
    guardarEmpleados(iniciales);
  }
})();
