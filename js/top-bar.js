// Lógica para el carrusel de mensajes en el Top Bar
const messages = [
    { 
        es: '✨ <span class="font-bold text-white-pure">OFERTA ESPECIAL:</span> Consigue un <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 font-extrabold">50% de descuento</span> en Desarrollo Web', 
        en: '✨ <span class="font-bold text-white-pure">SPECIAL OFFER:</span> Get <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-400 font-extrabold">50% off</span> on Web Development' 
    },
    { 
        es: '🚀 <span class="font-bold text-white-pure">¡LANZA TU APP!</span> Obtén un <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 font-extrabold">20% de descuento</span> en Aplicativos Móviles', 
        en: '🚀 <span class="font-bold text-white-pure">LAUNCH YOUR APP!</span> Get <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-green-300 font-extrabold">20% off</span> on Mobile Applications' 
    },
    { 
        es: '📈 <span class="font-bold text-white-pure">POTENCIA TU MARCA:</span> Ahorra <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-200 font-extrabold">30% de descuento</span> en Rediseño Web o SEO', 
        en: '📈 <span class="font-bold text-white-pure">BOOST YOUR BRAND:</span> Save <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-200 font-extrabold">30% off</span> on Web Redesign or SEO' 
    },
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