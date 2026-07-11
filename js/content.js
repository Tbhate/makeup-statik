// Language switcher.
// NOTE: page text used to be injected here at runtime via fetch('./content.json'),
// which meant search engines saw an empty page until JavaScript ran. Content is now
// rendered server-side into static HTML for each language (/en/, /es/, /de/), so this
// script only has to handle navigating between the localized versions of the current page.

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang");
  if (!langSelect) return;

  langSelect.addEventListener("change", (e) => {
    const targetLang = e.target.value; // "en" | "es" | "de"
    const path = window.location.pathname;
    const match = path.match(/^\/(en|es|de)(\/.*)?$/);

    if (!match) {
      window.location.href = "/" + targetLang + "/";
      return;
    }

    const rest = match[2] || "/";
    window.location.href = "/" + targetLang + rest + window.location.hash;
  });
});
