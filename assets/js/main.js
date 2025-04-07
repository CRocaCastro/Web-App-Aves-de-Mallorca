/**
* Template Name: Regna
* Template URL: https://bootstrapmade.com/regna-bootstrap-onepage-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
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
   * Mobile nav toggle
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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  
  /**
   * Scroll top button
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
   * Animation on scroll function and init
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
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
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
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
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
   * Navmenu Scrollspy
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
# Aves
--------------------------------------------------------------*/
//Función para filtrar por nombre
document.addEventListener('DOMContentLoaded', function () {
  const dropdownItems = document.querySelectorAll('#btn-nombre + .dropdown-menu .dropdown-item'); // Solo los del filtro de nombre
  const searchInput = document.querySelector('.input-group input');
  const dropdownMenu = document.querySelector('#btn-nombre');
  const portfolioContainer = document.querySelector('#aves .row.gy-4');
  let searchType = null;
  let birdsData = [];

  // Desactivar inicialmente
  searchInput.disabled = true;
  searchInput.placeholder = 'Selecciona el tipo de nombre';

  // Cargar datos del JSON
  fetch('assets/json/Ave.json')
    .then(response => response.json())
    .then(data => {
      birdsData = data.species;
      renderBirds(birdsData);
    });

  // Manejar selección de tipo de nombre
  dropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();

      // Alternar selección
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        searchInput.disabled = true;
        searchInput.placeholder = 'Selecciona el tipo de nombre';
        dropdownMenu.classList.remove('btn-selected');
        searchType = null;
        renderBirds(birdsData); // Mostrar todo si se desactiva
      } else {
        // Deseleccionar otros
        dropdownItems.forEach(option => option.classList.remove('selected'));

        this.classList.add('selected');
        dropdownMenu.classList.add('btn-selected');

        // Activar input
        searchInput.disabled = false;

        // Definir el tipo de búsqueda
        if (this.textContent.trim() === 'Nombre común') {
          searchInput.placeholder = 'Buscar por nombre común';
          searchType = 'name';
        } else if (this.textContent.trim() === 'Nombre científico') {
          searchInput.placeholder = 'Buscar por nombre científico';
          searchType = 'alternateName';
        }
      }
    });
  });

  // Manejar búsqueda
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim(); // Texto ingresado en la barra de búsqueda

    // Filtrar aves según el tipo de búsqueda y el texto ingresado
    const filteredBirds = birdsData.filter(bird => {
      if (searchType === 'name') {
        return bird.name.toLowerCase().includes(query);
      } else if (searchType === 'alternateName') {
        return bird.alternateName.toLowerCase().includes(query);
      }
      return false;
    });

    // Renderizar las aves filtradas
    renderBirds(filteredBirds);
  });

  // Función para renderizar las aves en el contenedor
  function renderBirds(birds) {
    portfolioContainer.innerHTML = ''; // Limpiar el contenedor donde se muestran las aves
  
    // Recorrer cada ave y crear un card
    birds.forEach(bird => {
      // Crear un elemento div para la ave
      const birdElement = document.createElement('div');
      birdElement.classList.add('col-lg-4', 'col-md-6', 'portfolio-item');
  
      // Asignar el contenido HTML al elemento con el diseño de Bootstrap
      birdElement.innerHTML = `
        <div class="card h-100">
          <a class="portfolio-link" data-bs-toggle="modal" data-bs-target="#portfolioModal" data-id="${bird.identifier}">
            <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
          </a>
          <div class="card-body">
            <h5 class="card-title">${bird.name}</h5>
            <p class="card-text"><em>${bird.alternateName}</em></p>
          </div>
        </div>
      `;
  
      // Agregar el elemento al contenedor de aves
      portfolioContainer.appendChild(birdElement);
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const jsonUrl = 'assets/json/Ave.json';
  const portfolioContainer = document.querySelector('#aves .row.gy-4');
  const portfolioModal = document.getElementById('portfolioModal');

  const btnEstacion = document.querySelector('#btn-estacion');
  const estacionDropdownItems = document.querySelectorAll('#btn-estacion + .dropdown-menu .dropdown-item');

  let birdsData = [];
  let selectedEstacion = null;

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
      return estaciones.some(estacion =>
        estacion.alternateName?.some(mes => meses.includes(mes))
      );
    });
  }

  function renderBirds(birds) {
    portfolioContainer.innerHTML = '';
    birds.forEach(item => {
      const card = document.createElement('div');
      card.className = 'col-lg-4 col-md-6 portfolio-item';
      card.innerHTML = `
        <div class="card h-100">
          <a class="portfolio-link" data-bs-toggle="modal" data-bs-target="#portfolioModal" data-id="${item.identifier}">
            <img src="${item.image[0]}" class="card-img-top" alt="${item.name}" loading="lazy">
          </a>
          <div class="card-body">
            <h5 class="card-title"><a>${item.name}</a></h5>
            <p class="card-text"><em>${item.alternateName}</em></p>
          </div>
        </div>
      `;
      portfolioContainer.appendChild(card);
    });
  }

  // FUNCIÓN MUESTRA MODAL DE LAS AVES
  function updateModalContent(item, data) {
    const modalTitle = portfolioModal.querySelector('#modalTitle');
    const modalDescription = portfolioModal.querySelector('#modalDescription');
    const modalCarouselInner = portfolioModal.querySelector('#modalCarouselInner');
    const modalAdditionalInfo = portfolioModal.querySelector('#modalAdditionalInfo');
    const modalUsersReviews = portfolioModal.querySelector('#modalUsersReviews');
    const modalAudioContainer = portfolioModal.querySelector('#modalAudioContainer');

    const audioObject = item.subjectOf?.find(media => media.encodingFormat === "audio/wav");
    const audioPlayer = audioObject && audioObject.contentUrl
      ? `<h5 class="mt-3">Escucha el canto:</h5>
         <audio controls class="w-100 mt-2">
            <source src="${audioObject.contentUrl}" type="${audioObject.encodingFormat}">
            Tu navegador no soporta el elemento de audio.
         </audio>`
      : `<p class="text-muted mt-3">No hay audio disponible para esta ave.</p>`;

    modalAudioContainer.innerHTML = audioPlayer;

    modalTitle.innerHTML = `
      <div class="modal-title-container">
        <h4>${item.name}</h4>
        <p><em>${item.alternateName}</em></p>
      </div>
    `;

    modalDescription.innerHTML = `
      <div class="modal-description">
        <div class="texto-para-leer">
          <p><strong>Descripción:</strong> ${item.description}</p>
          <p><strong>Familia:</strong> ${item.parentTaxon.name}</p>
        </div>
        <button class="btn btn-outline-primary mt-2" id="btnLeer">🔊 Escuchar</button>
      </div>
    `;


    modalCarouselInner.innerHTML = item.image.map((img, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${item.name}">
      </div>
    `).join('');

    modalUsersReviews.innerHTML = `
      <div class="modal-reviews">
        <h5>Reseñas de usuarios</h5>
        <p>${item.review ? item.review : "Aún no hay reseñas, ¡añade una ahora!"}</p>
      </div>
    `;

    const otherBirds = data.filter(bird => bird.identifier !== item.identifier);
    modalAdditionalInfo.innerHTML = `
      <h5>Otras aves</h5>
      <div class="row gy-4" id="other-birds-container">
        ${otherBirds.slice(0, 3).map(bird => `
          <div class="col-lg-4 col-md-6 portfolio-item">
            <div class="card h-100">
              <a class="portfolio-link" data-id="${bird.identifier}">
                <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title"><a>${bird.name}</a></h5>
                <p class="card-text">${bird.alternateName}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    modalAdditionalInfo.querySelectorAll('.portfolio-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const newId = this.getAttribute('data-id');
        const newItem = data.find(bird => bird.identifier === newId);
        if (newItem) updateModalContent(newItem, data);
      });
    });
  }

  // Cargar JSON
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      birdsData = data.species;
      renderBirds(birdsData);

      // Modal
      portfolioModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        const id = button.getAttribute('data-id');
        const item = birdsData.find(item => item.identifier === id);
        if (item) updateModalContent(item, birdsData);
      });

      // Filtro por estación
      estacionDropdownItems.forEach(btn => {
        btn.addEventListener('click', function () {
          // Deseleccionar todos
          estacionDropdownItems.forEach(option => option.classList.remove('selected'));

          // Si seleccionas la misma estación otra vez → desactiva filtro
          if (selectedEstacion === this.textContent.trim()) {
            selectedEstacion = null;
            btnEstacion.classList.remove('btn-selected');
            renderBirds(birdsData);
          } else {
            // Selección nueva
            selectedEstacion = this.textContent.trim();
            this.classList.add('selected');
            btnEstacion.classList.add('btn-selected');
            const avesFiltradas = filtrarPorEstacion(birdsData, selectedEstacion);
            renderBirds(avesFiltradas);
          }
        });
      });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
});


// Función para filtrar por hábitat  las aves 
document.addEventListener('DOMContentLoaded', function () {
  const habitatDropdownItems = document.querySelectorAll('#btn-habitat + .dropdown-menu .dropdown-item'); // Opciones del dropdown de hábitat
  const habitatDropdownMenu = document.querySelector('#btn-habitat'); // Botón del menú desplegable de hábitat
  const portfolioContainer = document.querySelector('#aves .row.gy-4'); // Contenedor de las aves
  let selectedHabitat = null; // Hábitat seleccionado

  // Cargar datos del JSON
  let birdsData = [];
  fetch('assets/json/Ave.json')
    .then(response => response.json())
    .then(data => {
      birdsData = data.species; // Guardar las aves en una variable
      renderBirds(birdsData); // Renderizar todas las aves inicialmente
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

  // Manejar selección del hábitat
  habitatDropdownItems.forEach(item => {
    item.addEventListener('click', function (event) {
      event.preventDefault();

      // Alternar selección
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        habitatDropdownMenu.classList.remove('btn-selected'); // Quitar color verde
        selectedHabitat = null; // Resetear el hábitat seleccionado
        renderBirds(birdsData); // Mostrar todas las aves
      } else {
        // Deseleccionar otras opciones
        habitatDropdownItems.forEach(option => option.classList.remove('selected'));

        // Seleccionar la opción actual
        this.classList.add('selected');
        habitatDropdownMenu.classList.add('btn-selected'); // Añadir color verde
        selectedHabitat = this.textContent.trim(); // Guardar el hábitat seleccionado

        // Filtrar aves por el hábitat seleccionado
        const filteredBirds = birdsData.filter(bird => {
          const habitatTerm = bird.hasDefinedTerm?.find(term => term.termCode === 'habitat');
          if (habitatTerm && habitatTerm.alternateName) {
            return habitatTerm.alternateName.some(h => h.toLowerCase() === selectedHabitat.toLowerCase());
          }
          return false;
        });

        renderBirds(filteredBirds); // Renderizar las aves filtradas
      }
    });
  });

  // Función para renderizar las aves en el contenedor
  function renderBirds(birds) {
    portfolioContainer.innerHTML = ''; // Limpiar el contenedor donde se muestran las aves

    birds.forEach(bird => {
      const birdElement = document.createElement('div');
      birdElement.classList.add('col-lg-4', 'col-md-6', 'portfolio-item');

      birdElement.innerHTML = `
        <div class="card h-100">
          <a class="portfolio-link" data-bs-toggle="modal" data-bs-target="#portfolioModal" data-id="${bird.identifier}">
            <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}" loading="lazy">
          </a>
          <div class="card-body">
            <h5 class="card-title">${bird.name}</h5>
            <p class="card-text"><em>${bird.alternateName}</em></p>
          </div>
        </div>
      `;

      portfolioContainer.appendChild(birdElement);
    });
  }
});

// Función para el botón Ver más
document.getElementById('load-more').addEventListener('click', function () {
  // Selecciona todas las imágenes ocultas y las muestra
  document.querySelectorAll('.row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'block';
  });

  // Oculta el botón "Ver más" y muestra el botón "Ver menos"
  this.style.display = 'none';
  document.getElementById('load-less').style.display = 'inline-block';
});

// Función para el botón Ver menos
document.getElementById('load-less').addEventListener('click', function () {
  // Oculta todas las imágenes excepto las primeras tres
  document.querySelectorAll('.row.gy-4 .portfolio-item:nth-child(n+4)').forEach(function (item) {
    item.style.display = 'none';
  });

  // Oculta el botón "Ver menos" y muestra el botón "Ver más"
  this.style.display = 'none';
  document.getElementById('load-more').style.display = 'inline-block';

  // Desplazar la página hacia la sección de "Aves"
  document.getElementById('aves').scrollIntoView({
    behavior: 'smooth', // Desplazamiento suave
    block: 'start' // Alinea al inicio de la sección
  });
});

/*--------------------------------------------------------------
# Zonas
--------------------------------------------------------------*/

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




document.addEventListener('DOMContentLoaded', function () {
  const jsonZonaUrl = 'assets/json/Zona.json'; // Ruta del archivo JSON de zonas
  const zonaContainer = document.querySelector('#zonas .row.gy-4'); // Contenedor de las zonas
  const zonaModal = document.getElementById('zonaModal'); // Modal para las zonas

  // Función para obtener el clima de una zona
  async function obtenerClima(lat, lon) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.current_weather; // Devuelve los datos actuales del clima
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      return null;
    }
  }

  // Función para actualizar el contenido del modal de zonas
    function updateZonaModalContent(zona, data) {
    const modalTitle = zonaModal.querySelector('#modalZonaTitle');
    const modalDescription = zonaModal.querySelector('#modalZonaDescription');
    const modalCarouselInner = zonaModal.querySelector('#modalZonaCarouselInner');
    const modalAdditionalInfo = zonaModal.querySelector('#modalZonaAdditionalInfo');
  
    // Actualizar el contenido dinámico del modal
    modalTitle.innerHTML = `
      <div class="modal-title-container">
        <h4>${zona.name}</h4>
        <p><em>${zona.alternateName}</em></p>
      </div>
    `;
  
    modalDescription.innerHTML = `
      <div class="modal-description">
        <div class="texto-para-leer">
          <p><strong>Descripción:</strong> ${zona.description}</p>
          <p><strong>Ubicación:</strong> ${zona.address.addressLocality}, ${zona.address.addressRegion}, ${zona.address.addressCountry}</p>
          <p><strong>Coordenadas:</strong> Latitud: ${zona.geo.latitude}, Longitud: ${zona.geo.longitude}</p>
        </div>
        <button class="btn btn-outline-primary mt-2" id="btnLeer">🔊 Escuchar</button>
      </div>
    `;

  
    // Generar las imágenes del carrusel
    modalCarouselInner.innerHTML = zona.image.map((img, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${img}" class="d-block w-100" alt="${zona.name}">
      </div>
    `).join('');
  
    // Generar tarjetas de otras zonas
    const otherZonas = data.filter(z => z.identifier !== zona.identifier); // Excluir la zona actual
    modalAdditionalInfo.innerHTML = `
      <h5>Otras zonas</h5>
      <div class="row gy-4">
        ${otherZonas.map(z => `
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <a class="zona-link" data-id="${z.identifier}">
                <img src="${z.image[0]}" class="card-img-top" alt="${z.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title"><a title="More Details">${z.name}</a></h5>
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
          updateZonaModalContent(newZona, data); // Actualizar el contenido del modal con la nueva zona
        }
      });
    });
  }

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
          <div class="card h-100">
            <a class="zona-link" data-bs-toggle="modal" data-bs-target="#zonaModal" data-id="${zona.identifier}">
              <img src="${zona.image[0]}" class="card-img-top" alt="${zona.name}">
            </a>
            <div class="card-body">
              <h5 class="card-title"><a title="More Details">${zona.name}</a></h5>
              <p class="card-text">${zona.alternateName}</p>
            </div>
          </div>
        `;

        zonaContainer.appendChild(card);
      });

      // Configurar el evento para abrir el modal y actualizar su contenido
      zonaModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const id = button.getAttribute('data-id'); // Extraer el ID del atributo data-id

        // Encontrar la zona con el ID correspondiente en el JSON
        const zona = zonas.find(z => z.identifier === id);

        if (zona) {
        // Obtener el clima de la zona al abrir el modal
        obtenerClima(zona.geo.latitude, zona.geo.longitude)
          .then(clima => {
            const climaHtml = clima
              ? `<p><strong>Clima actual:</strong> ${clima.temperature}°C, <strong>Viento: </strong>${clima.windspeed} km/h</p>`
              : '<p><strong>Clima actual:</strong> No disponible</p>';

            // Actualizar el contenido del modal
            updateZonaModalContent(zona, zonas);

            // Insertar el clima en el modal
            const modalWeather = zonaModal.querySelector('#modalZonaWeather');
            modalWeather.innerHTML = climaHtml;
          })
          .catch(error => {
            console.error('Error al obtener el clima:', error);
            const modalWeather = zonaModal.querySelector('#modalZonaWeather');
            modalWeather.innerHTML = '<p><strong>Clima actual:</strong> No disponible</p>';
          });     
        }
      });
    })
    .catch(error => console.error('Error al cargar el JSON de zonas:', error));
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
  if (e.target && e.target.id === 'btnLeer') {
    const boton = e.target;
    const textoContainer = boton.closest('.modal-description').querySelector('.texto-para-leer');
    const texto = textoContainer.innerText;

    leerTexto(texto, boton);
  }
});



/*--------------------------------------------------------------
# Contact Section
--------------------------------------------------------------*/
// API CONTÁCTANOS

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

  // Obtiene los datos del formulario
  const formData = new FormData(this);
  const data = {
    fname: formData.get('fname'),
    lname: formData.get('lname'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message')
  };

  // URL de la API a la que se enviarán los datos 
  const apiUrl = 'https://getform.io/f/apjnvqya'; 

  // Solicitud POST a la API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Enviar los datos en formato JSON
  })
  .then(response => response.json()) // Procesar la respuesta de la API
  .then(responseData => {
    console.log('Respuesta de la API:', responseData);
    alert('¡Gracias por tu mensaje!');
    // Aquí se puede hacer algo más como limpiar el formulario, redirigir, etc.
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo.');
  });
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


  // Guardar resultados en localStorage
    function mostrarResultadosGuardados() {
    const resultados = JSON.parse(localStorage.getItem("quizResultados")) || [];
    const listaResultados = document.getElementById("resultados-lista");
  
    listaResultados.innerHTML = ""; // Limpiar la lista
  
    resultados.forEach((resultado, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <strong>Intento ${index + 1}:</strong> 
        Aciertos: ${resultado.aciertos}/${resultado.totalPreguntas}, 
        Tiempo: ${resultado.tiempo} segundos, 
        Fecha: ${resultado.fecha}
      `;
      listaResultados.appendChild(li);
    });
  }
  
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
      showResultsBtn.innerText = "Ver resultados guardados";
    } else {
      showResultsBtn.innerText = "Ocultar resultados guardados";
    }
  
    // Actualizar la lista de resultados
    mostrarResultadosGuardados();
  });
});


/*--------------------------------------------------------------
#   Carrusel hero cambio por estación
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
        <img src="${imagen}" class="d-block w-100 hero-img" alt="${ave.name}">
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

// Validar el formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío del formulario si hay errores

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

  // Si todo es válido, enviar el formulario
  if (isValid) {
    alert('Formulario enviado correctamente.');
    this.submit();
  }
});