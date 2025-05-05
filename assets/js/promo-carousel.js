// Fonction pour créer les indicateurs du carrousel promotionnel
function createPromoCarouselIndicators(carouselElement, numberOfSlides) {
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.className = "carousel-indicators";

  for (let i = 0; i < numberOfSlides; i++) {
    const indicator = document.createElement("button");
    indicator.type = "button";
    indicator.setAttribute("data-bs-target", "#promoCarousel");
    indicator.setAttribute("data-bs-slide-to", i.toString());
    indicator.setAttribute("aria-label", `Promo ${i + 1}`);

    if (i === 0) {
      indicator.className = "active";
      indicator.setAttribute("aria-current", "true");
    }

    indicatorsContainer.appendChild(indicator);
  }

  carouselElement.appendChild(indicatorsContainer);
}

// Fonction pour créer le conteneur des slides promotionnels
function createPromoCarouselInner(carouselElement) {
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  carouselElement.appendChild(carouselInner);
  return carouselInner;
}

// Fonction pour créer les contrôles du carrousel promotionnel
function createPromoCarouselControls(carouselElement) {
  // Bouton précédent
  const prevButton = document.createElement("button");
  prevButton.className = "carousel-control-prev";
  prevButton.type = "button";
  prevButton.setAttribute("data-bs-target", "#promoCarousel");
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
  nextButton.setAttribute("data-bs-target", "#promoCarousel");
  nextButton.setAttribute("data-bs-slide", "next");
  nextButton.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Suivant</span>
  `;
  carouselElement.appendChild(nextButton);
}

// Fonction pour créer le carrousel promotionnel complet
function createPromoCarousel() {
  const promoSection = document.getElementById("promotions");
  if (!promoSection) {
    console.error("Section de promotions non trouvée");
    return;
  }

  // Vider la section avant de créer le carrousel
  promoSection.innerHTML = "";

  // Création du conteneur
  const container = document.createElement("div");
  container.className = "container";
  promoSection.appendChild(container);

  // Création de l'élément carrousel
  const carouselElement = document.createElement("div");
  carouselElement.id = "promoCarousel";
  carouselElement.className = "carousel slide";
  carouselElement.setAttribute("data-bs-ride", "carousel");
  container.appendChild(carouselElement);

  return carouselElement;
}

// Fonction pour charger les images du carrousel promotionnel
async function loadPromoCarouselImages() {
  try {
    console.log("Chargement des images du carrousel promotionnel...");
    const response = await fetch("./assets/data/promo-images.json");

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Données promotionnelles chargées:", data);

    // Création du carrousel
    const carouselElement = createPromoCarousel();
    if (!carouselElement) return;

    // Création des indicateurs
    createPromoCarouselIndicators(carouselElement, data.images.length);

    // Création du conteneur des slides
    const carouselInner = createPromoCarouselInner(carouselElement);

    // Suppression de la classe active des slides précédents si existants
    const previousActiveSlides = carouselInner.querySelectorAll(
      ".carousel-item.active"
    );
    previousActiveSlides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Création des slides
    data.images.forEach((image, index) => {
      console.log(`Création du slide promo ${index + 1}:`, image);
      const slide = document.createElement("div");
      slide.className = `carousel-item`;
      slide.setAttribute("data-id", image.id);

      // Ajouter la classe active uniquement au premier slide
      if (index === 0) {
        slide.classList.add("active");
      }

      slide.innerHTML = `
        <img src="assets/images/promo/${image.src}" class="d-block w-100 promo-image" loading="lazy" alt="${image.alt}">
      `;

      carouselInner.appendChild(slide);
    });

    // Création des contrôles
    createPromoCarouselControls(carouselElement);

    // Attendre que le DOM soit complètement chargé avant d'initialiser le carrousel
    setTimeout(() => {
      // Initialisation du carrousel Bootstrap avec transition personnalisée
      const carouselElement = document.getElementById("promoCarousel");

      // Désactiver les classes de transition de Bootstrap
      carouselElement.classList.remove("slide");

      // Initialisation du carrousel Bootstrap avec nos propres paramètres
      const carousel = new bootstrap.Carousel(carouselElement, {
        interval: 5000, // Temps entre chaque slide (5 secondes)
        ride: true, // Démarrage automatique
        wrap: true, // Boucle infinie
        touch: true, // Permettre les interactions tactiles
        pause: "hover", // Mettre en pause au survol
      });

      // Écouter les événements de changement de slide pour gérer nos propres transitions
      carouselElement.addEventListener("slide.bs.carousel", function (e) {
        // Le slide qui sera actif
        const nextSlide = e.relatedTarget;
        // Tous les slides
        const slides = carouselElement.querySelectorAll(".carousel-item");

        // Réinitialiser les transitions
        slides.forEach((slide) => {
          slide.style.transition = "opacity 0.8s ease";
        });
      });

      console.log("Carrousel promotionnel initialisé avec succès");
    }, 300); // Délai augmenté pour s'assurer que tout est bien chargé
  } catch (error) {
    console.error(
      "Erreur lors du chargement des images promotionnelles:",
      error
    );
  }
}

// Chargement des images promotionnelles au démarrage - avec un délai pour s'assurer que le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(loadPromoCarouselImages, 100);
});
