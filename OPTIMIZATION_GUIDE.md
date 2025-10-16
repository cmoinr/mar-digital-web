# Guía Rápida: Aplicar Optimizaciones a Otras Páginas

## 🎯 Objetivo

Aplicar las mismas optimizaciones de `index.astro` a todas las páginas del sitio.

---

## 📋 Páginas Pendientes

- [ ] `/src/pages/about.astro`
- [ ] `/src/pages/business.astro`
- [ ] `/src/pages/creative.astro`
- [ ] `/src/pages/servicios.astro`
- [ ] `/src/pages/contacto.astro`
- [ ] `/src/pages/optimizacion.astro`
- [ ] `/src/pages/blog/index.astro`
- [ ] `/src/pages/blog/[slug].astro`

---

## 🔧 Pasos para Optimizar Cada Página

### 1. Importar OptimizedImage

**Antes:**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.jsx";
---
```

**Después:**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.jsx";
import OptimizedImage from "../components/OptimizedImage.astro";
---
```

---

### 2. Reemplazar Tags `<img>` por `<OptimizedImage>`

#### Para Imágenes Hero (Above the Fold)

**Antes:**

```html
<img
  src="https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?..."
  alt=""
  class="w-full h-full object-cover"
/>
```

**Después:**

```html
<OptimizedImage
  src="https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg"
  alt="Descripción de la imagen"
  width="{1920}"
  height="{1080}"
  priority="{true}"
  class="w-full h-full object-cover"
/>
```

**Nota**: `priority={true}` solo para la imagen principal hero de cada página.

---

#### Para Imágenes de Fondo (Background Images)

**Antes:**

```html
<div class="absolute inset-0 -z-10">
  <img src="https://images.pexels.com/photos/14032494/..." alt="" class="..." />
</div>
```

**Después:**

```html
<div class="absolute inset-0 -z-10">
  <OptimizedImage
    src="https://images.pexels.com/photos/14032494/pexels-photo-14032494.jpeg"
    alt=""
    width="{1920}"
    height="{1080}"
    class="w-full h-full object-cover"
  />
</div>
```

---

#### Para Imágenes en Arrays/Loops

**Antes:**

```astro
const beneficios = [
  {
    text: 'Título',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
  }
];

---

<img
  src={beneficio.image}
  alt=""
  class="..."
/>
```

**Después:**

```astro
const beneficios = [
  {
    text: 'Título',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
  }
];

---

<OptimizedImage
  src={beneficio.image}
  alt={beneficio.text}
  width={1200}
  height={800}
  class="..."
/>
```

---

### 3. Agregar Dimensiones Explícitas

Siempre especifica `width` y `height` basado en el uso:

| Tipo de Imagen     | Width | Height | Uso                        |
| ------------------ | ----- | ------ | -------------------------- |
| Hero Full Width    | 1920  | 1080   | Imagen principal de página |
| Background Section | 1920  | 1080   | Fondos de secciones        |
| Card/Carousel      | 1200  | 800    | Tarjetas, carruseles       |
| Thumbnail          | 600   | 400    | Miniaturas, previews       |
| Icon/Avatar        | 400   | 400    | Íconos, avatares           |

---

### 4. Optimizar URLs de Pexels

Elimina los parámetros de tracking de Pexels (todo después de `?`):

**Antes:**

```
https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?_gl=1*1dnwk1d*_ga*...
```

**Después:**

```
https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg
```

El componente `OptimizedImage` agregará automáticamente los parámetros de optimización correctos.

---

### 5. Verificar Componentes React

Si la página usa componentes React:

**✅ Bueno (Critical, Above-the-Fold):**

```astro
<Hero client:load />
```

**⚠️ Revisar (Non-Critical, Below-the-Fold):**

```astro
<!-- Cambiar a client:visible si no es crítico -->
<TestimonialCarousel client:visible />
```

**Opciones de hidratación:**

- `client:load` - Carga inmediata (solo para contenido crítico)
- `client:idle` - Carga cuando el navegador está idle
- `client:visible` - Carga cuando el componente es visible
- `client:media` - Carga basado en media query

---

## 🧪 Testing Después de Optimizar

Después de optimizar cada página, ejecuta:

```bash
# 1. Build
pnpm build

# 2. Verificar errores
# Si hay errores, revisa la consola

# 3. Preview
pnpm preview

# 4. Visita la página en el navegador
# http://localhost:3000/[tu-pagina]

# 5. Verifica:
# - ✓ Las imágenes cargan correctamente
# - ✓ No hay layout shift
# - ✓ Las animaciones funcionan
# - ✓ El contenido se muestra bien
```

---

## 📊 Verificar Resultados

```bash
# Ver tamaño del bundle después de cada optimización
pnpm build && du -sh dist/

# Ver imágenes cargadas
# Abre DevTools > Network > Filter: Img
# Verifica que tengan parámetros: ?w=...&h=...&auto=compress
```

---

## ⚠️ Errores Comunes y Soluciones

### Error: "Cannot read property 'useRef'"

**Causa**: Conflicto con configuración SSR  
**Solución**: Ya corregido en `astro.config.mjs`

### Error: Build falla con imágenes

**Causa**: URL de imagen inválida o sin protocolo  
**Solución**: Asegúrate que todas las URLs empiecen con `https://`

### Error: Página se ve diferente

**Causa**: Falta especificar dimensiones o classes  
**Solución**: Verifica que `width`, `height` y `class` sean correctos

### Advertencia: Layout Shift

**Causa**: Faltan dimensiones explícitas  
**Solución**: Siempre especifica `width` y `height` en `<OptimizedImage>`

---

## 🎯 Ejemplo Completo

### Página: `/src/pages/creative.astro`

**ANTES:**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.jsx";

const servicios = [
  { image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?...' }
];
---

<BaseLayout>
  <section class="hero">
    <img src="https://images.pexels.com/photos/123/..." alt="" />
  </section>

  {servicios.map(s => (
    <img src={s.image} alt="" />
  ))}
</BaseLayout>
```

**DESPUÉS:**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../components/Hero.jsx";
import OptimizedImage from "../components/OptimizedImage.astro";

const servicios = [
  {
    title: 'Servicio 1',
    image: 'https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg'
  }
];
---

<BaseLayout>
  <section class="hero">
    <OptimizedImage
      src="https://images.pexels.com/photos/123/pexels-photo-123.jpeg"
      alt="Hero image"
      width={1920}
      height={1080}
      priority={true}
    />
  </section>

  {servicios.map(s => (
    <OptimizedImage
      src={s.image}
      alt={s.title}
      width={1200}
      height={800}
    />
  ))}
</BaseLayout>
```

---

## ✅ Checklist por Página

Para cada página que optimices:

- [ ] Importar `OptimizedImage`
- [ ] Reemplazar todos los `<img>` tags
- [ ] Agregar `width` y `height` a todas las imágenes
- [ ] Limpiar URLs de Pexels (remover `?...`)
- [ ] Marcar imagen hero con `priority={true}`
- [ ] Agregar `alt` descriptivos
- [ ] Verificar componentes React (client:\*)
- [ ] Ejecutar `pnpm build` sin errores
- [ ] Preview y testing visual
- [ ] Commit cambios

---

## 🚀 Automatización Futura

Considera crear un script para automatizar:

```bash
#!/bin/bash
# optimize-images.sh

# Buscar todas las páginas
find src/pages -name "*.astro" -type f | while read file; do
  echo "Optimizando: $file"
  # Aquí podrías agregar sed/awk para reemplazar automáticamente
done
```

---

**Última actualización**: Diciembre 2024  
**Estado**: Documentación completa
