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
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
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

// Función para el botón Ver más
// document.addEventListener("DOMContentLoaded", () => {
//   const portfolioItems = document.querySelectorAll("#aves .portfolio-item");
//   const loadMoreButton = document.getElementById("load-more");
//   const isotopeContainer = document.querySelector(".isotope-container"); // Contenedor principal

//   // Mostrar solo la primera fila (3 elementos)
//   const itemsPerRow = 3;
//   portfolioItems.forEach((item, index) => {
//     if (index >= itemsPerRow) {
//       item.style.display = "none";
//     }
//   });

//   // Mostrar más elementos al hacer clic en el botón
//   loadMoreButton.addEventListener("click", () => {
//     portfolioItems.forEach((item) => {
//       item.style.display = "block";
//     });

//     // Ajustar la altura del contenedor
//     if (isotopeContainer) {
//       isotopeContainer.style.height = `${isotopeContainer.scrollHeight}px`;
//     }

//     loadMoreButton.style.display = "none"; // Ocultar el botón después de cargar más
//   });
// });

// Función para cargar las aves desde un archivo JSON

document.addEventListener('DOMContentLoaded', function () {
  const jsonUrl = 'assets/json/Ave.json'; // Ruta del archivo JSON
  const portfolioContainer = document.querySelector('#aves .row.gy-4'); // Contenedor de los items
  const portfolioModal = document.getElementById('portfolioModal'); // Modal del portafolio

    function updateModalContent(item, data) {
    const modalTitle = portfolioModal.querySelector('#modalTitle');
    const modalDescription = portfolioModal.querySelector('#modalDescription');
    const modalCarouselInner = portfolioModal.querySelector('#modalCarouselInner');
    const modalAdditionalInfo = portfolioModal.querySelector('#modalAdditionalInfo');
    const modalUsersReviews = portfolioModal.querySelector('#modalUsersReviews');
  
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
        <img src="${img}" class="d-block w-100" alt="${item.name}">
      </div>
    `).join('');
  
    // Actualizar las reseñas
    modalUsersReviews.innerHTML = `
      <div class="modal-reviews">
        <h5>Reseñas de usuarios</h5>
        <p>${item.review ? item.review : "Aún no hay reseñas, ¡añade una ahora!"}</p>
      </div>
    `;
  
    // Generar tarjetas de otras aves
    const otherBirds = data.filter(bird => bird.identifier !== item.identifier); // Excluir el ave actual
    modalAdditionalInfo.innerHTML = `
      <h5>Otras aves</h5>
      <div class="row gy-4">
        ${otherBirds.map(bird => `
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <a href="#" class="portfolio-link" data-id="${bird.identifier}">
                <img src="${bird.image[0]}" class="card-img-top" alt="${bird.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title"><a href="#" title="More Details">${bird.name}</a></h5>
                <p class="card-text">${bird.alternateName}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  
    // Configurar eventos para las tarjetas de otras aves
    const otherBirdLinks = modalAdditionalInfo.querySelectorAll('.portfolio-link');
    otherBirdLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const newId = this.getAttribute('data-id'); // Obtener el ID de la nueva ave
        const newItem = data.find(bird => bird.identifier === newId); // Buscar la nueva ave
        if (newItem) {
          updateModalContent(newItem, data); // Actualizar el contenido del modal con la nueva ave
          // Desplazar a la parte superior del modal
          portfolioModal.scrollTo({
          top: 0,
          behavior: 'smooth' // Animación suave
          });
        }
      });
    });
  }

  // Cargar el JSON y generar los bloques dinámicamente
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenido existente
      portfolioContainer.innerHTML = '';

      // Generar un bloque por cada ave en el JSON
      data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 portfolio-item';

        card.innerHTML = `
          <div class="card h-100">
            <a href="#" class="portfolio-link" data-bs-toggle="modal" data-bs-target="#portfolioModal" data-id="${item.identifier}">
              <img src="${item.image[0]}" class="card-img-top" alt="${item.name}">
            </a>
            <div class="card-body">
              <h5 class="card-title"><a href="#" title="More Details">${item.name}</a></h5>
              <p class="card-text">${item.alternateName}</p>
            </div>
          </div>
        `;

        portfolioContainer.appendChild(card);
      });

      // Configurar el evento para abrir el modal y actualizar su contenido
      portfolioModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Botón que activó el modal
        const id = button.getAttribute('data-id'); // Extraer el ID del atributo data-id

        // Encontrar el elemento con el ID correspondiente en el JSON
        const item = data.find(item => item.identifier === id);

        if (item) {
          updateModalContent(item, data); // Llamar a la función para llenar el contenido del modal
          // Desplazar a la parte superior del modal
          portfolioModal.scrollTo({
            top: 0,
            behavior: 'smooth' // Animación suave
            });
        }
      });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
});


/*--------------------------------------------------------------
# Zonas
--------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
  const jsonZonaUrl = 'assets/json/Zona.json'; // Ruta del archivo JSON de zonas
  const zonaContainer = document.querySelector('#zonas .row.gy-4'); // Contenedor de las zonas
  const zonaModal = document.getElementById('zonaModal'); // Modal para las zonas

  // Función para actualizar el contenido del modal de zonas
  function updateZonaModalContent(zona, data) {
    const modalTitle = zonaModal.querySelector('#modalZonaTitle');
    const modalDescription = zonaModal.querySelector('#modalZonaDescription');
    const modalAdditionalInfo = zonaModal.querySelector('#modalZonaAdditionalInfo');

    // Actualizar el contenido dinámico del modal
    modalTitle.innerHTML = `
      <div class="modal-image-container">
        <img src="${zona.image[0]}" alt="${zona.name}" class="modal-image">
        <div class="modal-overlay">
          <h4>${zona.name}</h4>
          <p><em>${zona.alternateName}</em></p>
        </div>
      </div>
    `;

    modalDescription.innerHTML = `
      <div class="modal-description">
        <p><strong>Descripción:</strong> ${zona.description}</p>
        <p><strong>Ubicación:</strong> ${zona.address.addressLocality}, ${zona.address.addressRegion}, ${zona.address.addressCountry}</p>
        <p><strong>Coordenadas:</strong> Latitud: ${zona.geo.latitude}, Longitud: ${zona.geo.longitude}</p>
      </div>
    `;

    // Generar tarjetas de otras zonas
    const otherZonas = data.filter(z => z.identifier !== zona.identifier); // Excluir la zona actual
    modalAdditionalInfo.innerHTML = `
      <h5>Otras zonas</h5>
      <div class="row gy-4">
        ${otherZonas.map(z => `
          <div class="col-lg-4 col-md-6">
            <div class="card h-100">
              <a href="#" class="zona-link" data-id="${z.identifier}">
                <img src="${z.image[0]}" class="card-img-top" alt="${z.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title"><a href="#" title="More Details">${z.name}</a></h5>
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
          // Desplazar a la parte superior del modal
          zonaModal.scrollTo({
          top: 0,
          behavior: 'smooth' // Animación suave
          });
        }
      });
    });
  }

  // Cargar el JSON y generar las tarjetas dinámicamente
  fetch(jsonZonaUrl)
    .then(response => response.json())
    .then(data => {
      // Limpiar el contenido existente
      zonaContainer.innerHTML = '';

      // Generar un bloque por cada zona en el JSON
      data.forEach(zona => {
        const card = document.createElement('div');
        card.className = 'col-lg-4 col-md-6 portfolio-item';

        card.innerHTML = `
          <div class="card h-100">
            <a href="#" class="zona-link" data-bs-toggle="modal" data-bs-target="#zonaModal" data-id="${zona.identifier}">
              <img src="${zona.image[0]}" class="card-img-top" alt="${zona.name}">
            </a>
            <div class="card-body">
              <h5 class="card-title"><a href="#" title="More Details">${zona.name}</a></h5>
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
        const zona = data.find(z => z.identifier === id);

        if (zona) {
          updateZonaModalContent(zona, data); // Llamar a la función para llenar el contenido del modal
        }
      });
    })
    .catch(error => console.error('Error al cargar el JSON de zonas:', error));
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

  // URL de la API a la que se enviarán los datos CAMBIARRRRR
  const apiUrl = 'https://tu-api.com/endpoint'; 

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
});
