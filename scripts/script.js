// scripts/script.js
// 🌹 chicana.codes_xx — Menu + Dark Mode + accessible interactions

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const menuBtn = document.getElementById("menu-btn");
  const overlay = document.getElementById("overlay-menu");
  const closeBtn = document.getElementById("close-menu");
  const overlayLinks = overlay ? overlay.querySelectorAll("a") : [];
  const body = document.body;
  const toggle = document.querySelectorAll("#toggle-mode");

  // ---------- Dark mode (works across all pages)
  const initTheme = () => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") body.classList.add("dark-mode");
    // update toggle icons if multiple toggles exist
    toggle.forEach(btn => {
      btn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
  };

  initTheme();

  toggle.forEach(btn => {
    btn.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      btn.textContent = isDark ? "☀️" : "🌙";
    });
  });

  // ---------- Overlay menu interactions
  const openMenu = () => {
    overlay.classList.add("open");
    menuBtn.classList.add("open");
    menuBtn.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    // trap focus (simple)
    document.documentElement.style.overflow = "hidden";
  };

  const closeMenu = () => {
    overlay.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    menuBtn.focus();
  };

  if (menuBtn && overlay) {
    menuBtn.addEventListener("click", () => {
      if (overlay.classList.contains("open")) closeMenu();
      else openMenu();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    // close when clicking outside inner content
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeMenu();
    });

    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("open")) {
        closeMenu();
      }
    });

    // close when any overlay link is clicked (so nav goes away on mobile)
    overlayLinks.forEach(a => a.addEventListener("click", closeMenu));
  }
});



