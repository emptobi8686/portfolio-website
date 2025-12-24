document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const body = document.body;

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    navLinks.forEach(link => {
        // loose match in case href has ./ or /
        const href = link.getAttribute('href');
        if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
            link.classList.add('active');
        } else {
            // Also handle root
            if (currentPath === 'index.html' && href === 'index.html') {
                link.classList.add('active');
            }
        }
    });

    // Scroll Handler
    // Add 'scrolled' class when scrolled down > 20px
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            // Only remove if mobile menu is NOT open
            if (!mobileNav.classList.contains('active')) {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        const isActive = mobileNav.classList.contains('active');

        if (!isActive) {
            // Open
            mobileNav.classList.add('active');
            mobileToggle.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent background scrolling
            navbar.classList.add('scrolled'); // Ensure background is white when menu is open
        } else {
            // Close
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            body.style.overflow = '';

            // Re-check scroll position to determine if we should keep white bg
            if (window.scrollY <= 20) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Close menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileToggle.classList.remove('active');
            body.style.overflow = '';
            // Reset header style check
            if (window.scrollY <= 20) {
                navbar.classList.remove('scrolled');
            }
        });
    });
});
