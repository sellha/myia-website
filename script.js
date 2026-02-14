(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Submit via AJAX so the user stays on the same page.
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  if (form && status) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtn) submitBtn.textContent = "Sending...";

      status.textContent = "";

      try {
        const action = form.getAttribute("action") || "";

        const formData = new FormData(form);
        const res = await fetch(action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          status.textContent =
            "Thank you. We would love to reach out as soon as we have updates on the project.";
          form.reset();
        } else {
          status.textContent =
            "Could not submit right now. Please try again, or email us at contact@myiatech.com.";
        }
      } catch {
        status.textContent =
          "Could not submit right now. Please try again, or email us at contact@myiatech.com.";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtn) submitBtn.textContent = originalBtnText || "Get notified";
      }
    });
  }
})();
