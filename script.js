document.addEventListener('DOMContentLoaded', () => {
  // 1. Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Loader
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('done'), 1500);

  // 3. Custom Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  if (cursorDot && cursorRing && window.matchMedia('(min-width: 901px)').matches) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });
    (function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateRing);
    })();
    document.querySelectorAll('a, button, .client-card, .gallery-grid__item').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // 4. Click Ripple
  window.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 900);
  });

  // 5. Scroll Progress
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = ((window.scrollY / h) * 100) + '%';
    });
  }

  // 6. Navigation
  const nav = document.getElementById('nav');
  if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navClose = document.getElementById('navClose');
  if (navToggle && navLinks) navToggle.addEventListener('click', () => navLinks.classList.add('open'));
  if (navClose && navLinks) navClose.addEventListener('click', () => navLinks.classList.remove('open'));
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') navLinks.classList.remove('open'); });
  }

  // 7. Hero Particles
  const particleWrap = document.getElementById('heroParticles');
  if (particleWrap) {
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.top = Math.random() * 100 + '%';
      p.style.animationDelay = (Math.random() * 8) + 's';
      p.style.animationDuration = (6 + Math.random() * 6) + 's';
      p.style.opacity = 0.15 + Math.random() * 0.4;
      particleWrap.appendChild(p);
    }
  }

  // 8. Intersection Observer for Animations
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-anim]').forEach(el => revealObserver.observe(el));
  window.revealObserver = revealObserver;

  // 9. Background Videos
  function setupVideo(videoId, toggleId, playIconId, pauseIconId) {
    const video = document.getElementById(videoId);
    const btn = document.getElementById(toggleId);
    if (!video || !btn) return;
    const iconPlay = document.getElementById(playIconId);
    const iconPause = document.getElementById(pauseIconId);

    video.muted = true;
    video.play().catch(() => { if(iconPlay) iconPlay.style.display = ''; if(iconPause) iconPause.style.display = 'none'; });

    btn.addEventListener('click', () => {
      if (video.paused) {
        video.play(); if(iconPause) iconPause.style.display = ''; if(iconPlay) iconPlay.style.display = 'none';
      } else {
        video.pause(); if(iconPlay) iconPlay.style.display = ''; if(iconPause) iconPause.style.display = 'none';
      }
    });
  }
  setupVideo('heroVideo', 'heroVideoToggle', 'heroIconPlay', 'heroIconPause');
  setupVideo('footerVideo', 'footerVideoToggle', 'footerIconPlay', 'footerIconPause');

  // 10. Universal Lightbox Logic
  window.openLightbox = function(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lightbox || !img) return;
    img.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');
  if (lightbox && closeBtn) {
    closeBtn.addEventListener('click', window.closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) window.closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') window.closeLightbox(); });
  }
});