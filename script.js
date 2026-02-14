(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Lightweight UX: show a local confirmation when the form is submitted.
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  if (form && status) {
    form.addEventListener("submit", () => {
      status.textContent = "Thanks. We will email you at launch.";
    });
  }
})();
