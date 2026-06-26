/* =========================================
   MAIN.JS - Kushani De Silva Portfolio
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== 1. Loading Screen Logic =====
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const mainContent = document.getElementById('main-content');

    // Simulate loading time (2.5 seconds)
    setTimeout(() => {
        if (loader) {
            loader.classList.add('hidden');
            
            // Show main content after loader fades out
            setTimeout(() => {
                if (navbar) navbar.style.display = 'block';
                if (mainContent) mainContent.style.display = 'block';
                
                // Trigger initial animations
                initAnimations();
            }, 500); // Matches CSS transition time
        }
    }, 2500);

    // ===== 2. Mobile Navigation Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== 3. Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                // Offset for sticky navbar
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 4. Animated Counters =====
    function animateCounter(element) {
        const target = parseFloat(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const frameRate = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameRate);
        const increment = target / totalFrames;
        let current = 0;
        const isDecimal = target % 1 !== 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }, frameRate);
    }

    // ===== 5. Intersection Observer for Scroll Animations =====
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Trigger counter animation if it's a stat
                    if (entry.target.classList.contains('stat')) {
                        const counter = entry.target.querySelector('.stat-number');
                        if (counter && !counter.classList.contains('animated')) {
                            counter.classList.add('animated');
                            animateCounter(counter);
                        }
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-category, .exp-card, .stat, .highlight'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ===== 6. Particle Animation System =====
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Add particle styles dynamically
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .particle {
            position: absolute;
            background: rgba(220, 38, 38, 0.4);
            border-radius: 50%;
            pointer-events: none;
            animation: floatParticle linear infinite;
        }
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}50px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    createParticles();

    // ===== 7. Navbar Scroll Effect =====
    let lastScroll = 0;
    const navbarElement = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbarElement) {
            if (currentScroll > 50) {
                navbarElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                navbarElement.style.background = 'rgba(5, 5, 5, 0.98)';
            } else {
                navbarElement.style.boxShadow = 'none';
                navbarElement.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // ===== 8. Glitch Text Effect for Loader =====
    const glitchText = document.querySelector('.loader-glitch');
    if (glitchText) {
        const originalText = glitchText.textContent;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        
        let iteration = 0;
        const interval = setInterval(() => {
            glitchText.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) clearInterval(interval);
            iteration += 1/3;
        }, 30);
    }
});