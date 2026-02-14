(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Submit via AJAX so the user stays on the same page (no Netlify 404 redirect).
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  if (form && status) {
    const encode = (data) =>
      Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtn) submitBtn.textContent = "Sending...";

      status.textContent = "";

      try {
        const payload = {};
        new FormData(form).forEach((value, key) => {
          payload[key] = String(value);
        });

        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(payload),
        });

        status.textContent =
          "Thank you. We would love to reach out as soon as we have news about the project.";
        form.reset();
      } catch {
        status.textContent =
          "Something went wrong. Please try again, or email us at contact@myiatech.com.";
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtn) submitBtn.textContent = originalBtnText || "Get notified";
      }
    });
  }
})();
