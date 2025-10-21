// empleados.js

// ====== CONFIGURACIÓN GENERAL ======
const STORAGE_KEY = "empleadosSPC"; 
const SESSION_KEY = "usuarioActivo"; // clave única para la sesión

// Guardar empleados en localStorage
function guardarEmpleado(empleado) {
  let empleados = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
  // Verificar si ya existe el usuario o documento
  const existe = empleados.some(e => e.usuario === empleado.usuario || e.documento === empleado.documento);
  if (existe) {
    alert("⚠️ El usuario o documento ya está registrado.");
    return false;
  }

  empleados.push(empleado);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(empleados));
  return true;
}

// Obtener empleados
function obtenerEmpleados() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

// Guardar sesión activa
function guardarSesion(usuario) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
}

// Obtener sesión activa
function obtenerSesion() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

// ======================= REGISTRO =======================
const registroForm = document.getElementById("registroForm");
if (registroForm) {
  registroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const cargo = document.getElementById("cargo").value;
    const password = document.getElementById("password").value.trim();

    if (!nombre || !documento || !usuario || !cargo || !password) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    const nuevoEmpleado = { nombre, documento, usuario, cargo, password };

    if (guardarEmpleado(nuevoEmpleado)) {
      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "login.html";
    }
  });
}

// ======================= LOGIN =======================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("clave") 
      ? document.getElementById("clave").value.trim() 
      : document.getElementById("password").value.trim();

    const empleados = obtenerEmpleados();
    const empleado = empleados.find(e => e.usuario === usuario && e.password === password);

    if (empleado) {
      guardarSesion(empleado);
      alert(`✅ Bienvenido ${empleado.nombre} (${empleado.cargo})`);
      window.location.href = "dashboard.html";
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  });
}

// ======================= PORTAL EMPLEADOS =======================
const empleadoSesion = obtenerSesion();
if (empleadoSesion && document.getElementById("empleadoNombre")) {
  document.getElementById("empleadoNombre").innerText = empleadoSesion.nombre;
  if (document.getElementById("empleadoCargo")) document.getElementById("empleadoCargo").innerText = empleadoSesion.cargo;
  if (document.getElementById("empleadoDocumento")) document.getElementById("empleadoDocumento").innerText = empleadoSesion.documento;
  if (document.getElementById("empleadoUsuario")) document.getElementById("empleadoUsuario").innerText = empleadoSesion.usuario;
}

// ======================= LOGOUT =======================
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    cerrarSesion();
  });
}
