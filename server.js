/**
 * server.js
 * =========
 * This is the main ExpressJS server file for Misfar's Portfolio Website.
 *
 * What this file does:
 * 1. Creates an Express application
 * 2. Serves all frontend files (HTML, CSS, JS, images) from the "public" folder
 * 3. Provides a POST API endpoint for the contact form
 * 4. Listens on a port so the website can be accessed via a browser
 */

// ─── 1. IMPORT REQUIRED MODULES ───────────────────────────────────────────────
const express = require('express');   // The Express framework
const path    = require('path');      // Node.js built-in: handles file/folder paths

// ─── 2. CREATE THE EXPRESS APPLICATION ────────────────────────────────────────
const app = express();

// ─── 3. CONFIGURE MIDDLEWARE ──────────────────────────────────────────────────
// Middleware = code that runs between receiving a request and sending a response.

// Parse incoming JSON request bodies (needed for contact form data)
app.use(express.json());

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve all files inside the "public" folder as static assets.
// This means: anyone visiting the website will automatically get index.html,
// style.css, script.js, and any images stored in public/images/.
app.use(express.static(path.join(__dirname, 'public')));

// ─── 4. ROUTES ────────────────────────────────────────────────────────────────

/**
 * GET /
 * Serves the main portfolio page (index.html).
 * Express automatically finds public/index.html because of express.static above.
 * This route is a safety fallback for direct navigation.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * POST /api/contact
 * Handles the contact form submission.
 *
 * What it does:
 * 1. Receives form data (name, email, subject, message)
 * 2. Validates the input on the server side
 * 3. Returns a JSON response (success or error)
 *
 * NOTE: This version logs the message to the server console.
 * To actually send emails, an email service like SendGrid, Nodemailer,
 * or Resend would need to be configured separately.
 */
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // ── SERVER-SIDE VALIDATION ──────────────────────────────────────────────
    const errors = [];

    // Check required fields
    if (!name || name.trim().length === 0) {
        errors.push('Full name is required.');
    } else if (name.trim().length < 2) {
        errors.push('Full name must be at least 2 characters.');
    } else if (name.trim().length > 100) {
        errors.push('Full name must not exceed 100 characters.');
    }

    if (!email || email.trim().length === 0) {
        errors.push('Email address is required.');
    } else {
        // Basic email format validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            errors.push('Please provide a valid email address.');
        }
    }

    if (!subject || subject.trim().length === 0) {
        errors.push('Subject is required.');
    } else if (subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters.');
    } else if (subject.trim().length > 200) {
        errors.push('Subject must not exceed 200 characters.');
    }

    if (!message || message.trim().length === 0) {
        errors.push('Message is required.');
    } else if (message.trim().length < 10) {
        errors.push('Message must be at least 10 characters.');
    } else if (message.trim().length > 2000) {
        errors.push('Message must not exceed 2000 characters.');
    }

    // If there are validation errors, return 400 Bad Request
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            errors: errors
        });
    }

    // ── LOG THE MESSAGE (server console) ───────────────────────────────────
    const timestamp = new Date().toISOString();
    console.log('\n📬 New Contact Form Submission:');
    console.log('────────────────────────────────');
    console.log(`  Time    : ${timestamp}`);
    console.log(`  Name    : ${name.trim()}`);
    console.log(`  Email   : ${email.trim()}`);
    console.log(`  Subject : ${subject.trim()}`);
    console.log(`  Message : ${message.trim()}`);
    console.log('────────────────────────────────\n');

    // ── RETURN SUCCESS RESPONSE ─────────────────────────────────────────────
    return res.status(200).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received. I\'ll get back to you as soon as possible.'
    });
});

/**
 * GET /health
 * A simple health-check endpoint.
 * Render and other platforms use this to verify the app is running.
 */
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Misfar Portfolio Server is running.',
        timestamp: new Date().toISOString()
    });
});

/**
 * 404 Handler — Catch-all for undefined routes.
 * If someone visits a URL that doesn't exist, serve the main page.
 */
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── 5. START THE SERVER ──────────────────────────────────────────────────────
/**
 * process.env.PORT is set automatically by Render / Railway / other hosts.
 * We fall back to port 3000 for local development.
 * '0.0.0.0' means "listen on all network interfaces".
 *
 * For Vercel: we export the app as a module (serverless function).
 * The app.listen() block only runs when you start the server locally
 * with `node server.js` or `npm start`.
 */
const PORT = process.env.PORT || 3000;

// Only start the HTTP server when running locally (not on Vercel)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log('╔══════════════════════════════════════════════╗');
        console.log('║       Misfar Portfolio Server Started        ║');
        console.log('╠══════════════════════════════════════════════╣');
        console.log(`║  Local URL : http://localhost:${PORT}           ║`);
        console.log(`║  Port      : ${PORT}                            ║`);
        console.log('║  Status    : Running ✓                       ║');
        console.log('╚══════════════════════════════════════════════╝');
    });
}

// Export the app for Vercel's serverless runtime
module.exports = app;

