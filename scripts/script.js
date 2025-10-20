// scripts/script.js
// Handles: theme toggle, sidebar collapse, sign-in local profile, active nav highlighting, simple back link

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* ---------- THEME (dark mode) ---------- */
  const toggle = document.getElementById("toggle-mode");
  const THEME_KEY = "chicana_theme";

  const applyTheme = (theme) => {
    if (theme === "dark") body.classList.add("dark-mode");
    else body.classList.remove("dark-mode");
    // update button icon/text
    if (toggle) toggle.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  };

  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
      toggle.textContent = isDark ? "☀️" : "🌙";
    });
  }

  /* ---------- SIDEBAR COLLAPSE ---------- */
  const sidebar = document.getElementById("sidebar");
  const collapseBtn = document.getElementById("collapse-sidebar");
  const SIDEBAR_KEY = "chicana_sidebar_collapsed";

  const updateTogglePosition = () => {
    if (!toggle || !sidebar) return;
    const collapsed = sidebar.classList.contains("collapsed");
    toggle.classList.toggle("compact", collapsed);
  };

  const savedCollapsed = localStorage.getItem(SIDEBAR_KEY) === "true";
  if (sidebar && savedCollapsed) sidebar.classList.add("collapsed");
  updateTogglePosition();

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      localStorage.setItem(SIDEBAR_KEY, sidebar.classList.contains("collapsed"));
      updateTogglePosition();
    });
  }

  /* ---------- AUTH: simple client-side sign-in (localStorage) ---------- */
  const AUTH_KEY = "chicana_user";
  const signInOpenBtn = document.getElementById("open-signin");
  const signOutBtn = document.getElementById("signout-btn");
  const signInModal = document.getElementById("signin-modal");
  const signInForm = document.getElementById("signin-form");
  const closeModalBtn = document.getElementById("close-signin");
  const profileImg = document.getElementById("profile-img");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");

  const renderProfile = () => {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) {
      // not signed in
      if (profileImg) profileImg.src = "assets/profile-placeholder.jpg";
      if (profileName) profileName.textContent = "Sign in";
      if (profileEmail) profileEmail.textContent = "";
      if (signInOpenBtn) signInOpenBtn.style.display = "inline-block";
      if (signOutBtn) signOutBtn.style.display = "none";
      return;
    }
    try {
      const user = JSON.parse(raw);
      if (profileImg && user.avatar) profileImg.src = user.avatar;
      if (profileName) profileName.textContent = user.name || "You";
      if (profileEmail) profileEmail.textContent = user.email || "";
      if (signInOpenBtn) signInOpenBtn.style.display = "none";
      if (signOutBtn) signOutBtn.style.display = "inline-block";
    } catch (e) {
      console.error("Invalid user data", e);
      localStorage.removeItem(AUTH_KEY);
      renderProfile();
    }
  };

  renderProfile();

  if (signInOpenBtn && signInModal) {
    signInOpenBtn.addEventListener("click", () => {
      signInModal.classList.add("open");
      document.documentElement.style.overflow = "hidden";
      const nameInput = document.querySelector("#signin-form input[name='name']");
      if (nameInput) nameInput.focus();
    });
  }

  if (closeModalBtn && signInModal) {
    closeModalBtn.addEventListener("click", () => {
      signInModal.classList.remove("open");
      document.documentElement.style.overflow = "";
    });
  }

  if (signInForm) {
    signInForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const form = new FormData(signInForm);
      const name = form.get("name")?.toString().trim() || "";
      const email = form.get("email")?.toString().trim() || "";
      const avatar = form.get("avatar")?.toString().trim() || "assets/profile-placeholder.jpg";
      if (!name) return alert("Please enter a name.");
      const user = { name, email, avatar };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      signInModal.classList.remove("open");
      document.documentElement.style.overflow = "";
      renderProfile();
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener("click", () => {
      if (!confirm("Sign out? This only clears local profile from this browser.")) return;
      localStorage.removeItem(AUTH_KEY);
      renderProfile();
    });
  }

  // Close modal when clicking backdrop
  if (signInModal) {
    signInModal.addEventListener("click", (e) => {
      if (e.target === signInModal) {
        signInModal.classList.remove("open");
        document.documentElement.style.overflow = "";
      }
    });
  }

  /* ---------- ACTIVE NAV HIGHLIGHT ---------- */
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".sidebar-nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;
    if (href === path || (href === "index.html" && path === "")) {
      a.classList.add("active");
    } else a.classList.remove("active");
  });

  /* ---------- Back link (if not home) ---------- */
  const backLink = document.getElementById("back-link");
  if (backLink) {
    if (path !== "" && path !== "index.html") {
      backLink.style.display = "inline-flex";
    } else backLink.style.display = "none";
  }

  /* keyboard escape closes modal */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (signInModal && signInModal.classList.contains("open")) {
        signInModal.classList.remove("open");
        document.documentElement.style.overflow = "";
      }
    }
  });
});




