const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menuPanel = document.getElementById("menuPanel");

menuBtn.addEventListener("click", () => {
  menuPanel.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menuPanel.classList.remove("active");
});

document.querySelectorAll(".menu-panel a").forEach((link) => {
  link.addEventListener("click", () => {
    menuPanel.classList.remove("active");
  });
});

document.querySelectorAll(".event-item").forEach((item) => {
  const head = item.querySelector(".event-head");

  head.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});