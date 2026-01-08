# Agregar Nuevos Blog Posts

## Estructura Automática

El sistema de blog carga automáticamente todos los archivos `.md` de la carpeta `/public/blog/`.

## Crear un Nuevo Post

1. Crea un archivo `.md` en `/public/blog/` con un nombre descriptivo (ej: `mi-nuevo-post.md`)

2. Usa el siguiente formato con frontmatter YAML:

```markdown
---
title: "Título del Post"
date: "YYYY-MM-DD"
author: "Edison Enríquez"
slug: "nombre-del-slug"
excerpt: "Breve descripción del post"
tags: ["tag1", "tag2"]
---

# Contenido del Post

Aquí va el contenido en Markdown...

## Sección

- Lista de elementos
- Otro elemento

```code
// Bloques de código
```

---

Fin del post
```

## Campos del Frontmatter

- **title**: Título que aparece en el listado y en la página del post
- **date**: Fecha en formato YYYY-MM-DD (se usa para ordenar los posts)
- **author**: Nombre del autor (opcional, por defecto "Edison Enríquez")
- **slug**: URL amigable del post (opcional, usa el nombre del archivo si no se especifica)
- **excerpt**: Resumen corto que aparece en el listado
- **tags**: Array de etiquetas (opcional)

## Ejemplos

Ver los archivos existentes en `/public/blog/` como referencia:
- `primer-post.md`
- `sistemas-embebidos-cpp.md`

## Notas Importantes

- El nombre del archivo se convierte en el ID del post
- Los posts se ordenan automáticamente por fecha (más recientes primero)
- No es necesario reiniciar el servidor, solo refrescar la página
- El sistema soporta Markdown completo en el contenido
