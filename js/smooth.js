document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href*="#"]');

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);

      const currentPath = window.location.pathname;
      const targetPath = url.pathname;
      const hash = url.hash;

      if (!hash) return;

      /* если другая страница */
      if (currentPath !== targetPath) {
        e.preventDefault();

        sessionStorage.setItem("scrollTarget", hash);

        window.location.href = targetPath;
        return;
      }

      /* текущая страница */
      e.preventDefault();

      const target = document.querySelector(hash);
      if (target) smoothScrollTo(target, 1800);
    });
  });

  /* после открытия новой страницы */
  const savedHash = sessionStorage.getItem("scrollTarget");

  if (savedHash) {
    sessionStorage.removeItem("scrollTarget");

    setTimeout(() => {
      const target = document.querySelector(savedHash);
      if (target) smoothScrollTo(target, 1800);
    }, 200);
  }

  function smoothScrollTo(element, duration) {
    const startY = window.pageYOffset;
    const targetY = element.getBoundingClientRect().top + window.pageYOffset;
    const distance = targetY - startY;

    let startTime = null;

    function animate(time) {
      if (!startTime) startTime = time;

      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }
});