/**
 * Clearpath Golf — site interactions
 * Header scroll state, mobile nav, scroll reveals, FAQ accordion,
 * smooth in-page navigation, hero parallax, Formspree AJAX form.
 */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Header: transparent over hero → frosted bar after 80px scroll
     -------------------------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const SCROLL_THRESHOLD = 80;

  function updateHeaderScrolled() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeaderScrolled();
  window.addEventListener("scroll", updateHeaderScrolled, { passive: true });

  /* --------------------------------------------------------------------------
     Mobile menu: full-screen overlay, body scroll lock, a11y
     -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

  function openMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.removeAttribute("hidden");
    mobileNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("nav-open");
    const firstLink = mobileNav.querySelector("a[href]");
    if (firstLink) {
      window.requestAnimationFrame(function () {
        firstLink.focus();
      });
    }
  }

  function closeMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("hidden", "");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("nav-open");
  }

  function toggleMobileNav() {
    if (!mobileNav || !menuToggle) return;
    const open = mobileNav.classList.contains("is-open");
    if (open) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", toggleMobileNav);
    mobileNavLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMobileNav();
        menuToggle.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     Scroll reveal: IntersectionObserver → .revealed
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (revealElements.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* --------------------------------------------------------------------------
     FAQ accordion: single-open, max-height CSS, ARIA
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach(function (item) {
    const btn = item.querySelector(".faq__question");
    const panel = item.querySelector(".faq__panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      const willOpen = !item.classList.contains("is-open");

      faqItems.forEach(function (other) {
        const ob = other.querySelector(".faq__question");
        const op = other.querySelector(".faq__panel");
        other.classList.remove("is-open");
        if (ob) ob.setAttribute("aria-expanded", "false");
        if (op) op.setAttribute("aria-hidden", "true");
      });

      if (willOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
      }
    });
  });

  /* --------------------------------------------------------------------------
     Smooth scroll for in-page links (fixed header offset via CSS scroll-margin)
     -------------------------------------------------------------------------- */
  document.addEventListener(
    "click",
    function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (mobileNav && mobileNav.classList.contains("is-open")) {
        closeMobileNav();
      }
      if (history.replaceState) {
        history.replaceState(null, "", href);
      }
    },
    false
  );

  /* --------------------------------------------------------------------------
     Hero parallax: subtle translate on .hero__content
     -------------------------------------------------------------------------- */
  const heroContent = document.querySelector(".hero__content");
  if (heroContent && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let parallaxTicking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (!parallaxTicking) {
          window.requestAnimationFrame(function () {
            const y = window.scrollY;
            const vh = window.innerHeight;
            if (y < vh * 1.2) {
              const offset = y * 0.12;
              heroContent.style.setProperty("--hero-parallax", offset.toFixed(2) + "px");
            }
            parallaxTicking = false;
          });
          parallaxTicking = true;
        }
      },
      { passive: true }
    );
  }

  /* --------------------------------------------------------------------------
     Footer year
     -------------------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* --------------------------------------------------------------------------
     Formspree: AJAX submit, inline success / error
     -------------------------------------------------------------------------- */
  const bookingForm = document.getElementById("booking-form");
  const formError = document.getElementById("form-error");
  const submitBtn = document.getElementById("form-submit");
  const successPanel = document.getElementById("booking-success");

  function showFormError(message) {
    if (!formError) return;
    formError.textContent = message;
    formError.hidden = false;
  }

  function hideFormError() {
    if (!formError) return;
    formError.hidden = true;
    formError.textContent = "";
  }

  /** Normalize Formspree JSON error payloads (string, object, or field errors array). */
  function formatFormspreeError(data) {
    if (!data) return "";
    if (typeof data.error === "string") return data.error;
    if (data.error && typeof data.error === "object" && data.error.message) {
      return String(data.error.message);
    }
    if (Array.isArray(data.errors)) {
      const parts = data.errors
        .map(function (err) {
          if (!err) return "";
          if (typeof err === "string") return err;
          return err.message || err.field || "";
        })
        .filter(Boolean);
      if (parts.length) return parts.join(" ");
    }
    return "";
  }

  if (bookingForm && submitBtn) {
    bookingForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      hideFormError();

      const action = bookingForm.getAttribute("action");
      if (!action || action.includes("YOUR_FORM_ID")) {
        showFormError(
          "Form is not configured yet. Replace YOUR_FORM_ID in the form action with your Formspree endpoint."
        );
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";

      try {
        const formData = new FormData(bookingForm);
        const res = await fetch(action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        const data = await res.json().catch(function () {
          return {};
        });

        if (res.ok) {
          bookingForm.hidden = true;
          if (successPanel) successPanel.hidden = false;
        } else {
          const msg = formatFormspreeError(data);
          showFormError(
            msg || "Something went wrong. Please try again or email us directly."
          );
        }
      } catch (err) {
        showFormError("Network error. Check your connection and try again.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
})();
