(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Submit via AJAX and then redirect to a branded thank-you page.
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  if (form && status) {
    const emailInput = form.querySelector("input[name='email']");
    const setEmailMessage = () => {
      if (!emailInput) return;

      // Use built-in validation first, but provide friendly copy.
      if (emailInput.validity.valueMissing) {
        emailInput.setCustomValidity("Please enter your email address.");
      } else if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity(
          "That email address does not look correct. Example: name@domain.com"
        );
      } else {
        emailInput.setCustomValidity("");
      }
    };

    if (emailInput) {
      emailInput.addEventListener("input", () => {
        setEmailMessage();
        status.textContent = "";
        status.classList.remove("is-error");
        emailInput.removeAttribute("aria-invalid");
        emailInput.removeAttribute("data-invalid");
      });

      emailInput.addEventListener("invalid", () => {
        setEmailMessage();
        emailInput.setAttribute("aria-invalid", "true");
        emailInput.setAttribute("data-invalid", "true");
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (emailInput) {
        setEmailMessage();
        if (!emailInput.checkValidity()) {
          emailInput.setAttribute("aria-invalid", "true");
          emailInput.setAttribute("data-invalid", "true");
          status.textContent =
            "Please enter a valid email address (example: name@domain.com).";
          status.classList.add("is-error");
          emailInput.focus();
          return;
        }
      }

      const submitBtn = form.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtn) submitBtn.textContent = "Sending...";

      status.textContent = "";
      status.classList.remove("is-error");

      try {
        const action = form.getAttribute("action") || "";

        const formData = new FormData(form);
        const res = await fetch(action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          form.reset();
          // Keep the UX consistent across browsers: always show the thank-you page.
          window.location.assign("/thanks/");
        } else {
          status.textContent =
            "Could not submit right now. Please try again, or email us at contact@myiatech.com.";
          status.classList.add("is-error");
        }
      } catch {
        status.textContent =
          "Could not submit right now. Please try again, or email us at contact@myiatech.com.";
        status.classList.add("is-error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtn) submitBtn.textContent = originalBtnText || "Get notified";
      }
    });
  }
})();
