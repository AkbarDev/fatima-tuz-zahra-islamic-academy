document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle Mobile Menu
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Animate Icon
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // Smooth Scroll for Anchor Links (Polyfill for older browsers if needed, but CSS scroll-behavior handles most)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Azan Audio Logic
    const welcomeModal = document.getElementById('welcome-modal');
    const playAzanBtn = document.getElementById('play-azan-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const azanAudio = document.getElementById('azan-audio');

    // Check if we should show the modal (using sessionStorage so it resets per session)
    if (!sessionStorage.getItem('azanDecisionMade')) {
        // Show modal after a short delay for better UX
        setTimeout(() => {
            welcomeModal.classList.add('active');
        }, 1000);
    }

    playAzanBtn.addEventListener('click', () => {
        azanAudio.play().then(() => {
            console.log('Azan playing');
        }).catch(error => {
            console.error('Audio playback failed:', error);
        });
        welcomeModal.classList.remove('active');
        sessionStorage.setItem('azanDecisionMade', 'true');
    });

    closeModalBtn.addEventListener('click', () => {
        welcomeModal.classList.remove('active');
        sessionStorage.setItem('azanDecisionMade', 'true');
    });
});
