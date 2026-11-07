/**
 * script.js
 * =========
 * Main JavaScript file for Misfar's Portfolio Website.
 *
 * This file handles:
 * 1. Navigation bar scroll behaviour & active link highlighting
 * 2. Mobile hamburger menu toggle
 * 3. Scroll animations (simple, no external library needed)
 * 4. Contact form validation & submission
 * 5. Back-to-top button
 * 6. Footer year & misc utilities
 */

// ─── 1. WAIT FOR DOM TO LOAD ────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initBackToTop();
    initMiscellaneous();
});


// ─── 2. NAVBAR SCROLL BEHAVIOUR ─────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.navbar__link:not(.navbar__link--cta)');
    const sections = document.querySelectorAll('section[id]');

    // Add "scrolled" class to navbar when user scrolls down
    function handleNavbarScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Highlight the nav link that corresponds to the current section in view
    function highlightActiveLink() {
        const scrollPos = window.scrollY + 100; // offset for navbar height

        sections.forEach(section => {
            const sectionTop    = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId     = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        highlightActiveLink();
    }, { passive: true });

    // Run once on load
    handleNavbarScroll();
    highlightActiveLink();

    // Smooth scroll for all anchor links pointing to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return; // Skip plain "#" links

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({ top: targetTop, behavior: 'smooth' });

            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}


// ─── 3. MOBILE HAMBURGER MENU ────────────────────────────────────────────────
let mobileMenuOpen = false;

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        if (mobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function openMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    mobileMenuOpen  = true;
    hamburger.classList.add('open');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    mobileMenuOpen  = false;
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
}


// ─── 4. SCROLL ANIMATIONS ───────────────────────────────────────────────────
/**
 * A lightweight scroll animation system.
 * Elements with [data-aos] attribute are animated when they enter the viewport.
 * This replaces the need for a heavy external library like AOS.js.
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately if browser doesn't support IntersectionObserver
        animatedElements.forEach(el => el.classList.add('aos-animate'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Once animated, stop observing (animation plays only once)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,     // Trigger when 12% of the element is visible
        rootMargin: '0px 0px -40px 0px' // Start slightly before element enters viewport
    });

    animatedElements.forEach(el => observer.observe(el));
}


// ─── 5. CONTACT FORM ────────────────────────────────────────────────────────
function initContactForm() {
    const form       = document.getElementById('contactForm');
    const submitBtn  = document.getElementById('submitBtn');
    const formAlert  = document.getElementById('formAlert');
    const messageInput = document.getElementById('message');
    const charCount  = document.getElementById('charCount');
    const MAX_CHARS  = 2000;

    if (!form) return;

    // ── Character counter for message textarea ──────────────────────────────
    messageInput.addEventListener('input', () => {
        const len = messageInput.value.length;
        charCount.textContent = `${len} / ${MAX_CHARS}`;
        charCount.style.color = len > MAX_CHARS * 0.9 ? '#EF4444' : '';
    });

    // ── Real-time field validation on blur ──────────────────────────────────
    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            // Clear error styling as user types after a previous error
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // ── Form submission ─────────────────────────────────────────────────────
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        const fields = form.querySelectorAll('.form-input');
        let isValid  = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showFormAlert('error', 'Please correct the errors above and try again.');
            return;
        }

        // Show loading state
        setSubmitLoading(true);
        hideFormAlert();

        // Collect form data
        const formData = {
            name:    document.getElementById('name').value.trim(),
            email:   document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            // Send POST request to our ExpressJS backend endpoint
            const response = await fetch('/api/contact', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // SUCCESS
                showFormAlert('success', `✅ ${result.message}`);
                form.reset();
                charCount.textContent = `0 / ${MAX_CHARS}`;
                // Clear all success/error styling
                fields.forEach(field => {
                    field.classList.remove('success', 'error');
                });
            } else {
                // Server returned validation errors
                const errorMsg = result.errors
                    ? result.errors.join(' ')
                    : (result.message || 'Something went wrong. Please try again.');
                showFormAlert('error', `❌ ${errorMsg}`);
            }

        } catch (err) {
            // Network error
            console.error('Contact form error:', err);
            showFormAlert('error', '❌ Could not send message. Please check your connection and try again.');
        } finally {
            setSubmitLoading(false);
        }
    });


    // ── Helper: validate a single field ────────────────────────────────────
    function validateField(field) {
        const id    = field.id;
        const value = field.value.trim();
        let error   = '';

        switch (id) {
            case 'name':
                if (!value)                 error = 'Full name is required.';
                else if (value.length < 2)  error = 'Name must be at least 2 characters.';
                else if (value.length > 100) error = 'Name must not exceed 100 characters.';
                break;

            case 'email':
                if (!value) {
                    error = 'Email address is required.';
                } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) error = 'Please enter a valid email address.';
                }
                break;

            case 'subject':
                if (!value)                error = 'Subject is required.';
                else if (value.length < 3) error = 'Subject must be at least 3 characters.';
                else if (value.length > 200) error = 'Subject must not exceed 200 characters.';
                break;

            case 'message':
                if (!value)                 error = 'Message is required.';
                else if (value.length < 10) error = 'Message must be at least 10 characters.';
                else if (value.length > MAX_CHARS) error = `Message must not exceed ${MAX_CHARS} characters.`;
                break;
        }

        const errorEl = document.getElementById(`${id}Error`);
        if (error) {
            field.classList.add('error');
            field.classList.remove('success');
            if (errorEl) {
                errorEl.textContent = error;
                errorEl.classList.add('visible');
            }
            return false;
        } else {
            field.classList.remove('error');
            if (value) field.classList.add('success'); // Green border when valid & filled
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('visible');
            }
            return true;
        }
    }

    // ── Helper: show/hide form-level alert ─────────────────────────────────
    function showFormAlert(type, message) {
        formAlert.textContent = message;
        formAlert.className   = `form-alert ${type}`;
        formAlert.style.display = 'block';
        // Scroll to alert
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function hideFormAlert() {
        formAlert.style.display = 'none';
        formAlert.className     = 'form-alert';
    }

    // ── Helper: toggle submit button loading state ──────────────────────────
    function setSubmitLoading(isLoading) {
        const btnText    = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        submitBtn.disabled = isLoading;

        if (isLoading) {
            btnText.style.display    = 'none';
            btnLoading.style.display = 'inline-flex';
        } else {
            btnText.style.display    = 'inline-flex';
            btnLoading.style.display = 'none';
        }
    }
}


// ─── 6. BACK TO TOP BUTTON ──────────────────────────────────────────────────
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ─── 7. MISCELLANEOUS ───────────────────────────────────────────────────────
function initMiscellaneous() {
    // Set current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * Shows a brief toast/notification message.
 * @param {string} message - The message to display
 */
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.getElementById('toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.textContent = message;
    Object.assign(toast.style, {
        position:    'fixed',
        bottom:      '80px',
        right:       '24px',
        background:  '#17233D',
        color:       'white',
        padding:     '12px 20px',
        borderRadius:'10px',
        fontSize:    '0.875rem',
        fontWeight:  '500',
        zIndex:      '9999',
        maxWidth:    '300px',
        boxShadow:   '0 8px 24px rgba(0,0,0,0.20)',
        animation:   'fadeIn 0.3s ease',
        lineHeight:  '1.4'
    });

    // Add animation keyframes if not already there
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            @keyframes fadeIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
            @keyframes fadeOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(10px); } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(toast);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

