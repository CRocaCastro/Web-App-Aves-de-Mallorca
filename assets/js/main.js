/**
 * =======================================================
 * Proyecto: Aves Mallorquinas
 * Descripción: Funcionalidad interactiva para la web sobre aves y hábitats de Mallorca.
 *
 * Asignatura: Tecnología Multimedia
 * Curso: 2024-2025 UIB
 *
 * Autores:
 *   - Juan Francisco Riera Fernández
 *   - Luz Salvá Castro
 *   - Claudia Roca Castro
 *
 * URL de la web: https://avesmallorquinas.com
 * Plantilla base: Regna Bootstrap OnePage Template
 *   https://bootstrapmade.com/regna-bootstrap-onepage-template/
 *
 * Fecha de última actualización: 24/05/2024
 * Bootstrap v5.3.3
 * Licencia plantilla: https://bootstrapmade.com/license/
 *
 * =======================================================
 * ÍNDICE DE FUNCIONALIDADES JS:
 *
 * - FUNCIONALIDADES GENERALES
 *   - Clase Scroll
 *   - Menú navegación móvil
 *   - Eliminación preloader  
 *   - Botón desplazamiento arriba
 *   - Animaciones de scroll con AOS
 *   - Isotope 
 *   - Corrección posición scroll 
 *   - Función para resaltar el enlace del menú correspondiente
 *
 * - AVES 
 *   - Cargar datos JSON
 *   - Filtros de búsqueda
 *   - Audio aves
 *   - Vídeo YouTube
 *   - Otras aves 
 *   - Botón Ver más
 *
 * - ZONAS
 *   - Cargar datos JSON
 *   - Filtro búsqueda
 *   - Botón "Ver más"
 *   - Clima de la zona
 *   - Mapa ubicación zona y excursiones
 *   - Botón calcular ruta
 *   - Vídeo YouTube
 *   - Aves de la zona
 *   - Otras zonas 
 *   - Excursiones cercanas
 *
 * - JSON de excursiones
 * - API de texto a voz
 * - API contáctanos
 * - Quiz
 * - Carrusel cambio por estación
 * - Integración Firebase
 * - Vídeo autores
 * =======================================================
 */


(function() {
  "use strict";

  /**
   * Aplicar la clase .scrolled al cuerpo al hacer scroll
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Apertura y cierre del menú de navegación móvil
   */
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileNav = document.getElementById('mobileNav');
  
    toggleBtn.addEventListener('click', () => {
      body.classList.toggle('mobile-nav-active');
  
      const isActive = body.classList.contains('mobile-nav-active');
      hamburgerIcon.style.display = isActive ? 'none' : 'block';
      closeIcon.style.display = isActive ? 'block' : 'none';
    });
  
    // Cierra el menú al hacer clic en un enlace
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('mobile-nav-active');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    });
  });

  /**
   * Preloader: Elimina el preloader al cargar la página
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  
  /**
   * Muestra u oculta el botón de desplazamiento hacia arriba
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Inicializar animaciones de scroll 
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Inicializar Isotope para filtros de búsqueda
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });



  /**
   * Corregir posición de scroll al cargar con enlaces hash
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Scrollspy para el menú de navegación: Resalta automáticamente el enlace del menú correspondiente 
   * a la sección visible en la pantalla.
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/*--------------------------------------------------------------
# AVES
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
  // Variables globales
  let birdsData = [];
  let selectedEstacion = null;
  let selectedHabitat = null;
  let searchType = null;
  let searchQuery = '';

  // Elementos del DOM
  const portfolioContainer = document.querySelector('#aves .row.gy-4');
  const btnEstacion = document.querySelector('#btn-estacion');
  const estacionDropdownItems = document.querySelectorAll('#btn-estacion + .dropdown-menu .dropdown-item');
  const btnHabitat = document.querySelector('#btn-habitat');
  const habitatDropdownItems = document.querySelectorAll('#btn-habitat + .dropdown-menu .dropdown-item');
  const dropdownItemsName = document.querySelectorAll('#btn-nombre + .dropdown-menu .dropdown-item');
  const searchInput = document.querySelector('.input-group input');
  const portfolioModal = document.getElementById('portfolioModal');

  // Desactivar input de búsqueda al principio
  searchInput.disabled = true;
  searchInput.placeholder = 'Selecciona el tipo de nombre';

  // Cargar datos del JSON
  fetch('assets/json/Ave.json')
    .then(response => response.json())
    .then(data => {
      birdsData = data.species;
      renderBirds(birdsData); // Mostrar todas las aves inicialmente
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

  // Manejar selección de estación
  estacionDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      const stationText = item.textContent.trim();
      if (selectedEstacion === stationText) {
        selectedEstacion = null;
        btnEstacion.classList.remove('btn-selected');
        estacionDropdownItems.forEach(opt => opt.classList.remove('selected'));
      } else {
        estacionDropdownItems.forEach(opt => opt.classList.remove('selected'));
        item.classList.add('selected');
        selectedEstacion = stationText;
        btnEstacion.classList.add('btn-selected');
      }
      applyAllFilters();
    });
  });

  // Manejar selección de hábitat
  habitatDropdownItems.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      const habitatText = item.textContent.trim();
      if (selectedHabitat === habitatText) {
        selectedHabitat = null;
        btnHabitat.classList.remove('btn-selected');
        item.classList.remove('selected');
      } else {
        habitatDropdownItems.forEach(opt => opt.classList.remove('selected'));
        selectedHabitat = habitatText;
        btnHabitat.classList.add('btn-selected');
        item.classList.add('selected');
      }
      applyAllFilters();
    });
  });

  // Manejar selección de tipo de nombre
  dropdownItemsName.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      if (item.classList.contains('selected')) {
        item.classList.remove('selected');
        searchInput.disabled = true;
        searchInput.placeholder = 'Selecciona el tipo de nombre';
        document.querySelector('#btn-nombre').classList.remove('btn-selected');
        searchType = null;
        searchQuery = '';
      } else {
        dropdownItemsName.forEach(opt => opt.classList.remove('selected'));
        item.classList.add('selected');
        document.querySelector('#btn-nombre').classList.add('btn-selected');
        searchInput.disabled = false;
        if (item.textContent.trim() === 'Nombre común') {
          searchType = 'name';
          searchInput.placeholder = 'Buscar por nombre común';
        } else {
          searchType = 'alternateName';
          searchInput.placeholder = 'Buscar por nombre científico';
        }
      }
      applyAllFilters();
    });
  });

  // Manejar búsqueda por nombre
  searchInput.addEventListener('input', function () {
    searchQuery = this.value.toLowerCase().trim();
    applyAllFilters();
  });

  // Aplicar todos los filtros
  function applyAllFilters() {
    let filteredBirds = [...birdsData];

    // Filtro por estación
    if (selectedEstacion) {
      filteredBirds = filtrarPorEstacion(filteredBirds, selectedEstacion);
    }

    // Filtro por hábitat
    if (selectedHabitat) {
      filteredBirds = filteredBirds.filter(bird => {
        const habitatTerm = bird.hasDefinedTerm?.find(term => term.termCode === 'habitat');
        if (!habitatTerm || !habitatTerm.alternateName) return false;
        return habitatTerm.alternateName.some(h => h.toLowerCase() === selectedHabitat.toLowerCase());
      });
    }

    // Filtro por nombre
    if (searchType && searchQuery) {
      filteredBirds = filteredBirds.filter(bird => {
        if (searchType === 'name') {
          return bird.name.toLowerCase().includes(searchQuery);
        } else if (searchType === 'alternateName') {
          return bird.alternateName.toLowerCase().includes(searchQuery);
        }
        return false;
      });
    }

    renderBirds(filteredBirds);
  }

  // Filtrar por estación
  function filtrarPorEstacion(aves, estacion) {
    const mesesPorEstacion = {
      "Primavera": ["Marzo", "Abril", "Mayo"],
      "Verano": ["Junio", "Julio", "Agosto"],
      "Otoño": ["Septiembre", "Octubre", "Noviembre"],
      "Invierno": ["Diciembre", "Enero", "Febrero"]
    };
    const meses = mesesPorEstacion[estacion];
    return aves.filter(ave => {
      const estaciones = ave.hasDefinedTerm?.filter(term => term.termCode === "season");
      if (!estaciones?.length) return false;
      return estaciones.some(est => 
        est.alternateName?.some(mes => meses.includes(mes))
      );
    });
  }

  // Función para limpiar los filtros
  
  const btnClearFilters = document.getElementById('btn-clear-filters');

  btnClearFilters.addEventListener('click', function () {
    // Resetear todos los filtros como ya haces
    selectedEstacion = null;
    selectedHabitat = null;
    searchType = null;
    searchQuery = '';

    document.querySelectorAll('#btn-estacion + .dropdown-menu .dropdown-item').forEach(item => item.classList.remove('selected'));
    document.querySelector('#btn-estacion').classList.remove('btn-selected');
    document.querySelectorAll('#btn-habitat + .dropdown-menu .dropdown-item').forEach(item => item.classList.remove('selected'));
    document.querySelector('#btn-habitat').classList.remove('btn-selected');
    document.querySelectorAll('#btn-nombre + .dropdown-menu .dropdown-item').forEach(item => item.classList.remove('selected'));
    document.querySelector('#btn-nombre').classList.remove('btn-selected');

    const searchInput = document.querySelector('.input-group input');
    searchInput.value = '';
    searchInput.disabled = true;
    searchInput.placeholder = 'Selecciona el tipo de nombre';

    // Mostrar todas las aves 
    renderBirds(birdsData);
  });


  // Función para renderizar las aves
  function renderBirds(birds) {
    portfolioContainer.innerHTML = '';
    birds.forEach(bird => {
      const birdElement = document.createElement('div');
      birdElement.classList.add('col-lg-4', 'col-md-6', 'portfolio-item');
      birdElement.innerHTML = `
        <div class="card h-100" style="min-height: 350px;">
          <a href="#portfolioModal" class="portfolio-link" data-bs-toggle="modal" data-bs-target="#portfolioModal" data-id="${bird.identifier}">
            <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
          </a>
          <div class="card-body">
            <p class="card-title fw-bold fs-5 mb-1">${bird.name}</p>
            <p class="card-text"><em>${bird.alternateName}</em></p>
          </div>
        </div>
      `;
      portfolioContainer.appendChild(birdElement);
    });
  }

  portfolioModal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    const id = button.getAttribute('data-id');
    const item = birdsData.find(bird => bird.identifier === id);
    if (item) updateModalContent(item, birdsData);
  });

  // Actualizar contenido del modal
  function updateModalContent(item, data) {
    const modalTitle = portfolioModal.querySelector('#modalTitle');
    const modalDescription = portfolioModal.querySelector('#modalDescription');
    const modalCarouselInner = portfolioModal.querySelector('#modalCarouselInner');
    const modalAdditionalInfo = portfolioModal.querySelector('#modalAdditionalInfo');
    const modalAudioContainer = portfolioModal.querySelector('#modalAudioContainer');
    const modalVideoContainer = portfolioModal.querySelector('#modalVideoContainer');
  
    // Buscar el archivo de audio en los datos del ave
    const audioObject = item.subjectOf?.find(media => media.encodingFormat === "audio/wav");
    const audioPlayer = audioObject && audioObject.contentUrl
      ? `<p class="fw-bold mt-3 mb-1" aria-label="Título del reproductor de audio">Escucha el canto:</p>
         <audio controls class="w-100 mt-2">
            <source src="${audioObject.contentUrl}" type="${audioObject.encodingFormat}">
            Tu navegador no soporta el elemento de audio.
         </audio>`
      : `<p class="text-muted mt-3">No hay audio disponible para esta ave.</p>`;
  
    // Insertar el reproductor de audio en el modal
    modalAudioContainer.innerHTML = audioPlayer;

    // Actualizar el título
    modalTitle.innerHTML = `
      <div class="modal-title-container rounded-title">
        <h4>${item.name}</h4>
        <p><em>${item.alternateName}</em></p>
      </div>
    `;
  
    // Actualizar la descripción
    modalDescription.innerHTML = `
      <div class="modal-description">
        <div class="texto-para-leer">
          <p><strong>Descripción:</strong> ${item.description}</p>
          <p><strong>Familia:</strong> ${item.parentTaxon.name}</p>
        </div>
        <button class="btn btn-outline-primary mt-2" id="btnLeerAve">🔊 Escuchar</button>
      </div>
    `;

    // Generar las imágenes del carrusel
    modalCarouselInner.innerHTML = item.image.map((img, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${item.name}" loading="lazy">
      </div>
    `).join('');

    // Buscar si hay video de YouTube 
    const videoObject = item.subjectOf?.find(obj => obj.contentUrl.includes('youtube.com') || obj.contentUrl.includes('youtu.be'));
    console.log('Video encontrado:', videoObject); // Verifica si el video se encuentra

    if (videoObject) {
      // Extraer ID del video de YouTube
      const videoUrl = new URL(videoObject.contentUrl);
      console.log('URL del video:', videoUrl); // Verifica la URL del video
      const videoId = videoUrl.hostname === 'youtu.be'
        ? videoUrl.pathname.slice(1)
        : new URLSearchParams(videoUrl.search).get('v');

        if (videoId) {
          modalVideoContainer.innerHTML = `
            <div class="mt-4">
              <p class="fw-bold fs-5">Video</p>
              <div class="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" 
                  allow="autoplay; encrypted-media" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `;
        }
      } else {
        modalVideoContainer.innerHTML = `<p class="text-muted mt-3">No hay video disponible para esta ave.</p>`;
      }

    modalCarouselInner.innerHTML = modalCarouselInner.innerHTML;
  
  // Generar información adicional (3 aves aleatorias)
  const otherBirdsAll = data.filter(bird => bird.identifier !== item.identifier);
  // Barajar aleatoriamente
  const shuffled = otherBirdsAll.sort(() => Math.random() - 0.5);
  // Tomar sólo 3
  const randomThree = shuffled.slice(0, 3);

  modalAdditionalInfo.innerHTML = `
    <p class="fw-bold fs-5">Otras aves</p>
    <div class="row gy-4" id="otherBirdsContainer">
      ${randomThree.map(bird => `
        <div class="col-lg-4 col-md-6 portfolio-item">
          <div class="card h-100" style="min-height: 350px;">
            <a class="portfolio-link" data-id="${bird.identifier}">
              <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
            </a>
            <div class="card-body">
              <p class="card-title fw-bold">${bird.name}</p>
              <p class="card-text">${bird.alternateName}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Configurar funcionalidad de los enlaces de "Otras aves"
  const otherBirdLinks = modalAdditionalInfo.querySelectorAll('.portfolio-link');
  otherBirdLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const birdId = this.getAttribute('data-id');
      const selectedBird = data.find(bird => bird.identifier === birdId);
      if (selectedBird) {
        updateModalContent(selectedBird, data); // Actualizar el contenido del modal
        portfolioModal.scrollTo({
          top: 0,
          behavior: 'smooth' // Desplazamiento suave
        });
      }
    });
  });
  
  }
});

// Función para el botón Ver más
document.getElementById('load-more').addEventListener('click', function () {
  // Mostrar más aves
  document.querySelectorAll('#aves .row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'block';
  });

  // Ocultar el botón "Ver más" y mostrar el botón "Ver menos"
  this.style.display = 'none';
  document.getElementById('load-less').style.display = 'inline-block';

  // Actualizar contenido del modal
  function updateModalContent(item, data) {
    const modalTitle = portfolioModal.querySelector('#modalTitle');
    const modalDescription = portfolioModal.querySelector('#modalDescription');
    const modalCarouselInner = portfolioModal.querySelector('#modalCarouselInner');
    const modalAdditionalInfo = portfolioModal.querySelector('#modalAdditionalInfo');
    const modalAudioContainer = portfolioModal.querySelector('#modalAudioContainer'); 
    const modalVideoContainer = portfolioModal.querySelector('#modalVideoContainer');

    // Buscar el archivo de audio en los datos del ave
    const audioObject = item.subjectOf?.find(media => media.encodingFormat === "audio/wav");
    const audioPlayer = audioObject && audioObject.contentUrl
      ? `<p class="fw-bold fs-5 mt-3">Escucha el canto:</p>
         <audio controls class="w-100 mt-2">
            <source src="${audioObject.contentUrl}" type="${audioObject.encodingFormat}">
            Tu navegador no soporta el elemento de audio.
         </audio>`
      : `<p class="text-muted mt-3">No hay audio disponible para esta ave.</p>`;
  
    // Insertar el reproductor de audio en el modal
    modalAudioContainer.innerHTML = audioPlayer;
  
    // Actualizar el título
    modalTitle.innerHTML = `
      <div class="modal-title-container">
        <h4>${item.name}</h4>
        <p><em>${item.alternateName}</em></p>
      </div>
    `;
  
    // Actualizar la descripción
    modalDescription.innerHTML = `
      <div class="modal-description">
        <p><strong>Descripción:</strong> ${item.description}</p>
        <p><strong>Familia:</strong> ${item.parentTaxon.name}</p>
      </div>

    `; 
    // Generar las imágenes del carrusel
    modalCarouselInner.innerHTML = item.image.map((img, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <img src="${img}" class="d-block w-100" alt="${item.name}" loading="lazy">
    </div>
  `).join('');
  

    // Buscar si hay video de YouTube 
    const videoObject = item.subjectOf?.find(obj => obj.contentUrl.includes('youtube.com') || obj.contentUrl.includes('youtu.be'));
    console.log('Video encontrado:', videoObject); // Verifica si el video se encuentra

    if (videoObject) {
      // Extraer ID del video de YouTube
      const videoUrl = new URL(videoObject.contentUrl);
      console.log('URL del video:', videoUrl); // Verifica la URL del video
      const videoId = videoUrl.hostname === 'youtu.be'
        ? videoUrl.pathname.slice(1)
        : new URLSearchParams(videoUrl.search).get('v');

        if (videoId) {
          modalVideoContainer.innerHTML = `
            <div class="mt-4">
              <p class="fw-bold fs-5">Mira el video:</p>
              <div class="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" 
                  allow="autoplay; encrypted-media" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `;
        }
      } else {
        modalVideoContainer.innerHTML = `<p class="text-muted mt-3">No hay video disponible para esta ave.</p>`;
      }
    
    modalCarouselInner.innerHTML = carouselHTML;
    
    function handleYouTubeVideoEvents(videoId) {
      const iframe = document.getElementById(`youtube-video-${videoId}`);
      const carousel = document.querySelector('#portfolioModal .carousel');
    
      if (!iframe || !carousel) return;
    
      const player = new YT.Player(iframe, {
        events: {
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.PLAYING) {
              // Desactivar las flechas del carrusel
              carousel.querySelector('.carousel-control-prev').style.pointerEvents = 'none';
              carousel.querySelector('.carousel-control-next').style.pointerEvents = 'none';
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
              // Reactivar las flechas del carrusel
              carousel.querySelector('.carousel-control-prev').style.pointerEvents = 'auto';
              carousel.querySelector('.carousel-control-next').style.pointerEvents = 'auto';
            }
          }
        }
      });
    }


  
    // Generar información adicional
    const otherBirds = data.filter(bird => bird.identifier !== item.identifier);
    modalAdditionalInfo.innerHTML = `
      <p class="fw-bold fs-4">Otras aves</p>
      <div class="row gy-4">
        ${otherBirds.slice(0, 3).map(bird => `
          <div class="col-lg-4 col-md-6 portfolio-item">
            <div class="card h-100" style="min-height: 350px;">
              <a class="portfolio-link" data-id="${bird.identifier}">
                <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
              </a>
              <div class="card-body">
                <p class="card-title fw-bold">${bird.name}</p>
                <p class="card-text"><em>${bird.alternateName}</em></p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

  }
});

// Función para el botón "Ver menos"
document.getElementById('load-less').addEventListener('click', function () {
  // Ocultar las aves adicionales
  document.querySelectorAll('#aves .row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'none'; // Ocultar las aves adicionales
  });

  // Ocultar el botón "Ver menos" y mostrar el botón "Ver más"
  this.style.display = 'none';
  document.getElementById('load-more').style.display = 'inline-block';

  // Opcional: Desplazar la página hacia la sección de "Aves"
  document.getElementById('aves').scrollIntoView({
    behavior: 'smooth', // Desplazamiento suave
    block: 'start' // Alinea al inicio de la sección
  });
});

/*--------------------------------------------------------------
# ZONAS
--------------------------------------------------------------*/
// Función para filtrar las zonas por hábitat

document.addEventListener('DOMContentLoaded', function () {
  const habitatDropdownItems = document.querySelectorAll('#btn-tipo-habitat + .dropdown-menu .dropdown-item');
  const habitatDropdownBtn = document.querySelector('#btn-tipo-habitat');
  const zonaContainer = document.querySelector('#zonas .row.gy-4');
  let zonasData = [];
  let selectedTipoHabitat = null;

  // Cargar datos del JSON
  fetch('assets/json/Zona.json')
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data.landforms)) {
        zonasData = data.landforms;
      } else {
        console.error("❌ Formato inesperado del JSON de zonas:", data);
        zonasData = [];
      }
      renderZonas(zonasData); // Renderizar todas las zonas inicialmente
    })
    .catch(err => console.error('Error cargando zonas:', err));

  // Manejar selección del hábitat
  habitatDropdownItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const selectedText = this.textContent.trim().toLowerCase();

      // Alternar selección
      if (selectedTipoHabitat === selectedText) {
        selectedTipoHabitat = null;
        habitatDropdownBtn.classList.remove('btn-selected');
        habitatDropdownItems.forEach(opt => opt.classList.remove('selected'));
        renderZonas(zonasData); // Mostrar todas las zonas
      } else {
        selectedTipoHabitat = selectedText;
        habitatDropdownItems.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        habitatDropdownBtn.classList.add('btn-selected');

        // Filtrar zonas
        const filtradas = zonasData.filter(zona => {
          const tipo = zona.additionalProperty?.find(p =>
            p.name?.toLowerCase().trim() === "tipo de zona"
          );

          if (!tipo || !tipo.value) return false;

          if (Array.isArray(tipo.value)) {
            return tipo.value.some(v => v.toLowerCase() === selectedTipoHabitat);
          } else if (typeof tipo.value === 'string') {
            return tipo.value.toLowerCase() === selectedTipoHabitat;
          }

          return false;
        });

        renderZonas(filtradas); // Renderizar las zonas filtradas
      }
    });
  });

  // Función para renderizar zonas
  function renderZonas(zonas) {
    zonaContainer.innerHTML = '';
    zonas.forEach(zona => {
      const zonaElement = document.createElement('div');
      zonaElement.classList.add('col-lg-4', 'col-md-6', 'portfolio-item');
      zonaElement.innerHTML = `
        <div class="card h-100" style="min-height: 350px;">
          <img src="${zona.image?.[0]}" class="card-img-top" alt="${zona.name}" loading="lazy style="aspect-ratio: 16/9; width: 100%; object-fit: cover;"">
          <div class="card-body">
            <p class="card-title fw-bold">${zona.name}</p>
            <p class="card-text"><em>${zona.alternateName || ''}</em></p>
          </div>
        </div>
      `;

      zonaContainer.appendChild(zonaElement);
    });
  }
});



// Función para el botón "Ver más" en Zonas
document.getElementById('load-more-zonas').addEventListener('click', function () {
  // Selecciona todas las tarjetas ocultas y las muestra
  document.querySelectorAll('#zonas .row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'block';
  });

  // Oculta el botón "Ver más" y muestra el botón "Ver menos"
  this.style.display = 'none';
  document.getElementById('load-less-zonas').style.display = 'inline-block';
});

// Función para el botón "Ver menos" en Zonas
document.getElementById('load-less-zonas').addEventListener('click', function () {
  // Oculta todas las tarjetas excepto las primeras tres
  document.querySelectorAll('#zonas .row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'none';
  });

  // Oculta el botón "Ver menos" y muestra el botón "Ver más"
  this.style.display = 'none';
  document.getElementById('load-more-zonas').style.display = 'inline-block';

  // Desplazar la página hacia la sección de "Zonas"
  document.getElementById('zonas').scrollIntoView({
    behavior: 'smooth', // Desplazamiento suave
    block: 'start' // Alinea al inicio de la sección
  });
});



let birdsData = []; // Variable global para almacenar los datos de las aves

// Cargar los datos de las aves al inicio
document.addEventListener('DOMContentLoaded', function () {
  fetch('assets/json/Ave.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      birdsData = data.species; // Guardar los datos globalmente
    })
    .catch(function (error) {
      console.error('Error al cargar los datos de las aves:', error);
    });
});

let excursionsData = []; // Variable global para almacenar las excursiones

document.addEventListener('DOMContentLoaded', function () {
  // Cargar los datos de las excursiones
  fetch('https://www.explorarmallorca.com/json/excursiones.json')  
    .then(response => response.json())
    .then(data => {
      excursionsData = data.itemListElement; // Guardar las excursiones globalmente
    })
    .catch(error => console.error('Error al cargar el JSON de excursiones:', error));
});
document.addEventListener('DOMContentLoaded', function () {
  const jsonZonaUrl = 'assets/json/Zona.json'; // Ruta del archivo JSON de zonas
  const zonaContainer = document.querySelector('#zonas .row.gy-4'); // Contenedor de las zonas
  const zonaModal = document.getElementById('zonaModal'); // Modal para las zonas

  // Función para obtener el clima de una zona
  async function obtenerClima(lat, lon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return {
        current: data.current_weather,
        forecast: data.daily
      };
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      return null;
    }
  }
  
  function getWeatherIcon(code) {
    const icons = {
      0: "☀️",     // Soleado
      1: "🌤️",    // Mayormente soleado
      2: "⛅",     // Parcialmente nublado
      3: "☁️",     // Nublado
      45: "🌫️",    // Niebla
      51: "🌦️",    // Lluvia ligera
      61: "🌧️",    // Lluvia moderada
      71: "🌨️",    // Nieve
      80: "🌦️",    // Chubascos
      95: "⛈️"     // Tormenta
    };
    return icons[code] || "❓";
  }
  
  function getWeatherGradient(code) {
    if ([0, 1].includes(code)) {
      return "linear-gradient(135deg, #f6d365, #fda085)"; // Soleado
    } else if ([2, 3].includes(code)) {
      return "linear-gradient(135deg, #89f7fe, #66a6ff)"; // Parcialmente nublado
    } else if ([45].includes(code)) {
      return "linear-gradient(135deg, #cfd9df, #e2ebf0)"; // Niebla
    } else if ([51, 61, 80].includes(code)) {
      return "linear-gradient(135deg, #667db6, #0082c8, #0082c8, #667db6)"; // Lluvia ligera
    } else if ([95].includes(code)) {
      return "linear-gradient(135deg, #373B44, #4286f4)"; // Tormenta
    } else if ([71].includes(code)) {
      return "linear-gradient(135deg, #83a4d4, #b6fbff)"; // Nieve
    } else {
      return "linear-gradient(135deg, #00c6ff, #0072ff)"; // Por defecto (azul limpio)
    }
  }
  
  
  let currentMap = null; // Variable global para almacenar el mapa actual
  // Función para actualizar el contenido del modal de zonas
    function updateZonaModalContent(zona, data) {
    
    const modalTitle = zonaModal.querySelector('#modalZonaTitle');
    const modalDescription = zonaModal.querySelector('#modalZonaDescription');
    const modalCarouselInner = zonaModal.querySelector('#modalZonaCarouselInner');
    const modalAdditionalInfo = zonaModal.querySelector('#modalZonaAdditionalInfo');
    const modalMap = zonaModal.querySelector('#modalZonaMap'); 
    const modalExcursions = zonaModal.querySelector('#modalZonaExcursions'); 
    const modalZonaAves = document.querySelector('#modalZonaAves'); 
    const modalVideoContainer = zonaModal.querySelector('#modalZonaVideo');


    // Actualizar el contenido dinámico del modal
    modalTitle.innerHTML = `
      <div class="modal-title-container rounded-title">
        <h4>${zona.name}</h4>
        <p><em>${zona.alternateName}</em></p>
      </div>
    `;
  
    modalDescription.innerHTML = `
      <div class="modal-description">
        <div class="texto-para-leer">
          <p><strong>Descripción:</strong> ${zona.description}</p>
          <p><strong>Ubicación:</strong> ${zona.address.addressLocality}, ${zona.address.addressRegion}, ${zona.address.addressCountry}</p>
        </div>
        <button class="btn btn-outline-primary mt-2" id="btnLeer">🔊 Escuchar</button>
      </div>
    `;

  
    // Generar las imágenes del carrusel
    modalCarouselInner.innerHTML = zona.image.map((img, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${zona.name}" loading="lazy">
      </div>
    `).join('');

    // Buscar si hay video de YouTube 
    if (zona.video) {
      // Extraer ID del video de YouTube
      const videoUrl = new URL(zona.video);
      console.log('URL del video:', videoUrl); // Verifica la URL del video
      const videoId = videoUrl.hostname === 'youtu.be'
        ? videoUrl.pathname.slice(1)
        : new URLSearchParams(videoUrl.search).get('v');

        if (videoId) {
          modalVideoContainer.innerHTML = `
            <div class="mt-4">
              <p class="fw-bold fs-5">Video</p>
              <div class="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/${videoId}" 
                  frameborder="0" 
                  allow="autoplay; encrypted-media" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `;
        }
      } else {
        modalVideoContainer.innerHTML = `<p class="text-muted mt-3">No hay video disponible para esta zona.</p>`;
      }

    // Destruir el mapa existente si ya fue inicializado
    if (currentMap) {
      currentMap.remove();
      currentMap = null;
    }

    //////////// Inicializar el mapa
  // Define un icono personalizado para las excursiones
  const orangeIcon = L.icon({
    iconUrl: 'assets/img/punteroExcursion.webp', // Ruta de la imagen del marcador naranja
    iconSize: [25, 41], // Tamaño del icono
    iconAnchor: [12, 41], // Punto de anclaje del icono
    popupAnchor: [1, -34], // Punto de anclaje del popup
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png', // Sombra del marcador
    shadowSize: [41, 41] // Tamaño de la sombra
  });

    if (modalMap) {
      modalMap.innerHTML = ''; // Limpiar el contenedor del mapa
      currentMap = L.map(modalMap, {
        scrollWheelZoom: true // Deshabilitar el zoom con la rueda del ratón desde el inicio
      }).setView([zona.geo.latitude, zona.geo.longitude], 13);
    
      // Añadir capa base de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(currentMap);
    
      // Añadir marcador en la ubicación de la zona
      L.marker([zona.geo.latitude, zona.geo.longitude])
        .addTo(currentMap)
        .bindPopup(`<b>${zona.name}</b><br>${zona.address.addressLocality}`)
        .openPopup();

      // Filtrar excursiones dentro del radio
      const excursionesCercanas = filtrarExcursionesPorRadio(zona, excursionsData, 20);

      // Añadir marcadores para las excursiones
      excursionesCercanas.forEach(excursion => {
        const { latitude, longitude } = excursion.containedInPlace.geo;
        L.marker([latitude, longitude], { icon: orangeIcon })
          .addTo(currentMap)
          .bindPopup(`<b>${excursion.name}</b><br>${excursion.description}`);
      });
    
      // Asegurarse de que el mapa se renderice correctamente
      setTimeout(() => {
        currentMap.invalidateSize();
      }, 200);
    
      // Habilitar zoom con Ctrl
      let ctrlPressed = false;

      // Evento para mostrar la ruta solo al hacer clic en el botón
      const btnRuta = document.getElementById('calculate-route-btn');
      if (btnRuta) {
        btnRuta.addEventListener('click', () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;

              // Marcador del usuario
              const userMarker = L.marker([userLat, userLng], { title: 'Tu ubicación' }).addTo(currentMap);
              userMarker.bindPopup("Estás aquí");

              // Dibujar la ruta
              L.Routing.control({
                waypoints: [
                  L.latLng(userLat, userLng),
                  L.latLng(zona.geo.latitude, zona.geo.longitude)
                ],
                routeWhileDragging: false,
                addWaypoints: false,
                draggableWaypoints: false,
                createMarker: () => null
              }).addTo(currentMap);

            }, (error) => {
              alert("No se pudo obtener tu ubicación.");
              console.error(error);
            });
          } else {
            alert("Tu navegador no soporta geolocalización.");
          }
        });
      }

    }


    // Generar tarjetas de 3 aves de la zona (aleatorias)
  const birdsInZonaAll = birdsData.filter(function (bird) {
    return bird.additionalProperty?.some(function (property) {
      return property.name === "Zona de distribución" && property.value.includes(zona.identifier);
    });
  });


  // Seleccionar 3 aves aleatorias
  const shuffledBirds = birdsInZonaAll.sort(function () {
    return Math.random() - 0.5;
  });
  const randomThreeBirds = shuffledBirds.slice(0, 3);

  // Generar el contenido dinámico
  if (randomThreeBirds.length > 0) {
    modalZonaAves.innerHTML = `
      <p class="h5 mt-3">Aves en la zona</p>
      <div class="row gy-4">
        ${randomThreeBirds.map(function (bird) {
          return `
            <div class="col-lg-4 col-md-6">
              <div class="card h-100" style="min-height: 350px;">
                <a class="bird-link" 
                  data-id="${bird.identifier}" 
                  data-bs-toggle="modal" 
                  data-bs-target="#portfolioModal">
                  <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
                </a>
                <div class="card-body">
                  <p class="card-title fw-bold"><a title="Más detalles">${bird.name}</a></p>
                  <p class="card-text">${bird.alternateName}</p>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else {
    modalZonaAves.innerHTML = `
      <p class="h5 mt-3">Aves en la zona</p>
      <p class="text-muted">No hay aves disponibles en esta zona.</p>
    `;
  }



    // Generar tarjetas de otras zonas (3 aleatorias)
    const otherZonasAll = data.filter(z => z.identifier !== zona.identifier);
    const shuffledZonas = otherZonasAll.sort(() => Math.random() - 0.5);
    const randomThreeZonas = shuffledZonas.slice(0, 3);

    modalZonaAdditionalInfo.innerHTML = `
      <p class="h5 mt-3">Otras zonas</p>
      <div class="row gy-4">
        ${randomThreeZonas.map(z => `
          <div class="col-lg-4 col-md-6">
            <div class="card h-100" style="min-height: 350px;">
              <a class="zona-link" data-id="${z.identifier}">
                <img src="${z.image[0]}" class="card-img-top" alt="${z.name}" loading="lazy">
              </a>
              <div class="card-body">
                <p class="card-title fw-bold"><a title="Más detalles">${z.name}</a></p>
                <p class="card-text">${z.alternateName}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;



    // Configurar eventos para las tarjetas de otras zonas
    const otherZonaLinks = modalAdditionalInfo.querySelectorAll('.zona-link');
    otherZonaLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const newId = this.getAttribute('data-id'); // Obtener el ID de la nueva zona
            const newZona = data.find(z => z.identifier === newId); // Buscar la nueva zona
            if (newZona) {
              updateZonaModalContent(newZona, data);
              // Scroll arriba del modal de zona
              const zonaModal = document.getElementById('zonaModal');
              if (zonaModal) {
                zonaModal.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }
        });
    });

    // Configurar funciones para las excursiones
        // filepath: vsls:/assets/js/main.js
    /**
     * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine.
     * @param {number} lat1 - Latitud del primer punto.
     * @param {number} lon1 - Longitud del primer punto.
     * @param {number} lat2 - Latitud del segundo punto.
     * @param {number} lon2 - Longitud del segundo punto.
     * @returns {number} - Distancia en kilómetros.
     */
    function calcularDistancia(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    
    /**
     * Filtra las excursiones que están dentro de un radio de 10 km desde una zona.
     * @param {Object} zona - Objeto de la zona con coordenadas.
     * @param {Array} excursiones - Lista de excursiones con coordenadas.
     * @param {number} radio - Radio en kilómetros.
     * @returns {Array} - Lista de excursiones dentro del radio.
     */
    function filtrarExcursionesPorRadio(zona, excursiones, radio = 20) {
      const { latitude: latZona, longitude: lonZona } = zona.geo;
      return excursiones.filter(excursion => {
        const { latitude: latExcursion, longitude: lonExcursion } = excursion.containedInPlace.geo;
        const distancia = calcularDistancia(latZona, lonZona, latExcursion, lonExcursion);
        return distancia <= radio;
      });
    }
      // Generar excursiones filtradas por radio
      const excursionesCercanas = filtrarExcursionesPorRadio(zona, excursionsData, 20);
      
      modalExcursions.innerHTML = `
        <p class="h5 mt-3">Excursiones en la zona</p>
        ${
          excursionesCercanas.length > 0
            ? `
              <div class="row gy-4">
                ${excursionesCercanas.map(excursion => `
                  <div class="col-lg-4 col-md-6">
                    <div class="card h-100" style="min-height: 350px;">
                      <a href="#" class="excursion-link" data-bs-toggle="modal" data-bs-target="#excursionModal" data-id="${excursion['@identifier']}">                        <img src="${excursion.image[0]}" class="card-img-top" alt="${excursion.name}" loading="lazy">
                        <div class="card-body text-center">
                          <p class="card-title fw-bold text-dark">${excursion.name}</p> <!-- Cambiado a <p> con clase text-dark -->
                        </div>
                      </a>
                    </div>
                  </div>
                `).join('')}
              </div>
            `
            : `<p class="text-muted">No hay excursiones disponibles en un radio de 10 km.</p>`
        }
      `;
}

    document.querySelectorAll('.portfolio-item a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault(); // Evita la redirección inmediata
      const targetId = 'portfolioGrid'; // ID de la sección específica
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth', // Desplazamiento suave
          block: 'start'
        });
  
        // Redirigir al enlace externo después de un breve retraso
        setTimeout(() => {
          window.location.href = this.href;
        }, 1000); // Ajusta el tiempo según sea necesario
      }
    });
  });

  // Cargar el JSON y generar las tarjetas dinámicamente
  fetch(jsonZonaUrl)
    .then(response => response.json())
    .then(data => {
      const zonas = data.landforms; // Acceder al array landforms

      // Limpiar el contenido existente
      zonaContainer.innerHTML = '';

      // Generar un bloque por cada zona en el JSON
      zonas.forEach(zona => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 portfolio-item';
        
        card.innerHTML = `
          <div class="card h-100" style="min-height: 350px;">
            <a class="zona-link" data-bs-toggle="modal" data-bs-target="#zonaModal" data-id="${zona.identifier}">
              <img src="${zona.image[0]}" class="card-img-top" alt="${zona.name}" loading="lazy">
            </a>
            <div class="card-body">
              <p class="card-title h5 mb-1">
                <a href="#" class="text-dark text-decoration-none" title="Más detalles sobre ${zona.name}">${zona.name}</a>
              </p>
              <p class="card-text"><em>${zona.alternateName}</em></p>
            </div>
          </div>
        `;



        zonaContainer.appendChild(card);
      });

      // Configurar el evento para abrir el modal y actualizar su contenido
      zonaModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const id = button.getAttribute('data-id');
        const zona = zonas.find(z => z.identifier === id);
        if (!zona) return;
      
        updateZonaModalContent(zona, zonas);
      
        obtenerClima(zona.geo.latitude, zona.geo.longitude).then(clima => {
          const forecastContainer = zonaModal.querySelector('#modalZonaForecast');

          if (clima && clima.current && clima.forecast) {
            const iconToday = getWeatherIcon(clima.current.weathercode);
            const temp = clima.current.temperature.toFixed(1);
            const min = clima.forecast.temperature_2m_min[0].toFixed(1);
            const max = clima.forecast.temperature_2m_max[0].toFixed(1);
            const wind = clima.current.windspeed.toFixed(1);
            const gradient = getWeatherGradient(clima.current.weathercode);

            // Comenzar todas las tarjetas
            let forecastHtml = `<div class="weather-row">`;

            // Hoy (primera tarjeta con degradado)
            forecastHtml += `
              <div class="weather-card today" style="background: ${gradient}; color: white;">
                <div class="icon">${iconToday}</div>
                <div class="temp">${temp}°</div>
                <div class="range">${min}° ~ ${max}°</div>
                <div class="wind">💨 ${wind} km/h</div>
              </div>
            `;

            // Próximos días
            const { time, temperature_2m_max, temperature_2m_min, weathercode } = clima.forecast;

            for (let i = 1; i <= 4; i++) {
              const day = new Date(time[i]).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
              const icon = getWeatherIcon(weathercode[i]);
              forecastHtml += `
                <div class="weather-card">
                  <div class="day">${day}</div>
                  <div class="icon">${icon}</div>
                  <div class="temp">${temperature_2m_min[i].toFixed(1)}° / ${temperature_2m_max[i].toFixed(1)}°</div>
                </div>
              `;
            }

            forecastHtml += '</div>';
            forecastContainer.innerHTML = forecastHtml;
          } else {
            forecastContainer.innerHTML = 'Clima no disponible';
          }

        });        
      });

    })
    .catch(error => console.error('Error al cargar el JSON de zonas:', error));
});

/*--------------------------------------------------------------
# JSON DE EXCURSIONES (https://www.explorarmallorca.com/)
--------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', function () {
  const excursionModal = document.getElementById('excursionModal');

  // Cuando se muestra el modal, cargar los datos
  excursionModal.addEventListener('show.bs.modal', function (event) {
    // Obtener el botón/enlace que abrió el modal
    const button = event.relatedTarget;
    if (!button) return;
    const id = button.getAttribute('data-id');
    const excursion = excursionsData.find(e => String(e['@identifier']) === String(id));
    if (!excursion) return;

    // Carrusel de imágenes
    const carouselInner = excursionModal.querySelector('#excursionCarouselInner');
    carouselInner.innerHTML = (excursion.image || []).map((img, i) => `
      <div class="carousel-item${i === 0 ? ' active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${excursion.name}" loading="lazy">
      </div>
    `).join('');

    // Título
    excursionModal.querySelector('#excursionModalTitle').innerHTML = `
      <h4>${excursion.name || ''}</h4>
    `;

    // Descripción
    excursionModal.querySelector('#excursionModalDescription').innerHTML = `
      <p>${excursion.description || ''}</p>
    `;

    // Propiedades adicionales
    const props = excursion.additionalProperty || [];
    excursionModal.querySelector('#excursionModalProperties').innerHTML = props.map(p => {
      const nombreProp = p.name === "duration" ? "Duración" : p.name;
      return `<span class="badge bg-info me-2">${nombreProp}: ${p.value ? p.value.replace('PT', '').replace('H', 'h') : ''}</span>`;
    }).join('');

// Mapa (Leaflet)
const mapDiv = excursionModal.querySelector('#excursionModalMap');
mapDiv.innerHTML = `
  <div id="excursionMapInner" style="height: 300px;"></div>
`;

// Inicializa el mapa en el nuevo div
if (window.excursionMap) {
  window.excursionMap.remove();
}
setTimeout(() => {
  const lat = parseFloat(excursion.containedInPlace?.geo?.latitude);
  const lng = parseFloat(excursion.containedInPlace?.geo?.longitude);
  if (!isNaN(lat) && !isNaN(lng)) {
    window.excursionMap = L.map('excursionMapInner').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(window.excursionMap);
    L.marker([lat, lng]).addTo(window.excursionMap).bindPopup(excursion.name).openPopup();
    setTimeout(() => window.excursionMap.invalidateSize(), 200);
    if (excursion.hasMap) {
      new L.GPX(excursion.hasMap, {
        async: true,
        marker_options: {
          startIconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.4.0/pin-icon-start.png",
          endIconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.4.0/pin-icon-end.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet-gpx/1.4.0/pin-shadow.png"
        }
      }).on('loaded', function(e) {
        window.excursionMap.fitBounds(e.target.getBounds());
      }).addTo(window.excursionMap);
    }
  }
}, 200);

    // Video
    const video = excursion.subjectOf?.video?.embedUrl;
    if (video) {
      excursionModal.querySelector('#excursionModalVideo').innerHTML = `
        <p class="fw-bold fs-5">Video</p>
        <div class="ratio ratio-16x9">
          <iframe src="${video}" frameborder="0" allowfullscreen></iframe>
        </div>
      `;
    } else {
      excursionModal.querySelector('#excursionModalVideo').innerHTML = `<p class="text-muted">No hay vídeo disponible.</p>`;
    }
  });
});

/*--------------------------------------------------------------
# APIS DE TEXTO A VOZ (SpeechSynthesis)
--------------------------------------------------------------*/
let leyendo = false;
let lecturaActual = null;

function leerTexto(texto, boton) {
  if (!leyendo) {
    lecturaActual = new SpeechSynthesisUtterance(texto);
    lecturaActual.lang = 'es-ES';
    lecturaActual.rate = 1;
    lecturaActual.pitch = 1;

    lecturaActual.onend = () => {
      leyendo = false;
      if (boton) boton.innerText = '🔊 Escuchar';
    };

    speechSynthesis.speak(lecturaActual);
    leyendo = true;
    if (boton) boton.innerText = '🔇 Detener';
  } else {
    speechSynthesis.cancel();
    leyendo = false;
    if (boton) boton.innerText = '🔊 Escuchar';
  }
}

document.addEventListener('click', function (e) {
  if (e.target && (e.target.id === 'btnLeer' || e.target.id === 'btnLeerAve')) {
    const boton = e.target;
    const textoContainer = boton.closest('.modal-description').querySelector('.texto-para-leer');
    const texto = textoContainer.innerText;

    leerTexto(texto, boton);
  }
});


/*--------------------------------------------------------------
# API CONTÁCTANOS
--------------------------------------------------------------*/

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío tradicional

  // Validar cada campo
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  let isValid = true;

  // Validar Nombre
  if (!fname.checkValidity()) {
    document.getElementById('fname-error').textContent = fname.validationMessage;
    isValid = false;
  } else {
    document.getElementById('fname-error').textContent = '';
  }

  // Validar Apellidos
  if (!lname.checkValidity()) {
    document.getElementById('lname-error').textContent = lname.validationMessage;
    isValid = false;
  } else {
    document.getElementById('lname-error').textContent = '';
  }

  // Validar Email
  if (!email.checkValidity()) {
    document.getElementById('email-error').textContent = email.validationMessage;
    isValid = false;
  } else {
    document.getElementById('email-error').textContent = '';
  }

  // Validar Asunto
  if (!subject.checkValidity()) {
    document.getElementById('subject-error').textContent = subject.validationMessage;
    isValid = false;
  } else {
    document.getElementById('subject-error').textContent = '';
  }

  // Validar Mensaje
  if (!message.checkValidity()) {
    document.getElementById('message-error').textContent = message.validationMessage;
    isValid = false;
  } else {
    document.getElementById('message-error').textContent = '';
  }

  // Si todo es válido, enviar a la API
  if (isValid) {
    const formData = new FormData(this);
    const data = {
      fname: formData.get('fname'),
      lname: formData.get('lname'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    const apiUrl = 'https://getform.io/f/apjnvqya';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        alert('¡Gracias por tu mensaje!');
        this.reset();
        // Limpia los mensajes de error
        document.getElementById('fname-error').textContent = '';
        document.getElementById('lname-error').textContent = '';
        document.getElementById('email-error').textContent = '';
        document.getElementById('subject-error').textContent = '';
        document.getElementById('message-error').textContent = '';
      } else {
        throw new Error('Error en el envío');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
    });
  }
});

/*--------------------------------------------------------------
#   QUIZ
--------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  const quizBtn = document.getElementById("play-quiz-btn");

  let preguntas = [];
  let currentIndex = 0;
  let respuestasUsuario = [];
  let preguntasComprobadas = [];
  let inicioTiempo = 0;

  // Inyectar canvas para el confeti con z-index alto
  const canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  document.body.appendChild(canvas);

  const myConfetti = confetti.create(canvas, {
    resize: true,
    useWorker: true
  });

  quizBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    try {
      const response = await fetch("assets/json/Quiz.json");
      const quizData = await response.json();

      preguntas = quizData.hasPart.sort(() => 0.5 - Math.random()).slice(0, 5);
      currentIndex = 0;
      respuestasUsuario = Array(preguntas.length).fill(null);
      preguntasComprobadas = Array(preguntas.length).fill(false);
      inicioTiempo = Date.now();

      document.getElementById("quiz-end").classList.add("d-none");
      mostrarPregunta();

      const quizModal = new bootstrap.Modal(document.getElementById("quizModal"));
      quizModal.show();
    } catch (error) {
      console.error("Error cargando el quiz:", error);
    }
  });

  function mezclarArray(array) {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }
  

  function mostrarPregunta() {
    const pregunta = preguntas[currentIndex];

    // Título solo con número
    document.getElementById("quizModalLabel").innerText = ` Pregunta ${currentIndex + 1}`;
    document.getElementById("quiz-question-text").innerText = pregunta.name;
    document.getElementById("quiz-question-text").classList.add("fade-in");

    const imagen = document.getElementById("quiz-question-image");
    if (pregunta.image) {
      imagen.src = pregunta.image;
      imagen.classList.remove("d-none");
      imagen.classList.add("fade-in");
    } else {
      imagen.classList.add("d-none");
    }

    const opciones = document.getElementById("quiz-options");
    opciones.innerHTML = "";

    pregunta.suggestedAnswer.forEach((respuesta) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-outline-primary quiz-option-btn opcion-btn d-block w-100 my-2 fade-in";
      btn.innerText = respuesta.text;

      btn.addEventListener("click", () => {
        if (preguntasComprobadas[currentIndex]) return;

        document.querySelectorAll(".opcion-btn").forEach(b => {
          b.classList.remove("active");
          b.dataset.selected = "false";
        });

        btn.classList.add("active");
        btn.dataset.selected = "true";
      });

      opciones.appendChild(btn);
    });

    document.getElementById("quiz-feedback").innerText = "";
    document.getElementById("quiz-feedback").className = "d-none";

    document.getElementById("prev-btn").disabled = currentIndex === 0;

    const nextBtn = document.getElementById("next-btn");
    if (currentIndex === preguntas.length - 1) {
      nextBtn.innerText = "Finalizar";
      nextBtn.disabled = !preguntasComprobadas[currentIndex];
    } else {
      nextBtn.innerText = "Siguiente";
      nextBtn.disabled = false;
    }

    const progreso = Math.floor(((currentIndex + 1) / preguntas.length) * 100);
    const barra = document.getElementById("quiz-progress-bar");

    // Reinicia antes de aplicar el nuevo ancho (para que la transición funcione bien)
    barra.style.width = "0%";
    setTimeout(() => {
      barra.style.width = `${progreso}%`;
      barra.innerText = `${currentIndex + 1} / ${preguntas.length}`;
    }, 50);


    document.getElementById("quizModalLabel").classList.remove("d-none");
    document.getElementById("quiz-question-text").classList.remove("d-none");
    document.getElementById("quiz-question-image").classList.remove("d-none");
    document.getElementById("quiz-options").classList.remove("d-none");
    document.getElementById("check-btn").classList.remove("d-none");
    document.getElementById("prev-btn").classList.remove("d-none");
    document.getElementById("next-btn").classList.remove("d-none");
  }

  document.getElementById("check-btn").addEventListener("click", () => {
    const seleccion = document.querySelector(".opcion-btn.active");
    if (!seleccion) return;

    const respuestaUsuario = seleccion.innerText;
    respuestasUsuario[currentIndex] = respuestaUsuario;

    const correcta = preguntas[currentIndex].acceptedAnswer.text.trim();

    if (respuestaUsuario.trim() === correcta) {
      seleccion.classList.remove("btn-outline-primary");
      seleccion.classList.add("btn-success");
    } else {
      seleccion.classList.remove("btn-outline-primary");
      seleccion.classList.add("btn-danger");
    }

    preguntasComprobadas[currentIndex] = true;

    document.querySelectorAll(".opcion-btn").forEach(b => {
      b.disabled = true;
      b.classList.remove("btn-outline-primary");
      if (b.innerText.trim() === correcta) {
        b.classList.add("btn-success");
      }
    });

    if (currentIndex === preguntas.length - 1) {
      document.getElementById("next-btn").disabled = false;
    }
  });

  document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      mostrarPregunta();
    }
  });

  document.getElementById("next-btn").addEventListener("click", () => {
    if (currentIndex < preguntas.length - 1) {
      currentIndex++;
      mostrarPregunta();
    } else if (currentIndex === preguntas.length - 1 && preguntasComprobadas[currentIndex]) {
      const aciertos = respuestasUsuario.filter((r, i) =>
        r?.trim() === preguntas[i].acceptedAnswer.text.trim()
      ).length;
  
      const tiempoTotal = Math.floor((Date.now() - inicioTiempo) / 1000);
  
      // Guardar los resultados en localStorage
      const resultados = {
        fecha: new Date().toLocaleString(),
        aciertos: aciertos,
        totalPreguntas: preguntas.length,
        tiempo: tiempoTotal
      };
  
      // Recuperar resultados previos y agregar el nuevo
      const resultadosPrevios = JSON.parse(localStorage.getItem("quizResultados")) || [];
      resultadosPrevios.push(resultados);
      localStorage.setItem("quizResultados", JSON.stringify(resultadosPrevios));
  
      // Mostrar los resultados al usuario
      const quizEnd = document.getElementById("quiz-end");
      quizEnd.innerHTML = `
        <p class="fw-bold fs-4 text-success">¡Has finalizado el quiz!</p>
        <p class="text-success fs-5">Aciertos: <strong>${aciertos} de ${preguntas.length}</strong></p>
        <p class="text-success fs-5">Tiempo total: <strong>${tiempoTotal} segundos</strong></p>
        <button class="btn btn-success mt-3" id="restart-btn">Volver a empezar</button>
      `;
  
      quizEnd.classList.remove("d-none");
  
      myConfetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
        gravity: 0.3,
        ticks: 200
      });
  
      document.getElementById("quizModalLabel").classList.add("d-none");
      document.getElementById("quiz-question-text").classList.add("d-none");
      document.getElementById("quiz-question-image").classList.add("d-none");
      document.getElementById("quiz-options").classList.add("d-none");
      document.getElementById("quiz-feedback").classList.add("d-none");
      document.getElementById("check-btn").classList.add("d-none");
      document.getElementById("prev-btn").classList.add("d-none");
      document.getElementById("next-btn").classList.add("d-none");
    }
  });

  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "restart-btn") {
      currentIndex = 0;
      respuestasUsuario = Array(preguntas.length).fill(null);
      preguntasComprobadas = Array(preguntas.length).fill(false);
      preguntas = preguntas.sort(() => 0.5 - Math.random()).slice(0, 5);
      inicioTiempo = Date.now();
      document.getElementById("quiz-end").classList.add("d-none");
      mostrarPregunta();
    }
  });

  
  // Llamar a la función al cargar la página
  document.addEventListener("DOMContentLoaded", mostrarResultadosGuardados);

  // Función para mostrar los resultados guardados
  function mostrarResultadosGuardados() {
    const resultados = JSON.parse(localStorage.getItem("quizResultados")) || [];
    const listaResultados = document.getElementById("resultados-lista");
  
    listaResultados.innerHTML = ""; // Limpiar la lista
  
    if (resultados.length === 0) {
      listaResultados.innerHTML = "<li class='list-group-item'>No hay resultados guardados.</li>";
      return;
    }
  
    resultados.forEach((resultado, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <strong>Intento ${index + 1}:</strong> 
        <strong>Aciertos: </strong> ${resultado.aciertos}/${resultado.totalPreguntas}, 
        <strong>Tiempo: </strong> ${resultado.tiempo} segundos, 
        <strong>Fecha: </strong>  ${resultado.fecha}
      `;
      listaResultados.appendChild(li);
    });
  }
  
  // Evento para mostrar/ocultar los resultados al hacer clic en el botón
  document.getElementById("show-results-btn").addEventListener("click", () => {
    const quizResults = document.getElementById("quiz-results");
    const showResultsBtn = document.getElementById("show-results-btn");
  
    // Alternar visibilidad de los resultados
    quizResults.classList.toggle("d-none");
  
    // Cambiar el texto del botón
    if (quizResults.classList.contains("d-none")) {
      showResultsBtn.innerText = "Historial";
    } else {
      showResultsBtn.innerText = "Ocultar Historial";
    }
  
    // Actualizar la lista de resultados
    mostrarResultadosGuardados();
  });
});


/*--------------------------------------------------------------
#   Carrusel cambio por estación
--------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", async () => {
  const carouselInner = document.querySelector("#heroCarousel .carousel-inner");
  const indicators = document.querySelector(".carousel-indicators");

  try {
    const response = await fetch("assets/json/Ave.json");
    const data = await response.json();

    // El array real de aves está dentro de "species"
    const especies = data.species;

    // Obtener el mes actual en formato capitalizado
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const mesActual = meses[new Date().getMonth()];

    // Filtrar las aves que tienen presencia en el mes actual
    const avesDelMes = especies.filter(ave =>
      ave.hasDefinedTerm?.some(term =>
        term.termCode === "season" &&
        term.alternateName?.includes(mesActual)
      )
    );

    // Si no hay aves, no hacemos nada
    if (avesDelMes.length === 0) return;

    // Limpiar contenido previo del carrusel
    carouselInner.innerHTML = "";
    indicators.innerHTML = "";

    // Añadir aves al carrusel
    avesDelMes.forEach((ave, i) => {
      const activo = i === 0 ? "active" : "";
      const imagen = ave.image?.[0] || "assets/img/default.jpg";

      // Indicador
            const btn = document.createElement("button");
            btn.type = "button";
            btn.setAttribute("data-bs-target", "#heroCarousel");
            btn.setAttribute("data-bs-slide-to", i);
            btn.setAttribute("aria-label", `Slide ${i + 1}`);
            if (activo) {
              btn.classList.add("active");
              btn.setAttribute("aria-current", "true");
            }
            indicators.appendChild(btn);
      
            // Slide
            const slide = document.createElement("div");
            slide.className = `carousel-item ${activo}`;
            slide.innerHTML = `
              <img src="${imagen}" class="d-block w-100 hero-img" alt="${ave.name}" loading="lazy">
              <div class="carousel-caption d-none d-md-block">
                <p style="font-size: 1.5rem;">${ave.name}</p>
              </div>
            `;
            carouselInner.appendChild(slide);
          });

  } catch (error) {
    console.error("Error cargando aves del mes:", error);
  }
});

/*--------------------------------------------------------------
#   Integración Firebase
--------------------------------------------------------------*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDN0EnaNhwR8k48Mn4m86D6oqp6it6FzOQ",
  authDomain: "avesmallorquinas-2aad1.firebaseapp.com",
  projectId: "avesmallorquinas-2aad1",
  storageBucket: "avesmallorquinas-2aad1.firebasestorage.app",
  messagingSenderId: "440219672006",
  appId: "1:440219672006:web:d05264186284dc8ceba6c7",
  measurementId: "G-DPB488RC3E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

document.addEventListener("DOMContentLoaded", () => {
  const loginBtnDesktop = document.getElementById("login-btn-desktop");
  const logoutBtnDesktop = document.getElementById("logout-btn-desktop");

  const loginBtnMobile = document.getElementById("login-btn-mobile");
  const logoutBtnMobile = document.getElementById("logout-btn-mobile");

  const userName = sessionStorage.getItem("userName");

  if (userName) {
    loginBtnDesktop.innerHTML = `<i class="bi bi-person"></i> ${userName}`;
    loginBtnDesktop.disabled = true;
    logoutBtnDesktop.style.display = "inline-block";

    loginBtnMobile.innerHTML = `<i class="bi bi-person"></i> ${userName}`;
    loginBtnMobile.disabled = true;
    logoutBtnMobile.style.display = "block";
  }

  function login() {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        alert(`Hola, ${user.displayName} 👋`);

        loginBtnDesktop.innerHTML = `<i class="bi bi-person"></i> ${user.displayName}`;
        loginBtnDesktop.disabled = true;
        logoutBtnDesktop.style.display = "inline-block";

        loginBtnMobile.innerHTML = `<i class="bi bi-person"></i> ${user.displayName}`;
        loginBtnMobile.disabled = true;
        logoutBtnMobile.style.display = "block";

        sessionStorage.setItem("userId", user.uid);
        sessionStorage.setItem("userName", user.displayName);
        sessionStorage.setItem("userEmail", user.email);
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
      });
  }

  function logout() {
    signOut(auth).then(() => {
      sessionStorage.clear();
      alert("Sesión cerrada");
      location.reload();
    });
  }

  loginBtnDesktop.addEventListener("click", login);
  loginBtnMobile.addEventListener("click", login);
  logoutBtnDesktop.addEventListener("click", logout);
  logoutBtnMobile.addEventListener("click", logout);
});

/*--------------------------------------------------------------
#   Vídeo Autores
--------------------------------------------------------------*/
const videoAutoresModal = document.getElementById('videoAutoresModal');
const videoAutores = document.getElementById('videoAutores');

videoAutoresModal.addEventListener('shown.bs.modal', () => {
  // Limpia cualquier source anterior
  while (videoAutores.firstChild) {
    videoAutores.removeChild(videoAutores.firstChild);
  }
  // Añade el source solo al abrir el modal
  const source = document.createElement('source');
  source.src = 'assets/multimedia.webm';
  source.type = 'video/webm';
  videoAutores.appendChild(source);
  videoAutores.load();
});

videoAutoresModal.addEventListener('hidden.bs.modal', () => {
  videoAutores.pause();
  videoAutores.currentTime = 0;
  while (videoAutores.firstChild) {
    videoAutores.removeChild(videoAutores.firstChild);
  }
});