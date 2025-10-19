# 🚀 Mar Digital - Plataforma de Impacto Digital

> Solución moderna y escalable para impulsar marcas con diseño estratégico y tecnología de vanguardia.

![Status](https://img.shields.io/badge/status-en%20desarrollo-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Node](https://img.shields.io/badge/node-18+-brightgreen?style=flat-square)
![Python](https://img.shields.io/badge/python-3.11+-blue?style=flat-square)

---

## 📋 Tabla de Contenidos

- [Visión General](#visión-general)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Estado Actual](#estado-actual)
- [Instalación y Configuración](#instalación-y-configuración)
- [Flujo de Desarrollo](#flujo-de-desarrollo)
- [Características Implementadas](#características-implementadas)
- [Roadmap](#roadmap)

---

## 🎯 Visión General

**Mar Digital** es una plataforma profesional que combina:

✨ **Frontend Moderno**
- Sitio web público con landing page de alto impacto
- Blog dinámico con contenido en MDX
- Componentes interactivos y responsivos
- Optimización de rendimiento (Core Web Vitals)
- Soporte para múltiples dispositivos (Desktop, Tablet, Mobile con correcciones iOS/Safari)

🔌 **Backend Escalable**
- API RESTful con FastAPI
- Gestión de leads y contactos
- Sistema de health checks
- Documentación OpenAPI automática

🏗️ **Infraestructura**
- Monorepo con pnpm workspaces
- Docker Compose para desarrollo local
- Tipado end-to-end con OpenAPI
- Calidad de código con ESLint, Prettier, Ruff

---

## 🛠️ Tecnologías

### Frontend
```
Astro 4.x          - Framework SSG/SSR moderno
React 18.x         - Componentes interactivos (Islands)
TypeScript 5.x     - Type safety
TailwindCSS 3.x    - Estilos utilitarios
MDX                - Contenido con componentes
```

### Backend
```
FastAPI            - Framework asincrónico
Python 3.11+       - Backend robusto
Pydantic           - Validación de datos
OpenAPI/Swagger    - Documentación automática
```

### DevOps & Calidad
```
Docker Compose     - Orquestación local
pnpm               - Package manager
ESLint             - Linting JS/TS
Prettier           - Formateador de código
Ruff               - Linting Python
```

---

## 📂 Estructura del Proyecto

```
mar-digital-web/
├── apps/
│   ├── web/                           # Frontend Astro
│   │   ├── src/
│   │   │   ├── pages/                 # Rutas (index, blog, servicios, etc.)
│   │   │   ├── components/            # Componentes reutilizables
│   │   │   │   ├── Hero.jsx           # Hero animado con React
│   │   │   │   ├── LeadForm.jsx       # Formulario de contacto
│   │   │   │   ├── HeroCarousel.jsx   # Carrusel de beneficios
│   │   │   │   └── ...
│   │   │   ├── layouts/               # Layouts base
│   │   │   ├── content/               # Content Collections (blog)
│   │   │   ├── styles/                # CSS global + animaciones
│   │   │   └── utils/                 # Utilidades (scroll reveal, etc.)
│   │   ├── public/                    # Assets estáticos
│   │   └── tailwind.config.cjs        # Configuración TailwindCSS
│   │
│   └── backend/                       # API FastAPI
│       ├── app/
│       │   ├── main.py                # Punto de entrada
│       │   ├── routers/
│       │   │   ├── health.py          # Health checks
│       │   │   └── leads.py           # Gestión de leads
│       │   └── models/
│       ├── requirements.txt           # Dependencias Python
│       └── Dockerfile
│
├── packages/
│   ├── api-client/                    # Cliente TS generado (OpenAPI)
│   └── ui/                            # Componentes compartidos
│
├── infra/
│   └── docker/
│       └── docker-compose.yml         # Orquestación local
│
├── docs/
│   ├── BACKDROP_BLUR_iOS_FIX.md       # Fix para Safari/iOS
│   ├── TECHNICAL_EXPLANATION_iOS_FIX.md
│   ├── TESTING_GUIDE_iOS_BACKDROP_BLUR.md
│   ├── VERIFICATION_BACKDROP_BLUR.md
│   └── OPTIMIZATION_GUIDE.md
│
└── Makefile                           # Scripts principales
```

---

## ✅ Estado Actual

### 🎨 Frontend (85% completado)

#### Secciones Implementadas ✓
- **Hero Principal**: Animaciones suaves, CTA destacados, fondo dinámico
- **¿Quiénes Somos?**: Descripción de la misión con efecto scroll reveal
- **Divisiones**: 
  - Mar Digital Creative (Diseño, Branding, Marketing)
  - Mar Digital Business (Consultoría estratégica)
  - Cards con glass morphism (backdrop-blur)
- **Beneficios**: Carrusel automático con 4 propuestas de valor
- **Servicios Destacados**: Timeline visual con 4 servicios clave
- **CTA Final**: Sección de cierre con propuesta principal
- **Blog**: Sistema de contenido dinámico con MDX
- **Páginas Adicionales**: about, servicios, creative, business, contacto, optimizacion

#### Optimizaciones Implementadas ✓
- ✅ **Core Web Vitals**: Imágenes optimizadas con `<picture>` adaptativas
- ✅ **Responsive Design**: Mobile-first, TeSTING en iOS/Android
- ✅ **iOS/Safari Fix**: Soporte completo para `backdrop-blur-xl` en iOS
- ✅ **Animaciones Suaves**: Scroll reveal, fade-in, transforms GPU-aceleradas
- ✅ **Accesibilidad**: ARIA labels, semantic HTML, color contrast WCAG AA
- ✅ **Performance**: Lazy loading de imágenes, CSS optimizado, minificación

#### Arreglios y Mejoras Recientes ✓
- 🔧 Reducción de Timeline Points de `w-16` a `w-12` para mejor proporcionalidad
- 🔧 Ajuste de línea horizontal (top-8 → top-6) centrada con puntos
- 🔧 **iOS Backdrop Blur Fix**: Prefijo `-webkit-backdrop-filter` para Safari/iOS
- 🔧 GPU acceleration con `translateZ(0)` para mejor rendimiento móvil

### 🔌 Backend (70% completado)

#### Rutas Implementadas ✓
- `GET /health` - Health check
- `POST /leads` - Crear nuevo lead
- `GET /leads` - Listar leads (admin)

#### Documentación ✓
- OpenAPI/Swagger automático en `/docs`
- Tipado con Pydantic
- Validación de entrada robusta

### 📦 Packages (40% completado)

#### api-client ✓
- Cliente TypeScript generado automáticamente desde OpenAPI
- Tipado end-to-end

#### ui ✓
- Componentes compartidos base
- Sistema de design tokens (en desarrollo)

---

## 🚀 Instalación y Configuración

### Requisitos Previos
```bash
- Node.js 18+ (recomendado 20)
- Python 3.11+
- Docker & Docker Compose
- pnpm (npm install -g pnpm)
```

### Instalación Rápida

```bash
# 1. Clonar repositorio
git clone https://github.com/cmoinr/mar-digital-web.git
cd mar-digital-web

# 2. Instalar dependencias (frontend + backend)
pnpm install

# 3. Configurar variables de entorno
cp apps/backend/.env.example apps/backend/.env
cp apps/web/.env.example apps/web/.env

# 4. Levantar infraestructura
docker-compose -f infra/docker/docker-compose.yml up -d
```

---

## 💻 Flujo de Desarrollo

### Opción 1: Desarrollo Completo (Recomendado)

```bash
# Terminal 1: Backend
cd apps/backend
pnpm dev:back
# → Corre en http://localhost:8000
# → Swagger en http://localhost:8000/docs

# Terminal 2: Frontend
cd apps/web
pnpm dev
# → Corre en http://localhost:3000
```

### Opción 2: Desarrollo Solo Frontend

```bash
cd apps/web
pnpm dev
# → http://localhost:3000
```

### Opción 3: Usar Makefile (Todo-en-uno)

```bash
make dev          # Levanta backend + frontend
make dev-web      # Solo frontend
make dev-back     # Solo backend
make api-types    # Regenera cliente TS desde OpenAPI
make lint         # Linting de código
make format       # Formateado automático
```

---

## ⚡ Características Implementadas

### 🎨 Diseño & UX

| Característica | Estado | Detalles |
|---|---|---|
| Landing page profesional | ✅ | Hero, secciones, CTA |
| Glass Morphism (Backdrop Blur) | ✅ | Soporte completo iOS/Safari |
| Animaciones suaves | ✅ | Scroll reveal, fade-in, micro-interacciones |
| Responsive design | ✅ | Mobile/Tablet/Desktop optimizado |
| Dark theme profesional | ✅ | Paleta azul-cyan coherente |
| Formulario de contacto | ✅ | React + validación |
| Blog dinámico | ✅ | MDX + Content Collections |

### 🔧 Técnico

| Característica | Estado | Detalles |
|---|---|---|
| TypeScript end-to-end | ✅ | Frontend + Backend tipado |
| API REST documentada | ✅ | OpenAPI/Swagger automático |
| Sistema de routing | ✅ | Astro pages + dinámicas |
| Gestor de contenido | ✅ | MDX + frontmatter |
| Optimización imágenes | ✅ | Picture adaptativas + WebP |
| Health checks | ✅ | Backend + monitoreo |
| Docker local | ✅ | Compose para dev/local |
| CSS modular | ✅ | TailwindCSS + custom utilities |

### 🚀 Performance & Accesibilidad

| Métrica | Estado | Meta |
|---|---|---|
| Lighthouse Performance | ✅ | 90+ |
| Core Web Vitals | ✅ | Good |
| Mobile Responsive | ✅ | 100% |
| Accessibility (WCAG AA) | ✅ | 95%+ |
| iOS Safari Compatible | ✅ | Backdrop blur OK |

---

## 🛣️ Roadmap

### Fase 2 (Próximas Semanas) 📋

```
Frontend:
- [ ] Página de testimonios interactivos
- [ ] Sección de casos de estudio
- [ ] Integración con CMS headless (Sanity/Contentful)
- [ ] Análisis (Google Analytics 4)
- [ ] A/B Testing de CTAs

Backend:
- [ ] Base de datos (PostgreSQL + Prisma)
- [ ] Autenticación JWT
- [ ] Sistema de contacto (email notifications)
- [ ] Dashboard admin básico
- [ ] Rate limiting y seguridad
```

### Fase 3 (Mediano Plazo) 🎯

```
- [ ] CI/CD (GitHub Actions)
- [ ] Testing (Vitest + Pytest)
- [ ] SEO avanzado (structured data, sitemap dinámico)
- [ ] PWA (Service Workers)
- [ ] Integración con herramientas de marketing (Mailchimp, HubSpot)
- [ ] Localización (i18n)
```

### Fase 4 (Largo Plazo) 🚀

```
- [ ] E-commerce module (si aplica)
- [ ] Sistema de suscripción
- [ ] API webhooks
- [ ] Microservicios desacoplados
- [ ] Mobile app (React Native)
```

---

## 📖 Documentación Adicional

- **[iOS Backdrop Blur Fix](./BACKDROP_BLUR_iOS_FIX.md)** - Detalle técnico de la solución para Safari
- **[Testing Guide iOS](./TESTING_GUIDE_iOS_BACKDROP_BLUR.md)** - Cómo verificar en dispositivos iOS
- **[Optimization Guide](./OPTIMIZATION_GUIDE.md)** - Guía de rendimiento y Core Web Vitals

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Crea una rama: `git checkout -b feature/nueva-caracteristica`
2. Haz commit de cambios: `git commit -m "feat: descripción"`
3. Push a la rama: `git push origin feature/nueva-caracteristica`
4. Abre un Pull Request

---

## 📋 Checklist de Calidad

Antes de hacer deploy:

- [ ] Tests pasan: `pnpm test`
- [ ] Lint OK: `pnpm lint`
- [ ] Tipos OK: `pnpm type-check`
- [ ] Lighthouse 90+: `pnpm build && pnpm preview`
- [ ] Mobile testing en iOS/Android
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)

---

## 🔐 Variables de Entorno

### Backend (.env)
```bash
DATABASE_URL=postgresql://...
API_PORT=8000
ENVIRONMENT=development
SECRET_KEY=tu-clave-secreta
```

### Frontend (.env)
```bash
PUBLIC_API_URL=http://localhost:8000
PUBLIC_SITE_URL=http://localhost:3000
SITE_NAME=Mar Digital
```

---

## 📞 Soporte

Para reportar issues o sugerencias:
- GitHub Issues: [Crear Issue](https://github.com/cmoinr/mar-digital-web/issues)
- Email: contacto@mardigital.com

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver [LICENSE](./LICENSE) para más detalles.

---

<div align="center">

### Hecho con ❤️ por el equipo de Mar Digital

**[Sitio Web](https://mardigital.com)** • **[Blog](https://mardigital.com/blog)** • **[Contacto](https://mardigital.com/contacto)**

</div>
