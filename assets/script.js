/* ============================================================
   Green Signal — interações compartilhadas (LP01 + LP02)
   ============================================================ */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("#year").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- WhatsApp: monta link a partir do data-attribute ---------- */
  var body = document.body;
  var waNumber = (body.getAttribute("data-wa-number") || "").replace(/\D/g, "");
  var waText = body.getAttribute("data-wa-text") || "Olá! Quero mais informações.";
  if (waNumber) {
    var waLink = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(waText);
    document.querySelectorAll('[data-cta="wa"]').forEach(function (a) {
      // só sobrescreve âncoras que não rolam para uma seção interna
      var href = a.getAttribute("href") || "";
      if (href === "#" || href === "" || a.classList.contains("ask") || a.classList.contains("btn-wa")) {
        a.setAttribute("href", waLink);
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener");
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Contador animado (prova social) ---------- */
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target.toLocaleString("pt-BR") + suffix; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("pt-BR") + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  document.querySelectorAll("[data-count]").forEach(function (el) {
    if (!("IntersectionObserver" in window)) { animateCount(el); return; }
    var once = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(el); once.unobserve(el); }
      });
    }, { threshold: 0.6 });
    once.observe(el);
  });

  /* ---------- Countdown da oferta (LP01) — reinicia a cada visita ---------- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var KEY = "gs_offer_deadline";
    var deadline = parseInt(localStorage.getItem(KEY), 10);
    var now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + 1000 * 60 * 60 * 6; // 6 horas
      try { localStorage.setItem(KEY, String(deadline)); } catch (e) {}
    }
    var h = cd.querySelector('[data-cd="h"]'),
        m = cd.querySelector('[data-cd="m"]'),
        s = cd.querySelector('[data-cd="s"]');
    function pad(n) { return String(n).padStart(2, "0"); }
    function tick() {
      var diff = Math.max(0, deadline - Date.now());
      var totalS = Math.floor(diff / 1000);
      h.textContent = pad(Math.floor(totalS / 3600));
      m.textContent = pad(Math.floor((totalS % 3600) / 60));
      s.textContent = pad(totalS % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Sticky CTA mostra após sair do hero ---------- */
  var sticky = document.getElementById("stickyCta");
  var hero = document.getElementById("topo");
  if (sticky && hero && "IntersectionObserver" in window) {
    var heroIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        sticky.classList.toggle("show", !e.isIntersecting);
      });
    }, { threshold: 0 });
    heroIo.observe(hero);
  }
})();
