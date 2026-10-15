/* ========================================================
   BASIC
   ======================================================== */
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('loader').classList.add('done'), 350);
});

/* ========================================================
   CUSTOM CURSOR
   ======================================================== */
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.18;
  ringY += (mouseY - ringY) * 0.18;
  cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

// Grow ring on interactive hover
document.querySelectorAll('a, button, .film, .slide, .about-page__socials a').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

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
window.addEventListener('scroll', () => {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  const p = (window.scrollY / h) * 100;
  scrollProgress.style.width = p + '%';
});

/* ========================================================
   NAV
   ======================================================== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navClose  = document.getElementById('navClose');

navToggle.addEventListener('click', () => navLinks.classList.add('open'));
navClose.addEventListener('click', () => navLinks.classList.remove('open'));

navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// Close mobile nav on Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') navLinks.classList.remove('open');
});

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
   BACKGROUND VIDEOS — autoplay + play/pause
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

  video.addEventListener('play', () => {
    if (iconPause) iconPause.style.display = '';
    if (iconPlay)  iconPlay.style.display  = 'none';
  });
  video.addEventListener('pause', () => {
    if (iconPlay)  iconPlay.style.display  = '';
    if (iconPause) iconPause.style.display = 'none';
  });
}

setupVideoControls('heroVideo',   'heroVideoToggle',   'heroIconPlay',   'heroIconPause');
setupVideoControls('footerVideo', 'footerVideoToggle', 'footerIconPlay', 'footerIconPause');

/* ========================================================
   GALLERY SLIDER
   ======================================================== */
const sliderTrack = document.getElementById('sliderTrack');
const slider      = document.getElementById('slider');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');
const dotsWrap    = document.getElementById('galleryDots');

const galleryItems = [
  { img: 'https://picsum.photos/seed/novel1/900/1200',  caption: 'The First Look' },
  { img: 'https://picsum.photos/seed/novel2/900/1200',  caption: 'Golden Hour' },
  { img: 'https://picsum.photos/seed/novel3/900/1200',  caption: 'Udaipur Palaces' },
  { img: 'https://picsum.photos/seed/novel4/900/1200',  caption: 'Monsoon Vows' },
  { img: 'https://picsum.photos/seed/novel5/900/1200',  caption: 'A Quiet Promise' },
  { img: 'https://picsum.photos/seed/novel6/900/1200',  caption: 'By the Sea' },
  { img: 'https://picsum.photos/seed/novel7/900/1200',  caption: 'Bridal Portrait' },
  { img: 'https://picsum.photos/seed/novel8/900/1200',  caption: 'Family Rituals' },
  { img: 'https://picsum.photos/seed/novel9/900/1200',  caption: 'The Long Way Home' },
  { img: 'https://picsum.photos/seed/novel10/900/1200', caption: 'Evening Lights' },
  { img: 'https://picsum.photos/seed/novel11/900/1200', caption: 'Two Hands' },
  { img: 'https://picsum.photos/seed/novel12/900/1200', caption: 'Rooftop Dance' },
  { img: 'https://picsum.photos/seed/novel13/900/1200', caption: 'Last Frame' },
];

galleryItems.forEach((item) => {
  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.dataset.img = item.img;
  slide.innerHTML = `
    <div class="slide__img" style="background-image:url('${item.img}')"></div>
    <div class="slide__caption">${item.caption}</div>
  `;
  sliderTrack.appendChild(slide);
});

const slides = sliderTrack.querySelectorAll('.slide');

galleryItems.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'gallery__dot' + (i === 0 ? ' active' : '');
  dot.dataset.index = i;
  dot.addEventListener('click', () => scrollToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.querySelectorAll('.gallery__dot');

function scrollToSlide(index) {
  const slide = slides[index];
  if (!slide) return;
  slider.scrollTo({ left: slide.offsetLeft - sliderTrack.offsetLeft, behavior: 'smooth' });
}

nextBtn.addEventListener('click', () => {
  const current = getActiveIndex();
  scrollToSlide(Math.min(current + 1, slides.length - 1));
});
prevBtn.addEventListener('click', () => {
  const current = getActiveIndex();
  scrollToSlide(Math.max(current - 1, 0));
});

function getActiveIndex() {
  const scrollLeft = slider.scrollLeft;
  let closest = 0, minDist = Infinity;
  slides.forEach((slide, i) => {
    const dist = Math.abs(slide.offsetLeft - sliderTrack.offsetLeft - scrollLeft);
    if (dist < minDist) { minDist = dist; closest = i; }
  });
  return closest;
}

let scrollTimeout;
slider.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const active = getActiveIndex();
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
    prevBtn.disabled = active === 0;
    nextBtn.disabled = active === slides.length - 1;
  }, 80);
});

prevBtn.disabled = true;

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 90);
      slideObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

slides.forEach(s => slideObserver.observe(s));

/* ========================================================
   LIGHTBOX
   ======================================================== */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.slide').forEach(s =>
  s.addEventListener('click', () => openLightbox(s.dataset.img))
);
document.querySelectorAll('.film').forEach(f =>
  f.addEventListener('click', () => openLightbox(f.dataset.img))
);

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft')  prevBtn.click();
});