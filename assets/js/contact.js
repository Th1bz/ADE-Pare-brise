// Initialisation d'EmailJS
(function () {
  // Remplacer par votre User ID EmailJS
  emailjs.init("VOTRE_USER_ID_EMAILJS");
})();

document.addEventListener("DOMContentLoaded", function () {
  // Récupération du formulaire
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("feedbackSuccess");
  const errorMessage = document.getElementById("feedbackError");

  // Masquer les messages au chargement
  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Désactiver le bouton pendant l'envoi
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Envoi en cours...';

    // Préparer les paramètres pour EmailJS
    const templateParams = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Remplacer par votre Service ID et Template ID
    emailjs
      .send("VOTRE_SERVICE_ID", "VOTRE_TEMPLATE_ID", templateParams)
      .then(function (response) {
        // Afficher le message de succès
        successMessage.style.display = "block";
        errorMessage.style.display = "none";

        // Réinitialiser le formulaire
        contactForm.reset();

        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Envoyer";

        // Masquer le message après 5 secondes
        setTimeout(function () {
          successMessage.style.display = "none";
        }, 5000);
      })
      .catch(function (error) {
        // Afficher le message d'erreur
        errorMessage.style.display = "block";
        successMessage.style.display = "none";

        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.innerHTML = "Envoyer";

        console.error("Erreur:", error);
      });
  });
});
