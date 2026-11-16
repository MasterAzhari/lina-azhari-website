(function () {
  var cfg = window.LAM_CONFIG || {};

  function waLink(text) {
    return "https://wa.me/" + (cfg.whatsappNumber || "") +
      "?text=" + encodeURIComponent(text || cfg.whatsappMessage || "");
  }

  // WhatsApp buttons
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa") || cfg.whatsappMessage);
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Product links
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = cfg.links && cfg.links[el.getAttribute("data-link")];
    if (url) el.href = url;
  });

  // Email and address
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.href = "mailto:" + cfg.email;
    if (!el.textContent.trim()) el.textContent = cfg.email;
  });
  document.querySelectorAll("[data-address]").forEach(function (el) {
    el.textContent = cfg.address || "";
  });

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
  }

  // Lead form: opens a pre-filled WhatsApp message (MasterBot can pick it up)
  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg = "Hi LAM, I'm " + d.get("name") +
        " (" + d.get("phone") + ").\n" +
        "Interested in: " + d.get("interest") + "\n" +
        (d.get("message") ? "Message: " + d.get("message") : "");
      if (window.fbq) window.fbq("track", "Lead", { content_name: d.get("interest") });
      window.open(waLink(msg), "_blank", "noopener");
    });
  }


  // ---------- Motion ----------
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".header");
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);
  var ticking = false;
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.setProperty("--p", max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // Count-up numbers: <strong data-count="5" data-suffix="+">5+</strong>
  function countUp(el) {
    var end = parseFloat(el.getAttribute("data-count")) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = end + suffix; return; }
    var start = null, dur = 1400;
    function step(t) {
      if (start === null) start = t;
      var k = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * eased) + suffix;
      if (k < 1) window.requestAnimationFrame(step);
    }
    el.textContent = "0" + suffix;
    window.requestAnimationFrame(step);
  }

  if ("IntersectionObserver" in window) {
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  // Scroll reveals (skipped when the visitor prefers less motion)
  if (!reduce && "IntersectionObserver" in window) {
    document.documentElement.classList.add("motion");
    var targets = [];
    function mark(el, variant, delay) {
      if (!el || el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (variant) el.classList.add(variant);
      if (delay) el.style.setProperty("--d", delay + "s");
      targets.push(el);
    }
    document.querySelectorAll("main section:not(.hero):not(.page-hero)").forEach(function (sec) {
      sec.querySelectorAll(".center, .wrap > h2, .wrap > .lead, .cta-band, .faq, .fineprint, .product > *, .about > *").forEach(function (el, i) {
        if (el.closest(".grid")) return;
        var v = null;
        if (el.parentNode.classList.contains("about")) v = i === 0 ? "reveal-left" : "reveal-right";
        if (el.classList.contains("cta-band")) v = "reveal-zoom";
        mark(el, v, 0);
      });
      sec.querySelectorAll(".grid, .stats").forEach(function (grid) {
        Array.prototype.forEach.call(grid.children, function (child, i) {
          mark(child, null, Math.min(i, 5) * 0.08);
        });
      });
      sec.querySelectorAll(".browser-frame, .phone-frame, figure.shot").forEach(function (el) {
        if (!el.closest(".reveal")) mark(el, "reveal-zoom", 0);
      });
    });
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (el) { ro.observe(el); });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Meta Pixel (only when an ID is set)
  if (cfg.metaPixelId) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq("init", cfg.metaPixelId);
    window.fbq("track", "PageView");
    document.querySelectorAll("[data-wa]").forEach(function (el) {
      el.addEventListener("click", function () { window.fbq("track", "Contact"); });
    });
  }
})();
