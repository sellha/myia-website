(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Optional placeholder: swap this to your real profile (Instagram, LinkedIn, etc.)
  const social = document.getElementById("social-link");
  if (social) {
    social.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Ajoutez ici le lien vers vos réseaux (Instagram, LinkedIn, etc.).");
    });
  }

  // Lightweight UX: show a local confirmation when the form is submitted.
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Merci. On vous tient au courant.";
    });
  }
})();

