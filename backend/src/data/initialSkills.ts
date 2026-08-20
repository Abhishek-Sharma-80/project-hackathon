import { Skill } from '../types';

export const initialSkills: Skill[] = [
  // Frontend
  { id: 'skill-1', name: 'React', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-2', name: 'JavaScript', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-3', name: 'TypeScript', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-4', name: 'HTML5', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-5', name: 'CSS3', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-6', name: 'Tailwind CSS', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-7', name: 'Next.js', category: 'Frontend', demandLevel: 'High' },
  { id: 'skill-8', name: 'Vue.js', category: 'Frontend', demandLevel: 'Medium' },
  { id: 'skill-9', name: 'Redux', category: 'Frontend', demandLevel: 'Medium' },
  
  // Backend
  { id: 'skill-10', name: 'Node.js', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-11', name: 'Express.js', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-12', name: 'Python', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-13', name: 'Java', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-14', name: 'Spring Boot', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-15', name: 'Django', category: 'Backend', demandLevel: 'Medium' },
  { id: 'skill-16', name: 'FastAPI', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-17', name: 'SQL', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-18', name: 'MySQL', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-19', name: 'PostgreSQL', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-20', name: 'MongoDB', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-21', name: 'REST APIs', category: 'Backend', demandLevel: 'High' },
  { id: 'skill-22', name: 'GraphQL', category: 'Backend', demandLevel: 'Medium' },

  // AI & Data Science
  { id: 'skill-23', name: 'Machine Learning', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-24', name: 'Deep Learning', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-25', name: 'Pandas', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-26', name: 'NumPy', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-27', name: 'Scikit-Learn', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-28', name: 'TensorFlow', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-29', name: 'PyTorch', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-30', name: 'Natural Language Processing (NLP)', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-31', name: 'Computer Vision', category: 'AI & Data', demandLevel: 'Medium' },
  { id: 'skill-32', name: 'Data Visualization', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-33', name: 'Power BI', category: 'AI & Data', demandLevel: 'High' },
  { id: 'skill-34', name: 'Tableau', category: 'AI & Data', demandLevel: 'Medium' },

  // Cloud & DevOps
  { id: 'skill-35', name: 'Git & GitHub', category: 'Cloud & DevOps', demandLevel: 'High' },
  { id: 'skill-36', name: 'Docker', category: 'Cloud & DevOps', demandLevel: 'High' },
  { id: 'skill-37', name: 'Kubernetes', category: 'Cloud & DevOps', demandLevel: 'High' },
  { id: 'skill-38', name: 'AWS', category: 'Cloud & DevOps', demandLevel: 'High' },
  { id: 'skill-39', name: 'Azure', category: 'Cloud & DevOps', demandLevel: 'Medium' },
  { id: 'skill-40', name: 'CI/CD Pipelines', category: 'Cloud & DevOps', demandLevel: 'Medium' },
  { id: 'skill-41', name: 'Linux', category: 'Cloud & DevOps', demandLevel: 'High' },

  // Mobile
  { id: 'skill-42', name: 'React Native', category: 'Mobile', demandLevel: 'High' },
  { id: 'skill-43', name: 'Flutter', category: 'Mobile', demandLevel: 'High' },
  { id: 'skill-44', name: 'Kotlin', category: 'Mobile', demandLevel: 'Medium' },
  { id: 'skill-45', name: 'Swift', category: 'Mobile', demandLevel: 'Medium' },

  // UI/UX & Design
  { id: 'skill-46', name: 'Figma', category: 'Design', demandLevel: 'High' },
  { id: 'skill-47', name: 'UI/UX Design', category: 'Design', demandLevel: 'High' },
  { id: 'skill-48', name: 'Wireframing', category: 'Design', demandLevel: 'High' },
  { id: 'skill-49', name: 'Prototyping', category: 'Design', demandLevel: 'High' },
  { id: 'skill-50', name: 'Adobe XD', category: 'Design', demandLevel: 'Medium' },

  // Cybersecurity
  { id: 'skill-51', name: 'Network Security', category: 'Cybersecurity', demandLevel: 'High' },
  { id: 'skill-52', name: 'Ethical Hacking', category: 'Cybersecurity', demandLevel: 'High' },
  { id: 'skill-53', name: 'Penetration Testing', category: 'Cybersecurity', demandLevel: 'Medium' },
  { id: 'skill-54', name: 'Cryptography', category: 'Cybersecurity', demandLevel: 'Medium' },

  // Core CS & Problem Solving
  { id: 'skill-55', name: 'Data Structures & Algorithms', category: 'Core CS', demandLevel: 'High' },
  { id: 'skill-56', name: 'C++', category: 'Core CS', demandLevel: 'High' },
  { id: 'skill-57', name: 'C Programming', category: 'Core CS', demandLevel: 'Medium' },
  { id: 'skill-58', name: 'Object-Oriented Programming (OOP)', category: 'Core CS', demandLevel: 'High' },

  // Soft Skills & Business
  { id: 'skill-59', name: 'Problem Solving', category: 'Soft Skills', demandLevel: 'High' },
  { id: 'skill-60', name: 'Communication', category: 'Soft Skills', demandLevel: 'High' },
  { id: 'skill-61', name: 'Team Collaboration', category: 'Soft Skills', demandLevel: 'High' },
  { id: 'skill-62', name: 'Digital Marketing', category: 'Business', demandLevel: 'Medium' },
  { id: 'skill-63', name: 'Financial Analysis', category: 'Business', demandLevel: 'Medium' },
  { id: 'skill-64', name: 'Content Writing', category: 'Business', demandLevel: 'Medium' }
];
