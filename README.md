# SmartEdu AI 🎓⚡
### AI-Powered Personalized Learning, Skill Development & Internship Recommendation Platform

**Smart India Hackathon 2026**  
* **Problem Statement ID**: `26205`  
* **Problem Statement**: Student Innovation  
* **Theme**: Smart Education  
* **Organization**: AICTE  
* **Category**: Software  

> **Mission**: *Bridge the critical divide between classroom learning and industry requirements through explainable AI matching, dynamic skill gap diagnostics, and real-time learning roadmaps.*

---

## 🌟 Key Innovations & Features

### 1. 🎯 Explainable 6-Factor Internship Recommendation Engine
Deterministic multi-dimensional matching calculated from live database records:
- **Required Skill Overlap (40%)**: Compares student proficiencies against mandatory role requirements.
- **Proficiency Depth (20%)**: Evaluates mastery levels against employer baselines.
- **Career Interest Alignment (15%)**: Measures alignment with target career trajectories.
- **Academic Standing / CGPA (10%)**: Benchmarks academic consistency.
- **Project Relevance (10%)**: Analyzes practical GitHub software projects and technology stacks.
- **Certifications (5%)**: Credits verified industry credentials (AWS, Oracle, Meta).
- **"Why This Match?" Page**: Generates transparent candidate strength breakdowns, identifies missing prerequisites, and projects score improvements after learning path completion (e.g. `91%` → `97%`).

### 2. 📊 Skill Gap Intelligence Matrix
- Categorizes competencies into **Strong Skills** (≥75%), **Developing Skills** (40–74%), and **Priority Skill Gaps** (<40% with high employer demand).
- Priority Ranking Formula:  
  $$\text{PriorityScore} = \text{GapSize} \times \text{IndustryDemand} \times \text{CareerRelevance}$$

### 3. 🚀 Personalized Dynamic Learning Roadmaps
- Curated step-by-step modular lessons with code snippets, tasks, and documentation.
- **Live State Synchronization**: Completing lessons immediately updates verified student skill proficiencies, boosts profile completeness scores, and elevates internship match percentages in real-time.

### 4. 📝 Timed Verified Skill Assessments
- Timed MCQ evaluation test suite in Java, Python, SQL, DSA, React, and Spring Boot.
- Real-time scoring (e.g. `8/10`), animated skill level upgrade (e.g. `80%` → `86%`), and verified competency badges.

### 5. 📋 Drag-and-Drop Application Kanban Tracker
- Interactive candidate recruitment pipeline: `Saved` → `Applied` → `Shortlisted` → `Interview` → `Selected (Offers)`.

### 6. 🤖 Grounded SmartEdu AI Career Assistant
- Profile-aware AI career coach providing actionable advice on what to learn next, interview prep, and roadmap strategy.

### 7. 🏛️ Institutional Dean & Admin Portal
- Macro KPIs (1,200 students, 640 active, 320 internships, 150 companies).
- Employer skill demand charts, application conversion funnels, and at-risk student intervention flags.
- Exportable CSV reports formatted for NAAC & NIRF accreditation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Canvas Confetti |
| **Backend** | Node.js, Express, TypeScript, JWT Stateless Auth, Bcrypt |
| **Database & ORM** | SQLite (Zero-config out of the box) / PostgreSQL compatible via Prisma ORM |
| **Algorithms** | Deterministic 6-Factor Match Engine, Priority Gap Matrix, Profile Completeness Engine |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Abhishek-Sharma-80/project-hackathon.git
cd project-hackathon

# Install backend dependencies
cd server
npm install

# Push database schema & generate Prisma client
npx prisma db push

# Seed demo data (Aryan Sharma, Admin, 40 internships, 25 skills, 20 students)
npx ts-node prisma/seed.ts

# Install frontend dependencies
cd ../client
npm install
```

### 2. Launch Development Servers

**Option A: Run concurrently from root**
```bash
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1: Backend API (Port 5000)
cd server
npm run dev

# Terminal 2: Frontend UI (Port 5173)
cd client
npm run dev
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔑 SIH 2026 Demo Credentials

| Role | Email | Password | Quick Action |
|---|---|---|---|
| **Demo Student (Aryan Sharma)** | `aryan@smartedu.ai` | `Aryan@123` | Click **"Login as Aryan (Student)"** on login page |
| **Institutional Admin / Dean** | `admin@smartedu.ai` | `Admin@123` | Click **"Login as Admin"** on login page |

---

## 🔄 The Complete Hackathon Demo Flow

1. **Landing Page**: Observe live interactive preview, 3 value propositions (Discover, Improve, Succeed), before/after comparison, and 6-step roadmap timeline.
2. **1-Click Login as Aryan**: Access the personalized student dashboard with an **82% Profile Score** and a **91% Match with TechNova**.
3. **Explainable AI**: Click **"Why This Match?"** to view the candidate strengths, missing requirements, and natural-language AI rationale.
4. **Skill Gap Engine & Roadmap**: Open **Skill Gaps**, click **"Start Learning Module"** on Spring Boot, and complete a lesson. Observe the real-time skill score upgrade and celebratory confetti!
5. **Skill Assessment**: Take the timed Java/Spring MCQ test, achieve 8/10, and see the skill level animate from **80% → 86%**.
6. **Apply & Track**: Apply to TechNova and manage recruitment stages on the interactive Kanban board.
7. **AI Career Coach**: Chat with the SmartEdu AI Assistant to ask *"What should I learn next for a backend internship?"*.
8. **Institutional Admin**: Switch to the Admin Portal to view macro skill analytics, application funnels, and at-risk student intervention rosters.

---

## 📜 License
Built with ❤️ for **Smart India Hackathon 2026**. Licensed under the [MIT License](LICENSE).
