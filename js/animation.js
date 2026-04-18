const elements = document.querySelectorAll(
  ".anim, .anim-pop, .anim-left, .anim-right, .anim-fade"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

elements.forEach((el) => observer.observe(el));