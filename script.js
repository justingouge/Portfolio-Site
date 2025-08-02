// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScrolling();
    initTypingEffect();
    initStarryBackground();
    initThemeToggle();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special animation for stats
                if (entry.target.classList.contains('stat')) {
                    animateCounter(entry.target);
                }
                
                // Special animation for skill items
                if (entry.target.classList.contains('skill-category')) {
                    animateSkills(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.stat, .skill-category, .project-card, .timeline-item');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Counter animation for stats
function animateCounter(element) {
    // Check if this counter has already been animated
    if (element.hasAttribute('data-animated')) {
        return;
    }
    
    // Mark as animated to prevent future animations
    element.setAttribute('data-animated', 'true');
    
    const counter = element.querySelector('h3');
    const originalText = counter.textContent;
    const target = parseInt(originalText);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    // Start from 0
    counter.textContent = '0';

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            counter.textContent = originalText; // Restore original text (e.g., "6+", "3")
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 16);
}

// Skill items animation
function animateSkills(skillCategory) {
    const skillItems = skillCategory.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    // Define the text parts separately to avoid HTML tag issues
    const textParts = [
        { text: "Hi, I'm ", isHighlight: false },
        { text: "Justin Gouge", isHighlight: true }
    ];
    
    heroTitle.innerHTML = '';
    
    let partIndex = 0;
    let charIndex = 0;
    
    const typeWriter = () => {
        if (partIndex < textParts.length) {
            const currentPart = textParts[partIndex];
            
            if (charIndex < currentPart.text.length) {
                // Add character by character
                if (charIndex === 0) {
                    // Start of a new part
                    if (currentPart.isHighlight) {
                        heroTitle.innerHTML += '<span class="highlight">';
                    }
                }
                
                const char = currentPart.text.charAt(charIndex);
                if (currentPart.isHighlight) {
                    // Find the span and add to it
                    const span = heroTitle.querySelector('.highlight:last-child');
                    if (span) {
                        span.textContent += char;
                    }
                } else {
                    heroTitle.innerHTML += char;
                }
                
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                // Finished current part
                if (currentPart.isHighlight) {
                    heroTitle.innerHTML += '</span>';
                }
                partIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 100);
            }
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
        
        // Apply same parallax effect to hero image
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    }
});

// Project card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skills hover animation
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
});

// Loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        color: white;
        font-family: 'Inter', sans-serif;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    `;
    
    // Add spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loader-content {
            text-align: center;
        }
    `;
    
    document.head.appendChild(style);
    
    // Show loader briefly on first load
    if (!sessionStorage.getItem('visited')) {
        document.body.appendChild(loader);
        loader.style.opacity = '1';
        loader.style.pointerEvents = 'all';
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
                style.remove();
            }, 300);
        }, 1500);
        
        sessionStorage.setItem('visited', 'true');
    }
});

// Scroll to top functionality
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top functionality
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = window.scrollY > 300 ? 'translateY(0) scale(1)' : 'translateY(100px) scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTop);

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Any scroll-heavy operations can go here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Animated Background (Stars for dark mode, Clouds for light mode)
function initStarryBackground() {
    // Remove any existing background containers
    const existingStars = document.querySelector('.stars');
    const existingClouds = document.querySelector('.clouds');
    if (existingStars) existingStars.remove();
    if (existingClouds) existingClouds.remove();
    
    // Create stars container for dark mode
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    starsContainer.id = 'stars';
    
    // Create clouds container for light mode
    const cloudsContainer = document.createElement('div');
    cloudsContainer.className = 'clouds';
    cloudsContainer.id = 'clouds';
    
    // Insert at the beginning of body
    document.body.insertBefore(starsContainer, document.body.firstChild);
    document.body.insertBefore(cloudsContainer, document.body.firstChild);
    
    // Create regular stars for dark mode
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (1-4px)
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random animation duration
        star.style.animationDuration = (Math.random() * 4 + 2) + 's';
        
        // Random delay
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starsContainer.appendChild(star);
    }
    
    // Create clouds for light mode
    for (let i = 0; i < 8; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Random position
        cloud.style.left = Math.random() * 120 - 10 + '%'; // Allow clouds to start off-screen
        cloud.style.top = Math.random() * 60 + 10 + '%'; // Keep clouds in upper portion
        
        // Random size
        const scale = Math.random() * 0.8 + 0.5; // 0.5 to 1.3 scale
        cloud.style.transform = `scale(${scale})`;
        
        // Random animation duration
        cloud.style.animationDuration = (Math.random() * 40 + 60) + 's'; // 60-100s for slow drift
        
        // Random delay
        cloud.style.animationDelay = Math.random() * 20 + 's';
        
        cloudsContainer.appendChild(cloud);
    }
    
    // Create sun for light mode
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.id = 'sun';
    
    // Random position in upper portion of screen
    sun.style.left = Math.random() * 70 + 15 + '%'; // 15% to 85% from left
    sun.style.top = Math.random() * 30 + 10 + '%'; // 10% to 40% from top
    
    cloudsContainer.appendChild(sun);
    
    // Create moon for dark mode
    const moon = document.createElement('div');
    moon.className = 'moon';
    moon.id = 'moon';
    
    // Random position in upper portion of screen
    moon.style.left = Math.random() * 70 + 15 + '%'; // 15% to 85% from left
    moon.style.top = Math.random() * 30 + 10 + '%'; // 10% to 40% from top
    
    // Random moon phase
    const moonPhases = [
        'new-moon',
        'waxing-crescent', 
        'first-quarter',
        'waxing-gibbous',
        'full-moon', // full moon has no ::after pseudo-element
        'waning-gibbous',
        'last-quarter',
        'waning-crescent'
    ];
    
    const randomPhase = moonPhases[Math.floor(Math.random() * moonPhases.length)];
    moon.classList.add(randomPhase);
    
    starsContainer.appendChild(moon);
    
    // Create shooting stars for dark mode
    function createShootingStar() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position (from edges)
        const side = Math.floor(Math.random() * 4);
        switch(side) {
            case 0: // top
                shootingStar.style.left = Math.random() * 100 + '%';
                shootingStar.style.top = '0%';
                break;
            case 1: // right
                shootingStar.style.left = '100%';
                shootingStar.style.top = Math.random() * 100 + '%';
                break;
            case 2: // bottom
                shootingStar.style.left = Math.random() * 100 + '%';
                shootingStar.style.top = '100%';
                break;
            case 3: // left
                shootingStar.style.left = '0%';
                shootingStar.style.top = Math.random() * 100 + '%';
                break;
        }
        
        // Random animation duration
        shootingStar.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        starsContainer.appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.remove();
            }
        }, 3000);
    }
    
    // Create shooting stars periodically (dark mode only)
    setInterval(createShootingStar, 4000);
    
    // Create initial shooting star
    setTimeout(createShootingStar, 2000);
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light mode
            body.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            
            // Show notification
            showNotification('Switched to Light Mode ☀️', 'info');
        } else {
            // Switch to dark mode
            body.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            
            // Show notification
            showNotification('Switched to Dark Mode 🌙', 'info');
        }
    });
    
    // Add hover effect
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}
