# Plataforma de Impacto Digital

Monorepo con:
- Frontend: Astro + MDX + TailwindCSS + islas React (posibilidad de añadir Vue/Svelte)
- Backend: FastAPI (Python 3.11+)
- API Contract: OpenAPI + generación de tipos TS
- Infra local: Docker Compose
- Calidad: ESLint, Prettier, Ruff, mypy, tests (Vitest / Pytest)
- Objetivo: Sitio de marketing + blog + secciones dinámicas ligeras + API escalable

## Apps
- apps/web: Sitio público (landing, blog, contenido)
- apps/backend: API (FastAPI)

## Packages
- packages/api-client: Cliente TypeScript generado (OpenAPI)
- packages/ui: Componentes compartidos (tokens, wrappers)

## Flujo de Desarrollo
1. Levantar backend: make dev-back
2. Generar OpenAPI cliente: make api-types (después de levantar backend)
3. Levantar frontend: make dev-web
4. Editar contenido en `apps/web/src/content/blog/*`

## Tecnologías Clave Frontend
- Astro Islands
- MDX / Content Collections
- TailwindCSS
- Integraciones: sitemap, robots, RSS
- React para componentes interactivos (Hero animado, formulario lead)
- Futuro: añadir Vue/Svelte instalando integración oficial

## Scripts Clave
- make dev       (todo)
- make dev-back
- make dev-web
- make api-types

## Despliegue (idea)
- Frontend: Vercel / Netlify (build estático + `adapter-node` si SSR parcial)
- Backend: Fly.io / Railway / Render / AWS
- Dominio & CDN: Cloudflare

## Roadmap (ver docs/roadmap.md)

---
¿Quieres que generemos CI/CD y autenticación en un siguiente PR? Abre un issue y lo seguimos.
