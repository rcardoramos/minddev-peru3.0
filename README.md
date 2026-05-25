# MindDev Perú - Plataforma Web Corporativa

Este repositorio contiene el código fuente de la plataforma web corporativa de **MindDev Perú**, una agencia especializada en desarrollo de software a medida, aplicaciones móviles, consultoría tecnológica y soluciones SaaS.

La aplicación está construida como una **Single Page Application (SPA) estática de alto rendimiento**, utilizando carga asíncrona de componentes (partials) HTML, estilizada con **Tailwind CSS** y con soporte nativo de internacionalización (Español/Inglés).

---

## 🚀 Arquitectura del Proyecto

El sitio web está estructurado utilizando un modelo modular basado en componentes independientes (archivos HTML parciales) para facilitar el mantenimiento y la escalabilidad del código.

```
├── assets/                     # Recursos estáticos
│   ├── css/                    # Hojas de estilo personalizadas
│   └── images/                 # Imágenes de proyectos, testimonios y colaboradores
├── blogs/                      # Páginas individuales para artículos del blog
├── css/
│   └── _base.css               # Estilos base y variables del diseño premium
├── js/                         # Lógica JavaScript modular
│   ├── alianzas.js             # Gestión del modal de partners/alianzas
│   ├── faq.js                  # Lógica del acordeón de preguntas frecuentes
│   ├── form.js                 # Manejo y validación del formulario de contacto
│   ├── idioma.js               # Sistema de traducciones (ES/EN)
│   ├── main.js                 # Cargador dinámico de partials y lógica principal
│   ├── portafolio.js           # Modal y listado de proyectos del portafolio
│   ├── testomonios.js          # Control de navegación del carrusel de testimonios
│   └── top-bar.js              # Lógica de la barra de anuncios superior
├── partials/                   # Componentes HTML reutilizables (Secciones)
│   ├── alianzas.html           # Partners y alianzas estratégicas
│   ├── blogs.html              # Vista previa de artículos de blog
│   ├── clientes_y_testimonios.html # Testimonios y estadísticas
│   ├── contacto.html           # Formulario de cotización y contacto
│   ├── equipo.html             # Miembros del equipo de MindDev
│   ├── faq.html                # Preguntas frecuentes
│   ├── footer.html             # Pie de página
│   ├── inicio.html             # Hero section
│   ├── portafolio.html         # Casos de estudio y portafolio de proyectos
│   ├── proceso.html            # Nuestro flujo de trabajo metodológico
│   ├── productos.html          # Productos SaaS disponibles para demo
│   ├── servicios.html          # Listado de servicios core
│   └── tecnologias.html        # Pila tecnológica dominada
├── index.html                  # Punto de entrada y contenedor principal
├── terminos-y-condiciones.html # Página de términos legales
└── politica-de-privacidad.html # Página de privacidad
```

---

## 🎨 Sistema de Diseño y Continuidad Visual

El sitio implementa una estética de diseño premium oscura con efectos de glassmorphism, micro-animaciones en interacciones y un flujo de fondos secuencial que garantiza una lectura fluida.

### Paleta de Colores (Tailwind Config)
*   **Fondo Oscuro principal (`bg-deep-blue` / `#0f172a`)**: Usado para dar profundidad.
*   **Fondo Claro secundario (`bg-dark-alt` / `#0f1a37`)**: Usado para generar contraste entre secciones.
*   **Color de Acento Principal (`text-electric-blue` / `#3b82f6`)**: Para destacar enlaces, botones y elementos clave.
*   **Color de Acento Secundario (`bg-accent-purple` / `#5355dd`)**: Utilizado para alternar el peso visual de los CTAs.

### Regla de Continuidad Cromática (Flujo Vertical)
Para evitar la monotonía o cortes abruptos, las secciones principales alternan rigurosamente su color de fondo:

1.  **Hero (`inicio.html`)**: Oscuro (`bg-deep-blue`)
2.  **Servicios (`servicios.html`)**: Claro (`bg-dark-alt`)
3.  **Productos (`productos.html`)**: Oscuro (`bg-deep-blue`)
4.  **Proceso (`proceso.html`)**: Claro (`bg-dark-alt`)
5.  **Portafolio (`portafolio.html`)**: Oscuro (`bg-deep-blue`)
6.  **Testimonios (`clientes_y_testimonios.html`)**: Claro (`bg-dark-alt`)
7.  **Partners (`alianzas.html`)**: Oscuro (`bg-deep-blue`)
8.  **Tecnologías (`tecnologias.html`)**: Claro (`bg-dark-alt`)
9.  **Equipo (`equipo.html`)**: Oscuro (`bg-deep-blue`)
10. **Blog (`blogs.html`)**: Claro (`bg-dark-alt`)
11. **Contacto (`contacto.html`)**: Oscuro (`bg-deep-blue`)
12. **FAQ (`faq.html`)**: Claro (`bg-dark-alt`)

> [!TIP]
> **Contraste de Tarjetas**: Si la sección es de fondo claro (`bg-dark-alt`), las tarjetas internas deben contrastar con fondo oscuro (`bg-deep-blue/60` o similar). Si la sección es oscura (`bg-deep-blue`), las tarjetas deben utilizar un fondo claro traslúcido (`bg-dark-alt/60`).

---

## 🌐 Internacionalización (Multilenguaje)

El sitio cuenta con soporte bilingüe completo gestionado a través de [idioma.js](file:///c:/Users/RICARDO%20RAMOS/OneDrive/Escritorio/minddev-peru3.0/js/idioma.js).

### ¿Cómo agregar traducciones?
1. Abre el archivo `js/idioma.js`.
2. Añade la nueva clave dentro de los diccionarios `es` (Español) y `en` (Inglés).
3. En tu archivo HTML de partial, añade el atributo `data-text-key` con el nombre de tu clave:
   ```html
   <h2 data-text-key="mi_nueva_clave">Texto por defecto</h2>
   ```
4. Para inputs y selectores, utiliza `data-placeholder-key` o las clases de asignación dinámica correspondientes.

---

## 🛠️ Desarrollo Local

Al tratarse de una SPA estática que carga componentes dinámicamente mediante la API `fetch()`, el sitio **requiere ser ejecutado bajo un servidor web local** para evitar bloqueos por políticas de CORS del navegador (error al abrir directamente el archivo `index.html`).

### Ejecución
Puedes levantar un servidor de desarrollo rápido utilizando alguna de las siguientes opciones desde la raíz del proyecto:

*   **Usando VS Code**: Instala la extensión **Live Server** y presiona `Go Live`.
*   **Usando Python**:
    ```bash
    python -m http.server 8000
    ```
*   **Usando Node.js (npx)**:
    ```bash
    npx serve .
    ```

Accede a la dirección indicada en la terminal (usualmente `http://localhost:8000` o `http://localhost:3000`).

---

## 📝 Contribuciones y Buenas Prácticas

Al agregar nuevas funcionalidades o modificar secciones existentes:
1.  **Mantén la jerarquía semántica de HTML5** (una única etiqueta `<h1>` principal en `index.html` y secciones delimitadas mediante `<section>`).
2.  **Carga segura de lógica**: Si creas scripts que dependan del HTML de los partials, asegúrate de envolver su inicialización dentro del listener del evento global `partialsLoaded`:
    ```javascript
    document.addEventListener("partialsLoaded", () => {
        // Tu lógica de inicialización aquí
    });
    ```
3.  **Iconografía**: El proyecto utiliza **Lucide Icons**. Si agregas nuevos iconos, asegúrate de inicializarlos con `lucide.createIcons()` si el componente se carga dinámicamente de forma tardía.
