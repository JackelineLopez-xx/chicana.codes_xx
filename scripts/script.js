// 🌹 Toggle Dark/Light Mode for chicana.codes_xx
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle-mode");
  const body = document.body;

  // Check if user has dark mode saved from before
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Save user preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
});

