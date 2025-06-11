// Gallery Module
// ==============

const Gallery = {
    init() {
        this.setupImageLazyLoading();
        this.setupImageModal();
        this.preloadImages();
    },

    setupImageLazyLoading() {
        const images = document.querySelectorAll('.gallery-item img');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                img.dataset.src = img.src;
                img.src = '';
                img.classList.add('loading');
                imageObserver.observe(img);
            });
        } else {
            // Fallback: load all images immediately
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                }
            });
        }
    },

    setupImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        let modal = null;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const img = item.querySelector('img');
                this.openModal(img.src, img.alt);
            });
        });
        
        // Add modal styles
        this.addModalStyles();
    },

    openModal(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <img src="${src}" alt="${alt}" class="modal-image">
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => modal.classList.add('active'), 10);
        
        // Close handlers
        const closeModal = () => this.closeModal(modal);
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });
    },

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    },

    addModalStyles() {
        if (document.querySelector('#modal-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .gallery-item img.loading {
                background: linear-gradient(90deg, #333 0%, #555 50%, #333 100%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
            
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .image-modal.active {
                opacity: 1;
                visibility: visible;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 2rem;
            }
            
            .modal-content {
                position: relative;
                max-width: 90vw;
                max-height: 90vh;
            }
            
            .modal-image {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(157, 78, 221, 0.3);
            }
            
            .modal-close {
                position: absolute;
                top: -40px;
                right: -10px;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 0.5rem;
                transition: transform 0.2s ease;
            }
            
            .modal-close:hover {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
    },

    preloadImages() {
        const images = document.querySelectorAll('.gallery-item img');
        images.forEach(img => {
            const link = new Image();
            link.src = img.src;
        });
    }
}; 