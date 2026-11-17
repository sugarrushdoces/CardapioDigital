'use strict';
document.documentElement.classList.add('js');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const nav = document.querySelector('.nav');
const art = document.querySelector('.hero-art');
const hero = document.querySelector('.hero');
const motion = document.querySelector('.cup-motion');
const tilt = document.querySelector('.cup-tilt');
let frame = 0;
function draw() {
  frame = 0;
  nav.classList.toggle('scrolled', window.scrollY > 16);
  if (reduceMotion.matches) {
    motion.style.removeProperty('--cup-y');
    motion.style.removeProperty('--cup-r');
    ['--scroll-x','--scroll-y','--cup-z'].forEach(key => motion.style.removeProperty(key));
    return;
  }
  const track = document.querySelector('.hero-track');
  const rect = track.getBoundingClientRect();
  const distance = Math.max(track.offsetHeight - window.innerHeight, window.innerHeight * .55);
  const progress = Math.max(0, Math.min(1, -rect.top / distance));
  motion.style.setProperty('--cup-y', (progress * -55) + 'px');
  motion.style.setProperty('--cup-r', (-7 + progress * 19) + 'deg');
  motion.style.setProperty('--scroll-x', (-progress * 7) + 'deg');
  motion.style.setProperty('--scroll-y', (progress * 22) + 'deg');
  motion.style.setProperty('--cup-z', (progress * 75) + 'px');
  art.style.setProperty('--shadow-scale', 1 - progress * .25);
  art.style.setProperty('--shadow-opacity', 1 - progress * .4);
  art.querySelectorAll('.spark').forEach((treat, i) => {
    treat.style.setProperty('--treat-y', (progress * (i ? -90 : 60)) + 'px');
    treat.style.setProperty('--treat-r', (progress * (i ? -30 : 25)) + 'deg');
  });
}
function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', schedule, { passive: true });
reduceMotion.addEventListener('change', schedule);
draw();
art.addEventListener('pointermove', event => {
  if (reduceMotion.matches || event.pointerType !== 'mouse') return;
  const rect = art.getBoundingClientRect();
  tilt.style.setProperty('--tilt-y', ((event.clientX - rect.left) / rect.width - .5) * 14 + 'deg');
  tilt.style.setProperty('--tilt-x', -((event.clientY - rect.top) / rect.height - .5) * 10 + 'deg');
});
art.addEventListener('pointerleave', () => {
  tilt.style.setProperty('--tilt-x', '0deg');
  tilt.style.setProperty('--tilt-y', '0deg');
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
document.querySelectorAll('.flavor-card').forEach(card => {
  card.addEventListener('click', () => {
    const open = card.getAttribute('aria-expanded') !== 'true';
    card.setAttribute('aria-expanded', String(open));
    const detail = card.querySelector('.card-detail');
    detail.textContent = card.dataset.detail;
    detail.hidden = !open;
    card.querySelector('.card-more b').textContent = open ? '−' : '+';
  });
});
const photo = document.querySelector('.cup-photo');
function photoFallback() {
  photo.hidden = true;
  photo.style.display = 'none';
  photo.nextElementSibling.hidden = false;
}
photo.addEventListener('error', photoFallback);
if (photo.complete && !photo.naturalWidth) photoFallback();

