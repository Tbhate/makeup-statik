const burgerBtn = document.getElementById("burgerBtn");
const menuModal = document.getElementById("menuModal");
const closeBtn = document.getElementById("closeBtn");

burgerBtn.addEventListener("click", () => {
  menuModal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menuModal.classList.remove("active");
});

menuModal.addEventListener("click", (e) => {
  if (e.target === menuModal) {
    menuModal.classList.remove("active");
  }
});

const menuLinks = menuModal.querySelectorAll("a");

menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuModal.classList.remove("active");
  });
});