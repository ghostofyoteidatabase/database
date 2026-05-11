// =========================================
// GameRoute Archive - Cinematic UI Script
// =========================================

// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        nav.style.background = "rgba(0,0,0,.72)";
        nav.style.borderBottom = "1px solid rgba(220,38,38,.18)";
        nav.style.backdropFilter = "blur(22px)";

    } else {

        nav.style.background = "rgba(0,0,0,.28)";
        nav.style.borderBottom = "1px solid rgba(255,255,255,.04)";

    }

});

// ===============================
// MISSION CARD ACTIVE EXPANSION
// ===============================

const missionCards = document.querySelectorAll(".mission-card");

missionCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        missionCards.forEach(otherCard => {

            otherCard.style.filter = "brightness(.45)";
            otherCard.style.transform = "scale(.97)";

        });

        card.style.filter = "brightness(1)";
        card.style.transform = "scale(1.02)";
        card.style.zIndex = "5";

    });

    card.addEventListener("mouseleave", () => {

        missionCards.forEach(otherCard => {

            otherCard.style.filter = "brightness(1)";
            otherCard.style.transform = "scale(1)";
            otherCard.style.zIndex = "1";

        });

    });

});

// ===============================
// MOUSE LIGHT EFFECT
// ===============================

missionCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.backgroundPosition =
        `${50 + (x / rect.width) * 8}% ${50 + (y / rect.height) * 8}%`;

        card.style.boxShadow =
        `${(x - rect.width/2)/18}px ${(y - rect.height/2)/18}px 50px rgba(0,0,0,.6)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.backgroundPosition = "center";
        card.style.boxShadow = "0 15px 40px rgba(0,0,0,.35)";

    });

});

// ===============================
// HERO TITLE PARALLAX
// ===============================

const heroTitle = document.querySelector(".hero h1");

window.addEventListener("mousemove", e => {

    const x = (window.innerWidth / 2 - e.pageX) / 60;
    const y = (window.innerHeight / 2 - e.pageY) / 60;

    heroTitle.style.transform =
    `translate(${x}px, ${y}px)`;

});

// ===============================
// BUTTON HOVER GLOW
// ===============================

const buttons = document.querySelectorAll(
    ".primary-btn, .secondary-btn"
);

buttons.forEach(btn => {

    btn.addEventListener("mousemove", e => {

        const rect = btn.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        btn.style.backgroundImage =
        `radial-gradient(circle at ${x}px ${y}px,
        rgba(255,255,255,.16),
        transparent 40%)`;

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.backgroundImage = "none";

    });

});

// ===============================
// FLOATING PARTICLES
// ===============================

function createParticle(){

    const particle = document.createElement("div");

    particle.classList.add("particle");

    document.body.appendChild(particle);

    const size = Math.random() * 5 + 2;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.position = "fixed";
    particle.style.borderRadius = "50%";

    particle.style.background =
    `rgba(220,38,38,${Math.random() * .5})`;

    particle.style.left =
    `${Math.random() * window.innerWidth}px`;

    particle.style.top =
    `${window.innerHeight + 50}px`;

    particle.style.pointerEvents = "none";
    particle.style.zIndex = "-1";

    particle.animate([

        {
            transform:"translateY(0px)",
            opacity:0
        },

        {
            opacity:1
        },

        {
            transform:`translateY(-${window.innerHeight + 300}px)`,
            opacity:0
        }

    ],{

        duration:Math.random() * 7000 + 5000,
        easing:"linear"

    });

    setTimeout(() => {

        particle.remove();

    },12000);

}

setInterval(createParticle, 180);

// ===============================
// SCROLL FADE-IN
// ===============================

const fadeElements = document.querySelectorAll(
    ".mission-card, .section-top"
);

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform =
            "translateY(0px)";

        }

    });

},{
    threshold:.15
});

fadeElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(70px)";
    el.style.transition =
    "all 1s cubic-bezier(.2,.8,.2,1)";

    observer.observe(el);

});

// ===============================
// AUTO GLOW PULSE
// ===============================

const glow = document.querySelector(".glow");

setInterval(() => {

    glow.animate([

        {
            opacity:.55,
            transform:"scale(1)"
        },

        {
            opacity:.9,
            transform:"scale(1.12)"
        },

        {
            opacity:.55,
            transform:"scale(1)"
        }

    ],{

        duration:4000

    });

},4000);

// ===============================
// TYPEWRITER EFFECT
// ===============================

const heroSub = document.querySelector(".hero-sub");

const originalText = heroSub.innerText;

heroSub.innerText = "";

let i = 0;

function typeText(){

    if(i < originalText.length){

        heroSub.innerText += originalText.charAt(i);

        i++;

        setTimeout(typeText,45);

    }

}

typeText();

// ===============================
// CONSOLE MESSAGE
// ===============================

console.log(`
===========================================
 GameRoute Archive Initialized
 Ghost of Yōtei Legends Database
 Cinematic UI Loaded
===========================================
`);
