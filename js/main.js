async function includeHTMLSections(sections) {
    const loadPromises = sections.map(({ id, file }) =>
        fetch(file)
            .then((res) => {
                if (!res.ok) throw new Error(`Error cargando ${file}: ${res.status}`);
                return res.text();
            })
            .then((data) => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = data;
            })
            .catch((err) => console.error(err))
    );

    // Esperar que todas las secciones terminen de cargar
    await Promise.all(loadPromises);

    // 🔔 Disparar evento global SOLO UNA VEZ cuando todo está listo
    document.dispatchEvent(new Event("partialsLoaded"));

    // Renderizar íconos Lucide (si los usas)
    if (window.lucide) lucide.createIcons();
}

// Ejecutar la carga
document.addEventListener("DOMContentLoaded", () => {
    includeHTMLSections([
        { id: "inicio", file: "./partials/inicio.html" },
        { id: "servicios", file: "./partials/servicios.html" },
        { id: "proceso", file: "./partials/proceso.html" },
        { id: "portafolio", file: "./partials/portafolio.html" },
        { id: "clientes_y_testimonios", file: "./partials/clientes_y_testimonios.html" },
        { id: "alianzas", file: "./partials/alianzas.html" },
        { id: "tecnologias", file: "./partials/tecnologias.html" },
        { id: "equipo", file: "./partials/equipo.html" },
        { id: "blogs", file: "./partials/blogs.html" },
        { id: "contacto", file: "./partials/contacto.html" },
        { id: "faq", file: "./partials/faq.html" },
        { id: "footer", file: "./partials/footer.html" },
    ]);
});

// 🧩 Inicialización de scripts dependientes de partials
document.addEventListener("partialsLoaded", () => {
    console.log("✅ Todos los partials cargados");

    // Inicializa el formulario de contacto si existe
    if (document.getElementById("contactForm") && typeof initContacto === "function") {
        initContacto();
    }

    // Inicializa FAQ si existe
    if (document.querySelector(".faq-item") && typeof initFAQ === "function") {
        initFAQ();
    }
});



// --- Lógica del Interruptor de Idioma (Toggle Switch) ---
const langSwitch = document.getElementById('lang-switch');

function toggleLanguageSwitch() {
    const currentLang = langSwitch.getAttribute('data-lang');
    const newLang = currentLang === 'es' ? 'en' : 'es';

    langSwitch.setAttribute('data-lang', newLang);

    // Aplicar las traducciones al cambiar
    applyTranslations(newLang);
}

// Ejecutar las traducciones al cargar la página (ES por defecto)
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(currentLanguage);
});