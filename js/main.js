/* =============================================
   JIMMY VALDÉS — Portfolio Main JS
   ============================================= */

// ─── Año en el footer ───────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ─── Mobile menu ────────────────────────────────
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  menuBtn.innerHTML = mobileMenu.classList.contains('hidden')
    ? '<i class="fas fa-bars"></i>'
    : '<i class="fas fa-times"></i>';
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ─── Custom cursor ──────────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

document.querySelectorAll('a, button, .card, .skill-icon, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorRing.style.borderColor = '#6C63FF';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.borderColor = 'rgba(108,99,255,0.6)';
  });
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// ─── Particles canvas ───────────────────────────
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = canvas.parentElement.offsetWidth;
  canvas.height = canvas.parentElement.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 80;
const particles = [];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '108,99,255' : '0,217,192';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(108,99,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ─── Hero entrance animations ────────────────────
function heroEntrance() {
  const order = ['hero-badge', 'hero-title', 'hero-subtitle', 'hero-desc', 'hero-btns', 'hero-social'];
  order.forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      el.style.transform = 'translateY(0)';
      el.style.opacity = '1';
    }, 200 + i * 150);
  });
}
window.addEventListener('load', heroEntrance);

// ─── Typed text effect ───────────────────────────
const phrases = [
  'Ingeniero en Informática',
  'Desarrollador Full Stack',
  'Analista de Datos con Power BI',
  'Recién egresado y listo para crecer',
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx--);
  } else {
    typedEl.textContent = current.substring(0, charIdx++);
  }
  let delay = isDeleting ? 50 : 100;
  if (!isDeleting && charIdx > current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ─── Navbar: active section + shrink on scroll ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Shrink navbar
  if (window.scrollY > 50) {
    navbar.classList.add('py-2');
    navbar.classList.remove('py-4');
  } else {
    navbar.classList.remove('py-2');
    navbar.classList.add('py-4');
  }

  // Active link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });

  // Scroll to top button
  const scrollTop = document.getElementById('scroll-top');
  if (window.scrollY > 400) {
    scrollTop.style.opacity = '1';
    scrollTop.style.pointerEvents = 'auto';
  } else {
    scrollTop.style.opacity = '0';
    scrollTop.style.pointerEvents = 'none';
  }
});

document.getElementById('scroll-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Reveal on scroll ────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

// ─── Skill bars animation ────────────────────────
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-item').forEach((item, i) => {
        const level = item.dataset.level || 0;
        const bar = item.querySelector('.skill-bar-fill');
        if (bar) {
          setTimeout(() => { bar.style.width = level + '%'; }, i * 150);
        }
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.card').forEach(c => {
  if (c.querySelector('.skill-item')) skillObserver.observe(c);
});

// ─── Counter animation ───────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target) || 0;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current) + '+';
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.grid').forEach(g => {
  if (g.querySelector('[data-target]')) counterObserver.observe(g);
});

// ─── Project filter ──────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Style filter buttons
function updateFilterStyles() {
  filterBtns.forEach(btn => {
    if (btn.classList.contains('active')) {
      btn.style.background = 'linear-gradient(135deg,#6C63FF,#00D9C0)';
      btn.style.color = '#fff';
      btn.style.border = 'none';
    } else {
      btn.style.background = 'transparent';
      btn.style.color = '#9CA3AF';
      btn.style.border = '1px solid #1E1E3F';
    }
  });
}
updateFilterStyles();

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateFilterStyles();
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      if (match) {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.display = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { if (!match) card.style.display = 'none'; }, 400);
      }
    });
  });
});

// ─── Timeline entrance ───────────────────────────
const timelineItems = document.querySelectorAll('.timeline-item');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, i * 150);
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  tlObserver.observe(item);
});

// ─── Skill icon hover ────────────────────────────
document.querySelectorAll('.skill-icon').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.transform = 'translateY(-8px) scale(1.08)';
    el.style.boxShadow = '0 15px 35px rgba(108,99,255,0.25)';
    el.style.borderColor = 'rgba(108,99,255,0.5)';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.boxShadow = '';
    el.style.borderColor = '';
  });
});

// ─── Contact form ─────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  const fb = document.getElementById('form-feedback');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
  btn.disabled = true;

  // TODO: aquí conecta con tu servicio de email (EmailJS, Formspree, etc.)
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check mr-2"></i>¡Mensaje enviado!';
    btn.style.background = 'linear-gradient(135deg,#00D9C0,#6C63FF)';
    fb.textContent = '✅ Gracias por contactarme. Te responderé pronto.';
    fb.className = 'text-center text-sm text-accent';
    fb.classList.remove('hidden');
    this.reset();
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>Enviar Mensaje';
      btn.disabled = false;
      btn.style.background = '';
      fb.classList.add('hidden');
    }, 4000);
  }, 1500);
});

// ─── Parallax effect on hero orbs ────────────────
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('#hero > div:not(#particles):not(.z-10)').forEach(orb => {
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

console.log('%c Jimmy Valdés Portfolio 🚀 ', 'background: linear-gradient(135deg,#6C63FF,#00D9C0); color: white; font-size: 16px; padding: 8px 16px; border-radius: 8px;');
