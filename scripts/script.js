// 🌹 Toggle Dark/Light Mode for chicana.codes_xx
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-mode");
  const body = document.body;

  if (!toggleButton) return; // safety

  // Load saved preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
  } else {
    toggleButton.textContent = "🌙 Dark Mode";
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggleButton.textContent = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      toggleButton.textContent = "🌙 Dark Mode";
    }
  });
});


