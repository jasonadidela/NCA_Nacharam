// script.js — small client behaviors for the NCA site (keeps previous features)
// - smooth scroll for internal links
// - contact form placeholder
// - preserves mobile click dropdown behavior (desktop hover is via CSS)

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
          // close responsive nav if open (Bootstrap)
          const navCollapse = document.querySelector('.navbar-collapse.show');
          if (navCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // Contact form placeholder
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', submitForm);

  // Ensure dropdowns on touch devices still open on tap (no extra JS needed for Bootstrap)
  // Desktop hover-to-open is handled by CSS in style.css inside @media (min-width: 992px)
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