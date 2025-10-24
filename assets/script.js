/**
 * Portfolio Website JavaScript
 * Author: Kenlee C. Tapasao
 * Date: 2025-10-20
 */

// ==========================================
// Navbar Scroll Effect
// ==========================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// Typing Effect for Hero Section
// ==========================================
const typedTextSpan = document.querySelector('.typed-text');

if (typedTextSpan) {
    const textArray = [
        'BSIT Student',
        'Tech Enthusiast',
        'Problem Solver',
        'Future Developer'
    ];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(type, newTextDelay + 250);
    });
}

// ==========================================
// Animated Progress Bars (Skills Page)
// ==========================================
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Trigger animation when page loads
window.addEventListener('load', function() {
    if (document.querySelector('.skills-section')) {
        setTimeout(animateProgressBars, 500);
    }
});

// ==========================================
// Gallery Filter Functionality
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filterValue)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
});

// ==========================================
// Contact Form Handling
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (name && email && subject && message) {
            // Create mailto link
            const mailtoLink = `mailto:tapasao.kenlee@edu.ph?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            alert('Thank you for your message! Your email client will open to send the message.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// ==========================================
// Scroll Animation for Elements
// ==========================================
function scrollAnimation() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .contact-info-card, .tech-card, .gallery-item');
    
    elements.forEach(element => {
        const elementPos = element.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.2;
        
        if (elementPos < screenPos) {
            element.classList.add('scroll-animate', 'active');
        }
    });
}

window.addEventListener('scroll', scrollAnimation);
window.addEventListener('load', scrollAnimation);

// ==========================================
// Back to Top Button
// ==========================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.classList.add('back-to-top');

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// Page Load Animation
// ==========================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ==========================================
// Console Message
// ==========================================
console.log('%c Portfolio Website ', 'background: #4facfe; color: white; font-size: 20px; padding: 10px;');
console.log('%c Developed by Kenlee C. Tapasao ', 'background: #667eea; color: white; font-size: 14px; padding: 5px;');
console.log('%c GitHub: @ktapasao3-ai ', 'background: #2c3e50; color: white; font-size: 12px; padding: 5px;');
