/*!
 * Kandha Security Services Limited
 * components.js — reusable Navbar / Footer / Floating Action Buttons
 * Injected via plain JS template strings (no build step / no fetch,
 * so the site runs correctly straight from the filesystem).
 */

(function () {
  "use strict";

  const NAV_LINKS = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "about.html", label: "About", key: "about" },
    { href: "services.html", label: "Services", key: "services" },
    { href: "industries.html", label: "Industries", key: "industries" },
    { href: "careers.html", label: "Careers", key: "careers" },
    { href: "contact.html", label: "Contact", key: "contact" }
  ];

  const PHONE_DISPLAY = "+91 94370 00000";
  const PHONE_TEL = "+919437000000";
  const WHATSAPP_NUMBER = "919437000000";
  const EMAIL = "info@kandhasecurity.in";

  function buildNavbar(active) {
    const links = NAV_LINKS.map(function (link) {
      const activeClass = link.key === active ? " active" : "";
      return `<a href="${link.href}" class="nav-link${activeClass} text-sm font-semibold tracking-wide uppercase text-slate-200 hover:text-gold-300 transition-colors" style="color:${link.key === active ? "var(--gold-400)" : ""}">${link.label}</a>`;
    }).join("");

    const mobileLinks = NAV_LINKS.map(function (link) {
      const activeClass = link.key === active ? " active" : "";
      return `<a href="${link.href}" class="nav-link${activeClass} block py-4 text-lg font-display tracking-wide border-b border-white/5 text-slate-100 hover:text-gold-300">${link.label}</a>`;
    }).join("");

    return `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header id="site-header" class="fixed top-0 left-0 right-0 z-50">
      <nav class="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4" aria-label="Primary navigation">
        <a href="index.html" class="flex items-center gap-3 group" aria-label="Kandha Security Services Limited — Home">
          <span class="badge-frame w-11 h-11 flex items-center justify-center border border-gold-500/60 rounded-sm" style="border-color:rgba(201,162,39,.5)">
            <i class="fa-solid fa-shield-halved text-lg" style="color:var(--gold-400)"></i>
          </span>
          <span class="leading-tight">
            <span class="block font-display text-base md:text-lg tracking-wide text-white group-hover:text-gold-300 transition-colors">KANDHA SECURITY</span>
            <span class="block text-[10px] md:text-[11px] tracking-[0.25em] uppercase" style="color:var(--gold-500)">Services Limited</span>
          </span>
        </a>

        <div class="hidden lg:flex items-center gap-8">
          ${links}
        </div>

        <div class="hidden lg:flex items-center gap-3">
          <a href="tel:${PHONE_TEL}" class="btn-outline px-4 py-2.5 rounded-sm text-sm font-semibold flex items-center gap-2">
            <i class="fa-solid fa-phone-volume"></i> ${PHONE_DISPLAY}
          </a>
          <a href="contact.html" class="btn-gold px-5 py-2.5 rounded-sm text-sm">Request a Quote</a>
        </div>

        <button id="mobile-menu-btn" class="lg:hidden w-11 h-11 flex items-center justify-center border border-gold-500/40 rounded-sm text-gold-400" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
          <i class="fa-solid fa-bars text-xl"></i>
        </button>
      </nav>
    </header>

    <div id="mobile-overlay" class="fixed inset-0 bg-black/70 z-50 lg:hidden"></div>
    <aside id="mobile-drawer" class="fixed top-0 right-0 h-full w-[82%] max-w-sm bg-navy-950 z-50 lg:hidden overflow-y-auto" style="background:var(--navy-950)" aria-label="Mobile navigation">
      <div class="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <span class="font-display text-gold-400" style="color:var(--gold-400)">MENU</span>
        <button id="mobile-close-btn" class="w-10 h-10 flex items-center justify-center text-slate-300" aria-label="Close menu">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>
      <div class="px-6">
        ${mobileLinks}
        <div class="mt-6 flex flex-col gap-3 pb-10">
          <a href="tel:${PHONE_TEL}" class="btn-outline text-center px-4 py-3 rounded-sm font-semibold"><i class="fa-solid fa-phone-volume mr-2"></i>${PHONE_DISPLAY}</a>
          <a href="contact.html" class="btn-gold text-center px-4 py-3 rounded-sm">Request a Quote</a>
        </div>
      </div>
    </aside>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const cols = NAV_LINKS.map(function (l) {
      return `<li><a href="${l.href}" class="hover:text-gold-300 transition-colors text-slate-400">${l.label}</a></li>`;
    }).join("");

    const services = [
      ["services.html#guards", "Manned Guarding"],
      ["services.html#industrial", "Industrial Security"],
      ["services.html#corporate", "Corporate Security"],
      ["services.html#cctv", "CCTV Surveillance"],
      ["services.html#mobile-patrol", "Mobile Patrol"],
      ["services.html#emergency-response", "Emergency Response"]
    ].map(function (s) {
      return `<li><a href="${s[0]}" class="hover:text-gold-300 transition-colors text-slate-400">${s[1]}</a></li>`;
    }).join("");

    return `
    <footer class="bg-ops border-t border-white/5 pt-16 pb-6" style="background-color:var(--navy-950)">
      <div class="max-w-7xl mx-auto px-5 md:px-8">
        <div class="grid md:grid-cols-4 gap-10 pb-12">
          <div>
            <a href="index.html" class="flex items-center gap-3 mb-4">
              <span class="badge-frame w-10 h-10 flex items-center justify-center border rounded-sm" style="border-color:rgba(201,162,39,.5)">
                <i class="fa-solid fa-shield-halved" style="color:var(--gold-400)"></i>
              </span>
              <span class="font-display text-white text-sm tracking-wide">KANDHA SECURITY<br><span class="text-[10px] tracking-[0.2em]" style="color:var(--gold-500)">SERVICES LIMITED</span></span>
            </a>
            <p class="text-slate-400 text-sm leading-relaxed mb-5">PSARA-licensed manned guarding &amp; surveillance company headquartered in Dhenkanal, Odisha, safeguarding industries, corporates, institutions and homes across the state since 2011.</p>
            <div class="flex gap-3">
              <a href="#" aria-label="Facebook" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400/50 transition-colors"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="LinkedIn" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400/50 transition-colors"><i class="fa-brands fa-linkedin-in"></i></a>
              <a href="#" aria-label="Instagram" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400/50 transition-colors"><i class="fa-brands fa-instagram"></i></a>
              <a href="https://wa.me/${WHATSAPP_NUMBER}" aria-label="WhatsApp" class="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-400/50 transition-colors"><i class="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <div>
            <h4 class="font-display text-sm tracking-widest uppercase mb-5" style="color:var(--gold-400)">Navigate</h4>
            <ul class="space-y-3 text-sm">${cols}</ul>
          </div>

          <div>
            <h4 class="font-display text-sm tracking-widest uppercase mb-5" style="color:var(--gold-400)">Services</h4>
            <ul class="space-y-3 text-sm">${services}</ul>
          </div>

          <div>
            <h4 class="font-display text-sm tracking-widest uppercase mb-5" style="color:var(--gold-400)">Head Office</h4>
            <ul class="space-y-4 text-sm text-slate-400">
              <li class="flex gap-3"><i class="fa-solid fa-location-dot mt-1" style="color:var(--gold-500)"></i>Kandha Bhawan, Station Road, Dhenkanal – 759001, Odisha, India</li>
              <li class="flex gap-3"><i class="fa-solid fa-phone mt-1" style="color:var(--gold-500)"></i><a href="tel:${PHONE_TEL}" class="hover:text-gold-300">${PHONE_DISPLAY}</a></li>
              <li class="flex gap-3"><i class="fa-solid fa-envelope mt-1" style="color:var(--gold-500)"></i><a href="mailto:${EMAIL}" class="hover:text-gold-300">${EMAIL}</a></li>
              <li class="flex gap-3"><i class="fa-solid fa-clock mt-1" style="color:var(--gold-500)"></i>Control Room: 24 x 7 x 365</li>
            </ul>
          </div>
        </div>

        <div class="hairline"></div>

        <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; ${year} Kandha Security Services Limited. All rights reserved. PSARA License No. OD/DNK/0142/2011.</p>
          <p class="flex gap-4">
            <a href="#" class="hover:text-gold-300">Privacy Policy</a>
            <a href="#" class="hover:text-gold-300">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>`;
  }

  function buildFloatingActions() {
    return `
    <div id="floating-actions" class="fixed bottom-6 right-5 flex flex-col items-end gap-3">
      <button id="back-to-top" aria-label="Back to top" class="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-gold-400" style="color:var(--gold-400)">
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <a href="tel:${PHONE_TEL}" aria-label="Call Kandha Security now" class="w-14 h-14 rounded-full flex items-center justify-center text-navy-950 shadow-lg" style="background:linear-gradient(135deg,var(--gold-400),var(--gold-600)); color:var(--navy-950)">
        <i class="fa-solid fa-phone text-lg"></i>
      </a>
      <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Kandha Security, I would like to enquire about your services.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" class="pulse-whatsapp w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg" style="background:#25D366">
        <i class="fa-brands fa-whatsapp text-2xl"></i>
      </a>
    </div>`;
  }

  function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.outerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const active = document.body.getAttribute("data-page") || "home";
    mount("navbar-root", buildNavbar(active));
    mount("footer-root", buildFooter());
    const floatRoot = document.getElementById("floating-actions-root");
    if (floatRoot) floatRoot.outerHTML = buildFloatingActions();

    document.dispatchEvent(new CustomEvent("components:ready"));
  });
})();
