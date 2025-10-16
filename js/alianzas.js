document.addEventListener("partialsLoaded", () => {
    console.log("✅ Partner modal listo");

    const modal = document.getElementById('partner-modal');
    const modalContent = document.getElementById('partner-modal-content');

    function openPartnerModal(name, service, description, logo, link) {
        if (!modal || !modalContent) return;

        document.getElementById('partner-modal-title').textContent = name;
        document.getElementById('partner-modal-service').textContent = service;
        document.getElementById('partner-modal-description').textContent = description;
        document.getElementById('partner-modal-logo').src = logo;
        document.getElementById('partner-modal-link').href = link;

        // Mostrar modal
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('opacity-100');
            modal.classList.remove('opacity-0');
            modalContent.classList.add('scale-100');
            modalContent.classList.remove('scale-95');
        }, 10);

        // Cupón
        const couponDisplay = document.getElementById('coupon-display');
        const couponCode = document.getElementById('partner-modal-coupon-code');
        if (link.includes('coupon=')) {
            const coupon = link.split('coupon=')[1].split('&')[0];
            couponCode.textContent = coupon.toUpperCase();
            couponDisplay.classList.remove('hidden');
        } else {
            couponDisplay.classList.add('hidden');
        }

        // Íconos
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function closePartnerModal() {
        if (!modal || !modalContent) return;

        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');

        setTimeout(() => modal.classList.add('hidden'), 200);
    }

    function copyCouponCode(event) {
        const code = document.getElementById('partner-modal-coupon-code').textContent;
        navigator.clipboard.writeText(code);
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
        }, 2000);
    }

    // ✅ Nueva versión del cierre por clic fuera
    modal.addEventListener('click', (e) => {
        // Solo cierra si se hace clic directamente en el fondo, no en el contenido
        if (e.target === modal) {
            closePartnerModal();
        }
    });

    // Exponer globalmente
    window.openPartnerModal = openPartnerModal;
    window.closePartnerModal = closePartnerModal;
    window.copyCouponCode = copyCouponCode;
});

// Función para copiar el cupón al portapapeles
function copyCouponCode() {
    const couponCode = document.getElementById('partner-modal-coupon-code').textContent;
    navigator.clipboard.writeText(couponCode).then(() => {
        alert(currentLanguage === 'es' ? '¡Cupón copiado! Puedes usarlo en el sitio web del socio.' : 'Coupon copied! You can use it on the partner\'s website.');
    }, (err) => {
        console.error('Error al copiar el cupón:', err);
        alert(currentLanguage === 'es' ? 'No se pudo copiar el cupón. Por favor, cópialo manualmente.' : 'Could not copy the coupon. Please copy it manually.');
    });
}