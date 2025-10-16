// --- Lógica del Modal del Portafolio ---
const modal = document.getElementById('portfolio-modal');
const modalTitle = document.getElementById('modal-title');
const modalId = document.getElementById('modal-id');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const modalTechStack = document.getElementById('modal-tech-stack');

// Datos simulados para las tecnologías
const projectTech = {
    1: ['HTML/CSS/JS', 'Tailwind CSS', 'GetForm', 'Responsivo'],
    2: ['HTML/CSS/JS', 'Tailwind CSS', 'Seguridad Web', 'Rendimiento'],
    3: ['React Native', 'React JS', 'APIs REST', 'UX Móvil']
};

function openPortfolioModal(id, title, description, imageUrl) {
    // Rellenar contenido
    modalTitle.textContent = title;
    modalId.textContent = `Proyecto #00${id}`;
    modalDescription.textContent = description;
    modalImage.src = imageUrl;

    // Rellenar tecnologías (chips)
    modalTechStack.innerHTML = '';
    (projectTech[id] || []).forEach(tech => {
        const chip = document.createElement('span');
        chip.className = 'px-3 py-1 bg-electric-blue/20 text-electric-blue rounded-full text-xs font-medium';
        chip.textContent = tech;
        modalTechStack.appendChild(chip);
    });

    // Mostrar el modal con transición suave
    modal.classList.remove('hidden', 'opacity-0');
    modal.classList.add('opacity-100');
    document.getElementById('modal-content').classList.remove('scale-95');
    document.getElementById('modal-content').classList.add('scale-100');

    // Prevenir scroll en el body
    document.body.style.overflow = 'hidden';

    // Re-renderizar iconos en el modal
    lucide.createIcons();
}

function closePortfolioModal() {
    // Ocultar el modal con transición suave
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    document.getElementById('modal-content').classList.remove('scale-100');
    document.getElementById('modal-content').classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        // Restaurar scroll en el body
        document.body.style.overflow = 'auto';
    }, 300); // Coincide con la duración de la transición
}

// Cerrar modal al presionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && !modal.classList.contains('hidden')) {
        closePortfolioModal();
    }
});

// Cerrar modal al hacer clic fuera del contenido (en el overlay)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closePortfolioModal();
    }
});