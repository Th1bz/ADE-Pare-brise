// Fonction pour créer les indicateurs du carrousel
function createCarouselIndicators(carouselElement, numberOfSlides) {
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "carousel-indicators";

  for (let i = 0; i < numberOfSlides; i++) {
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#heroCarousel");
    indicator.setAttribute("data-bs-slide-to", i.toString());
    indicator.setAttribute("aria-label", `Slide ${i + 1}`);

    if (i === 0) {
      indicator.className = "active";
      indicator.setAttribute("aria-current", "true");
    }

    indicatorsContainer.appendChild(indicator);
  }

  carouselElement.appendChild(indicatorsContainer);
}

// Fonction pour créer le conteneur des slides
function createCarouselInner(carouselElement) {
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  carouselElement.appendChild(carouselInner);
  return carouselInner;
}

// Fonction pour créer les contrôles du carrousel
function createCarouselControls(carouselElement) {
  // Bouton précédent
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#heroCarousel");
  prevButton.setAttribute("data-bs-slide", "prev");
  prevButton.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Précédent</span>
  `;
  carouselElement.appendChild(prevButton);

  // Bouton suivant
  const nextButton = document.createElement("button");
  nextButton.className = "carousel-control-next";
  nextButton.type = "button";
  nextButton.setAttribute("data-bs-target", "#heroCarousel");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Suivant</span>
  `;
  carouselElement.appendChild(nextButton);
}

// Fonction pour créer le carrousel complet
function createCarousel() {
  const carouselContainer = document.querySelector(".hero-image-container");
  if (!carouselContainer) {
    console.error("Conteneur du carrousel non trouvé");
    return;
  }

  // Création de l'élément carrousel
  const carouselElement = document.createElement("div");
  carouselElement.id = "heroCarousel";
  carouselElement.className = "carousel slide";
  carouselElement.setAttribute("data-bs-ride", "carousel");
  carouselContainer.appendChild(carouselElement);

  return carouselElement;
}

// Fonction pour charger les images du carrousel
async function loadCarouselImages() {
  try {
    console.log("Chargement des images du carrousel...");
    const response = await fetch("./assets/data/carousel-images.json");
    const data = await response.json();
    console.log("Données chargées:", data);

    // Création du carrousel
    const carouselElement = createCarousel();
    if (!carouselElement) return;

    // Création des indicateurs
    createCarouselIndicators(carouselElement, data.images.length);

    // Création du conteneur des slides
    const carouselInner = createCarouselInner(carouselElement);

    // Création des slides
    data.images.forEach((image, index) => {
      console.log(`Création du slide ${index + 1}:`, image);
      const slide = document.createElement("div");
      slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

      // Création du contenu de la légende si elle existe
      let captionHTML = "";
      if (image.title || image.description) {
        captionHTML = `
          <div class="carousel-caption">
            ${image.title ? `<h5>${image.title}</h5>` : ""}
            ${image.description ? `<p>${image.description}</p>` : ""}
          </div>
        `;
      }

      slide.innerHTML = `
        <img src="${image.src}" class="d-block w-100 hero-image" loading="lazy" alt="${image.alt}">
        ${captionHTML}
      `;

      carouselInner.appendChild(slide);
    });

    // Création des contrôles
    createCarouselControls(carouselElement);

    // Initialisation du carrousel Bootstrap
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 4000, // Temps entre chaque slide (4 secondes)
      ride: true, // Démarrage automatique
      wrap: true, // Boucle infinie
    });
    console.log("Carrousel initialisé avec succès");
  } catch (error) {
    console.error("Erreur lors du chargement des images :", error);
  }
}

// Chargement des images au démarrage
document.addEventListener("DOMContentLoaded", loadCarouselImages);
