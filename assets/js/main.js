// Import des autres fichiers JS
document.addEventListener("DOMContentLoaded", function () {
  // Activation des tooltips de Bootstrap
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Activation des popovers de Bootstrap
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Récupération des éléments de la navbar
  const navbarCollapse = document.getElementById("navbarNav");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const bsNavbarCollapse = navbarCollapse
    ? new bootstrap.Collapse(navbarCollapse, { toggle: false })
    : null;

  // Fonction pour fermer la navbar
  function closeNavbar() {
    if (
      window.innerWidth < 992 &&
      navbarCollapse &&
      navbarCollapse.classList.contains("show")
    ) {
      bsNavbarCollapse.hide();
    }
  }

  // Fermeture de la navbar au clic sur un lien
  navLinks.forEach((link) => {
    link.addEventListener("click", closeNavbar);
  });

  // Fermeture de la navbar au scroll
  window.addEventListener("scroll", closeNavbar);

  // Effet de scroll smooth pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Ajout d'une classe active à la navbar au scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar-custom");
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
});
