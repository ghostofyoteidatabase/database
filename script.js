/* ================================================
   GHOST OF YŌTEI LEGENDS — script.js
   ================================================ */

// ---- PAGE NAVIGATION ----

function switchPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  // Show target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Highlight active nav link
  const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Close mobile nav
  closeMobileNav();
}

// ---- NAV LINKS ----

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    switchPage(page);
  });
});

// ---- HAMBURGER MENU ----

const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

function closeMobileNav() {
  navLinks.classList.remove('open');
  const spans = hamburger.querySelectorAll('span');
  spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  hamburger.setAttribute('aria-expanded', false);
}

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    closeMobileNav();
  }
});

// ---- NAVBAR SCROLL EFFECT ----

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ---- MODAL ----

const modalData = {
  build: {
    title: 'Contribute a Build',
    fields: [
      { type: 'text',     name: 'build_name',   placeholder: 'Build Name' },
      { type: 'select',   name: 'class',         options: ['Samurai', 'Archer', 'Mercenary', 'Shinobi'] },
      { type: 'text',     name: 'weapon',        placeholder: 'Weapon(s)' },
      { type: 'text',     name: 'techniques',    placeholder: 'Techniques (comma separated)' },
      { type: 'text',     name: 'gear',          placeholder: 'Gear (comma separated)' },
      { type: 'select',   name: 'mode',          options: ['PvE — Lethal', 'PvE — Stealth', 'PvE — Boss Killer', 'PvP — Speed', 'PvP — Aggro', 'PvP — Zoning'] },
      { type: 'text',     name: 'patch',         placeholder: 'Patch Version (e.g. v1.08)' },
      { type: 'textarea', name: 'notes',         placeholder: 'Notes / Tips (optional)' },
    ]
  },
  fit: {
    title: 'Contribute a Fit',
    fields: [
      { type: 'text',     name: 'fit_name',   placeholder: 'Fit Name / Drip Name' },
      { type: 'select',   name: 'class',      options: ['Samurai', 'Archer', 'Mercenary', 'Shinobi'] },
      { type: 'text',     name: 'head',       placeholder: 'Head Piece' },
      { type: 'text',     name: 'chest',      placeholder: 'Chest Piece' },
      { type: 'text',     name: 'hands',      placeholder: 'Hands / Gloves' },
      { type: 'text',     name: 'legs',       placeholder: 'Legs / Footwear' },
      { type: 'textarea', name: 'vibe',       placeholder: 'Describe the vibe / aesthetic' },
    ]
  },
  mechanic: {
    title: 'Contribute a Mechanic',
    fields: [
      { type: 'text',     name: 'mech_name',  placeholder: 'Mechanic Name' },
      { type: 'select',   name: 'type',       options: ['Movement Tech', 'Combat Tech', 'Stealth Tech', 'Utility Tech', 'Exploit', 'Other'] },
      { type: 'select',   name: 'class',      options: ['All Classes', 'Samurai', 'Archer', 'Mercenary', 'Shinobi'] },
      { type: 'text',     name: 'inputs',     placeholder: 'Input Sequence (e.g. Sprint → Square → Circle)' },
      { type: 'textarea', name: 'desc',       placeholder: 'Detailed description of the mechanic and its uses' },
      { type: 'select',   name: 'difficulty', options: ['Beginner', 'Intermediate', 'Advanced'] },
    ]
  }
};

function openModal(type) {
  const data = modalData[type];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;

  const form = document.getElementById('modal-form');
  form.innerHTML = '';

  data.fields.forEach(field => {
    let el;

    if (field.type === 'select') {
      el = document.createElement('select');
      field.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.toLowerCase().replace(/[^a-z0-9]/g, '_');
        option.textContent = opt;
        el.appendChild(option);
      });
    } else if (field.type === 'textarea') {
      el = document.createElement('textarea');
      el.placeholder = field.placeholder;
      el.rows = 3;
    } else {
      el = document.createElement('input');
      el.type = 'text';
      el.placeholder = field.placeholder;
    }

    el.name = field.name;
    form.appendChild(el);
  });

  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function submitContribution() {
  const form = document.getElementById('modal-form');
  const inputs = form.querySelectorAll('input, select, textarea');
  let allFilled = true;

  inputs.forEach(input => {
    const label = input.placeholder || input.name;
    if (!input.value.trim()) {
      allFilled = false;
      input.style.borderColor = 'var(--crimson-dim)';
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
  });

  if (!allFilled) {
    showToast('Please fill in all fields before submitting.', 'error');
    return;
  }

  showToast('Submission received! Thank you for contributing to the archive.', 'success');
  setTimeout(closeModal, 300);
}

// Close modal on overlay click
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ---- TOAST NOTIFICATION ----

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '✓' : '⚠'}</span>
    <span class="toast-msg">${message}</span>
  `;

  const style = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(80px);
    background: ${type === 'success' ? 'rgba(20,20,20,0.98)' : 'rgba(20,10,10,0.98)'};
    border: 1px solid ${type === 'success' ? 'rgba(60,160,60,0.4)' : 'rgba(180,20,20,0.4)'};
    color: ${type === 'success' ? '#70d070' : '#e06060'};
    padding: 1rem 1.8rem;
    border-radius: 8px;
    font-family: 'Cinzel', serif;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease;
    white-space: nowrap;
    max-width: 90vw;
    white-space: normal;
    text-align: center;
  `;
  toast.style.cssText = style;

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(80px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ---- SCROLL REVEAL ----

function initScrollReveal() {
  const revealTargets = [
    '.build-card',
    '.fit-card',
    '.mechanic-card',
    '.guide-card',
    '.class-card',
    '.info-card',
    '.patch-card',
    '.stat-item',
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = (el.style.transform || '') + ' translateY(24px)';
      el.style.transition = `opacity 0.6s ${i * 0.06}s ease, transform 0.6s ${i * 0.06}s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.35s ease, box-shadow 0.35s ease`;
      observer.observe(el);
    });
  });
}

// ---- LOGO CLICK ----

document.querySelector('.nav-logo').addEventListener('click', () => {
  switchPage('home');
});

// ---- INIT ----

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  // Ensure home is shown on load
  switchPage('home');
});
