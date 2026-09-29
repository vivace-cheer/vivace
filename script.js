document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading");
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = mobileMenu.querySelectorAll("a[href^='#']");
  const revealItems = document.querySelectorAll(".reveal");
  const currentYear = document.getElementById("currentYear");

  // 연도 자동 표시
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // V → IVACE 애니메이션이 끝난 뒤 시작 화면 닫기
  if (loading) {
    window.setTimeout(() => {
      loading.classList.add("hidden");
    }, 3200);
  }

  // 스크롤할 때 헤더 배경 변경
  const updateHeader = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  // 메뉴 열기
  const openMenu = () => {
    menuButton.classList.add("active");
    mobileMenu.classList.add("open");
    document.body.classList.add("menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "메뉴 닫기");
  };

  // 메뉴 닫기
  const closeMenu = () => {
    menuButton.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
  };

  menuButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // 스크롤 등장 애니메이션
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
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

    /* 앨범 사진 크게 보기 */
  const albumPhotos = [...document.querySelectorAll(".vivace-album-item img")];
  const albumViewer = document.getElementById("albumViewer");
  const albumFullImage = document.getElementById("albumFullImage");
  const albumCount = document.getElementById("albumCount");
  let albumIndex = 0;

  const showAlbumPhoto = (index) => {
    albumIndex = (index + albumPhotos.length) % albumPhotos.length;
    albumFullImage.src = albumPhotos[albumIndex].src;
    albumFullImage.alt = albumPhotos[albumIndex].alt;
    albumCount.textContent = `${albumIndex + 1} / ${albumPhotos.length}`;
  };

  albumPhotos.forEach((photo, index) => {
    const item = photo.closest(".vivace-album-item");
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `앨범 사진 ${index + 1} 크게 보기`);

    item.addEventListener("click", () => {
      showAlbumPhoto(index);
      albumViewer.showModal();
    });

    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showAlbumPhoto(index);
        albumViewer.showModal();
      }
    });
  });

  document.getElementById("albumClose").addEventListener("click", () => {
    albumViewer.close();
  });

  document.getElementById("albumPrev").addEventListener("click", () => {
    showAlbumPhoto(albumIndex - 1);
  });

  document.getElementById("albumNext").addEventListener("click", () => {
    showAlbumPhoto(albumIndex + 1);
  });

  let albumTouchX = 0;

  albumViewer.addEventListener("touchstart", (event) => {
    albumTouchX = event.changedTouches[0].screenX;
  }, { passive: true });

  albumViewer.addEventListener("touchend", (event) => {
    const distance = event.changedTouches[0].screenX - albumTouchX;

    if (Math.abs(distance) > 45) {
      showAlbumPhoto(albumIndex + (distance < 0 ? 1 : -1));
    }
  }, { passive: true });
});