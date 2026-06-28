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

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));