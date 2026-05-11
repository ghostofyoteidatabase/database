// ===============================
// GameRoute Archive - script.js
// ===============================

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (window.scrollY > 40) {
        navbar.style.background = 'rgba(5,5,8,0.92)';
        navbar.style.borderBottom = '1px solid rgba(220,38,38,.25)';
    } else {
        navbar.style.background = 'rgba(5,5,8,.65)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,.05)';
    }

});

// Fade In Animation
const fadeElements = document.querySelectorAll(
    '.mission-card, .class-card, .trophy-card, .difficulty'
);

const fadeInObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0px)';

        }

    });

}, {
    threshold: 0.15
});

fadeElements.forEach(element => {

    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all .7s ease';

    fadeInObserver.observe(element);

});

// Hero Title Glow Animation
const heroTitle = document.querySelector('.hero-text h1 span');

setInterval(() => {

    heroTitle.style.textShadow =
        '0 0 20px rgba(220,38,38,.9), 0 0 40px rgba(220,38,38,.6)';

    setTimeout(() => {

        heroTitle.style.textShadow =
            '0 0 8px rgba(220,38,38,.5)';

    }, 1200);

}, 2500);

// Interactive Difficulty Hover
const difficulties = document.querySelectorAll('.difficulty');

difficulties.forEach(card => {

    card.addEventListener('mouseenter', () => {

        card.style.boxShadow =
            '0 0 25px rgba(220,38,38,.25)';

    });

    card.addEventListener('mouseleave', () => {

        card.style.boxShadow = 'none';

    });

});

// XP Progress Bars
const xpValues = [200, 400, 600, 800];
const xpContainer = document.createElement('div');

xpContainer.classList.add('xp-chart');

xpContainer.style.marginTop = '25px';

difficulties.forEach((card, index) => {

    const barWrapper = document.createElement('div');
    const bar = document.createElement('div');

    barWrapper.style.width = '100%';
    barWrapper.style.height = '10px';
    barWrapper.style.background = '#111827';
    barWrapper.style.borderRadius = '999px';
    barWrapper.style.marginTop = '12px';
    barWrapper.style.overflow = 'hidden';

    bar.style.height = '100%';
    bar.style.width = '0%';
    bar.style.borderRadius = '999px';
    bar.style.background = 'linear-gradient(90deg,#dc2626,#ef4444)';
    bar.style.transition = 'width 1.5s ease';

    barWrapper.appendChild(bar);
    card.appendChild(barWrapper);

    setTimeout(() => {

        const percentage = (xpValues[index] / 800) * 100;
        bar.style.width = `${percentage}%`;

    }, 500);

});

// Random Floating Background Particles
function createParticle() {

    const particle = document.createElement('div');

    particle.classList.add('particle');

    document.body.appendChild(particle);

    const size = Math.random() * 4 + 2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.position = 'fixed';
    particle.style.background = 'rgba(220,38,38,.4)';
    particle.style.borderRadius = '50%';

    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${window.innerHeight + 20}px`;

    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';

    particle.animate([

        {
            transform: 'translateY(0px)',
            opacity: 0
        },

        {
            opacity: .7
        },

        {
            transform: `translateY(-${window.innerHeight + 200}px)`,
            opacity: 0
        }

    ], {

        duration: Math.random() * 6000 + 6000,
        easing: 'linear'

    });

    setTimeout(() => {

        particle.remove();

    }, 12000);

}

setInterval(createParticle, 450);

// Trophy Hover Glow
const trophies = document.querySelectorAll('.trophy-card');

trophies.forEach(card => {

    card.addEventListener('mouseenter', () => {

        card.style.boxShadow =
            '0 0 30px rgba(250,204,21,.25)';

    });

    card.addEventListener('mouseleave', () => {

        card.style.boxShadow = 'none';

    });

});

// Mission Card Tilt Effect
const missionCards = document.querySelectorAll('.mission-card');

missionCards.forEach(card => {

    card.addEventListener('mousemove', e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });

    card.addEventListener('mouseleave', () => {

        card.style.transform =
            'perspective(1000px) rotateX(0deg) rotateY(0deg)';

    });

});

// Console Welcome Message
console.log(`
========================================
 GameRoute Archive Initialized
 Ghost of Yōtei Legends Database
========================================
`);
