// script.js - behaviors including light enhancements for image/video elements

document.addEventListener('DOMContentLoaded', () => {
  // Fill footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for in-page links
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

  // Add click-to-open for image figures (optional lightbox behaviour)
  document.querySelectorAll('.figure img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img));
  });
});

// Very small lightbox (no external libs). Click the overlay or image to close.
function openLightbox(img) {
  const src = img.currentSrc || img.src;
  const alt = img.alt || '';
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = 0;
  overlay.style.background = 'rgba(0,0,0,0.8)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = 1050;
  overlay.tabIndex = 0;

  const large = document.createElement('img');
  large.src = src;
  large.alt = alt;
  large.style.maxWidth = '95%';
  large.style.maxHeight = '95%';
  large.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  large.style.borderRadius = '8px';
  large.loading = 'eager';

  overlay.appendChild(large);
  document.body.appendChild(overlay);

  function remove() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) {
    if (e.key === 'Escape') remove();
  }
  overlay.addEventListener('click', remove);
  document.addEventListener('keydown', onKey);
}

/* Contact form placeholder (keeps previous behaviour) */
function submitForm(e) {
  e.preventDefault();
  const form = e.currentTarget || document.getElementById('contactForm');
  const resultEl = document.getElementById('formResult');

  if (resultEl) {
    resultEl.style.display = 'inline';
    resultEl.textContent = 'Sending...';
  }

  setTimeout(() => {
    if (resultEl) {
      resultEl.textContent = 'Thanks — message sent!';
      setTimeout(() => { resultEl.style.display = 'none'; }, 3000);
    }
    form.reset();
  }, 700);
}