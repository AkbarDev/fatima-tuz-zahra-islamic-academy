// Backend API Configuration
const API_BASE_URL = 'http://localhost:5000/api';  // Change this to your deployed backend URL

// Contact Form Submission Handler
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                course: document.getElementById('course').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Send data to Python backend
                const response = await fetch(`${API_BASE_URL}/submit-contact`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.status === 'success') {
                    // Success
                    showNotification(result.message, 'success');
                    contactForm.reset();
                } else {
                    // Error from server
                    showNotification(result.message || 'An error occurred. Please try again.', 'error');
                }

            } catch (error) {
                // Network or connection error
                console.error('Form submission error:', error);
                showNotification('Unable to send message. Please check your internet connection and try again.', 'error');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
});

// Show notification to user
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification form-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    // Add to page
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.insertBefore(notification, contactSection.firstChild);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);

        // Scroll to notification
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
