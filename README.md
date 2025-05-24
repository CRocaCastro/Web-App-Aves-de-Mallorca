# Web-App-Aves Mallorquinas

Aplicación web educativa y responsive sobre las aves y hábitats de la isla de Mallorca. Permite explorar fichas multimedia, mapas interactivos, rutas cercanas, un quiz para aprender jugando y un formulario de contacto funcional.

**[avesmallorquinas.com](https://avesmallorquinas.com)**

## Autores
- **Juan Francisco Riera Fernández**
- **Luz Salvá Castro**
- **Claudia Roca Castro**

## Descripción

Este proyecto es una WebApp interactiva desarrollada como práctica para la asignatura **Tecnología Multimedia** (UIB 2024–2025). Combina datos estructurados, mapas dinámicos, APIs, contenido multimedia y gamificación para fomentar el aprendizaje sobre la fauna ornitológica mallorquina.

## Tecnologías utilizadas

- **HTML5 + CSS3 + JS** 
- **Bootstrap 5.3.3**
- **Leaflet.js + Routing Machine**
- **Open-Meteo API**
- **Getform.io API**
- **Firebase Authentication** (Google login)
- **Web APIs:** SpeechSynthesis, Geolocation, LocalStorage

## Estructura

```bash

Web-App-Aves-de-Mallorca/
├── index.html
├── README.md
└── assets/
    ├── css/            # Estilos personalizados
    ├── js/             # Lógica y funcionalidades
    ├── img/            # Multimedia (aves, zonas, autores)
    ├── json/           # Datos estructurados
    ├── wav/            # Cantos de aves en .wav
    └── vendor/         # Librerías externas

```

## Funcionalidades principales

### **Aves**
- Filtros por estación, hábitat y nombre.
- Modales con ficha completa, audio, vídeo y otras aves.
- Carrusel en homepage con aves activas por estación.

### **Zonas**
- Filtro por tipo de hábitat.
- Información, galería, vídeo y clima actual.
- Mapa con geolocalización + cálculo de ruta.
- Excursiones cercanas (JSON externo).
- Aves asociadas a cada zona.

### **Quiz**
- Carga dinámica de preguntas desde JSON.
- Selección aleatoria de 5 preguntas.
- Resultados en localStorage con historial.
- Animación final con confetti.

### **Autenticación**
- Inicio de sesión con Google (Firebase).
- Almacenamiento de sesión con SessionStorage.

### **Contáctanos**
- Formulario validado.
- Envío seguro a API de Getform.io.

## Accesibilidad
- Navegación con teclado.
- Etiquetas `aria-*` e imágenes con `alt`.
- Integración de lectura en voz alta (SpeechSynthesis).
- Evaluado con Lighthouse y WAVE.

## Despliegue
- Dominio y hosting gestionado mediante DonDominio.
- Certificado SSL habilitado.
- Estructura cargada por FTP al servidor.

## Testing y rendimiento
- Optimización con Lighthouse (puntuaciones de 90+).
- Carga diferida de scripts y uso de imágenes optimizadas.

## Fuentes y plantillas

- **Plantilla principal:** [Regna Bootstrap OnePage Template](https://bootstrapmade.com/regna-bootstrap-onepage-template/)
- **Otras:**
  - Sailor
  - Cozastore
  - Strategy
- **Logos generados con:** [LogoMaster](https://logomaster.ai/)

