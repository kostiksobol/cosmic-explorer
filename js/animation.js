// Animation Module
// ================

const Animation = {
    init() {
        this.createStarField();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        
        // Initialize cosmic particles after load
        window.addEventListener('load', () => {
            setTimeout(() => this.createCosmicParticles(), 1000);
        });
    },

    createStarField() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;
        
        // Create 100 twinkling stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 3 + 1}s infinite;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            heroBackground.appendChild(star);
        }
        
        this.addStarStyles();
    },

    addStarStyles() {
        if (document.querySelector('#starfield-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'starfield-styles';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    },

    createCosmicParticles() {
        if (window.innerWidth <= 768) return; // Skip on mobile for performance
        
        const sections = document.querySelectorAll('.about, .gallery, .contact');
        
        sections.forEach(section => {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'cosmic-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(157, 78, 221, ${Math.random() * 0.5 + 0.3});
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 10 + 15}s infinite linear;
                    pointer-events: none;
                `;
                section.appendChild(particle);
            }
        });
        
        this.addParticleStyles();
    },

    addParticleStyles() {
        if (document.querySelector('#particle-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    },

    setupScrollAnimations() {
        if (!window.IntersectionObserver) {
            // Fallback for older browsers
            const elements = document.querySelectorAll('.section-title, .about-content p, .gallery-item');
            elements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
            return;
        }

        const animateElements = document.querySelectorAll('.section-title, .about-content p, .gallery-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            observer.observe(element);
        });
        
        this.addScrollAnimationStyles();
    },

    addScrollAnimationStyles() {
        if (document.querySelector('#scroll-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'scroll-animations';
        style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    },

    setupParallaxEffects() {
        let ticking = false;
        
        const updateParallax = () => {
            if (window.innerWidth <= 768) return; // Skip on mobile
            
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground) {
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
}; 