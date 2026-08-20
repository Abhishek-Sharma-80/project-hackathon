-- ==========================================================
-- InternDisha Database Schema (MySQL Compatible)
-- Smart AI Internship Recommender for Youth Empowerment
-- ==========================================================

CREATE DATABASE IF NOT EXISTS interndisha_db;
USE interndisha_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  avatar VARCHAR(512),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Student Profiles Table
CREATE TABLE IF NOT EXISTS student_profiles (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  highest_qualification VARCHAR(100),
  college VARCHAR(255),
  course VARCHAR(255),
  branch VARCHAR(255),
  current_year VARCHAR(50),
  cgpa DECIMAL(3, 2),
  preferred_location VARCHAR(255),
  work_preference ENUM('Remote', 'Hybrid', 'On-site', 'Any') DEFAULT 'Any',
  duration_preference VARCHAR(100),
  experience_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
  bio TEXT,
  linkedin_url VARCHAR(512),
  github_url VARCHAR(512),
  portfolio_url VARCHAR(512),
  resume_url VARCHAR(512),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Skills Taxonomy Table
CREATE TABLE IF NOT EXISTS skills (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  demand_level ENUM('High', 'Medium', 'Trending') DEFAULT 'High'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Student Skills Junction Table
CREATE TABLE IF NOT EXISTS student_skills (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL,
  skill_id VARCHAR(64) NOT NULL,
  proficiency ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Intermediate',
  FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Student Interests / Sectors Table
CREATE TABLE IF NOT EXISTS student_interests (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Internships Table
CREATE TABLE IF NOT EXISTS internships (
  id VARCHAR(64) PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_logo VARCHAR(512),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  sector VARCHAR(100) NOT NULL,
  role_category VARCHAR(100),
  location VARCHAR(255) NOT NULL,
  work_mode ENUM('Remote', 'Hybrid', 'On-site') NOT NULL,
  duration VARCHAR(100) NOT NULL,
  stipend VARCHAR(100) NOT NULL,
  stipend_amount INT DEFAULT 0,
  openings INT DEFAULT 1,
  min_qualification VARCHAR(100),
  min_cgpa DECIMAL(3, 2),
  status ENUM('active', 'closed') DEFAULT 'active',
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Internship Skills Junction Table
CREATE TABLE IF NOT EXISTS internship_skills (
  id VARCHAR(64) PRIMARY KEY,
  internship_id VARCHAR(64) NOT NULL,
  skill_name VARCHAR(100) NOT NULL,
  is_required BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Recommendations Cache Table
CREATE TABLE IF NOT EXISTS recommendations (
  id VARCHAR(64) PRIMARY KEY,
  student_id VARCHAR(64) NOT NULL,
  internship_id VARCHAR(64) NOT NULL,
  match_score INT NOT NULL,
  skills_score INT NOT NULL,
  sector_score INT NOT NULL,
  education_score INT NOT NULL,
  location_score INT NOT NULL,
  selection_probability INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES student_profiles(id) ON DELETE CASCADE,
  FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Saved Internships Table
CREATE TABLE IF NOT EXISTS saved_internships (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  internship_id VARCHAR(64) NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) NOT NULL,
  internship_id VARCHAR(64) NOT NULL,
  status ENUM('Saved', 'Applied', 'Under Review', 'Shortlisted', 'Rejected') DEFAULT 'Applied',
  cover_note TEXT,
  match_score_at_apply INT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (internship_id) REFERENCES internships(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
