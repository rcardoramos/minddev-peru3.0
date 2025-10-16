// Lógica para el carrusel de mensajes en el Top Bar
const messages = [
    { es: '✨ OFERTA ESPECIAL: 50% de descuento en Desarrollo Web', en: '✨ SPECIAL OFFER: 50% off Web Development' },
    { es: '🚀 ¡LANZA TU APP! 20% de descuento en Aplicativos Móviles', en: '🚀 LAUNCH YOUR APP! 20% off Mobile Applications' },
    { es: '📈 POTENCIA TU MARCA: 30% de descuento en Rediseño Web o SEO', en: '📈 BOOST YOUR BRAND: 30% off Web Redesign or SEO' },
];

let currentIndex = 0;
const promoElement = document.getElementById('promo-message');

function updatePromoMessage() {
    // Desvanece el mensaje actual
    promoElement.style.opacity = 0;

    setTimeout(() => {
        // Actualiza el contenido según el idioma actual
        promoElement.innerHTML = messages[currentIndex][currentLanguage];

        // Vuelve a hacerlo visible
        promoElement.style.opacity = 1;

        // Prepara el índice para el siguiente mensaje
        currentIndex = (currentIndex + 1) % messages.length;
    }, 500); // Espera 500ms para que termine el fade-out
}

// Carga el primer mensaje inmediatamente al cargar la página
updatePromoMessage();

// Rota el mensaje cada 4 segundos (4000ms)
setInterval(updatePromoMessage, 4000);

// Exponer la función para el onclick
window.toggleLanguageSwitch = toggleLanguageSwitch;