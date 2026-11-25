// ============================================================
// SCRIPT GLOBAL – Portfolio de Mattéo Varlet
// ============================================================

// ────────────────────────────────────────────────────────────
// 1. ÉTOILES DANS LE CIEL
// ────────────────────────────────────────────────────────────
function generateStars() {
    let starsContainer = document.getElementById('stars-container');
    if (!starsContainer) {
        starsContainer = document.createElement('div');
        starsContainer.id = 'stars-container';
        starsContainer.setAttribute('aria-hidden', 'true');
        document.body.prepend(starsContainer);
    }

    const starCount = 120;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random();
        if (size < 0.5) {
            star.className = 'star star-sm';
        } else if (size < 0.85) {
            star.className = 'star star-md';
        } else {
            star.className = 'star star-lg';
        }
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 75 + '%';
        star.style.animationDelay = (Math.random() * 5) + 's';
        star.style.animationDuration = (2 + Math.random() * 4) + 's';
        starsContainer.appendChild(star);
    }
}

generateStars();


// ────────────────────────────────────────────────────────────
// 2. VAGUES + KAYAK (injection globale)
// ────────────────────────────────────────────────────────────
$(document).ready(function () {

    // --- Injecter les vagues si absentes ---
    if ($('.water-waves').length === 0) {
        $('body').append(`
            <div class="water-waves">
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(0, 210, 255, 0.7)" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(0, 210, 255, 0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(0, 210, 255, 0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(0, 210, 255, 0.1)" />
                    </g>
                </svg>
            </div>
        `);
    }

    // --- Injecter le kayak ---
    if (!window.location.pathname.toLowerCase().includes('tp')) {
        if ($('#kayak-svg').length === 0) {
            $('body').append(`
                <div id="kayak-wrapper" aria-hidden="true">
                    <svg id="kayak-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 80" width="220" height="80">
                        <!-- Ombre/Eau sous le kayak -->
                        <ellipse cx="110" cy="68" rx="95" ry="5" fill="rgba(0,0,0,0.25)" />
                        <ellipse cx="110" cy="65" rx="85" ry="8" fill="rgba(0,210,255,0.15)" />
                        
                        <!-- Corps du kayak de Slalom (Gris / Profil affiné) -->
                        <path d="M20 55 C20 55 110 70 200 55 C200 55 110 48 20 55" fill="#888" /> <!-- Coque grise -->
                        <path d="M25 53 C25 53 110 62 195 53 C195 53 110 50 25 53" fill="#555" /> <!-- Ligne de flottaison / Ombre coque -->
                        
                        <!-- Cockpit (jupe de slalom) -->
                        <ellipse cx="110" cy="52" rx="30" ry="7" fill="#222" />
                        
                        <!-- Kayakiste – Corps & Gilet de Slalom Noir -->
                        <path d="M100 52 L120 52 L125 35 L95 35 Z" fill="#444" /> <!-- Combi grise -->
                        <path d="M98 35 L122 35 L124 48 L96 48 Z" fill="#111" /> <!-- Gilet de slalom noir -->
                        <rect x="104" y="36" width="12" height="2" rx="1" fill="#333" /> <!-- Détail gilet -->
                        
                        <!-- Kayakiste – Tête & Casque -->
                        <circle cx="110" cy="24" r="9" fill="#f4c97a" />
                        <path d="M101 22 Q110 8 119 22" fill="#555" /> <!-- Casque assorti -->
                        <path d="M101 22 L119 22 L119 18 L101 18 Z" fill="#555" />
                        <rect x="103" y="20" width="14" height="3" rx="1" fill="#00d2ff" /> <!-- Visière bleue (rappel accent primary) -->
                        
                        <!-- Kayakiste – Bras et Pagaie -->
                        <g class="paddle-rowing">
                            <!-- Bras -->
                            <path d="M100 38 L80 45 L70 50" stroke="#f4c97a" stroke-width="4" fill="none" stroke-linecap="round"/>
                            <path d="M120 38 L140 32 L150 28" stroke="#f4c97a" stroke-width="4" fill="none" stroke-linecap="round"/>
                            
                            <!-- Mains -->
                            <circle cx="70" cy="50" r="3" fill="#f4c97a" />
                            <circle cx="150" cy="28" r="3" fill="#f4c97a" />
                            
                            <!-- Pagaie Carbone -->
                            <line x1="60" y1="52" x2="160" y2="26" stroke="#111" stroke-width="3" stroke-linecap="round"/>
                            
                            <!-- Pale gauche (Carbone) -->
                            <path d="M62 48 L45 55 C42 57 45 62 50 60 L65 53 Z" fill="#000" />
                            
                            <!-- Pale droite (Carbone) -->
                            <path d="M158 30 L175 23 C178 21 175 16 170 18 L155 25 Z" fill="#000" />
                        </g>
                    </svg>
                </div>
            `);
        }

        const kayakWrapper = document.getElementById('kayak-wrapper');

        function scheduleNextKayak() {
            const waitTime = (8 + Math.random() * 17) * 1000;
            setTimeout(launchKayak, waitTime);
        }

        function launchKayak() {
            if (!kayakWrapper) return;
            const goingRight = Math.random() > 0.5;
            const duration = 6000 + Math.random() * 4000;
            const bottomOffset = 20 + Math.random() * 40;
            kayakWrapper.style.bottom = bottomOffset + 'px';
            kayakWrapper.style.display = 'block';
            kayakWrapper.style.opacity = '0';

            if (goingRight) {
                kayakWrapper.style.left = '-250px';
                kayakWrapper.style.transform = 'scaleX(1)';
            } else {
                kayakWrapper.style.left = (window.innerWidth + 20) + 'px';
                kayakWrapper.style.transform = 'scaleX(-1)';
            }

            kayakWrapper.style.transition = 'opacity 0.6s ease';
            setTimeout(() => { kayakWrapper.style.opacity = '1'; }, 50);
            kayakWrapper.style.transition = `left ${duration}ms linear, opacity 0.6s ease`;

            setTimeout(() => {
                if (goingRight) {
                    kayakWrapper.style.left = (window.innerWidth + 20) + 'px';
                } else {
                    kayakWrapper.style.left = '-250px';
                }
            }, 100);

            setTimeout(() => { kayakWrapper.style.opacity = '0'; }, duration - 600);
            setTimeout(() => {
                kayakWrapper.style.display = 'none';
                scheduleNextKayak();
            }, duration + 200);
        }

        const firstDelay = (3 + Math.random() * 7) * 1000;
        setTimeout(launchKayak, firstDelay);
    }


    // ────────────────────────────────────────────────────────────
    // 3. MÉTÉO ALÉATOIRE
    // ────────────────────────────────────────────────────────────
    if (Math.random() < 0.3) {
        $('body').addClass('storm-mode');
    }


    // ────────────────────────────────────────────────────────────
    // 4. HOMEPAGE – TYPING EFFECT
    // ────────────────────────────────────────────────────────────
    const typingEl = document.getElementById('typing-text');
    if (typingEl) {
        const phrases = ['Étudiant en BTS SIO', 'Passionné de systèmes & réseaux', 'Admin de machines virtuelles', 'Développeur web front-end'];
        let phraseIndex = 0, charIndex = 0, deleting = false;
        function typeLoop() {
            const current = phrases[phraseIndex];
            if (!deleting) {
                typingEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex === current.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
            } else {
                typingEl.textContent = current.slice(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
            }
            setTimeout(typeLoop, deleting ? 50 : 80);
        }
        typeLoop();
    }


    // ────────────────────────────────────────────────────────────
    // 5. HOMEPAGE – COMPTEURS ANIMÉS
    // ────────────────────────────────────────────────────────────
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseInt(el.dataset.target, 10);
            let current = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = current;
            }, 40);
        });
    }
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); observer.disconnect(); } });
        }, { threshold: 0.5 });
        observer.observe(statsSection);
    }

    // ────────────────────────────────────────────────────────────
    // 6. ANIMATION D'ENTRÉE DES CARTES
    // ────────────────────────────────────────────────────────────
    const revealItems = document.querySelectorAll('.skill-card, .timeline-item, .cta-card');
    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } });
        }, { threshold: 0.15 });
        revealItems.forEach(item => revealObserver.observe(item));
    }
});