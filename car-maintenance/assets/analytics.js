(function () {
  "use strict";

  var cfg = window.__GA__ || {};
  var id = cfg.id || "G-QT91VKFN8L";
  var consentHref = cfg.consentHref || "/privacy/";
  var KEY = "ga-consent-v1";

  if (!id) return;
  if (
    navigator.doNotTrack === "1" ||
    window.doNotTrack === "1" ||
    navigator.globalPrivacyControl === true
  ) {
    return;
  }

  if (typeof window.gtag !== "function") return;

  function readChoice() {
    try {
      return localStorage.getItem(KEY);
    } catch (error) {
      return null;
    }
  }

  function writeChoice(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch (error) {
      // The choice still applies for this page view.
    }
  }

  function clearGaCookies() {
    var cookies = document.cookie ? document.cookie.split(";") : [];
    for (var i = 0; i < cookies.length; i += 1) {
      var name = cookies[i].split("=")[0].trim();
      if (name === "_ga" || name === "_gid" || name.indexOf("_ga_") === 0) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
        document.cookie =
          name + "=; Max-Age=0; path=/; domain=" + location.hostname + "; SameSite=Lax";
      }
    }
  }

  function sendPageView() {
    gtag("event", "page_view", {
      page_location: location.href,
      page_title: document.title,
    });
  }

  function trackEvent(name, params) {
    if (!name || typeof name !== "string") return;
    if (typeof gtag !== "function") return;
    if (readChoice() !== "granted") return;
    gtag("event", name, params || {});
  }

  window.trackEvent = trackEvent;

  function injectStyles() {
    if (document.getElementById("ga-consent-style")) return;
    var style = document.createElement("style");
    style.id = "ga-consent-style";
    style.textContent = [
      "#ga-consent{position:fixed;left:0;right:0;bottom:0;z-index:90;display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap;padding:14px max(20px,calc((100vw - 1180px)/2)) calc(14px + env(safe-area-inset-bottom));background:var(--consent-bg,#111);color:var(--consent-fg,#fff);border-top:3px solid var(--consent-accent,#ffd23f);font-family:var(--body,'Helvetica Neue',Arial,sans-serif);font-size:13px;line-height:1.5}",
      "#ga-consent p{margin:0;max-width:70ch}",
      "#ga-consent a{color:var(--consent-accent,#ffd23f);text-underline-offset:2px}",
      ".ga-consent__actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}",
      "#ga-consent button{min-height:44px;padding:8px 12px;border:1.5px solid var(--consent-accent,#ffd23f);background:var(--consent-accent,#ffd23f);color:var(--consent-bg,#111);font:inherit;font-weight:700;cursor:pointer}",
      "#ga-consent button[data-consent='denied']{background:transparent;color:var(--consent-fg,#fff);border-color:var(--consent-fg,#fff);font-weight:500}",
      "#ga-consent button:focus-visible{outline:2px solid var(--consent-fg,#fff);outline-offset:2px}",
      "@media(max-width:620px){#ga-consent{align-items:flex-start;flex-direction:column;gap:10px}.ga-consent__actions{width:100%}#ga-consent button{flex:1}}",
    ].join("");
    document.head.appendChild(style);
  }

  function showBanner() {
    if (document.getElementById("ga-consent")) return;
    injectStyles();

    var banner = document.createElement("div");
    banner.id = "ga-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Analytics consent");
    banner.innerHTML =
      '<p>We use Google Analytics to count visits and see which pages are useful. It is not used for ads on this site. You can decline and keep browsing. <a href="' +
      consentHref +
      '">Privacy</a></p>' +
      '<div class="ga-consent__actions">' +
      '<button type="button" data-consent="granted">Allow analytics</button>' +
      '<button type="button" data-consent="denied">No thanks</button>' +
      "</div>";
    document.body.appendChild(banner);

    banner
      .querySelector('[data-consent="granted"]')
      .addEventListener("click", function () {
        writeChoice("granted");
        banner.remove();
        gtag("consent", "update", { analytics_storage: "granted" });
        sendPageView();
      });
    banner
      .querySelector('[data-consent="denied"]')
      .addEventListener("click", function () {
        writeChoice("denied");
        banner.remove();
        gtag("consent", "update", { analytics_storage: "denied" });
      });
  }

  function init() {
    var choice = readChoice();
    if (choice === "granted") {
      gtag("consent", "update", { analytics_storage: "granted" });
      sendPageView();
    } else if (choice !== "denied") {
      showBanner();
    }

    document.addEventListener("click", function (event) {
      var button = event.target.closest ? event.target.closest("[data-consent-settings]") : null;
      if (!button) return;
      event.preventDefault();
      try {
        localStorage.removeItem(KEY);
      } catch (error) {
        // Ignore storage failures.
      }
      clearGaCookies();
      location.reload();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
