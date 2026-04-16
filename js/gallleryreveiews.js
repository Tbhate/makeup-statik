const sliderPhotos = document.querySelectorAll(".reviews-slider img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

/* открыть фото */
sliderPhotos.forEach(photo => {
  photo.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = photo.src;
  });
});

/* закрыть крестиком */
lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

/* закрыть по черному фону */
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

/* закрыть ESC */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    lightbox.classList.remove("active");
  }
});