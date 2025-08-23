// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button functionality
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // You can add navigation highlighting logic here if you add a navigation menu later
    
    // Show or hide back to top button based on scroll position
    const backToTopButton = document.querySelector('.back-to-top');
    if (scrollPosition > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0.5';
    }
});

// Simple animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize any animations or effects when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure hero section animations play
    const heroElements = document.querySelectorAll('.hero h1, .hero .title, .hero p');
    heroElements.forEach(element => {
        element.style.opacity = '0';
    });
    
    // Force a reflow to ensure animations play
    setTimeout(() => {
        heroElements.forEach(element => {
            element.style.opacity = '';
        });
    }, 100);
    
    console.log('Portfolio website loaded successfully!');

    // Add smooth hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                const headerOffset = 80; // Adjust this value based on your header height if you have a fixed header
                
                window.scrollTo({
                    top: offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add smooth scrolling for mouse wheel
    let isScrolling;
    window.addEventListener('wheel', function(e) {
        window.clearTimeout(isScrolling);
        
        isScrolling = setTimeout(function() {
            const currentScroll = window.pageYOffset;
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (currentScroll >= sectionTop - 100 && 
                    currentScroll < sectionTop + sectionHeight - 100) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });
        }, 66);
    }, { passive: true });
});

// Add this new function to handle animation reset on page refresh
window.addEventListener('beforeunload', function() {
    const heroElements = document.querySelectorAll('.hero h1, .hero .title, .hero p');
    heroElements.forEach(element => {
        element.style.animation = 'none';
    });
});

// Highlight active navbar link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});