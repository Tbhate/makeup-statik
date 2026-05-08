async function loadContent(lang = "ru", page = "home") {
  const res = await fetch("./content.json");
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");

    if (data[page] && data[page][key] && data[page][key][lang]) {

      // если input или textarea → placeholder
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = data[page][key][lang];

      // если кнопка submit → value
      } else if (element.tagName === "INPUT" && element.type === "submit") {
        element.value = data[page][key][lang];

      // обычный текст
      } else {
        element.textContent = data[page][key][lang];
      }

    }
  });

  // смена select
  const langSelect = document.getElementById("lang");
  if (langSelect) {
    langSelect.value = lang;
  }

  // смена флага
  const langIcon = document.getElementById("langIcon");
  if (langIcon) {
    langIcon.src = `./image/${lang}.png`;
  }

  
  // язык в body
    document.body.setAttribute("data-lang", lang);
}

// обработка смены языка
const langSelect = document.getElementById("lang");

if (langSelect) {
  langSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    const page = document.body.dataset.page || "home";

    // сохраняем язык
    localStorage.setItem("siteLang", selectedLang);

    loadContent(selectedLang, page);
  });
}

// загрузка при старте
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang") || "ru";
  const page = document.body.dataset.page || "home";

  loadContent(savedLang, page);
});