/* =========================================================================
   Closca Hostel Koh Tao — Front-end interactions
   Vanilla JS, no dependencies. Organized by feature.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Sticky header ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('visible', window.scrollY > 600);
  };

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Scroll reveal animations ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Room photo galleries ---------- */
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const mainImg = gallery.querySelector('[data-gallery-main]');
    const thumbs = gallery.querySelectorAll('.room-gallery-thumbs button');

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const newSrc = thumb.getAttribute('data-src');
        if (mainImg.getAttribute('src') === newSrc) return;

        mainImg.style.opacity = '0';
        window.setTimeout(() => {
          mainImg.setAttribute('src', newSrc);
          mainImg.style.opacity = '1';
        }, 150);

        thumbs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-pressed', 'false');
        });
        thumb.classList.add('active');
        thumb.setAttribute('aria-pressed', 'true');
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close sibling panels for a clean single-open accordion
      const accordion = trigger.closest('.accordion');
      accordion.querySelectorAll('.accordion-trigger').forEach((other) => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          document.getElementById(other.getAttribute('aria-controls')).hidden = true;
        }
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
    });
  });

  /* ---------- Back to top ---------- */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Promotion modal ---------- */
  const promoModal = document.getElementById('promo-modal');
  if (promoModal) {
    promoModal.hidden = false;
    promoModal.querySelectorAll('[data-promo-close]').forEach((el) => {
      el.addEventListener('click', () => { promoModal.hidden = true; });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') promoModal.hidden = true;
    });
  }
})();
