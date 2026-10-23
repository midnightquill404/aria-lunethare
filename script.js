/* =========================================================
   ARIA LUNETHARË — interaksi website
   JavaScript dibuat sederhana dan diberi komentar.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector("#primary-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const galleryButtons = [...document.querySelectorAll(".gallery-card")];
  const lightbox = document.querySelector("#gallery-lightbox");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxNote = document.querySelector("#lightbox-note");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxArtFallback = document.querySelector("#lightbox-art-fallback");
  const lightboxClose = document.querySelector(".lightbox-close");
  const toast = document.querySelector("#site-toast");
  let lastGalleryButton = null;

  // Buka atau tutup dropdown navigasi pada tablet dan ponsel.
  function setMenuOpen(isOpen) {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
    primaryNav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen && window.matchMedia("(max-width: 980px)").matches);
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    // Tutup menu setelah pengguna memilih kategori.
    navLinks.forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    // Tutup menu jika pengguna mengeklik di luar header.
    document.addEventListener("click", (event) => {
      if (menuToggle.getAttribute("aria-expanded") === "true" &&
          !event.target.closest(".site-header")) {
        setMenuOpen(false);
      }
    });

    // Escape menutup menu, lalu fokus dikembalikan ke tombol hamburger.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    // Jika jendela diubah ke desktop, bersihkan status dropdown mobile.
    window.addEventListener("resize", () => {
      if (window.matchMedia("(min-width: 981px)").matches) setMenuOpen(false);
    });
  }

  // Tandai kategori yang sedang terlihat sebagai menu aktif.
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-28% 0px -58% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  // Galeri placeholder: dialog menjelaskan item yang dipilih.
  // Saat gambar asli ditambahkan, dialog ini bisa dikembangkan untuk menampilkan gambar.
  function openGalleryItem(button) {
    if (!lightbox || typeof lightbox.showModal !== "function") {
      showToast("Dialog galeri tidak didukung browser ini. Coba browser versi terbaru.");
      return;
    }
    lastGalleryButton = button;
    lightboxTitle.textContent = button.dataset.galleryTitle || "Gallery item";
    lightboxNote.textContent = button.dataset.galleryNote || "Detail gambar belum ditambahkan.";
    const imagePath = button.dataset.galleryImage;
    if (lightboxImage) {
      lightboxImage.hidden = true;
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = button.dataset.galleryTitle || "Gambar galeri";
      if (imagePath) {
        lightboxImage.onload = () => {
          lightboxImage.hidden = false;
          if (lightboxArtFallback) lightboxArtFallback.hidden = true;
        };
        lightboxImage.onerror = () => {
          lightboxImage.hidden = true;
          if (lightboxArtFallback) lightboxArtFallback.hidden = false;
        };
        lightboxImage.src = imagePath;
      }
    }
    if (lightboxArtFallback) lightboxArtFallback.hidden = true;
    lightbox.showModal();
    lightboxClose?.focus();
  }

  // Gambar opsional: bila file belum tersedia, placeholder dekoratif tetap terlihat.
  document.querySelectorAll("[data-slot-image]").forEach((image) => {
    const slot = image.closest("[data-image-slot]");
    const fallback = slot?.querySelector("[data-slot-fallback]");
    image.addEventListener("load", () => {
      image.hidden = false;
      if (fallback) fallback.hidden = true;
    });
    image.addEventListener("error", () => {
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    });
    if (image.complete && image.naturalWidth > 0) {
      image.hidden = false;
      if (fallback) fallback.hidden = true;
    } else {
      image.hidden = true;
      if (fallback) fallback.hidden = false;
    }
  });

  galleryButtons.forEach((button) => {
    button.addEventListener("click", () => openGalleryItem(button));
  });

  function closeLightbox() {
    if (lightbox && lightbox.open) lightbox.close();
  }

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", (event) => {
    // Klik area gelap di luar kotak dialog akan menutup lightbox.
    if (event.target === lightbox) closeLightbox();
  });

  lightbox?.addEventListener("close", () => {
    if (lastGalleryButton) lastGalleryButton.focus();
  });

  // Pesan singkat untuk umpan balik tanpa pop-up yang mengganggu.
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3200);
  }

  // Efek kursor sengaja dibuat ringan: tidak mengganti bentuk kursor sistem.
  // Hover dan focus tetap berfungsi tanpa efek ini.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add("has-cursor-effect");
  }
});
