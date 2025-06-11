// Cosmic Explorer - Main JavaScript Entry Point
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌌 Cosmic Explorer Initializing...');
    
    // Initialize all modules
    Navigation.init();
    Animation.init();
    Gallery.init();
    ContactForm.init();
    Performance.init();
    
    console.log('🚀 Cosmic Explorer Ready!');
});

// Performance tracking
window.addEventListener('load', () => {
    if ('performance' in window) {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    }
}); 