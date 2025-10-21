document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("btnLogoutHeader");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo"); // limpiar sesión
      window.location.href = "login.html"; // volver al login
    });
  }
});
