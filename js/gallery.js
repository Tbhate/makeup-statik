const track = document.querySelector(".gallery-track");
const items = document.querySelectorAll(".gallery-item");
const dotsWrap = document.querySelector(".gallery-dots");
const slider = document.querySelector(".gallery-slider");

let current = 2;

/* создаём dots */
items.forEach((_, i) => {
  const dot = document.createElement("span");

  if (i === current) dot.classList.add("active");

  dot.addEventListener("click", () => {
    current = i;
    update();
  });

  dotsWrap.appendChild(dot);
});

/* update */
function update() {
  items.forEach(el => el.classList.remove("active"));
  items[current].classList.add("active");

  const dots = dotsWrap.querySelectorAll("span");
  dots.forEach(dot => dot.classList.remove("active"));
  dots[current].classList.add("active");

  /* ждём когда width изменится */
  setTimeout(centerActive, 300);
}

/* ТОЧНЫЙ центр */
function centerActive() {
  const active = items[current];

  const sliderWidth = slider.offsetWidth;
  const itemWidth = active.offsetWidth;

  const itemLeft = active.offsetLeft;

  const offset =
    (sliderWidth / 2) -
    (itemLeft + itemWidth / 2);

  track.style.transform = `translateX(${offset}px)`;
}

/* click image */
items.forEach((item, i) => {
  item.addEventListener("click", () => {
    current = i;
    update();
  });
});

/* resize */
window.addEventListener("resize", centerActive);

/* start */
update();

/* SWIPE MOBILE */
let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slider.addEventListener("touchmove", e => {
  endX = e.touches[0].clientX;
});

slider.addEventListener("touchend", () => {
  let diff = startX - endX;

  if (diff > 50) {
    current++;
    if (current >= items.length) current = 0;
    update();
  }

  if (diff < -50) {
    current--;
    if (current < 0) current = items.length - 1;
    update();
  }

  startX = 0;
  endX = 0;
});