# 🌐 Misfar Mohammed — Personal Portfolio Website

> **University Assignment:** Setup Simple Landing Page (Your Profile) Using ExpressJS and HTML  
> **Student:** Rahumathulla Misfar Mohammed | **ID:** 20250040208  
> **University:** Nusa Putra University — Faculty of Informatics Engineering

---

## 📋 Project Overview

This is my personal portfolio website built as a **university assignment** to demonstrate my understanding of **Node.js** and **ExpressJS** for web development. The site also serves as my **public professional portfolio**.

The website includes:
- A beautiful, responsive light-theme design
- Full ExpressJS backend server
- Working contact form with server-side validation
- All personal information, skills, projects, and services

🌍 **Live Website:** `https://your-app-name.onrender.com` *(Update this after deployment)*

---

## 🎯 Assignment Objective

> "Setup Simple Landing Page (Your Profile) Using ExpressJS and HTML"

This project demonstrates:
1. Setting up a **Node.js** project with **npm**
2. Creating an **ExpressJS** web server
3. Serving **HTML, CSS, and JavaScript** files using Express static middleware
4. Building a **REST API endpoint** (POST /api/contact) with server-side validation
5. Deploying the application publicly using **Render**

---

## 🛠️ Technologies Used

| Category        | Technology         | Purpose                                      |
|-----------------|--------------------|----------------------------------------------|
| **Runtime**     | Node.js            | JavaScript runtime environment               |
| **Framework**   | ExpressJS          | Web server framework                         |
| **Frontend**    | HTML5              | Web page structure                           |
| **Styling**     | CSS3               | Design and layout                            |
| **Interaction** | Vanilla JavaScript | Form validation, animations, interactivity   |
| **Package Mgr** | npm                | Installing and managing packages             |
| **Source Code** | GitHub             | Version control and code hosting             |
| **Hosting**     | Render             | Free public deployment                       |

---

## 📁 Project Structure

```
misfar-portfolio/
│
├── server.js          ← Main ExpressJS server (backend)
├── package.json       ← Project info and dependencies
├── package-lock.json  ← Exact dependency versions (auto-generated)
├── README.md          ← This file
├── .gitignore         ← Files to exclude from Git
│
└── public/            ← All frontend files served by Express
    ├── index.html     ← Main portfolio webpage (HTML structure)
    ├── css/
    │   └── style.css  ← All styles and responsive design
    ├── js/
    │   └── script.js  ← Frontend JavaScript (form, animations)
    └── images/        ← Image assets (empty for now)
```

---

## 🚀 Installation & Running Locally

### Prerequisites
- **Node.js** (version 18 or above) — Download from https://nodejs.org
- **npm** (comes with Node.js automatically)

### Step-by-Step Instructions

**1. Clone or download the project**
```bash
# If you have Git installed:
git clone https://github.com/yourusername/misfar-portfolio.git

# Then navigate into the folder:
cd misfar-portfolio
```

**2. Install dependencies**
```bash
npm install
```
This downloads Express and all required packages into a `node_modules` folder.

**3. Start the server**
```bash
npm start
```

**4. Open in browser**

Go to: `http://localhost:3000`

You should see the full portfolio website! 🎉

---

## 🏗️ ExpressJS Explanation (For the Lecturer)

### 1. What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's V8 engine. It allows you to run JavaScript code **outside of the browser** — on a server. Before Node.js, JavaScript could only run in web browsers. Now it can be used to build complete backend servers.

### 2. What is ExpressJS?

ExpressJS is a **minimal web framework** built on top of Node.js. It makes it easy to:
- Create a web server in just a few lines of code
- Handle HTTP requests (GET, POST, etc.)
- Serve files (HTML, CSS, images)
- Build REST APIs

Think of Node.js as the engine and ExpressJS as the steering wheel — it makes driving (web development) much easier.

### 3. Why did I use ExpressJS?

- It is the most popular Node.js framework — widely used in the industry
- Simple and beginner-friendly
- Perfect for serving static websites with a backend API
- Required for this university assignment

### 4. How does ExpressJS serve HTML?

```javascript
// This single line tells Express to serve ALL files in the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
```

When a user visits `http://localhost:3000`, Express automatically finds and sends `public/index.html`. CSS and JavaScript files are also served automatically — no extra configuration needed.

### 5. What is the purpose of server.js?

`server.js` is the **heart of the application**. It:
1. Creates the Express application
2. Configures middleware (JSON parsing, static files)
3. Defines routes (what happens at each URL)
4. Provides the `/api/contact` POST endpoint for the contact form
5. Starts the server on a specific port

### 6. How does public deployment work?

1. The code is pushed to **GitHub**
2. **Render** connects to the GitHub repository
3. Render runs `npm install` to install dependencies
4. Render runs `npm start` to start the server
5. Render assigns a public HTTPS URL (e.g., `https://misfar-portfolio.onrender.com`)
6. Anyone in the world can now visit the URL and see the website

### 7. What is the difference between Frontend and Backend?

| Frontend                              | Backend                                |
|---------------------------------------|----------------------------------------|
| What the user **sees** in the browser | The **server** that runs behind the scenes |
| HTML, CSS, JavaScript                 | Node.js, ExpressJS                     |
| Runs in the **browser**               | Runs on the **server**                 |
| `public/index.html`, `style.css`      | `server.js`                            |
| Makes the website look good           | Handles data, APIs, file serving       |

---

## 📤 GitHub Upload Instructions

### Step 1: Create a GitHub Account
1. Go to https://github.com
2. Sign up for a free account

### Step 2: Create a New Repository
1. Click the **+** button (top right) → **New repository**
2. Repository name: `misfar-portfolio`
3. Description: `Personal portfolio website - Nusa Putra University Assignment`
4. Set to **Public**
5. ❌ Do NOT initialize with README (we already have one)
6. Click **Create repository**

### Step 3: Upload the Project

**Option A — Using GitHub Desktop (Recommended for beginners)**
1. Download GitHub Desktop from https://desktop.github.com
2. Sign in with your GitHub account
3. Click **File → Add Local Repository**
4. Select your project folder
5. Write a commit message: "Initial commit - Portfolio website"
6. Click **Commit to main**
7. Click **Publish repository**

**Option B — Using Git command line**
```bash
# Navigate to your project folder
cd "c:\Users\MISFAR MOHAMMED\Desktop\landing page"

# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Portfolio website"

# Connect to GitHub (replace with your username and repo name)
git remote add origin https://github.com/yourusername/misfar-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ☁️ Render Deployment Instructions

**Important Notes about Render Free Plan:**
- ✅ Free Web Services available
- ⚠️ Apps sleep after 15 minutes of inactivity (first request after sleep takes ~30-50 seconds)
- ✅ 750 free hours/month (enough for 1 app running 24/7)
- ✅ Automatic HTTPS (SSL certificate included free)
- ✅ GitHub auto-deployment (re-deploys when you push new code)

### Step-by-Step Deployment

**1. Visit Render**
Go to: https://render.com — Click **Get Started for Free**

**2. Create an Account**
Sign up using your GitHub account (easiest option)

**3. Create a New Web Service**
- Click **New +** → **Web Service**
- Select **Build and deploy from a Git repository**
- Connect your GitHub account if not already connected
- Find and select your `misfar-portfolio` repository
- Click **Connect**

**4. Configure the Service**

| Setting          | Value               |
|------------------|---------------------|
| Name             | `misfar-portfolio`  |
| Region           | Singapore (closest to Indonesia) |
| Branch           | `main`              |
| Runtime          | `Node`              |
| Build Command    | `npm install`       |
| Start Command    | `npm start`         |
| Instance Type    | **Free**            |

**5. Deploy**
- Click **Create Web Service**
- Wait for the build to complete (usually 2-5 minutes)
- Look for the green "Live" status

**6. Get Your Public URL**
Your site will be available at: `https://misfar-portfolio.onrender.com`
*(The name may vary — Render shows the exact URL)*

**7. Test Your Website**
Visit the URL and check:
- [ ] Homepage loads correctly
- [ ] All sections are visible
- [ ] Navigation works
- [ ] Contact form submits successfully
- [ ] Website looks good on mobile

---

## 🌐 Custom Domain (misfar.link)

You own the domain `misfar.link` and want to connect it to Render.

**Current Situation:**
Your domain is currently associated with Gravatar.

**⚠️ IMPORTANT:** Do NOT change any DNS settings without understanding the impact.

**What you need to do:**

**Step 1: Get Render's DNS settings**
1. Go to your deployed service on Render
2. Click **Settings** → **Custom Domains**
3. Click **Add Custom Domain**
4. Enter: `misfar.link`
5. Render will show you the DNS records you need to add

**Step 2: Check your domain registrar**
1. Log in to where you bought `misfar.link` (e.g., Namecheap, GoDaddy, etc.)
2. Find the **DNS Management** section

**Step 3: Add these DNS records (after checking Step 1)**
Render will provide either:
- A **CNAME record** pointing to your Render service URL, OR
- **A records** pointing to Render's IP addresses

**Step 4: Wait for propagation**
DNS changes can take 24-48 hours to propagate worldwide.

**Free Plan Note:** Custom domains are supported on Render's free plan! ✅

---

## 🔗 Important Links

| Resource          | URL                                                   |
|-------------------|-------------------------------------------------------|
| Live Website      | `https://your-app-name.onrender.com` *(update this)*  |
| GitHub Repository | `https://github.com/yourusername/misfar-portfolio`    |
| Fiverr Profile    | https://www.fiverr.com/ahaan_studio                   |
| Render Dashboard  | https://dashboard.render.com                          |

---

## 👨‍💻 About the Developer

**Rahumathulla Misfar Mohammed**  
Informatics Engineering Student  
Nusa Putra University, Indonesia  
Student ID: 20250040208

---

## 📄 License

MIT License — Free to use for educational purposes.

