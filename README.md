# mas-sidebyside

Sitio explicativo de una arquitectura SAP side-by-side para prestadores de salud con este alcance:

- SAP ECC + IS-H como legado clínico-administrativo en transición
- SAP S/4HANA como destino para procesos core
- TrakCare y otros sistemas clínicos de terceros
- InterSystems IRIS / Health Connect como capa central de interoperabilidad

El sitio explica la solución desde lo macro a lo micro, incluyendo capas, flujos, patrones de integración y un primer catálogo de interfaces SAP.

## Estado actual

- Nombre del proyecto: `mas-sidebyside`
- Repositorio GitHub: `christianasmussenb/mas-sidebyside`
- Runtime de despliegue: Cloudflare Workers
- Worker objetivo: `mas-sidebyside`
- Dominio publicado: `sidebyside.myallsupport.cl`
- Sitio interno de Sites: configurado vía `.openai/hosting.json`

## Qué contiene el sitio

La página principal está construida como un one-page site en español con estas secciones:

- contexto y problema side-by-side en salud
- explicación por capas
- flujos de negocio relevantes
- patrones técnicos de integración
- mapa funcional SAP
- primer catálogo RFC / BAPI / IDoc
- fuentes y evidencia base

Además incluye un diagrama de arquitectura visible dentro de la página, basado en la propuesta con:

- TrakCare y terceros clínicos
- InterSystems Health Connect + IRIS for Health
- ECC + IS-H
- S/4HANA

## Stack técnico

- Next.js 16
- React 19
- vinext
- Vite 8
- Cloudflare Worker como entrypoint
- Tailwind CSS 4

El proyecto está preparado para correr como aplicación tipo site sobre Worker, no como Pages clásico.

## Archivos principales

- `app/page.tsx`: contenido principal del sitio
- `app/layout.tsx`: metadata y layout base
- `app/globals.css`: estilos globales y sistema visual
- `worker/index.ts`: entrypoint del Worker
- `vite.config.ts`: configuración de build local y bindings simulados
- `wrangler.jsonc`: configuración del Worker `mas-sidebyside`
- `tests/rendered-html.test.mjs`: prueba de render server-side del sitio
- `.openai/hosting.json`: referencia al proyecto de hosting existente

## Desarrollo local

Prerequisito:

- Node.js `>= 22.13.0`

Instalación y ejecución:

```bash
npm install
npm run dev
```

Validación:

```bash
npm run build
npm test
```

## Despliegue

Hay dos rutas de despliegue en juego:

### 1. Sitio actual vía plataforma Sites

El proyecto ya tiene un `project_id` persistido en `.openai/hosting.json`, usado para la publicación actual del sitio.

### 2. Worker desplegado desde GitHub / Cloudflare

El repositorio también está preparado para que Cloudflare tome el código desde GitHub y actualice el Worker `mas-sidebyside`.

Puntos importantes:

- el nombre del Worker y el nombre lógico del proyecto quedaron alineados en `mas-sidebyside`
- el archivo `wrangler.jsonc` es parte del despliegue por Worker
- este repo no debe documentarse como un starter genérico; ya es un sitio específico de arquitectura SAP salud

## Notas de contenido

La propuesta funcional y técnica del sitio se apoya en:

- guía oficial SAP para integración IS-H con S/4HANA en escenario side-by-side
- propuesta de arquitectura HGPS usada como referencia de diseño y de inventario técnico
- decisión de reemplazar SAP BTP por InterSystems IRIS / Health Connect como hub de integración

## Pendientes naturales del proyecto

Los siguientes pasos esperables del contenido son:

- bajar del mapa macro a un inventario detallado por interfaz
- documentar RFC, BAPI, IDoc y web services uno por uno
- clasificar cada integración por sistema origen, sistema destino, payload, frecuencia, criticidad y monitoreo
- consolidar la estrategia de seguridad y control de acceso en Cloudflare
