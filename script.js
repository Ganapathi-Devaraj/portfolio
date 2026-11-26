// Animated counters: start when scrolled into view
const counters = document.querySelectorAll('.counter');
const runCounter = (el) => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * p) + (p === 1 ? suffix : '');
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => io.observe(c));
} else {
  counters.forEach(runCounter);
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form -> opens WhatsApp with the message prefilled
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const msg = document.getElementById('msg');
  const service = document.getElementById('service').value;
  [name, msg].forEach(f => f.classList.toggle('is-invalid', !f.value.trim()));
  if (!name.value.trim() || !msg.value.trim()) return;
  const text = `Hi Ganapathi, I'm ${name.value.trim()}.\nI need: ${service}.\n${msg.value.trim()}`;
  window.open('https://wa.me/919597868376?text=' + encodeURIComponent(text), '_blank');
});
