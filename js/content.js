async function loadContent(lang = "ru", page = "home") {
  const res = await fetch("./content.json");
  const data = await res.json();

  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");

    if (data[page] && data[page][key] && data[page][key][lang]) {
      element.textContent = data[page][key][lang];
    }
  });

  // меняем select и флаг
  document.getElementById("lang").value = lang;
  document.getElementById("langIcon").src = `./image/${lang}.png`;
}

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

// при загрузке страницы
const savedLang = localStorage.getItem("siteLang") || "ru";
const page = document.body.dataset.page || "home";

loadContent(savedLang, page);
