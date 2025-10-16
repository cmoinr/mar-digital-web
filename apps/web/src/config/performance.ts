/**
 * Configuración de optimización de rendimiento
 * Este archivo contiene configuraciones adicionales para mejorar el rendimiento
 */

// Configuración de caché para recursos externos
export const CACHE_CONFIG = {
  pexels: {
    maxAge: 31536000, // 1 año
    staleWhileRevalidate: 86400, // 1 día
  },
  fonts: {
    maxAge: 31536000, // 1 año
    immutable: true,
  },
};

// Configuración de lazy loading
export const LAZY_LOAD_CONFIG = {
  rootMargin: "50px",
  threshold: 0.01,
  enableAutoSizes: true,
};

// Configuración de optimización de imágenes
export const IMAGE_OPTIMIZATION = {
  formats: ["webp", "avif", "jpeg"],
  quality: {
    default: 80,
    thumbnail: 70,
    hero: 85,
  },
  sizes: {
    thumbnail: 400,
    small: 640,
    medium: 1024,
    large: 1920,
    xlarge: 2560,
  },
};

// Scripts y estilos críticos que deben cargarse inmediatamente
export const CRITICAL_RESOURCES = ["scrollReveal", "hero-animations"];

// Scripts que pueden cargarse de forma diferida
export const DEFERRED_SCRIPTS = ["analytics", "social-widgets", "chat-widget"];
