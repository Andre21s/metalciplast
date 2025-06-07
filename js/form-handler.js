document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Obtener valores
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();
    const botCheck = document.getElementById("bot-field").value; // Honeypot

    // Honeypot anti-bot
    if (botCheck !== "") {
      alert("Bot detectado.");
      return;
    }

    // Validaciones
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !subject || !message) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Correo electrónico inválido.");
      return;
    }

    if (message.length > 1000 || subject.length > 100 || name.length > 100) {
      alert("Revisa la longitud de tus datos (mensaje máx. 1000 caracteres).");
      return;
    }

    // Validar reCAPTCHA
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      alert("Por favor, completa el CAPTCHA.");
      return;
    }

    // Prepara el payload con el token del captcha
    const payload = { name, email, subject, message, recaptchaToken: recaptchaResponse };

    try {
      const response = await fetch("https://metalciplast-backend.vercel.app/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        alert("¡Mensaje enviado correctamente!");
        form.reset();
        grecaptcha.reset(); // Resetear el captcha para que se pueda volver a usar
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (err) {
      console.error("Error al enviar:", err);
      alert("Ocurrió un problema al enviar tu mensaje.");
    }
  });
});
