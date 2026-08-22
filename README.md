# SmartEdu AI — AI-Powered Personalized Learning & Internship Platform

**Smart India Hackathon 2026**
- **Problem Statement ID**: 26205
- **Problem Statement**: Student Innovation
- **Theme**: Smart Education
- **Organization**: AICTE
- **Category**: Software

---

## 🚀 Quick Start Guide

### 1. Install Dependencies & Initialize Database
```bash
npm install
npx prisma db push
npx ts-node prisma/seed.ts
```

### 2. Configure Environment Variables (`.env`)
```env
DATABASE_URL="file:./dev.db" # Or PostgreSQL URL for production
JWT_SECRET="smartedu_sih2026_super_secret_jwt_key_987654321"
GROQ_API_KEY="your_groq_api_key_here"
GROQ_MODEL="llama-3.3-70b-versatile"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Accounts (1-Click Jury Access on `/login`)

- **Demo Student (Aryan Sharma)**: `aryan@smartedu.ai` / `Aryan@123`
  - Galgotias University • B.Tech CSE • CGPA: 8.7
  - Profile Completeness: **82%** • Career Readiness: **76%**
  - Top Match: **91% Match** Junior Java Backend Developer at TechNova Solutions
- **Admin / Dean (Dr. Ramesh Kulkarni)**: `admin@smartedu.ai` / `Admin@123`
  - Dean of Engineering, Galgotias University

---

## 🌟 Production Features

- **Explainable AI Matching**: 6-Factor deterministic weighted algorithm.
- **Skill Gap Intelligence**: $(Target - Current) \times Demand \times Relevance$.
- **Personalized Roadmaps**: Interactive lesson sandbox with live level syncing.
- **Timed MCQ Assessments**: Timed technical evaluations with instant grading.
- **Recruitment Kanban**: Full stage pipeline tracking.
- **Groq LLaMA 3.3 70B AI Coach**: Grounded in student database profile.
- **Institutional Dean Portal**: Macro KPIs, demanded skills, placement funnels, and at-risk student intervention board.
- **Accreditation Reports**: 1-click CSV data export for NIRF/NAAC.
