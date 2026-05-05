// script.js

// Générer les étoiles scintillantes
function generateStars() {
    const starsContainer = document.getElementById('stars-container');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

generateStars();

// Logique Globale du Portfolio
$(document).ready(function () {
    
    // 1. Injecter les Vagues et le Kayak sur TOUTES les pages
    if ($('.water-waves').length === 0) {
        $('body').append(`
            <div class="water-waves">
                <div class="kayaker">🚣</div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
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
    } else {
        // Si les vagues sont déjà là (sur tp.html par ex), on ajoute juste le kayak
        if ($('.kayaker').length === 0) {
            $('.water-waves').prepend('<div class="kayaker">🚣</div>');
        }
    }

    // 2. Météo Aléatoire (Pluie et Orage - 30% de chance)
    // "parfois de la pluie ou orage"
    if (Math.random() < 0.3) {
        $('body').addClass('storm-mode');
    }

});