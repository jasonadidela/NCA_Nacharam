// script.js - small client behaviors for the NCA Nacharam sample site

document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hook contact form submit if present
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', handleContactSubmit);

  // Smooth scroll for in-page links (progressive enhancement)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close responsive nav if open (Bootstrap 5 uses .navbar-collapse)
          const navCollapse = document.querySelector('.navbar-collapse.show');
          if (navCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });
});

// Simple contact form handler (replace with real API call)
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const resultEl = document.getElementById('formResult');

  // Basic client-side validation (HTML required attributes should suffice)
  const formData = new FormData(form);
  const name = formData.get('name') || '';
  const email = formData.get('email') || '';
  const message = formData.get('message') || '';

  // Simulate a submission delay and show result
  if (resultEl) {
    resultEl.style.display = 'inline';
    resultEl.textContent = 'Sending...';
  }

  // Simulated async submission
  setTimeout(() => {
    if (resultEl) {
      resultEl.textContent = 'Thanks — message sent!';
      setTimeout(() => { resultEl.style.display = 'none'; }, 3000);
    }
    form.reset();
  }, 700);
}