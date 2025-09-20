#!/usr/bin/env bash
set -e

echo "Creando directorios..."
mkdir -p apps/web/src/{components,content/blog,content,layouts,pages/blog,styles}
mkdir -p apps/backend/app/routers
mkdir -p packages/api-client/src/generated
mkdir -p packages/ui/src
mkdir -p infra/docker

################################
# Root files
################################
cat > README.md <<'EOF'
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
EOF

cat > .gitignore <<'EOF'
# Node / Frontend
node_modules
dist
.pnpm-store
*.tsbuildinfo

# Python
__pycache__/
*.py[cod]
.venv
.env
.env.*

# General
.DS_Store
.idea
*.log

# Generated
packages/api-client/src/generated
EOF

cat > Makefile <<'EOF'
.PHONY: dev dev-web dev-back api-types format lint

dev: dev-back dev-web

dev-web:
	cd apps/web && pnpm dev

dev-back:
	cd apps/backend && uvicorn app.main:app --reload --port 8000

api-types:
	# Export OpenAPI schema
	curl -s http://localhost:8000/openapi.json -o apps/backend/openapi.json
	cd packages/api-client && pnpm run generate

lint:
	cd apps/web && pnpm run lint
	cd apps/backend && ruff check app

format:
	cd apps/web && pnpm run format
	cd apps/backend && ruff format app
EOF

cat > .env.example <<'EOF'
# Backend
API_BASE_URL=http://localhost:8000
# Frontend (expuesto a Astro)
PUBLIC_API_BASE_URL=http://localhost:8000
SITE_URL=http://localhost:3000
EOF

cat > package.json <<'EOF'
{
  "name": "impacto-monorepo",
  "private": true,
  "version": "0.1.0",
  "workspaces": [
    "apps/web",
    "apps/backend",
    "packages/*"
  ],
  "devDependencies": {
    "prettier": "^3.2.5"
  }
}
EOF

cat > pnpm-workspace.yaml <<'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

################################
# Frontend
################################
cat > apps/web/package.json <<'EOF'
{
  "name": "web",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "content:check": "astro check"
  },
  "dependencies": {
    "astro": "^4.10.0",
    "@astrojs/tailwind": "^5.1.0",
    "@astrojs/mdx": "^3.0.0",
    "@astrojs/sitemap": "^3.1.0",
    "@astrojs/rss": "^4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "clsx": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "eslint": "^9.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "prettier": "^3.2.5",
    "prettier-plugin-astro": "^0.12.2",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35"
  }
}
EOF

cat > apps/web/astro.config.mjs <<'EOF'
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3000',
  integrations: [
    tailwind({
      config: { applyBaseStyles: true }
    }),
    mdx(),
    sitemap()
  ],
  server: {
    port: 3000
  }
});
EOF

cat > apps/web/tailwind.config.cjs <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,md,mdx,js,jsx,ts,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,astro}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2E6AFF",
          dark: "#1B47A8",
          light: "#E2ECFF"
        }
      }
    }
  },
  plugins: []
};
EOF

cat > apps/web/src/styles/global.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --radius: 8px;
}

body {
  font-family: system-ui, sans-serif;
  background: #ffffff;
  color: #111827;
  line-height: 1.5;
}
EOF

cat > apps/web/src/env.d.ts <<'EOF'
/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string;
}
EOF

cat > apps/web/src/content/config.ts <<'EOF'
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(180),
    publishedAt: z.string().transform(str => new Date(str)),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional()
  })
});

export const collections = { blog };
EOF

cat > apps/web/src/content/blog/primera-publicacion.md <<'EOF'
---
title: "Bienvenidos a la plataforma de impacto"
description: "Nuestra visión y cómo aceleraremos el cambio."
publishedAt: "2025-09-19"
tags: ["vision","impacto"]
heroImage: "/images/hero-default.jpg"
---

## ¿Por qué existimos?

Texto introductorio...

### Siguiente

Más contenido inspirador.
EOF

cat > apps/web/src/layouts/BaseLayout.astro <<'EOF'
---
const { title = "Sitio", description = "Impacto digital", } = Astro.props;
---
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>{title} | Impacto</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body class="min-h-screen flex flex-col">
    <header class="p-4 flex justify-between">
      <a href="/" class="font-bold text-lg">Impacto</a>
      <nav class="space-x-4">
        <a href="/blog" class="hover:underline">Blog</a>
        <a href="/#servicios" class="hover:underline">Servicios</a>
        <a href="/#contacto" class="hover:underline">Contacto</a>
      </nav>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="p-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Impacto. Todos los derechos reservados.
    </footer>
  </body>
</html>
EOF

cat > apps/web/src/pages/index.astro <<'EOF'
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.jsx";
import LeadForm from "../components/LeadForm.jsx";
---
<BaseLayout title="Inicio" description="Plataforma para amplificar tu impacto">
  <section class="px-6 py-16">
    <Hero headline="Aceleramos tu impacto digital" sub="Experiencias web veloces, escalables y orientadas a conversión." />
  </section>
  <section id="servicios" class="px-6 py-12 bg-gray-50">
    <h2 class="text-2xl font-semibold mb-4">Servicios</h2>
    <ul class="grid gap-6 md:grid-cols-3">
      <li class="p-4 border rounded">Estrategia</li>
      <li class="p-4 border rounded">Desarrollo Web</li>
      <li class="p-4 border rounded">Optimización SEO</li>
    </ul>
  </section>
  <section id="contacto" class="px-6 py-12">
    <h2 class="text-2xl font-semibold mb-4">Conversemos</h2>
    <LeadForm />
  </section>
</BaseLayout>
EOF

cat > apps/web/src/pages/blog/index.astro <<'EOF'
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getCollection } from 'astro:content';
const posts = (await getCollection('blog'))
  .filter(p => !p.data.draft)
  .sort((a,b)=> b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
---
<BaseLayout title="Blog" description="Ideas, aprendizajes y visión de impacto.">
  <div class="max-w-3xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold mb-8">Blog</h1>
    <ul class="space-y-6">
      {posts.map(post => (
        <li>
          <a href={`/blog/${post.slug}`} class="block group">
            <h2 class="text-xl font-semibold group-hover:underline">{post.data.title}</h2>
            <p class="text-gray-600 text-sm">{post.data.description}</p>
            <time class="text-xs text-gray-500">
              {post.data.publishedAt.toLocaleDateString("es")}
            </time>
          </a>
        </li>
      ))}
    </ul>
  </div>
</BaseLayout>
EOF

cat > apps/web/src/pages/blog/[...slug].astro <<'EOF'
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const slug = Astro.params.slug?.join('/') || '';
const entry = posts.find(p => p.slug === slug);
if (!entry) {
  throw new Error("Post no encontrado");
}
const { Content, data } = await entry.render();
---
<BaseLayout title={data.title} description={data.description}>
  <article class="prose lg:prose-lg mx-auto px-6 py-12">
    <h1>{data.title}</h1>
    <Content />
  </article>
</BaseLayout>
EOF

cat > apps/web/src/components/Hero.jsx <<'EOF'
import React from 'react';

export default function Hero({ headline, sub }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-extrabold mb-4">{headline}</h1>
      <p className="text-lg text-gray-600 mb-6">{sub}</p>
      <a
        href="#contacto"
        className="inline-block bg-brand text-white px-6 py-3 rounded shadow hover:bg-brand-dark transition"
      >
        Empezar
      </a>
    </div>
  );
}
EOF

cat > apps/web/src/components/LeadForm.jsx <<'EOF'
import React, { useState } from 'react';

export default function LeadForm() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ email: '', nombre: '' });

  async function submit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.PUBLIC_API_BASE_URL}/api/v1/leads`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <input
        type="text"
        placeholder="Nombre"
        className="w-full border rounded px-3 py-2"
        value={form.nombre}
        onChange={e=>setForm({...form, nombre:e.target.value})}
        required
      />
      <input
        type="email"
        placeholder="Correo"
        className="w-full border rounded px-3 py-2"
        value={form.email}
        onChange={e=>setForm({...form, email:e.target.value})}
        required
      />
      <button
        disabled={status==='loading'}
        className="bg-brand text-white px-5 py-2 rounded font-semibold hover:bg-brand-dark disabled:opacity-60"
      >
        {status==='loading' ? 'Enviando...' : 'Enviar'}
      </button>
      {status==='success' && <p className="text-green-600 text-sm">¡Gracias! Te contactaremos.</p>}
      {status==='error' && <p className="text-red-600 text-sm">Error. Intenta de nuevo.</p>}
    </form>
  );
}
EOF

cat > apps/web/.eslintrc.json <<'EOF'
{
  "root": true,
  "env": { "browser": true, "es2023": true },
  "parser": "@typescript-eslint/parser",
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react","@typescript-eslint"],
  "settings": { "react": { "version":"detect" } },
  "overrides": [
    {
      "files": ["*.astro"],
      "parser": "astro-eslint-parser",
      "parserOptions": { "parser": "@typescript-eslint/parser" },
      "rules": {}
    }
  ]
}
EOF

################################
# Backend
################################
cat > apps/backend/requirements.txt <<'EOF'
fastapi==0.111.0
uvicorn[standard]==0.30.1
pydantic==2.7.0
python-dotenv==1.0.1
sqlmodel==0.0.21
httpx==0.27.0
EOF

cat > apps/backend/app/main.py <<'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import health, leads

app = FastAPI(
    title="Impacto API",
    version="0.1.0",
    description="API para la plataforma de impacto."
)

origins = ["http://localhost:3000","*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(leads.router, prefix="/api/v1")
EOF

cat > apps/backend/app/routers/health.py <<'EOF'
from fastapi import APIRouter

router = APIRouter(tags=["health"])

@router.get("/health")
def health():
    return {"status": "ok"}
EOF

cat > apps/backend/app/routers/leads.py <<'EOF'
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
from typing import List

router = APIRouter(tags=["leads"])

class LeadIn(BaseModel):
    nombre: str
    email: EmailStr

class LeadOut(LeadIn):
    id: int

_fake_db: List[LeadOut] = []
_counter = 1

@router.post("/leads", response_model=LeadOut)
def create_lead(data: LeadIn):
    global _counter
    lead = LeadOut(id=_counter, **data.dict())
    _fake_db.append(lead)
    _counter += 1
    return lead

@router.get("/leads", response_model=List[LeadOut])
def list_leads():
    return _fake_db
EOF

cat > apps/backend/run_dev.sh <<'EOF'
#!/usr/bin/env bash
uvicorn app.main:app --reload --port 8000
EOF
chmod +x apps/backend/run_dev.sh

################################
# Packages
################################
cat > packages/api-client/package.json <<'EOF'
{
  "name": "@impacto/api-client",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "generate": "openapi-typescript ../../apps/backend/openapi.json --output src/generated/types.ts"
  },
  "devDependencies": {
    "openapi-typescript": "^6.7.0",
    "typescript": "^5.4.0"
  }
}
EOF

cat > packages/api-client/src/index.ts <<'EOF'
import type { paths } from './generated/types';

export type Lead = {
  id: number;
  nombre: string;
  email: string;
};

type CreateLeadRequest = {
  nombre: string;
  email: string;
};

const API_BASE = process.env.PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function createLead(data: CreateLeadRequest): Promise<Lead> {
  const res = await fetch(`${API_BASE}/api/v1/leads`, {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error creando lead');
  return res.json();
}
EOF

cat > packages/ui/package.json <<'EOF'
{
  "name": "@impacto/ui",
  "private": true,
  "version": "0.0.1",
  "type": "module"
}
EOF

cat > packages/ui/src/Section.tsx <<'EOF'
import React from 'react';
export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
EOF

################################
# Docker
################################
cat > infra/docker/docker-compose.yml <<'EOF'
version: "3.9"
services:
  backend:
    build:
      context: ../../apps/backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    env_file:
      - ../../.env
    volumes:
      - ../../apps/backend:/app
  web:
    build:
      context: ../../apps/web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - PUBLIC_API_BASE_URL=http://localhost:8000
    volumes:
      - ../../apps/web:/app
    depends_on:
      - backend
EOF

cat > apps/backend/Dockerfile <<'EOF'
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
EXPOSE 8000
CMD ["uvicorn","app.main:app","--host","0.0.0.0","--port","8000"]
EOF

cat > apps/web/Dockerfile <<'EOF'
FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm","dev","--host","0.0.0.0"]
EOF

echo "Listo. Ahora ejecuta: pnpm install"
echo "Luego: make dev-back (en una terminal) y make dev-web (en otra)."