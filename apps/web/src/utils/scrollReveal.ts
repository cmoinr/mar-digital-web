// Scroll Reveal System
// Detecta elementos en viewport y añade clase 'revealed'

export function initScrollReveal() {
  if (typeof window === 'undefined') return;
  
  // Verificar preferencia de movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Si prefiere movimiento reducido, revelamos todo inmediatamente
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', // Trigger un poco antes de que entre en viewport
    threshold: 0.15
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Añadir delay escalonado para múltiples elementos
        const delay = index * 100;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        
        // Dejar de observar una vez revelado
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos con clases de scroll reveal
  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'
  );
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
}

// Auto-inicializar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
}
