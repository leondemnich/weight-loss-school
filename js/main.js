// === Header on scroll ===
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// === Mobile menu ===
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
// Build a mobile nav by cloning links
const mobile = document.createElement('div');
mobile.className = 'mobile-nav';
mobile.innerHTML = nav.innerHTML + '<a href="#products" class="btn btn--primary">Почати</a>';
header.appendChild(mobile);

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobile.classList.toggle('open');
});
mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  mobile.classList.remove('open');
}));

// === Testimonials slider ===
const track = document.getElementById('sliderTrack');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');
let index = 0;

function getPerView() {
  const w = window.innerWidth;
  if (w >= 1024) return 3;
  if (w >= 700) return 2;
  return 1;
}

function update() {
  const slides = track.children;
  const perView = getPerView();
  const max = Math.max(0, slides.length - perView);
  if (index > max) index = max;
  const slide = slides[0];
  const styles = getComputedStyle(track);
  const gap = parseFloat(styles.gap) || 0;
  const offset = (slide.getBoundingClientRect().width + gap) * index;
  track.style.transform = `translateX(-${offset}px)`;
}

prev.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
next.addEventListener('click', () => {
  const perView = getPerView();
  const max = Math.max(0, track.children.length - perView);
  index = Math.min(max, index + 1);
  update();
});
window.addEventListener('resize', update);
update();

// === Year ===
document.getElementById('year').textContent = new Date().getFullYear();
