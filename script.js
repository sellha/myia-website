(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Copy-to-clipboard fallback for users without a mail client configured.
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy") || "";
      if (!value) return;

      const original = btn.textContent;
      const done = () => {
        btn.textContent = "Copied";
        setTimeout(() => (btn.textContent = original), 1200);
      };

      try {
        await navigator.clipboard.writeText(value);
        done();
      } catch {
        // Old browsers: use a temporary textarea.
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "true");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } finally {
          document.body.removeChild(ta);
        }
      }
    });
  });

  // Submit via AJAX and then redirect to a branded thank-you page.
  const form = document.querySelector("form[name='notify']");
  const status = document.querySelector(".form__status");
  const fieldMsg = document.getElementById("email-msg");
  const row = document.querySelector(".form__row");
  if (form && status) {
    const emailInput = form.querySelector("input[name='email']");
    const setRowState = (state) => {
      if (!row) return;
      if (!state) row.removeAttribute("data-state");
      else row.setAttribute("data-state", state);
    };

    const setFieldMessage = (msg, isError) => {
      if (!fieldMsg) return;
      fieldMsg.textContent = msg || "";
      fieldMsg.classList.toggle("is-error", Boolean(isError));
    };

    const isValidEmail = (raw) => {
      const v = String(raw || "").trim();
      if (!v) return false;
      // Pragmatic validation (good UX) without being overly strict.
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    };

    if (emailInput) {
      emailInput.addEventListener("input", () => {
        setRowState("");
        setFieldMessage("", false);
        status.textContent = "";
        status.classList.remove("is-error");
      });
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (emailInput) {
        const ok = isValidEmail(emailInput.value);
        if (!ok) {
          setRowState("error");
          setFieldMessage(
            "That email address does not look correct. Example: name@domain.com",
            true
          );
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
      setRowState("");
      setFieldMessage("", false);

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
