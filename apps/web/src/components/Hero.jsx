import React from 'react';

/**
 * Hero textual block con CTAs opcionales.
 * Props:
 *  - headline: string (requerido)
 *  - sub: string (subtítulo)
 *  - primaryCtaText / primaryCtaHref
 *  - secondaryCtaText / secondaryCtaHref
 *  - kicker: pequeño texto superior
 *  - align: 'left' | 'center'
 */
export default function Hero({
  headline,
  sub,
  primaryCtaText,
  primaryCtaHref = '/contacto',
  secondaryCtaText,
  secondaryCtaHref,
  kicker,
  align = 'left'
}) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignment} max-w-3xl`}>      
      {kicker && <p className="text-xs font-semibold tracking-wider uppercase text-brand-dark mb-3">{kicker}</p>}
      <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5 bg-clip-text text-transparent bg-gradient-to-r from-brand-dark via-brand to-cyan-400">
        {headline}
      </h1>
      {sub && <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{sub}</p>}
      {(primaryCtaText || secondaryCtaText) && (
        <div className="flex flex-wrap gap-4">
          {primaryCtaText && (
            <a href={primaryCtaHref} className="px-7 py-3 rounded-full bg-brand text-white font-semibold shadow-lg shadow-brand/30 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition">
              {primaryCtaText}
            </a>
          )}
          {secondaryCtaText && (
            <a href={secondaryCtaHref} className="px-7 py-3 rounded-full bg-white text-brand font-semibold shadow hover:shadow-md border border-brand/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition">
              {secondaryCtaText}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
