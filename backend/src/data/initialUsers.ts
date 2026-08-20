import { User, StudentProfile } from '../types';
import bcrypt from 'bcryptjs';

// Pre-hashed 'student123' and 'admin123'
const studentHash = bcrypt.hashSync('student123', 10);
const adminHash = bcrypt.hashSync('admin123', 10);

export const initialUsers: User[] = [
  {
    id: 'user-student-1',
    name: 'Abhishek Sharma',
    email: 'student@interndisha.com',
    password: studentHash,
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces&q=80',
    createdAt: '2025-01-10T10:00:00Z'
  },
  {
    id: 'user-admin-1',
    name: 'Dr. Priya Mehta (Admin)',
    email: 'admin@interndisha.com',
    password: adminHash,
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=faces&q=80',
    createdAt: '2025-01-01T08:00:00Z'
  }
];

export const initialProfiles: StudentProfile[] = [
  {
    id: 'profile-student-1',
    userId: 'user-student-1',
    fullName: 'Abhishek Sharma',
    email: 'student@interndisha.com',
    phone: '+91 98765 43210',
    highestQualification: 'B.Tech',
    college: 'Galgotias University, Greater Noida',
    course: 'Computer Science and Engineering',
    branch: 'Software Engineering & AI',
    currentYear: '3rd Year',
    cgpa: 8.4,
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'SQL', 'Git & GitHub', 'Problem Solving'],
    interests: ['Software Development', 'Artificial Intelligence', 'Data Science'],
    preferredRoles: ['Frontend Developer', 'Full Stack Developer', 'Software Engineer'],
    preferredLocation: 'Bengaluru / Remote',
    workPreference: 'Remote',
    durationPreference: '3-6 Months',
    experienceLevel: 'Intermediate',
    languages: ['English', 'Hindi'],
    bio: 'Passionate 3rd-year CS student eager to build delightful web apps with React and modern cloud architectures.',
    linkedinUrl: 'https://linkedin.com/in/abhishek-sharma-demo',
    githubUrl: 'https://github.com/abhishek-demo',
    onboardingCompleted: true,
    updatedAt: new Date().toISOString()
  }
];
