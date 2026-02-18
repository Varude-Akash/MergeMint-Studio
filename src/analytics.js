const env = import.meta.env;

export function initAnalytics() {
  if (env.VITE_GA_ID) {
    loadGoogleAnalytics(env.VITE_GA_ID);
  }

  if (env.VITE_PLAUSIBLE_DOMAIN) {
    loadPlausible(env.VITE_PLAUSIBLE_DOMAIN);
  }

  trackEvent("page_view", {
    page_path: window.location.pathname,
    page_title: document.title
  });
}

export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }

  if (typeof window.plausible === "function") {
    window.plausible(name, { props: sanitize(params) });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...params
  });
}

function loadGoogleAnalytics(gaId) {
  if (document.querySelector("script[data-analytics='ga']")) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  script.dataset.analytics = "ga";
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", gaId, {
    send_page_view: false
  });
}

function loadPlausible(domain) {
  if (document.querySelector("script[data-analytics='plausible']")) {
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.dataset.analytics = "plausible";
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

function sanitize(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  );
}
