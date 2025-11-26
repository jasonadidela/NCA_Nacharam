// script.js — small client behaviors for the NCA site

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const navCollapse = document.querySelector('.navbar-collapse.show');
          if (navCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Contact form placeholder (replace with real backend)
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', submitForm);
});

function submitForm(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const resultEl = document.getElementById('formResult');
  if (resultEl) {
    resultEl.style.display = 'inline';
    resultEl.textContent = 'Sending...';
  }
  // Simulated async submit
  setTimeout(() => {
    if (resultEl) {
      resultEl.textContent = 'Thanks — message sent!';
      setTimeout(() => { resultEl.style.display = 'none'; }, 3000);
    }
    form.reset();
  }, 800);
}