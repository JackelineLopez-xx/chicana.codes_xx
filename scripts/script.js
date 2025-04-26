// Select the button
const toggleButton = document.getElementById('toggle-mode');

// Check if dark mode is already set in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Save the current mode to localStorage so it persists
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
});
const track = document.querySelector('.sticker-track');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -220, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: 220, behavior: 'smooth' });
});

