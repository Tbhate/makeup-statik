window.addEventListener("load", () => {
  const minTime = 400;
  const startTime = performance.now();

  const passed = performance.now() - startTime;
  const wait = Math.max(0, minTime - passed);

  setTimeout(() => {
    const loader = document.querySelector(".loader-wrap");
    loader.classList.add("hide-loader");

    setTimeout(() => {
      loader.style.display = "none";
    }, 900);
    
  }, wait);
});