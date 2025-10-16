// form.js
(function () {
    const FORM_ID = "contactForm";
    const MODAL_ID = "formModal";

    let initialized = false;
    let observer = null;

    function tryInit() {
        const form = document.getElementById(FORM_ID);
        if (form && !form.dataset.formInit) {
            initForm(form);
        }
    }

    function initForm(form) {
        if (!form) return;
        form.dataset.formInit = "true";
        console.log("[form.js] Inicializando contactForm");

        const modal = document.getElementById(MODAL_ID);
        const modalContent = modal?.querySelector(".modal-content");
        const title = document.getElementById("formModalTitle");
        const message = document.getElementById("formModalMessage");
        const icon = document.getElementById("formModalIcon");
        const closeBtn = document.getElementById("closeFormModal");

        if (!modal) {
            console.warn("[form.js] No se encontró el modal con id", MODAL_ID);
        }

        function closeModal() {
            if (!modal) return;
            modalContent?.classList.remove("scale-100", "opacity-100");
            setTimeout(() => modal.classList.add("hidden"), 180);
        }

        closeBtn?.addEventListener("click", closeModal);
        modal?.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("[form.js] submit detectado, preparando FormData...");

            const formData = new FormData(form);

            for (const [k, v] of formData.entries()) {
                if (!k) console.warn("[form.js] input sin name detectado, value:", v);
            }

            try {
                const res = await fetch("https://formcarry.com/s/fLUJKyV6Y5Q", {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!res.ok) {
                    console.error("[form.js] response not ok", res.status);
                    openModal({
                        title: "Error al enviar",
                        message: "Ocurrió un problema con el envío. Intenta de nuevo.",
                        icon: "⚠️",
                        success: false,
                    });
                    return;
                }

                const json = await res.json();
                console.log("[form.js] response json:", json);

                openModal({
                    title: "¡Mensaje enviado con éxito!",
                    message: "Gracias por contactarte con MindDev. Te responderemos pronto.",
                    icon: "✅",
                    success: true,
                });
                form.reset();
            } catch (err) {
                console.error("[form.js] error fetch:", err);
                openModal({
                    title: "Error de conexión",
                    message: "No pudimos conectar con el servidor. Verifica tu internet.",
                    icon: "❌",
                    success: false,
                });
            }
        });

        function openModal({ title: t, message: m, icon: i }) {
            if (!modal) {
                alert(t + "\n\n" + m); // fallback si no hay modal
                return;
            }
            title && (document.getElementById("formModalTitle").textContent = t);
            message && (document.getElementById("formModalMessage").textContent = m);
            icon && (document.getElementById("formModalIcon").textContent = i);

            modal.classList.remove("hidden");

            setTimeout(() => {
                modalContent?.classList.add("scale-100", "opacity-100");
            }, 40);
        }
    }

    // Si includeHTML dispara este evento, inicializamos
    document.addEventListener("partialsLoaded", () => {
        console.log("[form.js] evento partialsLoaded recibido");
        tryInit();
    });

    // Intento inicializar en DOMContentLoaded por si el parcial ya estaba presente
    document.addEventListener("DOMContentLoaded", () => {
        tryInit();

        if (!document.getElementById(FORM_ID)) {

            observer = new MutationObserver((mutations) => {
                for (const m of mutations) {
                    if (m.addedNodes?.length) {
                        tryInit();
                        if (document.getElementById(FORM_ID)) {
                            observer.disconnect();
                        }
                    }
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    });

    window._minddev_form_init = tryInit;
})();
