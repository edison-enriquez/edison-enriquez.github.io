# Edison Enríquez - Página Personal

Sitio web personal con tema hacker/terminal construido con React y Vite.

## 🚀 Características

- **Diseño tipo terminal/hacker**: Interfaz minimalista con estética de línea de comandos
- **CV dinámico**: Datos del CV cargados desde YAML
- **Blog integrado**: Sistema de blog simple para publicar artículos
- **Totalmente responsive**: Optimizado para todos los dispositivos
- **Efectos visuales**: Animaciones de escaneo, cursor parpadeante y efectos de terminal
- **Navegación con React Router**: SPA con navegación suave

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **js-yaml** - Lectura de archivos YAML
- **React Icons** - Iconos
- **CSS3** - Estilos personalizados con variables CSS

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   ├── Layout.jsx         # Layout principal con navegación
│   │   └── Layout.css
│   ├── pages/
│   │   ├── Home.jsx           # Página de inicio
│   │   ├── CV.jsx             # Página del CV
│   │   ├── Blog.jsx           # Lista de posts del blog
│   │   └── BlogPost.jsx       # Vista individual de post
│   ├── data/
│   │   ├── cv-data.yaml       # Datos del CV
│   │   └── blog-posts.yaml    # Posts del blog
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos globales
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos base y variables
├── public/
│   └── Resume_Edison_Enriquez.pdf  # CV en PDF (agregar aquí)
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions para despliegue
```

## 🚀 Desarrollo

### Prerrequisitos

- Node.js 20 o superior
- npm

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview
```

El servidor de desarrollo estará disponible en `http://localhost:5173`

## 📝 Personalización

### Modificar datos del CV

Edita el archivo `/src/data/cv-data.yaml` con tu información personal, experiencia, educación, etc.

### Agregar posts al blog

1. Edita `/src/data/blog-posts.yaml`
2. Agrega un nuevo objeto con la estructura:

```yaml
- id: 2
  title: "Título del Post"
  date: "2026-01-08"
  excerpt: "Descripción breve"
  content: |
    # Contenido del post
    
    Tu contenido en Markdown aquí...
```

### Personalizar colores

Modifica las variables CSS en `/src/index.css`:

```css
:root {
  --bg-primary: #0a0e27;      /* Color de fondo principal */
  --bg-secondary: #1a1f3a;    /* Color de fondo secundario */
  --text-primary: #00ff41;    /* Color de texto principal */
  --text-secondary: #33ff66;  /* Color de texto secundario */
  --accent: #00ff41;          /* Color de acento */
  --border: #00ff4150;        /* Color de bordes */
}
```

### Agregar CV en PDF

Coloca tu archivo PDF en `/public/Resume_Edison_Enriquez.pdf`

## 🌐 Despliegue

El sitio se despliega automáticamente a GitHub Pages cuando haces push a la rama `main`.

### Configuración de GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. En "Source", selecciona "GitHub Actions"
3. El workflow `.github/workflows/deploy.yml` se encargará del despliegue automático

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Edison Enríquez**

- LinkedIn: [linkedin.com/in/edison-enriquez](https://linkedin.com/in/edison-enriquez)
- Email: ferneyenriquez@gmail.com
- GitHub: [@edison-enriquez](https://github.com/edison-enriquez)

---

Hecho con ❤️ y React ⚛️
