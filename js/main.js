
// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('open');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetID);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close menu on mobile after click
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
      }
    }
  });
});

// Simple form validation and submission simulation
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Basic validation (HTML5 handles required fields)
  formStatus.textContent = '';
  const formData = new FormData(form);

  // Simulate sending data
  setTimeout(() => {
    form.reset();
    formStatus.textContent = 'Thank you for your message. We will get back to you soon!';
    formStatus.classList.remove('hidden');
  }, 1000);
});