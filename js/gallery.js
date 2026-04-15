const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");
const dotsWrap = document.querySelector(".gallery-dots");

let current = 2;

/* dots */
items.forEach((_, i) => {
  const dot = document.createElement("span");

  if (i === current) dot.classList.add("active");

  dot.addEventListener("click", () => {
    current = i;
    update();
  });

  dotsWrap.appendChild(dot);
});

function update() {

  items.forEach(el => el.classList.remove("active"));
  items[current].classList.add("active");

  const dots = document.querySelectorAll(".gallery-dots span");
  dots.forEach(d => d.classList.remove("active"));
  dots[current].classList.add("active");

  const active = items[current];

  const slider = document.querySelector(".gallery-slider");
  const sliderCenter = slider.offsetWidth / 2;

  const activeCenter =
    active.offsetLeft + active.offsetWidth / 2;

  const offset = sliderCenter - activeCenter;

  track.style.transform = `translateX(${offset}px)`;
}

/* click по фото */
items.forEach((el, i) => {
  el.addEventListener("click", () => {
    current = i;
    update();
  });
});

update();