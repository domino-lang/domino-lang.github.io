// =============================================================================
// Domino — mdBook chrome injector
// Adds the landing page's wordmark + nav to the top bar and a matching footer.
//
// The nav ENTRIES are not defined here — they come from Hugo's single source of
// truth, published at /nav.json (same origin as the guide at /book/). This file
// only renders them, so the two properties can never drift.
//
// FALLBACK below is used when /nav.json isn't reachable (e.g. local `mdbook
// serve`, before the marketing site is deployed). Keep it roughly in step, but
// production always reflects nav.json.
// =============================================================================
(function () {
  var NAV_SRC = "/nav.json"; // Hugo output; resolves to domino-prover.org/nav.json

  var FALLBACK = {
    home: "/",
    wordmark: "Domino",
    copyright: "\u00A9 Domino Team",
    nav: [
      { name: "Getting Started", url: "/book/" },
      { name: "Repo",  url: "https://github.com/domino-lang/domino" },
      { name: "Zulip", url: "https://talk.domino-prover.org" }
    ]
  };

  function navLinksHTML(site) {
    return (site.nav || []).map(function (i) {
      return '<a href="' + i.url + '">' + i.name + '</a>';
    }).join("");
  }

  function clear() {
    ["domino-wordmark", "domino-nav", "domino-footer"].forEach(function (c) {
      var el = document.querySelector("." + c);
      if (el) el.remove();
    });
  }

  function injectHeader(site) {
    var bar = document.querySelector(".menu-bar");
    if (!bar) return;

    var brand = document.createElement("a");
    brand.className = "domino-wordmark";
    brand.href = site.home || "/";
    brand.innerHTML = '<span class="mark"></span>' + (site.wordmark || "");

    var nav = document.createElement("nav");
    nav.className = "domino-nav";
    nav.innerHTML = navLinksHTML(site);

    var left  = bar.querySelector(".left-buttons");
    var right = bar.querySelector(".right-buttons");
    if (left) { left.after(brand); } else { bar.prepend(brand); }
    if (right) { right.before(nav); } else { bar.appendChild(nav); }
  }

  function injectFooter(site) {
    var content = document.querySelector("#content") || document.body;
    if (!content) return;
    var footer = document.createElement("footer");
    footer.className = "domino-footer";
    footer.innerHTML =
      '<div class="footer-inner">' +
        '<span class="copyright">' + (site.copyright || "") + '</span>' +
        '<div class="footer-links">' + navLinksHTML(site) + '</div>' +
      '</div>';
    content.appendChild(footer);
  }

  function render(site) { clear(); injectHeader(site); injectFooter(site); }

  function boot() {
    // 1. Render the fallback immediately so the chrome is always present,
    //    including offline / local `mdbook serve`.
    render(FALLBACK);

    // 2. Reconcile with the canonical list if it's reachable, and only
    //    re-render when it actually differs (avoids a flash on a no-op).
    if (typeof fetch !== "function") return;
    fetch(NAV_SRC, { credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (site) {
        if (site && JSON.stringify(site) !== JSON.stringify(FALLBACK)) render(site);
      })
      .catch(function () { /* not reachable: keep the fallback */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
