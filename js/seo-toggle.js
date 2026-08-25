// Collapsible SEO text block ("Read more" / "Read less").
// Purely presentational — all text is present in the DOM either way,
// so it stays fully readable and indexable by search engines.

document.addEventListener("DOMContentLoaded", () => {
  const wrap = document.getElementById("seoTextWrap");
  const toggle = document.getElementById("seoTextToggle");

  if (!wrap || !toggle) return;

  const labels = {
    more: toggle.textContent,
  };

  toggle.addEventListener("click", () => {
    const isCollapsed = wrap.classList.toggle("collapsed");
    toggle.setAttribute("aria-expanded", String(!isCollapsed));
    toggle.textContent = isCollapsed
      ? toggle.dataset.moreLabel || labels.more
      : toggle.dataset.lessLabel || "Read less";
  });
});
