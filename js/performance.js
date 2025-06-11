// Performance Module
// ==================

const Performance = {
    init() {
        this.optimizeForMobile();
        this.setupReducedMotion();
        this.debounceScrollEvents();
        this.preloadCriticalResources();
    },

    optimizeForMobile() {
        if (window.innerWidth <= 768) {
            // Disable heavy animations on mobile
            document.body.classList.add('mobile-optimized');
            
            // Reduce particle count
            const particles = document.querySelectorAll('.cosmic-particle');
            particles.forEach((particle, index) => {
                if (index > 2) particle.remove();
            });
            
            // Reduce star count
            const stars = document.querySelectorAll('.star');
            stars.forEach((star, index) => {
                if (index > 30) star.remove();
            });
        }
    },

    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01s !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01s !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Listen for changes
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                this.setupReducedMotion();
            }
        });
    },

    debounceScrollEvents() {
        let scrollTimeout;
        let lastScrollY = window.scrollY;
        
        const optimizedScrollHandler = () => {
            const currentScrollY = window.scrollY;
            
            // Only process if scroll distance is significant
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
                lastScrollY = currentScrollY;
                
                // Process scroll-dependent effects
                this.updateScrollEffects(currentScrollY);
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Final scroll position processing
                this.finalizeScrollEffects(currentScrollY);
            }, 150);
        };
        
        window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    },

    updateScrollEffects(scrollY) {
        // Throttled scroll effects
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${Math.min(scrollY * 0.1, 10)}px)`;
        }
    },

    finalizeScrollEffects(scrollY) {
        // Final scroll position effects
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = '';
        }
    },

    preloadCriticalResources() {
        // Preload critical fonts
        const fontLinks = [
            'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
        ];
        
        fontLinks.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.crossOrigin = 'anonymous';
            link.href = href;
            document.head.appendChild(link);
        });
        
        // Preload next section images
        this.lazyPreloadImages();
    },

    lazyPreloadImages() {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                    const preloadImg = new Image();
                    preloadImg.src = img.dataset.src;
                });
            });
        }
    },

    // Utility: Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Utility: Debounce function
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
}; 