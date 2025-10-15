
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    const FORM_URL = "https://formcarry.com/s/fLUJKyV6Y5Q"; // tu endpoint real

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const jsonData = Object.fromEntries(formData.entries());

        const submitBtn = form.querySelector("button[type='submit']");
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";

        try {
            const response = await fetch(FORM_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(jsonData)
            });

            if (response.ok) {
                form.reset();
                // ✅ Redirige a tu propia página de agradecimiento
                window.location.href = "/gracias.html";
            } else {
                alert("Hubo un problema al enviar el formulario. Intenta nuevamente.");
            }
        } catch (error) {
            alert("Error de conexión. Por favor, intenta nuevamente.");
        }

        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    });
});

