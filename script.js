document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.querySelector('i').classList.toggle('fa-bars');
            menuIcon.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
        });

        // Close navbar when a link is clicked (for mobile)
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.querySelector('i').classList.add('fa-bars');
                menuIcon.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // Static Typing Text (no animation, just cursor blink)
    // The cursor animation is handled purely by CSS on #static-typing-word::after.

    // ScrollReveal for animations - Animatsiya tezligi sekinlashtirildi
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 1800, // Davomiylik oshirildi (sekinroq)
        delay: 200,    // Kechikish oshirildi (sekinroq)
        easing: 'cubic-bezier(.68,-0.55,.27,1.55)' // Jozibaliroq animatsiya egri chizig'i
    });

    // Apply animations to elements
    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.services-container, .skills-container, .education-container, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .home-content p', { origin: 'left' });
    ScrollReveal().reveal('.social-icons, .btn', { origin: 'left' });


    // Language Toggle
    const languageToggle = document.getElementById('language-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-uz], [data-en-placeholder], [data-uz-placeholder], [data-en-value], [data-uz-value], [data-en-prefix], [data-uz-prefix], [data-en-word], [data-uz-word]');
    let isEnglish = true; // Default language

    function setLanguage(lang) {
        elementsToTranslate.forEach(element => {
            if (lang === 'en') {
                if (element.dataset.en) {
                    element.innerHTML = element.dataset.en;
                }
                if (element.dataset.enPlaceholder && element.placeholder !== undefined) {
                    element.placeholder = element.dataset.enPlaceholder;
                }
                if (element.dataset.enValue && element.value !== undefined) {
                    element.value = element.dataset.enValue;
                }
                if (element.dataset.enPrefix && element.id === 'base-typing-text-prefix') {
                    element.textContent = element.dataset.enPrefix;
                }
                if (element.dataset.enWord && element.id === 'static-typing-word') {
                    element.textContent = element.dataset.enWord;
                }
            } else { // UZ
                if (element.dataset.uz) {
                    element.innerHTML = element.dataset.uz;
                }
                if (element.dataset.uzPlaceholder && element.placeholder !== undefined) {
                    element.placeholder = element.dataset.uzPlaceholder;
                }
                if (element.dataset.uzValue && element.value !== undefined) {
                    element.value = element.dataset.uzValue;
                }
                if (element.dataset.uzPrefix && element.id === 'base-typing-text-prefix') {
                    element.textContent = element.dataset.uzPrefix;
                }
                if (element.dataset.uzWord && element.id === 'static-typing-word') {
                    element.textContent = element.dataset.uzWord;
                }
            }
        });

        // Update active class on button text
        const langEnBtn = document.getElementById('lang-en-btn');
        const langUzBtn = document.getElementById('lang-uz-btn');

        if (lang === 'en') {
            languageToggle.classList.add('active'); // Add active for EN
            langEnBtn.style.color = 'var(--primary-color)';
            langUzBtn.style.color = 'var(--text-color)';
        } else {
            languageToggle.classList.remove('active'); // Remove active for UZ
            langEnBtn.style.color = 'var(--text-color)';
            langUzBtn.style.color = 'var(--primary-color)';
        }
    }

    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            isEnglish = !isEnglish;
            setLanguage(isEnglish ? 'en' : 'uz');
        });
    }

    // Set initial language
    setLanguage('en'); // Set to English by default on load
});