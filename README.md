# 🚀 InternDisha — Smart AI-Powered Internship Recommender for Youth Empowerment

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![NodeJS](https://img.shields.io/badge/Node.js-20-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.19-000000?style=flat&logo=express)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat&logo=mysql)](https://mysql.com/)

**InternDisha** is a full-stack, AI-powered internship recommendation and career empowerment platform built to help students and youth discover, evaluate, and secure high-fit internships with **100% transparent, explainable AI matching**.

---

## 🌟 Key Highlights & Features

### 1. 🤖 Explainable AI Recommendation Engine
Unlike black-box algorithms, InternDisha computes compatibility based on a transparent, 4-factor weighted scoring model:
```text
Final Match Score =
  (Skills Match × 40%)
+ (Sector Alignment × 30%)
+ (Education & Branch Match × 20%)
+ (Location & Work Mode Match × 10%)
```
Each recommendation provides:
- **Exact percentage score breakdown**
- **Estimated selection probability** (High / Medium / Low)
- **Matched skills** (highlighted in emerald green)
- **Missing skills** (highlighted in amber)
- **Human-readable personalized reasons**
- **Actionable tips to boost match scores**

### 2. ⚡ Dynamic AI Compatibility Simulator
Interactive simulator on the landing page where students can toggle skills in real-time to watch match scores recalculate dynamically.

### 3. 🎯 Skill Gap Analysis ("Your Skill Growth Path")
Pinpoints exactly which skills you have versus what companies demand, and calculates an **Opportunity Multiplier** (e.g. *"Learning TypeScript unlocks 6 more internship opportunities"*), with direct links to free curated learning materials.

### 4. 🗺️ Personalized Learning Roadmaps
Interactive career tracks for **Frontend Developer**, **Backend Engineer**, and **AI & Data Science Engineer** featuring step-by-step milestones, progress badges, and hands-on project ideas.

### 5. 📋 Kanban Application Tracker
Track application status with interactive drag-and-drop / column transitions across **Saved**, **Applied**, **Under Review**, **Shortlisted**, and **Rejected**.

### 6. 🌐 Multi-Language Support (i18n)
Full dual-language architecture in **English** and **Hindi (हिन्दी)** with instant navbar switching.

### 7. 🛡️ Comprehensive Admin Control Center
Admin panel to view real-time platform metrics, manage internship listings (Create, Read, Update, Delete), oversee registered student profiles, and review applicant submissions.

### 8. 🌓 Dark Mode & Light Mode
Theme switcher with rich glassmorphism aesthetics, fluid micro-interactions, and accessible typography.

---

## 🔑 Demo Login Credentials

You can test the platform instantly using the 1-click **Demo Login** buttons on the login page or using the credentials below:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **🎓 Student** | `student@interndisha.com` | `student123` | Student Dashboard, AI Recommendations, Onboarding, Skill Gap, Roadmaps, Application Tracker, Saved |
| **🛡️ Admin** | `admin@interndisha.com` | `admin123` | Admin Analytics Dashboard, Manage Internships (CRUD), Student Profiles Oversight, Applications Review |

---

## 🏗️ System Architecture & Directory Structure

```
project-hackathon/
├── package.json               # Root monorepo runner (concurrently)
├── README.md                  # Comprehensive documentation
├── .env.example               # Root configuration template
│
├── backend/                   # Node.js + Express + TypeScript Backend
│   ├── src/
│   │   ├── server.ts          # Express API server entry point
│   │   ├── config/
│   │   │   └── database.ts    # Dual-mode database service (MySQL + resilient fallback)
│   │   ├── db/
│   │   │   ├── schema.sql     # Full MySQL production schema
│   │   │   └── seed.sql       # Seed data for 20+ internships & skill taxonomy
│   │   ├── recommendation/
│   │   │   ├── engine.ts      # 4-factor explainable recommendation algorithm
│   │   │   ├── skillGap.ts    # Skill gap and unlock count analyzer
│   │   │   └── roadmaps.ts    # Career roadmap generator
│   │   ├── middleware/
│   │   │   └── auth.ts        # JWT token verification & Role-based authorization
│   │   ├── controllers/       # Auth, Profile, Internship, Recs, Apps, Admin controllers
│   │   ├── routes/            # REST API endpoints routers
│   │   ├── data/              # Initial seed datasets
│   │   └── types/             # Backend TypeScript interfaces
│   └── package.json
│
└── frontend/                  # React 18 + TypeScript + Vite + Tailwind CSS
    ├── src/
    │   ├── main.tsx           # React DOM root
    │   ├── App.tsx            # Route configuration & Context providers
    │   ├── index.css          # Tailwind CSS + custom glassmorphism styles
    │   ├── i18n/
    │   │   ├── en.ts          # English translations dictionary
    │   │   └── hi.ts          # Hindi (हिन्दी) translations dictionary
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   ├── LanguageContext.tsx
    │   │   └── ThemeContext.tsx
    │   ├── services/
    │   │   └── api.ts         # REST API communication client
    │   ├── components/
    │   │   ├── common/        # Navbar, Footer, CircularProgress, ProtectedRoute
    │   │   ├── dashboard/     # DashboardLayout, MatchBreakdownModal, QuickApplyModal
    │   │   ├── internships/   # InternshipCard
    │   │   └── admin/         # AddEditInternshipModal
    │   └── pages/             # 13+ Fully implemented responsive pages
    └── package.json
```

---

## ⚙️ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** v18 or newer
- **npm** v9 or newer
- *(Optional)* **MySQL** 8.0 server (if running a dedicated MySQL instance)

### 2. Installation
Run the following command from the root directory to install all dependencies for both backend and frontend:
```bash
npm run install:all
```

### 3. Environment Setup
Copy the `.env.example` file to `.env` (optional, default values work out-of-the-box):
```bash
cp .env.example .env
```

### 4. Running the Platform
Start both the backend API and frontend dev server with a single command:
```bash
npm run dev
```

- **Frontend Web App**: [http://localhost:5173](http://localhost:5173)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Create student or admin account
- `POST /api/auth/login` — Sign in with email & password
- `POST /api/auth/demo-login` — Quick demo login (`student` or `admin`)
- `GET /api/auth/me` — Retrieve currently authenticated user

### Student Profile
- `GET /api/user/profile` — Fetch student profile & onboarding status
- `PUT /api/user/profile` — Update education, skills, interests, and preferences

### Internships & Exploration
- `GET /api/internships` — List internships with search, sector, mode, stipend filters & sorting
- `GET /api/internships/:id` — Retrieve detailed internship profile with live compatibility score

### AI Recommendations & Growth
- `GET /api/recommendations` — Fetch top 3-5 ranked internship matches with explainability breakdown
- `GET /api/recommendations/skill-gap` — Retrieve missing skill analysis and unlock metrics
- `GET /api/recommendations/learning-path` — Fetch career milestone roadmap

### Applications & Saved
- `GET /api/applications` — List user's internship applications
- `POST /api/applications` — Submit internship application
- `PATCH /api/applications/:id/status` — Update Kanban stage (`Applied`, `Under Review`, `Shortlisted`, `Rejected`)
- `GET /api/saved` — List bookmarked internships
- `POST /api/saved` — Save internship
- `DELETE /api/saved/:id` — Remove saved internship

### Admin Management (Protected)
- `GET /api/admin/stats` — Platform analytics and skill demand metrics
- `POST /api/admin/internships` — Post new internship listing
- `PUT /api/admin/internships/:id` — Edit internship listing
- `DELETE /api/admin/internships/:id` — Delete internship
- `GET /api/admin/students` — List registered students and profiles
- `GET /api/admin/applications` — Oversight on all platform applications

---

## 🎓 Summary
InternDisha solves the internship mismatch problem for youth by replacing guesswork with **explainable AI**, **transparent score breakdowns**, and **actionable skill roadmaps**.
