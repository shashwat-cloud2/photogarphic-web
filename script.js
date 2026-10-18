/* ========================================================
   BASIC
   ======================================================== */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('done'), 350);
});

/* ========================================================
   CUSTOM CURSOR
   ======================================================== */
const cursorDot  = document.getElementById('cursorDot');
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

  document.querySelectorAll('a, button, .film, .gallery-grid__item, .about-page__socials a').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ========================================================
   CLICK RIPPLE
   ======================================================== */
window.addEventListener('click', (e) => {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = e.clientX + 'px';
  ripple.style.top  = e.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 900);
});

/* ========================================================
   SCROLL PROGRESS
   ======================================================== */
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = (window.scrollY / h) * 100;
    scrollProgress.style.width = p + '%';
  });
}

/* ========================================================
   NAV
   ======================================================== */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navClose  = document.getElementById('navClose');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.add('open'));
}
if (navClose && navLinks) {
  navClose.addEventListener('click', () => navLinks.classList.remove('open'));
}
if (navLinks) {
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') navLinks.classList.remove('open');
  });
}

/* ========================================================
   HERO PARTICLES
   ======================================================== */
const particleWrap = document.getElementById('heroParticles');
if (particleWrap) {
  for (let i = 0; i < 24; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top  = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 8) + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    p.style.opacity = 0.15 + Math.random() * 0.4;
    particleWrap.appendChild(p);
  }
}

/* ========================================================
   UNIVERSAL REVEAL
   ======================================================== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-anim]').forEach(el => revealObserver.observe(el));
document.querySelectorAll('.reveal-line').forEach(el => {
  setTimeout(() => el.classList.add('in-view'), 700);
});

/* ========================================================
   VIDEOS
   ======================================================== */
function setupVideoControls(videoId, toggleId, playIconId, pauseIconId) {
  const video = document.getElementById(videoId);
  const btn   = document.getElementById(toggleId);
  const iconPlay  = document.getElementById(playIconId);
  const iconPause = document.getElementById(pauseIconId);
  if (!video || !btn) return;

  video.muted = true;
  const p = video.play();
  if (p && p.catch) {
    p.catch(() => {
      if (iconPlay)  iconPlay.style.display  = '';
      if (iconPause) iconPause.style.display = 'none';
    });
  }

  btn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      if (iconPause) iconPause.style.display = '';
      if (iconPlay)  iconPlay.style.display  = 'none';
    } else {
      video.pause();
      if (iconPlay)  iconPlay.style.display  = '';
      if (iconPause) iconPause.style.display = 'none';
    }
  });
}

setupVideoControls('heroVideo',   'heroVideoToggle',   'heroIconPlay',   'heroIconPause');
setupVideoControls('footerVideo', 'footerVideoToggle', 'footerIconPlay', 'footerIconPause');

/* ========================================================
   LIGHTBOX
   ======================================================== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

document.querySelectorAll('[data-img]').forEach(el => {
  el.addEventListener('click', () => openLightbox(el.dataset.img));
});