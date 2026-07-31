/*!
 * Kandha Security Services Limited — main.js
 * Vanilla JS: sticky navbar, mobile drawer, reveal-on-scroll, counters,
 * FAQ accordion, testimonial slider, back-to-top, contact form handling.
 */

(function () {
  "use strict";

  function ready(fn) {
    document.addEventListener("components:ready", fn);
  }

  ready(function () {
    initNavbarScroll();
    initMobileDrawer();
    initRevealAnimations();
    initCounters();
    initFaq();
    initTestimonialSlider();
    initBackToTop();
    initContactForm();
    initYearStamp();
  });

  /* ---------------------------------------------------------------------
     Sticky navbar shadow on scroll
  --------------------------------------------------------------------- */
  function initNavbarScroll() {
    const header = document.getElementById("site-header");
    if (!header) return;
    function toggle() {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
  }

  /* ---------------------------------------------------------------------
     Mobile navigation drawer
  --------------------------------------------------------------------- */
  function initMobileDrawer() {
    const openBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("mobile-close-btn");
    const drawer = document.getElementById("mobile-drawer");
    const overlay = document.getElementById("mobile-overlay");
    if (!openBtn || !drawer || !overlay) return;

    function open() {
      drawer.classList.add("open");
      overlay.classList.add("open");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    openBtn.addEventListener("click", open);
    closeBtn && closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", close);
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------------------------------------------------------------
     Reveal-on-scroll via IntersectionObserver
  --------------------------------------------------------------------- */
  function initRevealAnimations() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     Animated stat counters
  --------------------------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    function animate(el) {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animate);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------------------------------------------------------------
     FAQ accordion
  --------------------------------------------------------------------- */
  function initFaq() {
    const items = document.querySelectorAll(".faq-item");
    if (!items.length) return;
    items.forEach(function (item) {
      const trigger = item.querySelector(".faq-trigger");
      if (!trigger) return;
      trigger.addEventListener("click", function () {
        const isOpen = item.classList.contains("open");
        items.forEach(function (i) {
          i.classList.remove("open");
          const t = i.querySelector(".faq-trigger");
          if (t) t.setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ---------------------------------------------------------------------
     Testimonial slider (auto-rotate + manual controls, swipe-friendly)
  --------------------------------------------------------------------- */
  function initTestimonialSlider() {
    const track = document.querySelector(".testimonial-track");
    if (!track) return;
    const slides = track.children;
    if (!slides.length) return;
    let index = 0;
    let timer = null;

    function go(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + (index * 100) + "%)";
      document.querySelectorAll(".testimonial-dot").forEach(function (dot, di) {
        dot.classList.toggle("opacity-100", di === index);
        dot.classList.toggle("opacity-30", di !== index);
      });
    }

    document.querySelectorAll(".testimonial-next").forEach(function (b) {
      b.addEventListener("click", function () { go(index + 1); resetTimer(); });
    });
    document.querySelectorAll(".testimonial-prev").forEach(function (b) {
      b.addEventListener("click", function () { go(index - 1); resetTimer(); });
    });
    document.querySelectorAll(".testimonial-dot").forEach(function (dot, di) {
      dot.addEventListener("click", function () { go(di); resetTimer(); });
    });

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(index + 1); }, 6000);
    }
    resetTimer();
    go(0);
  }

  /* ---------------------------------------------------------------------
     Back to top button
  --------------------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      if (window.scrollY > 500) btn.classList.add("show");
      else btn.classList.remove("show");
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------------------
     Contact form validation + mock submit
  --------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const statusEl = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;
      const fields = form.querySelectorAll("[required]");

      fields.forEach(function (field) {
        const errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
        let fieldValid = field.value.trim() !== "";
        if (field.type === "email" && fieldValid) {
          fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }
        if (field.type === "tel" && fieldValid) {
          fieldValid = /^[0-9+\-\s()]{7,15}$/.test(field.value.trim());
        }
        if (!fieldValid) {
          valid = false;
          field.classList.add("border-red-500");
          if (errorEl) errorEl.classList.remove("hidden");
        } else {
          field.classList.remove("border-red-500");
          if (errorEl) errorEl.classList.add("hidden");
        }
      });

      if (!valid) {
        if (statusEl) {
          statusEl.textContent = "Please correct the highlighted fields and try again.";
          statusEl.className = "mt-4 text-sm font-semibold text-red-400";
        }
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Sending...';
      }

      setTimeout(function () {
        if (statusEl) {
          statusEl.textContent = "Thank you. Your enquiry has been received — our team will contact you within one business day.";
          statusEl.className = "mt-4 text-sm font-semibold text-emerald-400";
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalLabel;
        }
      }, 1100);
    });
  }

  function initYearStamp() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }
})();
