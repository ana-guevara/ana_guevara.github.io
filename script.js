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

// Bubbles animation for hero section background
(function() {
    const canvas = document.getElementById('hero-bubbles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let bubbles = [];
    let mouse = { x: null, y: null };
    let isMobile = window.matchMedia("(max-width: 768px)").matches;

    function resizeCanvas() {
        const hero = document.querySelector('.hero');
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
        isMobile = window.matchMedia("(max-width: 768px)").matches;
    }

    function randomColor() {
        const colors = [
            'rgba(191,134,224,0.25)',
            'rgba(149,84,190,0.25)',
            'rgba(255,255,255,0.18)',
            'rgba(138,91,167,0.22)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function createBubbles(num) {
        bubbles = [];
        for (let i = 0; i < num; i++) {
            bubbles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: isMobile ? 14 + Math.random() * 12 : 24 + Math.random() * 32,
                dx: (Math.random() - 0.5) * (isMobile ? 0.2 : 1.2),
                dy: (Math.random() - 0.5) * (isMobile ? 0.2 : 1.2),
                color: randomColor()
            });
        }
    }

    function drawBubbles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bubbles.forEach(bubble => {
            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
            ctx.fillStyle = bubble.color;
            ctx.fill();
        });
    }

    function animateBubbles() {
        bubbles.forEach(bubble => {
            bubble.x += bubble.dx;
            bubble.y += bubble.dy;

            // Bounce off edges
            if (bubble.x < bubble.r || bubble.x > canvas.width - bubble.r) bubble.dx *= -1;
            if (bubble.y < bubble.r || bubble.y > canvas.height - bubble.r) bubble.dy *= -1;

            // Mouse interaction: only on desktop
            if (!isMobile && mouse.x !== null && mouse.y !== null) {
                const dist = Math.hypot(mouse.x - bubble.x, mouse.y - bubble.y);
                if (dist < bubble.r + 40) {
                    const angle = Math.atan2(bubble.y - mouse.y, bubble.x - mouse.x);
                    bubble.dx += Math.cos(angle) * 2.5;
                    bubble.dy += Math.sin(angle) * 2.5;
                }
            }

            bubble.dx *= 0.98;
            bubble.dy *= 0.98;
        });
        drawBubbles();
        requestAnimationFrame(animateBubbles);
    }

    // Mouse events only on desktop
    if (!isMobile) {
        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', function() {
            mouse.x = null;
            mouse.y = null;
        });
    }

    window.addEventListener('resize', () => {
        resizeCanvas();
        createBubbles(isMobile ? 8 : 22);
    });

    setTimeout(() => {
        resizeCanvas();
        createBubbles(isMobile ? 8 : 22);
        animateBubbles();
    }, 300);
})();

// Mobile navbar toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.navbar-toggle');
    const links = document.querySelector('.navbar-links');
    if (toggle && links) {
        toggle.addEventListener('click', function(e) {
            e.stopPropagation();
            links.classList.toggle('active');
        });
        // Close menu when a link is clicked (mobile UX)
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                links.classList.remove('active');
            });
        });
    }
});

// Close menu if user clicks outside the menu
document.addEventListener('click', function(e) {
    const links = document.querySelector('.navbar-links');
    const toggle = document.querySelector('.navbar-toggle');
    if (links && toggle && links.classList.contains('active')) {
        if (!links.contains(e.target) && !toggle.contains(e.target)) {
            links.classList.remove('active');
        }
    }
});