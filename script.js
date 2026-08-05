document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const header = document.getElementById("header");

  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const menuLinks = mobileMenu.querySelectorAll("a[href^='#']");
  const revealItems = document.querySelectorAll(".reveal");

  const currentYear = document.getElementById("currentYear");


  /*
   * 연도 자동 표시
   */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /*
   * 로딩 화면 제거
   */
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      loading.classList.add("hidden");
    }, 450);
  });


  /*
   * 헤더 배경
   */
  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader);


  /*
   * 메뉴 열기
   */
  const openMenu = () => {
    menuButton.classList.add("active");
    mobileMenu.classList.add("open");

    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "메뉴 닫기");
  };


  /*
   * 메뉴 닫기
   */
  const closeMenu = () => {
    menuButton.classList.remove("active");
    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  };


  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });


  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });


  /*
   * ESC로 메뉴 닫기
   */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /*
   * 스크롤 등장 애니메이션
   */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );


  revealItems.forEach((item, index) => {
    const delay = Math.min((index % 3) * 70, 140);

    item.style.transitionDelay = `${delay}ms`;

    revealObserver.observe(item);
  });
});