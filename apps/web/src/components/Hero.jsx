import React, { useEffect, useRef } from "react";

/**
 * Hero textual block con CTAs y animaciones mejoradas
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
  primaryCtaHref = "/contacto",
  secondaryCtaText,
  secondaryCtaHref,
  kicker,
  align = "left",
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";
  const heroRef = useRef(null);

  useEffect(() => {
    // Animación de aparición escalonada
    const elements = heroRef.current?.querySelectorAll(".hero-animate");
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("hero-revealed");
      }, index * 150);
    });
  }, []);

  return (
    <div ref={heroRef} className={`flex flex-col ${alignment} max-w-3xl`}>
      {/* Kicker Badge */}
      {kicker && (
        <div className="hero-animate opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100/50 shadow-sm mb-6 group hover:shadow-md transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
              {kicker}
            </span>
            <svg
              className="w-3 h-3 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Headline con gradiente animado */}
      <h1 className="hero-animate opacity-0 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
        {headline.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block mr-3 pb-2 hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-neutral-50 via-sky-200 to-fuchsia-300 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_100%]"
          >
            {word}
          </span>
        ))}
      </h1>

      {/* Subtitle con mejor tipografía */}
      {sub && (
        <p className="hero-animate opacity-0 text-base sm:text-lg lg:text-xl text-teal-100 mb-10 leading-relaxed max-w-2xl font-light">
          {sub}
        </p>
      )}

      {/* CTAs mejorados con efectos hover */}
      {(primaryCtaText || secondaryCtaText) && (
        <div className="hero-animate opacity-0 flex flex-wrap gap-4">
          {primaryCtaText && (
            <a
              href={primaryCtaHref}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-[length:200%_100%] text-white font-semibold text-base shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:bg-right hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">{primaryCtaText}</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
            </a>
          )}
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/90 backdrop-blur-sm text-blue-700 font-semibold text-base shadow-lg hover:shadow-xl border border-blue-200/50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="relative z-10">{secondaryCtaText}</span>
              <svg
                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {/* Gradient overlay on hover */}
              <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </a>
          )}
        </div>
      )}

      {/* Subtle decorative elements */}
      <div className="absolute -left-8 top-1/4 w-72 h-72 bg-gradient-to-br from-blue-400/5 to-cyan-400/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute -right-8 bottom-1/4 w-64 h-64 bg-gradient-to-tl from-cyan-400/5 to-blue-400/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}

// CSS para las animaciones (agregar al componente o global.css)
const styles = `
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-shift {
  animation: gradientShift 8s ease-in-out infinite;
}
.hero-animate {
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  transform: translateY(20px);
}
.hero-revealed {
  opacity: 1 !important;
  transform: translateY(0);
}
`;
