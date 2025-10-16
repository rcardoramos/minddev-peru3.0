const mainHeader = document.getElementById('main-header');
const floatingNav = document.getElementById('floating-nav');
const topBar = document.getElementById('top-bar');

// La altura de la barra superior es fija (40px de padding vertical + contenido), alrededor de 40px
const topBarHeight = topBar.offsetHeight;

function handleScroll() {
    // Si el scroll supera la altura de la barra superior, aplica el estilo
    if (window.scrollY > topBarHeight) {
        // Fija el header a la parte superior y cambia el color de fondo para el efecto suave
        mainHeader.classList.add('bg-deep-blue/95', 'backdrop-blur-sm', 'shadow-lg');
        mainHeader.classList.remove('bg-deep-blue/0', 'pt-1');
        floatingNav.style.marginTop = '0'; // Pega el nav al top
    } else {
        // Restaura el estilo original al volver arriba
        mainHeader.classList.remove('bg-deep-blue/95', 'backdrop-blur-sm', 'shadow-lg');
        mainHeader.classList.add('bg-deep-blue/0', 'pt-1');
    }
}

window.addEventListener('scroll', handleScroll);

// --- Lógica del Carrusel de Testimonios ---
const observer = new MutationObserver(() => {
    const carousel = document.getElementById('testimonial-carousel');
    if (carousel) {
        initTestimonialCarousel();
        observer.disconnect(); // ya no observar
    }
});

observer.observe(document.body, { childList: true, subtree: true });

function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonial-carousel');
    const prevBtn = document.getElementById('prev-testimony');
    const nextBtn = document.getElementById('next-testimony');
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentTestimony = 0;
    const totalSlides = slides.length;

    function updateTestimony() {
        const offset = -currentTestimony * 100;
        carousel.style.transform = `translateX(${offset}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentTestimony = (currentTestimony + 1) % totalSlides;
        updateTestimony();
    });

    prevBtn.addEventListener('click', () => {
        currentTestimony = (currentTestimony - 1 + totalSlides) % totalSlides;
        updateTestimony();
    });
}


// Inicializa la posición del carrusel
updateTestimony();

// --- Lógica para mostrar/ocultar biografía del equipo ---
function toggleBio(bioId) {
    const bioElement = document.getElementById(bioId);
    const iconId = bioId.replace('-bio', '-icon');
    const iconElement = document.getElementById(iconId);

    if (bioElement.classList.contains('open')) {
        bioElement.classList.remove('open');
        iconElement.setAttribute('data-lucide', 'plus');
    } else {
        // Cerrar otras biografías antes de abrir esta
        document.querySelectorAll('.bio-detail').forEach(el => {
            if (el.id !== bioId) {
                el.classList.remove('open');
                const otherIconId = el.id.replace('-bio', '-icon');
                const otherIconElement = document.getElementById(otherIconId);
                if (otherIconElement) {
                    otherIconElement.setAttribute('data-lucide', 'plus');
                }
            }
        });

        bioElement.classList.add('open');
        iconElement.setAttribute('data-lucide', 'minus');
    }
    // Asegurarse de que Lucide re-renderice los íconos
    lucide.createIcons();
}