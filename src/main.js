const darkMode = () => {
    const toggleButton = document.getElementById('toggleDarkMode');

    // Check localStorage for dark mode preference on page load
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.documentElement.classList.add('light-mode');
    }

    // Toggle dark mode
    toggleButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event propagation to mobile nav

        const isLightMode = document.documentElement.classList.toggle('light-mode');
        // Save the user's preference in localStorage
        if (isLightMode) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
};

const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    let isMobileNavOpen = false;

    // Mobile nav toggle functionality
    headerBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
    });

    // Close mobile nav when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        });
    });
};

// Initialize both features
darkMode();
mobileNav();
