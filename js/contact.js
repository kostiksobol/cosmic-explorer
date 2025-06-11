// Contact Form Module
// ===================

const ContactForm = {
    init() {
        this.setupFormHandling();
        this.setupFormValidation();
    },

    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
    },

    setupFormValidation() {
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation
        if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }
        
        // Message validation
        if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }
        
        this.displayFieldError(field, errorMessage);
        return isValid;
    },

    displayFieldError(field, message) {
        this.clearErrors(field);
        
        if (message) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    },

    clearErrors(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    },

    async handleFormSubmission(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showMessage('Please fix the errors above.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    },

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Randomly succeed or fail for demo purposes
                if (Math.random() > 0.1) {
                    console.log('Form submitted:', data);
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    },

    showMessage(text, type) {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = `form-message ${type}`;
        message.textContent = text;
        
        const form = document.getElementById('contact-form');
        form.parentNode.insertBefore(message, form);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
        
        this.addMessageStyles();
    },

    addMessageStyles() {
        if (document.querySelector('#contact-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'contact-styles';
        style.textContent = `
            .field-error {
                color: #ff6b6b;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: block;
            }
            
            .contact-form input.error,
            .contact-form textarea.error {
                border-color: #ff6b6b !important;
                box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
            }
            
            .form-message {
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                font-weight: 500;
            }
            
            .form-message.success {
                background: rgba(72, 187, 120, 0.1);
                border: 1px solid #48bb78;
                color: #48bb78;
            }
            
            .form-message.error {
                background: rgba(255, 107, 107, 0.1);
                border: 1px solid #ff6b6b;
                color: #ff6b6b;
            }
        `;
        document.head.appendChild(style);
    }
}; 