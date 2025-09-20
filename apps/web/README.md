# Frontend (Astro)

Este paquete contiene la aplicación web construida con [Astro 4] y TailwindCSS.

## Scripts

```bash
pnpm dev       # Inicia servidor de desarrollo
pnpm build     # Genera la versión estática /dist
pnpm preview   # Sirve el build para verificación
```

## Estructura relevante

```
src/
  pages/            # Rutas (archivo = ruta)
    index.astro     # Home
    about.astro     # Página "Nosotros"
    servicios.astro # Página de servicios
    404.astro       # Página de error
    sandbox/        # Área de experimentación
      components.astro
  components/       # Componentes UI (Astro/React)
    Card.astro
    Alert.astro
    Hero.jsx
    LeadForm.jsx
  layouts/
    BaseLayout.astro
  content/          # Contenido gestionado por collections
    blog/           # Markdown posts
    config.ts       # Definición de la collection
  styles/
    global.css      # Estilos globales + Tailwind
```

## Variables de entorno

En `LeadForm.jsx` se usa `PUBLIC_API_BASE_URL`:

```
PUBLIC_API_BASE_URL=https://tu-api.example.com
```

En desarrollo puedes crear un archivo `.env` en esta carpeta (Astro expone las variables que comienzan con `PUBLIC_`).

## Componentes de ejemplo

`Card.astro` y `Alert.astro` sirven como base para construir más UI. Revisa `/sandbox/components` para verlos juntos.

## Crear una nueva página

1. Crea un archivo en `src/pages/nueva-pagina.astro`.
2. Usa el layout base:
   ```astro
   ---
   import BaseLayout from "../layouts/BaseLayout.astro";
   ---
   <BaseLayout title="Nueva" description="Descripción corta">
     <section class="px-6 py-16">
       <h1 class="text-3xl font-bold mb-4">Título</h1>
       <p>Contenido...</p>
     </section>
   </BaseLayout>
   ```
3. Visita `http://localhost:3000/nueva-pagina`.

## Agregar un post del blog

1. Crea un archivo Markdown en `src/content/blog/mi-post.md`:
   ```md
   ---
   title: "Título del post"
   description: "Resumen breve"
   publishedAt: "2025-09-19"
   tags: ["tag1","tag2"]
   ---
   Contenido en **Markdown**.
   ```
2. Se listará automáticamente en `/blog` (si `draft: true` no está presente o es false).

## Tailwind

Los colores de marca están definidos en `tailwind.config.cjs` bajo `theme.extend.colors.brand`.

Ejemplos:
```
bg-brand
bg-brand-dark
text-brand
```

## Buenas prácticas

- Mantén los componentes presentacionales simples.
- Usa React solo donde necesites interactividad (formularios, estados, fetch).
- Extrae componentes que se repitan +2 veces.
- Usa `clsx` para clases condicionales cuando crezca la complejidad.

## Próximos pasos sugeridos

- Añadir tests ligeros de contenido (Playwright o Vitest + @astrojs/test).
- Configurar análisis de accesibilidad.
- Integrar pipeline de despliegue.

---
Feliz construcción 🚀
