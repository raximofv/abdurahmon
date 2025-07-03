document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.querySelector('i').classList.toggle('fa-bars');
            menuIcon.querySelector('i').classList.toggle('fa-times');
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.querySelector('i').classList.add('fa-bars');
                menuIcon.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    ScrollReveal({
        reset: true,
        distance: '50px',
        duration: 700,
        delay: 70,
        easing: 'cubic-bezier(.68,-0.55,.27,1.55)'
    });

    ScrollReveal().reveal('.home-content h1, .home-content p', { origin: 'left' });
    ScrollReveal().reveal('.typing-text-animated-container', { origin: 'left', delay: 150 });
    ScrollReveal().reveal('.social-icons, .btn', { origin: 'left', delay: 250 });
    ScrollReveal().reveal('.heading', { origin: 'top' });
    ScrollReveal().reveal('.projects-container, .skills-container, .education-container, .contact form', { origin: 'bottom' });

    const animatedTypingWord = document.getElementById('animated-typing-word');
    const wordsRu = ["Создаю веб-сайты", "Full stack разработчик"];
    const wordsEn = ["I build web-sites", "Full stack developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let currentLanguageWords = wordsEn;
    let typeWriterTimeout;

    function typeWriter() {
        const currentWord = currentLanguageWords[wordIndex];
        let displayedText = currentWord.substring(0, charIndex);
        animatedTypingWord.textContent = displayedText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            typeWriterTimeout = setTimeout(typeWriter, 80);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typeWriterTimeout = setTimeout(typeWriter, 30);
        } else {
            isDeleting = !isDeleting;
            wordIndex = !isDeleting ? (wordIndex + 1) % currentLanguageWords.length : wordIndex;
            typeWriterTimeout = setTimeout(typeWriter, 700);
        }
    }

    const languageToggle = document.getElementById('language-toggle');
    const langEnBtn = document.getElementById('lang-en-btn');
    const langRuBtn = document.getElementById('lang-ru-btn');

    const elementsToTranslate = document.querySelectorAll('[data-en], [data-ru], [data-en-placeholder], [data-ru-placeholder], [data-en-value], [data-ru-value]');
    
    let currentLang = localStorage.getItem('portfolioLang') || 'en'; 

    function setLanguage(lang) {
        clearTimeout(typeWriterTimeout);

        elementsToTranslate.forEach(element => {
            const dataKey = lang === 'en' ? 'en' : 'ru';
            const dataPlaceholderKey = lang === 'en' ? 'enPlaceholder' : 'ruPlaceholder';
            const dataValueKey = lang === 'en' ? 'enValue' : 'ruValue';

            if (element.dataset[dataKey]) {
                if (element.tagName === 'TITLE') {
                    document.title = element.dataset[dataKey];
                } else {
                    element.innerHTML = element.dataset[dataKey];
                }
            }
            if (element.dataset[dataPlaceholderKey] && element.placeholder !== undefined) {
                element.placeholder = element.dataset[dataPlaceholderKey];
            }
            if (element.dataset[dataValueKey] && element.value !== undefined) {
                element.value = element.dataset[dataValueKey];
            }
        });

        currentLanguageWords = lang === 'en' ? wordsEn : wordsRu;
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typeWriter();

        if (lang === 'en') {
            languageToggle.classList.add('active');
            langEnBtn.style.color = 'var(--primary-color)';
            langRuBtn.style.color = 'var(--text-color)';
        } else {
            languageToggle.classList.remove('active');
            langEnBtn.style.color = 'var(--text-color)';
            langRuBtn.style.color = 'var(--primary-color)';
        }
    }

    setLanguage(currentLang);

    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLang = (currentLang === 'en') ? 'ru' : 'en';
            localStorage.setItem('portfolioLang', currentLang);
            setLanguage(currentLang);
        });
    }

    const customCursorCircle = document.querySelector('.custom-cursor-circle');
    const customCursorDot = document.querySelector('.custom-cursor-dot');

    let mouseX = 0, mouseY = 0;
    let circleX = 0, circleY = 0;
    const easeFactor = 0.08;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        customCursorDot.style.left = mouseX + 'px';
        customCursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        circleX += (mouseX - circleX) * easeFactor;
        circleY += (mouseY - circleY) * easeFactor;

        customCursorCircle.style.left = circleX + 'px';
        customCursorCircle.style.top = circleY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, input[type="submit"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            customCursorCircle.style.borderColor = 'transparent';
            customCursorCircle.style.backgroundColor = 'rgba(247, 135, 0, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            customCursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursorCircle.style.borderColor = 'var(--primary-color)';
            customCursorCircle.style.backgroundColor = 'transparent';
        });
    });
});
