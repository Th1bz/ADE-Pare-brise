// Fonction pour charger les images du carrousel
async function loadCarouselImages() {
  try {
    console.log("Chargement des images du carrousel...");
    const response = await fetch("./assets/data/carousel-images.json");
    const data = await response.json();
    console.log("Données chargées:", data);

    const carouselInner = document.querySelector(".carousel-inner");
    if (!carouselInner) {
      console.error("Élément .carousel-inner non trouvé");
      return;
    }

    // Création des slides
    data.images.forEach((image, index) => {
      console.log(`Création du slide ${index + 1}:`, image);
      const slide = document.createElement("div");
      slide.className = `carousel-item ${index === 0 ? "active" : ""}`;

      slide.innerHTML = `
        <img src="${image.src}" class="d-block w-100 hero-image" loading="lazy" alt="${image.alt}">
        <div class="carousel-caption d-none d-md-block">
          <h5>${image.title}</h5>
          <p>${image.description}</p>
        </div>
      `;

      carouselInner.appendChild(slide);
    });

    // Initialisation du carrousel Bootstrap
    const carousel = new bootstrap.Carousel(
      document.querySelector("#heroCarousel"),
      {
        interval: 4000, // Temps entre chaque slide (4 secondes)
        ride: true, // Démarrage automatique
        wrap: true, // Boucle infinie
      }
    );
    console.log("Carrousel initialisé avec succès");
  } catch (error) {
    console.error("Erreur lors du chargement des images :", error);
  }
}

// Chargement des images au démarrage
document.addEventListener("DOMContentLoaded", loadCarouselImages);
