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
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
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
