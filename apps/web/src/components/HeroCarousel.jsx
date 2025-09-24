import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * @typedef {Object} HeroSlide
 * @property {string} image URL de la imagen (local en /public o externa)
 * @property {string} phrase Frase principal
 * @property {string} [sub] Texto secundario
 * @property {string} [ctaText] Texto del botón CTA
 * @property {string} [ctaHref] URL del CTA
 * @property {string} [tagline] Pequeño texto superior
 * @property {string} [alt] Texto alternativo de la imagen
 */
/**
 * @typedef {Object} HeroCarouselProps
 * @property {HeroSlide[]} slides
 * @property {number} [intervalMs]
 * @property {string} [heightClass]
 */

/**
 * Carrusel hero de ancho completo.
 * @param {HeroCarouselProps} props
 */
export default function HeroCarousel({ slides = [], intervalMs = 6000, heightClass = 'h-[60vh] md:h-[70vh]' }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchDelta = useRef(0);

  const count = slides.length;

  const next = useCallback(() => {
    setIndex(i => (i + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setIndex(i => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (count <= 1) return; // no autoplay if single slide
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, intervalMs);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [index, next, intervalMs, count]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { next(); }
    if (e.key === 'ArrowLeft') { prev(); }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDelta.current = 0;
  };
  const handleTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDelta.current = e.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null) return;
    if (touchDelta.current < -60) next();
    else if (touchDelta.current > 60) prev();
    touchStartX.current = null;
  };

  if (!count) {
    return null;
  }

  return (
    <section
      className={`relative w-full ${heightClass} overflow-hidden bg-black`} 
      aria-roledescription="carousel"
      aria-label="Hero destacadas"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides wrapper */}
      <div className="absolute inset-0 flex transition-transform duration-[900ms] ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div key={i} className="relative shrink-0 w-full h-full">
            {/* Background image */}
            <img
              src={s.image}
              alt={s.alt || s.phrase}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
              draggable={false}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
          </div>
        ))}
      </div>

      {/* Text layer */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6 animate-fade-in">
          <p className="text-xs tracking-wider uppercase font-semibold text-white/80">{slides[index].tagline || 'Innovación • Rendimiento • Escalabilidad'}</p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
            {slides[index].phrase}
          </h1>
          {slides[index].sub && (
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              {slides[index].sub}
            </p>
          )}
          <div className="flex items-center justify-center gap-4">
            {slides[index].ctaText && (
              <a
                href={slides[index].ctaHref || '#contacto'}
                className="px-7 py-3 rounded-full bg-brand hover:bg-brand-dark transition font-semibold shadow-lg shadow-brand/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                {slides[index].ctaText}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      {count > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition"
          >
            <span className="sr-only">Anterior</span>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur transition"
          >
            <span className="sr-only">Siguiente</span>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
