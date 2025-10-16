function initFAQ() {
    const toggleFAQItem = (item) => {
        if (!item) return;
        const icon = item.querySelector('[data-lucide]');
        const answer = item.querySelector('.faq-answer');

        const isActive = item.classList.contains('active');

        // Cierra todos
        document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
            activeItem.querySelector('.faq-answer')?.removeAttribute('style');
            activeItem.querySelector('.faq-header')?.setAttribute('aria-expanded', 'false');
            const activeIcon = activeItem.querySelector('[data-lucide]');
            if (activeIcon) activeIcon.setAttribute('data-lucide', 'plus');
        });

        // Abre si no estaba activo
        if (!isActive) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            item.querySelector('.faq-header')?.setAttribute('aria-expanded', 'true');
            if (icon) icon.setAttribute('data-lucide', 'minus');
        }

        // Re-renderiza los íconos Lucide
        if (window.lucide) lucide.createIcons();
    };

    // Delegación de eventos (clicks en headers)
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.faq-header');
        if (!header) return;
        const item = header.closest('.faq-item');
        toggleFAQItem(item);
    });
}

// ✅ Espera a que los partials terminen de cargarse
document.addEventListener('partialsLoaded', () => {
    if (document.querySelector('#faq')) {
        console.log('✅ FAQ cargado, inicializando comportamiento...');
        initFAQ();
    }
});
