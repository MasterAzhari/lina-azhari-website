(function () {
  var cfg = window.LAM_CONFIG || {};

  function waLink(text) {
    return "https://wa.me/" + (cfg.whatsappNumber || "") +
      "?text=" + encodeURIComponent(text || cfg.whatsappMessage || "");
  }

  // Butang WhatsApp
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa") || cfg.whatsappMessage);
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Pautan produk
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = cfg.links && cfg.links[el.getAttribute("data-link")];
    if (url) el.href = url;
  });

  // Email
  document.querySelectorAll("[data-email]").forEach(function (el) {
    el.href = "mailto:" + cfg.email;
    el.textContent = cfg.email;
  });

  // Menu mudah alih
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

  // Borang lead: hantar ke WhatsApp (MasterBot boleh terima mesej ini)
  var form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var msg = "Salam LAM, saya " + d.get("nama") +
        " (" + d.get("telefon") + ").\n" +
        "Berminat dengan: " + d.get("produk") + "\n" +
        (d.get("mesej") ? "Mesej: " + d.get("mesej") : "");
      if (window.fbq) window.fbq("track", "Lead", { content_name: d.get("produk") });
      window.open(waLink(msg), "_blank", "noopener");
    });
  }

  // Tahun di footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Meta Pixel (hanya jika ID diisi)
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
