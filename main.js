document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("TU_SERVICE_ID", "TU_TEMPLATE_ID", this)
      .then(() => {
        status.innerHTML = "✅ Mensaje enviado con éxito. Pronto te responderemos.";
        status.style.color = "green";
        form.reset();
      }, (err) => {
        status.innerHTML = "❌ Hubo un error al enviar el mensaje.";
        status.style.color = "red";
        console.error("Error:", err);
      });
  });
});
