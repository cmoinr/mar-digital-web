import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * @typedef {Object} TestimonialItem
 * @property {string} quote
 * @property {string} author
 * @property {string} [role]
 * @property {string} [avatar]
 */

/**
 * @param {{ items: TestimonialItem[]; intervalMs?: number; }} props
 */
export default function TestimonialCarousel({ items = [], intervalMs = 8000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const count = items.length;

  const next = useCallback(() => {
    setIndex(i => (i + 1) % count);
  }, [count]);
  const prev = useCallback(() => {
    setIndex(i => (i - 1 + count) % count);
  }, [count]);

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current && clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, intervalMs);
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [index, paused, next, intervalMs, count]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  if (!count) return null;

  return (
    <div
      className="relative"
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Testimonios"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative Background Orbs (ajustados para no competir con el texto) */}
      <div className="pointer-events-none absolute -top-40 -left-52 w-[32rem] h-[32rem] bg-brand/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-60 w-[36rem] h-[36rem] bg-brand-dark/40 rounded-full blur-3xl" />

      {/* Contenedor estable para evitar saltos de altura y centrar controles */}
      <div className="relative overflow-hidden min-h-[340px] md:min-h-[300px] flex items-center">
        {items.map((t, i) => {
          const active = i === index;
          return (
            <figure
              key={i}
              className={`max-w-4xl mx-auto w-full text-center transition-opacity duration-600 ease-out ${active ? 'opacity-100 relative' : 'opacity-0 pointer-events-none absolute inset-0'} px-4`}
            >
              <div className="relative mx-auto max-w-3xl">
                <blockquote className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 md:px-14 py-14 md:py-16 text-left shadow-lg shadow-black/20">
                  {/* Comillas decorativas posicionadas fuera del flujo del párrafo */}
                  <span aria-hidden="true" className="select-none absolute top-2 left-5 text-6xl md:text-7xl font-serif text-white/15">“</span>
                  <span aria-hidden="true" className="select-none absolute -bottom-8 right-6 text-6xl md:text-7xl font-serif text-white/15">”</span>
                  <p className="relative z-10 text-base md:text-xl leading-relaxed text-white font-medium tracking-tight">
                    {t.quote}
                  </p>
                </blockquote>
              </div>
              <figcaption className="mt-10 flex flex-col items-center gap-4">
                {t.avatar && (
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-16 h-16 rounded-full ring-4 ring-white/15 object-cover shadow-lg shadow-black/40"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                )}
                <div className="text-center">
                  <p className="font-semibold text-white text-sm md:text-base tracking-wide">{t.author}</p>
                  {t.role && <p className="text-xs md:text-sm text-white/60 mt-0.5">{t.role}</p>}
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {count > 1 && (
        <>
          {/* Controles centrados verticalmente respecto al contenedor estable */}
          <button
            aria-label="Anterior"
            onClick={prev}
            className="group absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md shadow-lg shadow-black/30 transition text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-active:scale-90 transition" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="group absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md shadow-lg shadow-black/30 transition text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-active:scale-90 transition" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg>
          </button>
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir a testimonio ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ring-2 ring-white/30 ${i === index ? 'bg-white ring-offset-2 ring-offset-white/10' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
