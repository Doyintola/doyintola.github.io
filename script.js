// ============================================
// PREMIUM PORTFOLIO - JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initIntersectionObserver();
});

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLink = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLink.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            updateActiveLink(link);
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavigation();
        updateNavbarBackground();
    });

    // Set initial active link
    updateActiveNavigation();
}

function updateActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

function updateActiveLink(link) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
}

function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.pageYOffset > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || !document.querySelector(href)) return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - offset - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    // Animate hero content on page load
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');

    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.animation = 'slideInLeft 0.8s ease 0s both';
        }, 100);
    }

    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.animation = 'slideInLeft 0.8s ease 0.1s both';
        }, 150);
    }

    if (heroCta) {
        setTimeout(() => {
            heroCta.style.animation = 'slideInLeft 0.8s ease 0.2s both';
        }, 200);
    }

    if (heroStats) {
        setTimeout(() => {
            heroStats.style.animation = 'slideInRight 0.8s ease 0.4s both';
        }, 300);
    }
}

// ============================================
// INTERSECTION OBSERVER - FADE IN ON SCROLL
// ============================================

function initIntersectionObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms`;
                }, 0);
                
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all cards and content blocks
    const elementsToObserve = document.querySelectorAll(
        '.expertise-card, ' +
        '.research-card, ' +
        '.contact-card, ' +
        '.highlight-card, ' +
        '.stat-card'
    );

    elementsToObserve.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'none';
        observer.observe(element);
    });
}

// ============================================
// BUTTON INTERACTIONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// CARD HOVER EFFECTS
// ============================================

document.querySelectorAll('.expertise-card, .research-card, .contact-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.12)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    });
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
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

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll event
window.addEventListener('scroll', throttle(() => {
    updateActiveNavigation();
    updateNavbarBackground();
}, 100));

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// ============================================
// PREFERS REDUCED MOTION
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const style = document.createElement('style');
    style.innerHTML = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PAGE ANALYTICS (OPTIONAL)
// ============================================

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`User viewed: ${entry.target.id}`);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// DYNAMIC BLOG LOADING FROM JSON
// ============================================

// Load blogs from blogs.json file
async function loadBlogs() {
    try {
        const response = await fetch('blogs.json');
        if (!response.ok) {
            throw new Error('Failed to load blogs');
        }
        const data = await response.json();
        renderBlogs(data.blogs);
    } catch (error) {
        console.error('Error loading blogs:', error);
        const blogGrid = document.getElementById('blog-grid');
        if (blogGrid) {
            blogGrid.innerHTML = '<p>Error loading blogs. Please check back soon!</p>';
        }
    }
}

// Render blogs to the DOM
function renderBlogs(blogs) {
    const blogGrid = document.getElementById('blog-grid');
    
    if (!blogGrid) return;
    
    blogGrid.innerHTML = ''; // Clear existing content
    
    blogs.forEach((blog) => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        
        // Create categories HTML
        const categoriesHTML = blog.categories
            .map(cat => `<span class="blog-category">${cat}</span>`)
            .join('');
        
        blogCard.innerHTML = `
            <div class="blog-date">${blog.date}</div>
            <h3>${blog.title}</h3>
            <p>${blog.excerpt}</p>
            <div class="blog-meta">
                ${categoriesHTML}
            </div>
            ${blog.readTime ? `<div class="blog-read-time">${blog.readTime}</div>` : ''}
        `;
        
        blogGrid.appendChild(blogCard);
    });
}

// Load blogs when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBlogs);
} else {
    loadBlogs();
}
