import { 
  User, 
  StudentProfile, 
  Internship, 
  RecommendationBreakdown, 
  SkillGapItem, 
  LearningRoadmap, 
  Application, 
  AdminStats, 
  RecruiterCandidate 
} from '../types';

export const INITIAL_USER: User = {
  id: 'usr-student-01',
  name: 'Abhishek Sharma',
  email: 'abhishek.sharma@galgotiasuniversity.edu.in',
  role: 'student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  createdAt: '2025-01-10T10:00:00Z'
};

export const INITIAL_PROFILE: StudentProfile = {
  id: 'prof-01',
  userId: 'usr-student-01',
  fullName: 'Abhishek Sharma',
  email: 'abhishek.sharma@galgotiasuniversity.edu.in',
  phone: '+91 98765 43210',
  highestQualification: 'B.Tech',
  college: 'Galgotias University',
  course: 'Computer Science and Engineering',
  branch: 'Software Engineering',
  currentYear: '3rd Year',
  cgpa: 8.4,
  skills: ['Java', 'SQL', 'Git', 'OOP', 'DSA', 'React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Python', 'Communication'],
  interests: ['Software Development', 'Artificial Intelligence', 'Cloud Computing'],
  preferredRoles: ['Backend Developer', 'Java Developer', 'Full Stack Developer'],
  preferredLocation: 'Remote / Bengaluru / Delhi NCR',
  workPreference: 'Remote',
  durationPreference: '6 Months',
  experienceLevel: 'Intermediate',
  languages: ['English', 'Hindi'],
  bio: 'Ambitious 3rd-year CS student passionate about backend systems, scalable REST APIs, and database optimization. Actively building projects in Java, Spring Boot, and React.',
  linkedinUrl: 'https://linkedin.com/in/abhishek-sharma-dev',
  githubUrl: 'https://github.com/Abhishek-Sharma-80',
  portfolioUrl: 'https://abhishek-portfolio.dev',
  resumeUrl: 'https://interndisha.org/resumes/abhishek-sharma.pdf',
  resumeScore: 88,
  projects: [
    {
      id: 'proj-1',
      title: 'Distributed Task Queue Engine',
      description: 'Engineered a resilient high-throughput task worker using Java, Redis queue, and PostgreSQL with automatic retry mechanisms.',
      technologies: ['Java', 'Redis', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/Abhishek-Sharma-80/task-engine'
    },
    {
      id: 'proj-2',
      title: 'InternDisha Recommendation Visualizer',
      description: 'Created an explainable AI career matching interface featuring multi-factor scoring metrics and interactive skill radar charts.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      githubUrl: 'https://github.com/Abhishek-Sharma-80/interndisha'
    },
    {
      id: 'proj-3',
      title: 'E-Commerce Microservices REST API',
      description: 'Designed JWT authentication, order orchestration, and catalog microservices with comprehensive OpenAPI Swagger docs.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'JWT'],
      githubUrl: 'https://github.com/Abhishek-Sharma-80/ecommerce-api'
    },
    {
      id: 'proj-4',
      title: 'Campus Placement Analytics Dashboard',
      description: 'Built an interactive reporting dashboard tracking student interview conversion funnels and company hiring metrics.',
      technologies: ['React', 'Node.js', 'SQL', 'Chart.js'],
      githubUrl: 'https://github.com/Abhishek-Sharma-80/placement-stats'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      title: 'Oracle Certified Associate: Java SE 17 Programmer',
      issuer: 'Oracle',
      issueDate: 'Nov 2024',
      credentialUrl: 'https://oracle.com/verify/12345'
    },
    {
      id: 'cert-2',
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      issueDate: 'Aug 2024',
      credentialUrl: 'https://coursera.org/verify/meta-react'
    },
    {
      id: 'cert-3',
      title: 'SQL for Data Analysis & Engineering',
      issuer: 'HackerRank',
      issueDate: 'Jul 2024',
      credentialUrl: 'https://hackerrank.com/certificates/sql-gold'
    },
    {
      id: 'cert-4',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: 'Jan 2025',
      credentialUrl: 'https://aws.amazon.com/verification'
    },
    {
      id: 'cert-5',
      title: 'Data Structures & Algorithms in Java Specialization',
      issuer: 'UC San Diego / Coursera',
      issueDate: 'May 2024',
      credentialUrl: 'https://coursera.org/verify/dsa-java'
    },
    {
      id: 'cert-6',
      title: 'Docker & Containerization Fundamentals',
      issuer: 'Docker Inc.',
      issueDate: 'Dec 2024',
      credentialUrl: 'https://docker.com/certs/verify'
    }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Open Source Software Contributor',
      company: 'GirlScript Summer of Code (GSSoC)',
      duration: 'May 2024 - Aug 2024',
      description: 'Collaborated on Java backend repositories, resolved 14+ open issues, and optimized SQL query execution latency by 32%.',
      skills: ['Java', 'Git', 'SQL', 'Code Review']
    }
  ],
  onboardingCompleted: true,
  updatedAt: '2025-02-20T12:00:00Z'
};

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-1',
    companyName: 'TechNova',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Backend Developer Intern',
    description: 'Join our core platform engineering team to architect high-throughput REST APIs, optimize relational database schemas, and build microservice modules that serve over 2M active daily requests.',
    responsibilities: [
      'Architect robust, performant RESTful API endpoints using Java & Spring Boot frameworks',
      'Optimize complex SQL queries, index structures, and transaction throughput on PostgreSQL',
      'Implement Redis caching layers to reduce latency for high-frequency database operations',
      'Collaborate with Frontend engineers to integrate TypeScript/React client applications'
    ],
    requiredSkills: ['Java', 'SQL', 'Git', 'Spring Boot'],
    preferredSkills: ['Docker', 'REST APIs', 'PostgreSQL', 'Redis'],
    sector: 'Software Development',
    roleCategory: 'Backend',
    location: 'Remote',
    workMode: 'Remote',
    duration: '6 Months',
    stipend: '₹15,000 / month',
    stipendAmount: 15000,
    openings: 4,
    minQualification: 'B.Tech / MCA',
    preferredBranches: ['Computer Science', 'IT', 'Software Engineering'],
    minCgpa: 7.5,
    postedAt: '2025-02-18',
    status: 'active',
    applicantCount: 42,
    matchScore: 91,
    selectionProbability: 88,
    probabilityLevel: 'High',
    breakdown: {
      skillsScore: 92,
      sectorScore: 100,
      educationScore: 90,
      locationScore: 85,
      finalMatchScore: 91,
      selectionProbability: 88,
      probabilityLevel: 'High',
      matchedSkills: ['Java', 'SQL', 'Git', 'OOP', 'Communication', 'Problem Solving'],
      missingSkills: ['Spring Boot', 'REST APIs', 'Docker'],
      reasons: [
        'Java skills strongly match requirements with demonstrated project proficiency',
        'SQL knowledge matches requirements and database schema design needs',
        'Your interest aligns directly with backend software development',
        'Your projects demonstrate relevant experience in building scalable API systems'
      ],
      improvementTips: [
        'Complete the Spring Boot Basics module in your Learning Path to reach 98% compatibility',
        'Deploy a mini Dockerized backend project on GitHub to stand out in the technical interview'
      ]
    },
    benefits: ['Certificate of Completion', 'Letter of Recommendation (LOR)', 'Pre-Placement Offer (PPO) Potential', 'Flexible Hours', 'Mentorship by Staff Engineers']
  },
  {
    id: 'intern-2',
    companyName: 'CodeCraft Solutions',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Java Developer Intern',
    description: 'Work on enterprise cloud applications, implement robust data structures, and write clean unit-tested Java code for financial fintech clients.',
    responsibilities: [
      'Write scalable core Java modules following OOP best practices and design patterns',
      'Create automated JUnit integration and unit tests for continuous delivery',
      'Optimize database queries and schema migrations for enterprise clients'
    ],
    requiredSkills: ['Java', 'OOP', 'DSA', 'SQL'],
    preferredSkills: ['Spring MVC', 'Hibernate', 'Maven'],
    sector: 'Software Development',
    roleCategory: 'Java Development',
    location: 'Bengaluru / Hybrid',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹20,000 / month',
    stipendAmount: 20000,
    openings: 3,
    minQualification: 'B.Tech / B.E.',
    preferredBranches: ['Computer Science', 'IT'],
    minCgpa: 7.0,
    postedAt: '2025-02-17',
    status: 'active',
    applicantCount: 38,
    matchScore: 87,
    selectionProbability: 84,
    probabilityLevel: 'High',
    breakdown: {
      skillsScore: 90,
      sectorScore: 95,
      educationScore: 85,
      locationScore: 80,
      finalMatchScore: 87,
      selectionProbability: 84,
      probabilityLevel: 'High',
      matchedSkills: ['Java', 'OOP', 'DSA', 'SQL', 'Git'],
      missingSkills: ['Spring MVC', 'Hibernate'],
      reasons: [
        'Solid foundation in core Java and object-oriented architectures',
        'Strong DSA rating aligns with CodeCraft technical interview standards',
        'Candidate has certified Java coursework on record'
      ],
      improvementTips: [
        'Brush up on Spring MVC dependency injection fundamentals'
      ]
    },
    benefits: ['Hybrid Work Stipend', 'Health Insurance', 'Dedicated Senior Mentor', 'PPO Opportunity']
  },
  {
    id: 'intern-3',
    companyName: 'CloudScale Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Software Engineer Intern',
    description: 'Build end-to-end full stack web applications using React, TypeScript, and Node.js microservices. Great role for engineers who enjoy both UI ergonomics and server logic.',
    responsibilities: [
      'Develop modern responsive web dashboards in React and Tailwind CSS',
      'Build secure Node.js backend services and WebSocket streaming feeds',
      'Participate in agile sprint plannings and peer code reviews'
    ],
    requiredSkills: ['React', 'JavaScript', 'Node.js', 'SQL'],
    preferredSkills: ['TypeScript', 'Tailwind CSS', 'GraphQL'],
    sector: 'Software Development',
    roleCategory: 'Full Stack',
    location: 'Remote',
    workMode: 'Remote',
    duration: '3 Months',
    stipend: '₹25,000 / month',
    stipendAmount: 25000,
    openings: 5,
    minQualification: 'B.Tech / BCA',
    preferredBranches: ['Computer Science', 'IT'],
    minCgpa: 7.2,
    postedAt: '2025-02-19',
    status: 'active',
    applicantCount: 56,
    matchScore: 84,
    selectionProbability: 80,
    probabilityLevel: 'High',
    breakdown: {
      skillsScore: 88,
      sectorScore: 90,
      educationScore: 85,
      locationScore: 90,
      finalMatchScore: 84,
      selectionProbability: 80,
      probabilityLevel: 'High',
      matchedSkills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'SQL'],
      missingSkills: ['Node.js', 'TypeScript'],
      reasons: [
        'Strong frontend proficiency in React and Tailwind CSS matching CloudScale UI stack',
        'Demonstrated project capability in building responsive web tools'
      ],
      improvementTips: [
        'Explore TypeScript strict typing and Node.js Express server routing'
      ]
    },
    benefits: ['Flexible Schedule', 'MacBook Provided', 'PPO Track', 'Learning Budget ₹10,000']
  },
  {
    id: 'intern-4',
    companyName: 'DataSphere Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Data Analyst Intern',
    description: 'Transform raw data into meaningful business intelligence insights. Write SQL queries, build executive Tableau dashboards, and discover statistical growth patterns.',
    responsibilities: [
      'Extract, clean, and transform multi-table relational datasets using SQL and Python',
      'Build automated reporting dashboards in Power BI and Tableau',
      'Present exploratory data analysis findings to product stakeholders'
    ],
    requiredSkills: ['SQL', 'Python', 'Excel', 'Tableau'],
    preferredSkills: ['Pandas', 'Power BI', 'Statistics'],
    sector: 'Data Science',
    roleCategory: 'Data Analytics',
    location: 'Gurugram / On-site',
    workMode: 'On-site',
    duration: '4 Months',
    stipend: '₹18,000 / month',
    stipendAmount: 18000,
    openings: 2,
    minQualification: 'B.Tech / B.Sc / BCA',
    preferredBranches: ['CS', 'Data Science', 'Mathematics'],
    minCgpa: 7.0,
    postedAt: '2025-02-14',
    status: 'active',
    applicantCount: 29,
    matchScore: 68,
    selectionProbability: 62,
    probabilityLevel: 'Medium',
    breakdown: {
      skillsScore: 70,
      sectorScore: 65,
      educationScore: 80,
      locationScore: 60,
      finalMatchScore: 68,
      selectionProbability: 62,
      probabilityLevel: 'Medium',
      matchedSkills: ['SQL', 'Python', 'Communication'],
      missingSkills: ['Tableau', 'Power BI', 'Excel'],
      reasons: [
        'SQL and Python foundations provide a good base for data transformations',
        'On-site requirement in Gurugram partially mismatches preferred remote setting'
      ],
      improvementTips: [
        'Learn Tableau dashboarding and Pandas data wrangling techniques'
      ]
    },
    benefits: ['Corporate Mentorship', 'Meals Provided on Campus', 'Certificate']
  },
  {
    id: 'intern-5',
    companyName: 'NexGen AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Machine Learning & AI Intern',
    description: 'Train cutting-edge transformer models, fine-tune LLMs, build evaluation benchmarks, and package inference endpoints into scalable FastAPI microservices.',
    responsibilities: [
      'Prepare and clean domain-specific multimodal training datasets',
      'Fine-tune open-weight AI models (Llama 3, Mistral) using PyTorch and HuggingFace',
      'Implement real-time vector embeddings and retrieval augmented generation (RAG) pipelines'
    ],
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI'],
    preferredSkills: ['HuggingFace', 'Docker', 'Vector DBs'],
    sector: 'Artificial Intelligence',
    roleCategory: 'AI & Data Science',
    location: 'Bengaluru / Hybrid',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹35,000 / month',
    stipendAmount: 35000,
    openings: 3,
    minQualification: 'B.Tech / MCA',
    preferredBranches: ['Computer Science', 'AI', 'Data Science'],
    minCgpa: 8.0,
    postedAt: '2025-02-15',
    status: 'active',
    applicantCount: 78,
    matchScore: 94,
    selectionProbability: 86,
    probabilityLevel: 'High',
    breakdown: {
      skillsScore: 92,
      sectorScore: 100,
      educationScore: 95,
      locationScore: 85,
      finalMatchScore: 94,
      selectionProbability: 86,
      probabilityLevel: 'High',
      matchedSkills: ['Python', 'SQL', 'Git', 'DSA', 'OOP'],
      missingSkills: ['PyTorch', 'FastAPI'],
      reasons: [
        'Python foundation and career interest in AI align seamlessly with NexGen roadmap',
        'Strong academic GPA (8.4) exceeds minimum threshold of 8.0'
      ],
      improvementTips: [
        'Complete a PyTorch deep learning project on GitHub with live FastAPI inference'
      ]
    },
    benefits: ['GPU Cloud Credits ($2,000)', 'Research Paper Co-authorship', 'Highest Stipend Tier', 'PPO Potential']
  },
  {
    id: 'intern-6',
    companyName: 'Aura Studio UI/UX',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'UI/UX Product Design Intern',
    description: 'Design delightful, intuitive mobile and web interfaces. Create design systems, interactive prototypes in Figma, and conduct user research interviews.',
    responsibilities: [
      'Design high-fidelity user interface wireframes and interactive prototypes in Figma',
      'Maintain design token component libraries in sync with frontend design systems',
      'Conduct usability tests with real users and synthesize feedback findings'
    ],
    requiredSkills: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    preferredSkills: ['Design Systems', 'HTML/CSS', 'Micro-interactions'],
    sector: 'Design',
    roleCategory: 'Design',
    location: 'Remote',
    workMode: 'Remote',
    duration: '4 Months',
    stipend: '₹20,000 / month',
    stipendAmount: 20000,
    openings: 2,
    minQualification: 'Any Graduate',
    preferredBranches: ['Design', 'CS', 'Any'],
    postedAt: '2025-02-14',
    status: 'active',
    applicantCount: 31,
    matchScore: 78,
    selectionProbability: 72,
    probabilityLevel: 'Medium',
    breakdown: {
      skillsScore: 75,
      sectorScore: 80,
      educationScore: 85,
      locationScore: 90,
      finalMatchScore: 78,
      selectionProbability: 72,
      probabilityLevel: 'Medium',
      matchedSkills: ['HTML5', 'CSS3', 'Tailwind CSS', 'Communication'],
      missingSkills: ['Figma', 'UI/UX Design', 'Wireframing'],
      reasons: [
        'Strong frontend CSS aesthetics and design intuition demonstrate UI competency'
      ],
      improvementTips: [
        'Build a comprehensive Figma case study portfolio demonstrating UX problem solving'
      ]
    },
    benefits: ['Figma Pro License', 'Design Portfolio Mentorship', 'Flexible Hours']
  },
  {
    id: 'intern-7',
    companyName: 'ScaleForge Systems',
    companyLogo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Cloud & DevOps Intern',
    description: 'Automate CI/CD pipelines, containerize microservices with Docker, manage Kubernetes clusters on AWS, and ensure 99.99% system reliability.',
    responsibilities: [
      'Write Dockerfiles and multi-stage container build optimizations',
      'Create GitHub Actions automated CI/CD workflows for testing and deployments',
      'Monitor infrastructure telemetry using Prometheus and Grafana'
    ],
    requiredSkills: ['Docker', 'Linux', 'AWS', 'Git'],
    preferredSkills: ['Kubernetes', 'Terraform', 'CI/CD'],
    sector: 'Cloud & DevOps',
    roleCategory: 'DevOps',
    location: 'Hyderabad / Hybrid',
    workMode: 'Hybrid',
    duration: '6 Months',
    stipend: '₹28,000 / month',
    stipendAmount: 28000,
    openings: 3,
    minQualification: 'B.Tech / MCA',
    preferredBranches: ['Computer Science', 'IT'],
    minCgpa: 7.5,
    postedAt: '2025-02-16',
    status: 'active',
    applicantCount: 45,
    matchScore: 82,
    selectionProbability: 79,
    probabilityLevel: 'High',
    breakdown: {
      skillsScore: 80,
      sectorScore: 85,
      educationScore: 90,
      locationScore: 80,
      finalMatchScore: 82,
      selectionProbability: 79,
      probabilityLevel: 'High',
      matchedSkills: ['Git', 'Java', 'SQL', 'OOP'],
      missingSkills: ['Docker', 'AWS', 'Linux'],
      reasons: [
        'Strong CS fundamentals and Git workflow facilitate quick DevOps onboarding',
        'Student has expressed keen interest in Cloud Computing domain'
      ],
      improvementTips: [
        'Complete Docker Fundamentals and deploy containerized services on AWS Free Tier'
      ]
    },
    benefits: ['AWS Certification Reimbursement ($150)', 'Production Experience', 'PPO Track']
  },
  {
    id: 'intern-8',
    companyName: 'SecureShield Corp',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&h=128&fit=crop&crop=faces&q=80',
    title: 'Cybersecurity Analyst Intern',
    description: 'Perform vulnerability assessments, security code reviews, and threat modeling for financial infrastructure protection.',
    responsibilities: [
      'Execute automated SAST/DAST security scans against web applications and APIs',
      'Identify OWASP Top 10 vulnerabilities and propose patch remediations',
      'Assist in incident response simulations and security compliance audits'
    ],
    requiredSkills: ['Network Security', 'Python', 'Linux', 'OWASP'],
    preferredSkills: ['Wireshark', 'Burp Suite', 'Cryptography'],
    sector: 'Cybersecurity',
    roleCategory: 'Security',
    location: 'Noida / On-site',
    workMode: 'On-site',
    duration: '3 Months',
    stipend: '₹22,000 / month',
    stipendAmount: 22000,
    openings: 2,
    minQualification: 'B.Tech / BCA',
    preferredBranches: ['CS', 'IT', 'Cybersecurity'],
    postedAt: '2025-02-13',
    status: 'active',
    applicantCount: 24,
    matchScore: 75,
    selectionProbability: 70,
    probabilityLevel: 'Medium',
    breakdown: {
      skillsScore: 74,
      sectorScore: 75,
      educationScore: 85,
      locationScore: 70,
      finalMatchScore: 75,
      selectionProbability: 70,
      probabilityLevel: 'Medium',
      matchedSkills: ['Python', 'Git', 'OOP', 'Communication'],
      missingSkills: ['Network Security', 'OWASP', 'Linux'],
      reasons: [
        'Python scripting and solid foundational programming skills align well'
      ],
      improvementTips: [
        'Study OWASP Top 10 web vulnerabilities and practice on TryHackMe or PortSwigger'
      ]
    },
    benefits: ['Security Clearance Sponsorship', 'Hands-on Threat Lab Access', 'Certificate']
  }
];

export const MOCK_SKILL_GAPS: SkillGapItem[] = [
  {
    skill: 'Java',
    category: 'Backend Core',
    currentLevel: 90,
    requiredLevel: 85,
    status: 'Strong',
    priority: 'High',
    whyImportant: 'Core requirement for 65%+ enterprise backend roles. Your 90% score gives you a top 5% candidate ranking.',
    unlockedInternshipsCount: 14,
    relatedRoles: ['Backend Developer', 'Java Engineer', 'Systems Programmer'],
    recommendedResource: {
      title: 'Advanced Java Concurrency & JVM Internals',
      type: 'Course',
      url: 'https://dev.java',
      estimatedHours: '8 Hours'
    }
  },
  {
    skill: 'SQL',
    category: 'Database & Data',
    currentLevel: 85,
    requiredLevel: 80,
    status: 'Strong',
    priority: 'High',
    whyImportant: 'Relational database schema design and query optimization are mandatory across all software tracks.',
    unlockedInternshipsCount: 18,
    relatedRoles: ['Backend Developer', 'Data Analyst', 'Full Stack'],
    recommendedResource: {
      title: 'PostgreSQL Indexing & Query Tuning Masterclass',
      type: 'Documentation',
      url: 'https://use-the-index-luke.com',
      estimatedHours: '6 Hours'
    }
  },
  {
    skill: 'DSA',
    category: 'Computer Science',
    currentLevel: 80,
    requiredLevel: 75,
    status: 'Strong',
    priority: 'High',
    whyImportant: 'Crucial for passing initial technical screening rounds at top hiring partners.',
    unlockedInternshipsCount: 22,
    relatedRoles: ['Software Engineer Intern', 'Backend Developer'],
    recommendedResource: {
      title: 'Blind 75 LeetCode Curated List in Java',
      type: 'Project',
      url: 'https://leetcode.com',
      estimatedHours: '20 Hours'
    }
  },
  {
    skill: 'Git',
    category: 'DevOps & Collaboration',
    currentLevel: 75,
    requiredLevel: 70,
    status: 'Strong',
    priority: 'Medium',
    whyImportant: 'Standard version control expected in all team environments for PR reviews and branch workflows.',
    unlockedInternshipsCount: 12,
    relatedRoles: ['All Engineering Tracks'],
    recommendedResource: {
      title: 'Pro Git Book & Rebase Workflows',
      type: 'Documentation',
      url: 'https://git-scm.com/book',
      estimatedHours: '4 Hours'
    }
  },
  {
    skill: 'System Design',
    category: 'Architecture',
    currentLevel: 60,
    requiredLevel: 75,
    status: 'Developing',
    priority: 'Medium',
    whyImportant: 'Understanding microservices, load balancers, and caching elevates your profile for senior intern positions.',
    unlockedInternshipsCount: 8,
    relatedRoles: ['Backend Developer', 'Cloud Engineer'],
    recommendedResource: {
      title: 'System Design Primer for Software Engineers',
      type: 'Documentation',
      url: 'https://github.com/donnemartin/system-design-primer',
      estimatedHours: '10 Hours'
    }
  },
  {
    skill: 'AWS',
    category: 'Cloud Computing',
    currentLevel: 50,
    requiredLevel: 70,
    status: 'Developing',
    priority: 'Medium',
    whyImportant: 'Cloud-native deployments on EC2, S3, and RDS make you immediately productive on live company infrastructure.',
    unlockedInternshipsCount: 11,
    relatedRoles: ['Cloud & DevOps Intern', 'Backend Engineer'],
    recommendedResource: {
      title: 'AWS Free Tier Hands-on Cloud Deployment',
      type: 'Course',
      url: 'https://aws.amazon.com/training',
      estimatedHours: '12 Hours'
    }
  },
  {
    skill: 'REST API',
    category: 'Backend Architecture',
    currentLevel: 40,
    requiredLevel: 80,
    status: 'Developing',
    priority: 'High',
    whyImportant: 'Industry standard protocol for web communications, JSON serialization, and OpenAPI documentation.',
    unlockedInternshipsCount: 16,
    relatedRoles: ['Backend Developer', 'Full Stack Developer'],
    recommendedResource: {
      title: 'RESTful API Design Best Practices & Swagger Spec',
      type: 'Course',
      url: 'https://restfulapi.net',
      estimatedHours: '8 Hours'
    }
  },
  {
    skill: 'Docker',
    category: 'Containerization',
    currentLevel: 30,
    requiredLevel: 75,
    status: 'Missing',
    priority: 'High',
    whyImportant: 'Missing key skill. Learning Docker containerization will immediately unlock 10+ high-paying DevOps & Backend roles.',
    unlockedInternshipsCount: 10,
    relatedRoles: ['DevOps Intern', 'Backend Engineer'],
    recommendedResource: {
      title: 'Docker for Java Developers: From Zero to Container',
      type: 'Course',
      url: 'https://docs.docker.com/get-started',
      estimatedHours: '8 Hours'
    }
  },
  {
    skill: 'Spring Boot',
    category: 'Framework',
    currentLevel: 20,
    requiredLevel: 85,
    status: 'Missing',
    priority: 'High',
    whyImportant: 'Most critical skill gap. Spring Boot powers 80% of enterprise Java internships at companies like TechNova.',
    unlockedInternshipsCount: 15,
    relatedRoles: ['Backend Developer Intern', 'Java Developer'],
    recommendedResource: {
      title: 'Building RESTful Web Services with Spring Boot 3',
      type: 'Course',
      url: 'https://spring.io/guides/gs/rest-service',
      estimatedHours: '10 Hours'
    }
  }
];

export const MOCK_ROADMAP: LearningRoadmap = {
  id: 'roadmap-backend',
  role: 'Backend Developer (Java & Spring Boot)',
  sector: 'Software Development',
  description: 'A structured, high-impact career trajectory taking you from core Java fundamentals to building production-ready microservices and securing top backend internships.',
  estimatedWeeks: 6,
  nodes: [
    {
      id: 'step-1',
      title: 'Spring Boot Basics',
      description: 'Master Spring core concepts, Dependency Injection (IoC), Beans lifecycle, and configuration with application.yml properties.',
      skills: ['Spring Boot', 'Dependency Injection', 'Maven'],
      estimatedHours: 10,
      status: 'in-progress',
      resources: [
        { name: 'Spring.io Quickstart Guide', link: 'https://spring.io/quickstart', free: true },
        { name: 'Baeldung Spring Boot Core Tutorial', link: 'https://www.baeldung.com/spring-boot', free: true }
      ],
      projectIdea: 'Build a Spring Boot Book Management API with CRUD endpoints and H2 in-memory DB.'
    },
    {
      id: 'step-2',
      title: 'Build REST APIs & JPA Persistence',
      description: 'Implement RESTful controllers, HTTP status codes, request validation, Spring Data JPA entities, repositories, and custom JPQL queries.',
      skills: ['REST APIs', 'Spring Data JPA', 'Hibernate', 'PostgreSQL'],
      estimatedHours: 12,
      status: 'locked',
      resources: [
        { name: 'REST API Best Practices (Mozilla MDN)', link: 'https://developer.mozilla.org', free: true },
        { name: 'Spring Data JPA in Action Guide', link: 'https://spring.io/guides/gs/accessing-data-jpa', free: true }
      ],
      projectIdea: 'Create an Internship Application API supporting filtering, pagination, and multi-table entity relationships.'
    },
    {
      id: 'step-3',
      title: 'Docker Fundamentals & Containerization',
      description: 'Package your Spring Boot JAR into minimal multi-stage Alpine Docker images, configure docker-compose for PostgreSQL, and manage environment secrets.',
      skills: ['Docker', 'Docker Compose', 'Linux'],
      estimatedHours: 8,
      status: 'locked',
      resources: [
        { name: 'Docker 101 Official Tutorial', link: 'https://docker.com/101-tutorial', free: true },
        { name: 'Containerizing Java Applications Guide', link: 'https://spring.io/guides/gs/spring-boot-docker', free: true }
      ],
      projectIdea: 'Containerize your Spring Boot API and PostgreSQL database using a single docker-compose up command.'
    },
    {
      id: 'step-4',
      title: 'Build a Complete Backend Capstone Project',
      description: 'Architect a portfolio-grade backend microservice with JWT authentication, Redis caching, Swagger OpenAPI docs, and unit testing with Mockito.',
      skills: ['System Design', 'Redis', 'JWT Security', 'Swagger/OpenAPI'],
      estimatedHours: 15,
      status: 'locked',
      resources: [
        { name: 'Spring Security with JWT Documentation', link: 'https://spring.io/projects/spring-security', free: true },
        { name: 'OpenAPI 3 / SpringDoc Guide', link: 'https://springdoc.org', free: true }
      ],
      projectIdea: 'Develop a high-performance E-Commerce or Freelance Gig Platform backend with authentication and automated tests.'
    },
    {
      id: 'step-5',
      title: 'Apply for Recommended Internships & Interview Prep',
      description: 'Leverage your newly acquired skills to unlock 95%+ match scores at TechNova, CodeCraft, and CloudScale, complete with resume ATS optimization.',
      skills: ['Resume Optimization', 'Technical Interviewing', 'System Design Review'],
      estimatedHours: 6,
      status: 'locked',
      resources: [
        { name: 'InternDisha AI Match Analyzer', link: '/recommendations', free: true },
        { name: 'Top 50 Java & Spring Interview Questions', link: 'https://github.com/Abhishek-Sharma-80', free: true }
      ],
      projectIdea: 'Submit 5 high-match internship applications with customized cover notes and GitHub portfolio links.'
    }
  ]
};

export const MOCK_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    userId: 'usr-student-01',
    studentName: 'Abhishek Sharma',
    studentEmail: 'abhishek.sharma@galgotiasuniversity.edu.in',
    studentCollege: 'Galgotias University',
    studentBranch: 'Computer Science',
    studentCgpa: 8.4,
    internshipId: 'intern-1',
    internship: MOCK_INTERNSHIPS[0], // TechNova
    status: 'Applied',
    appliedAt: '2025-02-18T09:30:00Z',
    coverNote: 'Excited about the Backend Developer role at TechNova. My experience in Java, Redis caching, and relational database tuning aligns closely with your platform goals.',
    matchScoreAtApply: 91
  },
  {
    id: 'app-2',
    userId: 'usr-student-01',
    studentName: 'Abhishek Sharma',
    studentEmail: 'abhishek.sharma@galgotiasuniversity.edu.in',
    studentCollege: 'Galgotias University',
    studentBranch: 'Computer Science',
    studentCgpa: 8.4,
    internshipId: 'intern-2',
    internship: MOCK_INTERNSHIPS[1], // CodeCraft
    status: 'Under Review',
    appliedAt: '2025-02-16T14:15:00Z',
    coverNote: 'I have certified Java SE coursework and built scalable task queues in core Java.',
    matchScoreAtApply: 87
  },
  {
    id: 'app-3',
    userId: 'usr-student-01',
    studentName: 'Abhishek Sharma',
    studentEmail: 'abhishek.sharma@galgotiasuniversity.edu.in',
    studentCollege: 'Galgotias University',
    studentBranch: 'Computer Science',
    studentCgpa: 8.4,
    internshipId: 'intern-3',
    internship: MOCK_INTERNSHIPS[2], // CloudScale
    status: 'Shortlisted',
    appliedAt: '2025-02-12T11:00:00Z',
    coverNote: 'Strong proficiency in modern React and TypeScript frontend systems.',
    interviewDate: '2025-02-25 at 3:00 PM IST',
    matchScoreAtApply: 84
  },
  {
    id: 'app-4',
    userId: 'usr-student-01',
    studentName: 'Abhishek Sharma',
    studentEmail: 'abhishek.sharma@galgotiasuniversity.edu.in',
    studentCollege: 'Galgotias University',
    studentBranch: 'Computer Science',
    studentCgpa: 8.4,
    internshipId: 'intern-5',
    internship: MOCK_INTERNSHIPS[4], // NexGen AI
    status: 'Interview',
    appliedAt: '2025-02-10T16:45:00Z',
    coverNote: 'Passionate about Python machine learning and FastAPI model deployments.',
    interviewDate: '2025-02-24 at 11:30 AM IST',
    matchScoreAtApply: 94
  }
];

export const MOCK_ADMIN_STATS: AdminStats = {
  totalStudents: 12480,
  activeStudents: 8640,
  availableInternships: 1250,
  partnerCompanies: 320,
  totalApplications: 24560,
  totalRecommendationsGenerated: 45820,
  studentsAtRiskCount: 85,
  sectorDistribution: [
    { sector: 'Software Development', count: 480 },
    { sector: 'Artificial Intelligence', count: 260 },
    { sector: 'Data Science', count: 190 },
    { sector: 'Cloud & DevOps', count: 140 },
    { sector: 'UI/UX Design', count: 110 },
    { sector: 'Cybersecurity', count: 70 }
  ],
  topDemandedSkills: [
    { skill: 'Java', count: 420 },
    { skill: 'Python', count: 390 },
    { skill: 'SQL', count: 340 },
    { skill: 'React', count: 290 },
    { skill: 'Spring Boot', count: 260 },
    { skill: 'JavaScript', count: 240 },
    { skill: 'Machine Learning', count: 210 },
    { skill: 'AWS', count: 180 },
    { skill: 'Docker', count: 160 },
    { skill: 'Data Structures', count: 150 }
  ],
  applicationStatusBreakdown: [
    { status: 'Applied', count: 12450 },
    { status: 'Shortlisted', count: 4820 },
    { status: 'Under Review', count: 3470 },
    { status: 'Selected', count: 620 },
    { status: 'Rejected', count: 3200 }
  ],
  skillDistribution: [
    { name: 'Java', percentage: 30, color: '#6366F1' },
    { name: 'Python', percentage: 25, color: '#0EA5E9' },
    { name: 'SQL', percentage: 20, color: '#8B5CF6' },
    { name: 'React', percentage: 15, color: '#10B981' },
    { name: 'DSA', percentage: 10, color: '#F59E0B' }
  ],
  monthlyTrends: [
    { month: 'Sep', applications: 2400, placements: 140 },
    { month: 'Oct', applications: 3800, placements: 210 },
    { month: 'Nov', applications: 5100, placements: 340 },
    { month: 'Dec', applications: 4200, placements: 280 },
    { month: 'Jan', applications: 6900, placements: 490 },
    { month: 'Feb', applications: 8400, placements: 620 }
  ],
  recentApplications: MOCK_APPLICATIONS
};

export const MOCK_ADMIN_COMPANIES: import('../types').Company[] = [
  {
    id: 'comp-1',
    name: 'TechNova Solutions',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Technology & Cloud Systems',
    website: 'https://technova.ai',
    location: 'Bengaluru / Remote',
    contactPerson: 'Pooja Nair (Head of University Talent)',
    contactEmail: 'pooja.nair@technova.ai',
    contactPhone: '+91 98450 11223',
    activeInternshipsCount: 12,
    totalApplicationsCount: 1250,
    averageMatchScore: 89.4,
    status: 'Verified',
    description: 'Enterprise AI & cloud platform engineering company building next-gen distributed systems for global financial institutions.',
    foundedYear: 2019,
    companySize: '250 - 500 Employees'
  },
  {
    id: 'comp-2',
    name: 'CodeCraft Solutions',
    logo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Software Engineering',
    website: 'https://codecraft.io',
    location: 'Hyderabad / Hybrid',
    contactPerson: 'Rahul Sen (Director of Engineering)',
    contactEmail: 'rahul.sen@codecraft.io',
    contactPhone: '+91 98765 99881',
    activeInternshipsCount: 8,
    totalApplicationsCount: 890,
    averageMatchScore: 87.2,
    status: 'Verified',
    description: 'Fintech software development agency specializing in mission-critical core banking architectures, Java Spring Boot microservices, and Kafka streaming.',
    foundedYear: 2018,
    companySize: '100 - 250 Employees'
  },
  {
    id: 'comp-3',
    name: 'NexGen AI Labs',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Artificial Intelligence & ML',
    website: 'https://nexgenai.tech',
    location: 'Bengaluru / Hybrid',
    contactPerson: 'Dr. Arjun Varma (Lead AI Scientist)',
    contactEmail: 'arjun.varma@nexgenai.tech',
    contactPhone: '+91 98112 33445',
    activeInternshipsCount: 6,
    totalApplicationsCount: 1420,
    averageMatchScore: 92.1,
    status: 'Verified',
    description: 'Generative AI and computer vision research company building open-source foundation models and retrieval-augmented generation pipelines.',
    foundedYear: 2021,
    companySize: '50 - 100 Employees'
  },
  {
    id: 'comp-4',
    name: 'CloudScale Networks',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Cloud Infrastructure & DevOps',
    website: 'https://cloudscale.net',
    location: 'Pune / Remote',
    contactPerson: 'Aditi Sharma (VP People)',
    contactEmail: 'aditi.sharma@cloudscale.net',
    contactPhone: '+91 99220 88776',
    activeInternshipsCount: 5,
    totalApplicationsCount: 640,
    averageMatchScore: 85.8,
    status: 'Verified',
    description: 'Kubernetes orchestration and multi-cloud observability platform managing multi-region serverless clusters.',
    foundedYear: 2020,
    companySize: '150 - 300 Employees'
  },
  {
    id: 'comp-5',
    name: 'DataSphere Analytics',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Data Analytics & Business Intelligence',
    website: 'https://datasphere.io',
    location: 'Gurugram / On-site',
    contactPerson: 'Manoj Pillai (Operations Head)',
    contactEmail: 'manoj.pillai@datasphere.io',
    contactPhone: '+91 98101 22334',
    activeInternshipsCount: 4,
    totalApplicationsCount: 520,
    averageMatchScore: 82.5,
    status: 'Verified',
    description: 'Enterprise data consulting and real-time visualization platform serving Fortune 500 retail companies.',
    foundedYear: 2017,
    companySize: '200 - 500 Employees'
  },
  {
    id: 'comp-6',
    name: 'Aura Design Studio',
    logo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'UI/UX & Product Design',
    website: 'https://aurastudio.design',
    location: 'Mumbai / Hybrid',
    contactPerson: 'Sanya Mirza (Principal Designer)',
    contactEmail: 'sanya@aurastudio.design',
    contactPhone: '+91 98200 44556',
    activeInternshipsCount: 3,
    totalApplicationsCount: 410,
    averageMatchScore: 86.0,
    status: 'Verified',
    description: 'Boutique digital product design studio crafting world-class interfaces and design systems for hyper-growth unicorns.',
    foundedYear: 2022,
    companySize: '20 - 50 Employees'
  },
  {
    id: 'comp-7',
    name: 'ScaleForge Systems',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Fullstack SaaS',
    website: 'https://scaleforge.com',
    location: 'Noida / Hybrid',
    contactPerson: 'Karan Mehra (Founder)',
    contactEmail: 'karan@scaleforge.com',
    contactPhone: '+91 98110 55667',
    activeInternshipsCount: 3,
    totalApplicationsCount: 380,
    averageMatchScore: 84.1,
    status: 'Pending',
    description: 'B2B enterprise automation suite building React + FastAPI microservices for manufacturing supply chain tracking.',
    foundedYear: 2023,
    companySize: '15 - 30 Employees'
  },
  {
    id: 'comp-8',
    name: 'SecureShield Cyber Labs',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&h=128&fit=crop&crop=faces&q=80',
    industry: 'Cybersecurity & Infosec',
    website: 'https://secureshield.io',
    location: 'Bengaluru / Remote',
    contactPerson: 'Col. Vikrant Roy (Chief Security Officer)',
    contactEmail: 'vikrant@secureshield.io',
    contactPhone: '+91 99880 11223',
    activeInternshipsCount: 2,
    totalApplicationsCount: 290,
    averageMatchScore: 81.3,
    status: 'Verified',
    description: 'Offensive and defensive cybersecurity testing platform providing vulnerability assessments and incident response.',
    foundedYear: 2020,
    companySize: '50 - 100 Employees'
  }
];

export const MOCK_ADMIN_REPORTS: import('../types').AdminReport[] = [
  {
    id: 'rep-1',
    title: 'Student Cohort Growth & Skill Onboarding Report (Q1 2025)',
    category: 'Students',
    generatedDate: '2025-02-20',
    format: 'PDF',
    fileSize: '2.4 MB',
    status: 'Ready',
    metricsSummary: '12,480 Registered Students • 82% Avg Profile Completion • +12.5% Monthly Growth'
  },
  {
    id: 'rep-2',
    title: 'Internship Market Demand & Sector Openings Analysis',
    category: 'Internships',
    generatedDate: '2025-02-19',
    format: 'CSV',
    fileSize: '840 KB',
    status: 'Ready',
    metricsSummary: '1,250 Active Listings • Software Development (38%) • Avg Stipend ₹21,500/mo'
  },
  {
    id: 'rep-3',
    title: 'Application Funnel & Student Placement Conversion Report',
    category: 'Applications',
    generatedDate: '2025-02-18',
    format: 'PDF',
    fileSize: '3.1 MB',
    status: 'Ready',
    metricsSummary: '24,560 Applications • 4,820 Shortlisted • 620 Placements Extended (2.5% Conversion)'
  },
  {
    id: 'rep-4',
    title: 'Comprehensive University Skill Gap & Competency Matrix',
    category: 'Skill Gap',
    generatedDate: '2025-02-17',
    format: 'PDF',
    fileSize: '1.9 MB',
    status: 'Ready',
    metricsSummary: 'Spring Boot (72% gap) • Docker (68% gap) • 85 Students needing urgent guidance'
  },
  {
    id: 'rep-5',
    title: 'Explainable AI Recommendation Engine Accuracy & Precision Audit',
    category: 'AI Performance',
    generatedDate: '2025-02-16',
    format: 'CSV',
    fileSize: '1.2 MB',
    status: 'Ready',
    metricsSummary: '89.5% Avg Compatibility Precision • 45,820 Matches Synthesized'
  },
  {
    id: 'rep-6',
    title: 'Partner Company Hiring Engagement & Candidate Shortlist Velocity',
    category: 'Companies',
    generatedDate: '2025-02-15',
    format: 'PDF',
    fileSize: '2.8 MB',
    status: 'Ready',
    metricsSummary: '320 Partner Companies • 92% Verified • Avg 3.4 Days Time-to-Interview'
  }
];

export const MOCK_ADMIN_NOTIFICATIONS: import('../types').AdminNotification[] = [
  {
    id: 'notif-1',
    title: '120 New Students Registered Today',
    description: 'Galgotias University Computer Science 3rd-year cohort successfully enrolled and completed onboarding.',
    time: '25m ago',
    type: 'student',
    read: false,
    link: '/admin/students'
  },
  {
    id: 'notif-2',
    title: 'TechNova Posted a New Internship',
    description: 'Backend Developer Intern (Remote, 4 openings, ₹15,000/mo) submitted and published automatically.',
    time: '1h ago',
    type: 'company',
    read: false,
    link: '/admin/internships'
  },
  {
    id: 'notif-3',
    title: '45 Internships Pending Verification Approval',
    description: 'New partner companies uploaded listings requiring administrative eligibility and stipend review.',
    time: '3h ago',
    type: 'approval',
    read: false,
    link: '/admin/internships'
  },
  {
    id: 'notif-4',
    title: '85 Students Identified At Risk for Career Guidance',
    description: 'Students with low verified skill counts (<3) and zero submitted applications flagged by AI scanner.',
    time: '5h ago',
    type: 'risk',
    read: false,
    link: '/admin/students'
  },
  {
    id: 'notif-5',
    title: 'AI Recommendation Cache Refreshed',
    description: 'Groq LLaMA-3.3 neural recommendation index synthesized 45,820 new candidate compatibility scores.',
    time: '1d ago',
    type: 'system',
    read: true,
    link: '/admin/ai-recommendations'
  }
];

export const MOCK_ADMIN_LEARNING_PATHS: import('../types').LearningPathAdmin[] = [
  {
    id: 'path-backend',
    title: 'Backend Developer Path (Java & Spring)',
    category: 'Software Development',
    description: 'Industry-standard roadmap covering Java OOP, Spring Boot, REST APIs, Docker, and scalable microservices architecture.',
    durationWeeks: 6,
    totalStudents: 4820,
    completionRate: 64.2,
    averageProgress: 72.8,
    status: 'Active',
    steps: [
      { step: 1, title: 'Core Java & OOP Architecture', skills: ['Java', 'OOP', 'Collections', 'Streams'], estimatedHours: 12 },
      { step: 2, title: 'Spring Boot Fundamentals & JPA', skills: ['Spring Boot', 'Spring Data JPA', 'Hibernate'], estimatedHours: 14 },
      { step: 3, title: 'RESTful API Design & Validation', skills: ['REST APIs', 'Swagger', 'JWT Security'], estimatedHours: 10 },
      { step: 4, title: 'Docker Containerization & Caching', skills: ['Docker', 'Redis', 'PostgreSQL'], estimatedHours: 8 },
      { step: 5, title: 'Capstone Distributed Task Microservice', skills: ['System Design', 'Git', 'CI/CD'], estimatedHours: 16 }
    ]
  },
  {
    id: 'path-data',
    title: 'Data Analyst & BI Path',
    category: 'Data Science',
    description: 'Master structured query language, pandas statistical data cleaning, PowerBI visual reporting, and executive metrics.',
    durationWeeks: 5,
    totalStudents: 3140,
    completionRate: 58.4,
    averageProgress: 65.1,
    status: 'Active',
    steps: [
      { step: 1, title: 'Advanced SQL Querying & Joins', skills: ['SQL', 'Window Functions', 'CTEs'], estimatedHours: 10 },
      { step: 2, title: 'Python Data Wrangling with Pandas', skills: ['Python', 'Pandas', 'NumPy'], estimatedHours: 12 },
      { step: 3, title: 'Exploratory Data Analysis & Seaborn', skills: ['Matplotlib', 'Seaborn', 'Statistics'], estimatedHours: 8 },
      { step: 4, title: 'Interactive Power BI & Tableau Dashboards', skills: ['Power BI', 'DAX', 'Storytelling'], estimatedHours: 10 },
      { step: 5, title: 'E-Commerce Churn Prediction Capstone', skills: ['Business Analytics', 'Reporting'], estimatedHours: 14 }
    ]
  },
  {
    id: 'path-ai',
    title: 'AI & Machine Learning Engineer Path',
    category: 'Artificial Intelligence',
    description: 'Foundations of mathematical modeling, supervised/unsupervised learning, PyTorch deep learning, and transformer deployments.',
    durationWeeks: 8,
    totalStudents: 2950,
    completionRate: 46.8,
    averageProgress: 54.2,
    status: 'Active',
    steps: [
      { step: 1, title: 'Linear Algebra & Python Machine Learning', skills: ['Scikit-Learn', 'Math for ML', 'Python'], estimatedHours: 14 },
      { step: 2, title: 'Deep Neural Networks in PyTorch', skills: ['PyTorch', 'TensorBoard', 'Backpropagation'], estimatedHours: 16 },
      { step: 3, title: 'Computer Vision & Convolutional Nets', skills: ['OpenCV', 'CNNs', 'Transfer Learning'], estimatedHours: 12 },
      { step: 4, title: 'Transformers & Large Language Models', skills: ['HuggingFace', 'BERT', 'RAG Pipelines'], estimatedHours: 16 },
      { step: 5, title: 'FastAPI Production Inference Endpoint', skills: ['FastAPI', 'Docker', 'MLOps'], estimatedHours: 15 }
    ]
  },
  {
    id: 'path-cloud',
    title: 'Cloud & DevOps Engineer Path',
    category: 'Cloud Infrastructure',
    description: 'Master Linux system administration, AWS cloud services, Docker container orchestration, and automated CI/CD pipelines.',
    durationWeeks: 6,
    totalStudents: 1840,
    completionRate: 52.0,
    averageProgress: 61.4,
    status: 'Active',
    steps: [
      { step: 1, title: 'Linux Bash Administration & Networking', skills: ['Linux', 'Bash Scripting', 'Networking'], estimatedHours: 10 },
      { step: 2, title: 'AWS Core Services (EC2, S3, IAM, VPC)', skills: ['AWS', 'Cloud Architecture', 'IAM'], estimatedHours: 14 },
      { step: 3, title: 'Docker Containers & Multi-Stage Builds', skills: ['Docker', 'Container Security'], estimatedHours: 10 },
      { step: 4, title: 'Kubernetes Pods, Services & Deployments', skills: ['Kubernetes', 'Helm', 'Minikube'], estimatedHours: 14 },
      { step: 5, title: 'GitHub Actions Automated CI/CD Pipeline', skills: ['CI/CD', 'Terraform', 'Monitoring'], estimatedHours: 12 }
    ]
  },
  {
    id: 'path-uiux',
    title: 'UI/UX & Product Design Path',
    category: 'Design',
    description: 'User research, wireframing in Figma, design systems tokenization, micro-animations, and interactive prototyping.',
    durationWeeks: 5,
    totalStudents: 1250,
    completionRate: 71.5,
    averageProgress: 81.0,
    status: 'Active',
    steps: [
      { step: 1, title: 'User Research & Information Architecture', skills: ['User Research', 'Personas', 'Journey Maps'], estimatedHours: 8 },
      { step: 2, title: 'Figma Auto-Layout & Component Variants', skills: ['Figma', 'Typography', 'Color Systems'], estimatedHours: 12 },
      { step: 3, title: 'Design Systems & WCAG Accessibility', skills: ['Design Tokens', 'Accessibility (a11y)'], estimatedHours: 10 },
      { step: 4, title: 'Interactive High-Fidelity Prototyping', skills: ['Micro-interactions', 'Smart Animate'], estimatedHours: 10 },
      { step: 5, title: 'Fintech Mobile App Case Study & Behance', skills: ['Portfolio Design', 'Usability Testing'], estimatedHours: 14 }
    ]
  }
];

export const MOCK_AI_SETTINGS: import('../types').AISettings = {
  skillsWeight: 40,
  interestWeight: 30,
  educationWeight: 20,
  experienceWeight: 10,
  thresholdMatchScore: 65,
  autoRecommendationEnabled: true,
  modelProvider: 'Groq LLaMA-3.3 Versatile (70B)',
  highMatchCutoff: 85
};

export const MOCK_ADMIN_STUDENTS: (User & { profile: StudentProfile })[] = [
  {
    ...INITIAL_USER,
    profile: INITIAL_PROFILE
  },
  {
    id: 'usr-2',
    name: 'Priya Singh',
    email: 'priya.singh@iitd.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-15T12:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-2',
      userId: 'usr-2',
      fullName: 'Priya Singh',
      college: 'IIT Delhi',
      branch: 'Information Technology',
      course: 'Computer Science',
      currentYear: 'Final Year',
      cgpa: 9.1,
      skills: ['Python', 'Machine Learning', 'PyTorch', 'FastAPI', 'SQL', 'Docker', 'Pandas'],
      interests: ['Artificial Intelligence', 'Data Science'],
      preferredRoles: ['ML Engineer', 'Data Scientist'],
      preferredLocation: 'Bengaluru / Hybrid',
      workPreference: 'Hybrid',
      resumeScore: 94
    }
  },
  {
    id: 'usr-3',
    name: 'Rohan Gupta',
    email: 'rohan.g@dtu.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-20T12:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-3',
      userId: 'usr-3',
      fullName: 'Rohan Gupta',
      college: 'Delhi Technological University',
      branch: 'Computer Engineering',
      course: 'B.Tech',
      currentYear: '3rd Year',
      cgpa: 8.7,
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Node.js', 'Redux', 'Git'],
      interests: ['Software Development', 'Design'],
      preferredRoles: ['Frontend Developer', 'Full Stack Developer'],
      preferredLocation: 'Delhi NCR / Remote',
      workPreference: 'Remote',
      resumeScore: 90
    }
  },
  {
    id: 'usr-4',
    name: 'Ananya Verma',
    email: 'ananya.v@bits-pilani.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-22T12:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-4',
      userId: 'usr-4',
      fullName: 'Ananya Verma',
      college: 'BITS Pilani',
      branch: 'Electronics & CS',
      course: 'B.E.',
      currentYear: '3rd Year',
      cgpa: 8.8,
      skills: ['Docker', 'AWS', 'Kubernetes', 'Linux', 'Python', 'Terraform', 'CI/CD'],
      interests: ['Cloud & DevOps', 'Software Development'],
      preferredRoles: ['DevOps Engineer', 'Cloud Architect'],
      preferredLocation: 'Bengaluru / Remote',
      workPreference: 'Remote',
      resumeScore: 92
    }
  },
  {
    id: 'usr-5',
    name: 'Vikram Malhotra',
    email: 'vikram.m@nitk.edu.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-25T14:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-5',
      userId: 'usr-5',
      fullName: 'Vikram Malhotra',
      college: 'NIT Surathkal',
      branch: 'Computer Science',
      course: 'B.Tech',
      currentYear: '2nd Year',
      cgpa: 7.2,
      skills: ['C++', 'DSA', 'OOP'],
      interests: ['Software Development'],
      preferredRoles: ['Software Engineering Intern'],
      preferredLocation: 'Remote',
      workPreference: 'Remote',
      resumeScore: 68
    }
  },
  {
    id: 'usr-6',
    name: 'Sneha Patel',
    email: 'sneha.patel@nirmauni.ac.in',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-01-28T10:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-6',
      userId: 'usr-6',
      fullName: 'Sneha Patel',
      college: 'Nirma University',
      branch: 'Information Technology',
      course: 'B.Tech',
      currentYear: '3rd Year',
      cgpa: 8.5,
      skills: ['SQL', 'Power BI', 'Tableau', 'Excel', 'Python', 'Statistics'],
      interests: ['Data Science', 'Business Analytics'],
      preferredRoles: ['Data Analyst', 'BI Developer'],
      preferredLocation: 'Ahmedabad / Remote',
      workPreference: 'Hybrid',
      resumeScore: 86
    }
  },
  {
    id: 'usr-7',
    name: 'Karthik Raman',
    email: 'karthik.r@annauniv.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-01T09:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-7',
      userId: 'usr-7',
      fullName: 'Karthik Raman',
      college: 'Anna University',
      branch: 'Computer Science',
      course: 'B.E.',
      currentYear: '2nd Year',
      cgpa: 7.1,
      skills: ['HTML5', 'CSS3', 'JavaScript'],
      interests: ['Software Development'],
      preferredRoles: ['Frontend Developer'],
      preferredLocation: 'Chennai',
      workPreference: 'On-site',
      resumeScore: 64
    }
  },
  {
    id: 'usr-8',
    name: 'Neha Chawla',
    email: 'neha.c@thapar.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    createdAt: '2025-02-05T11:00:00Z',
    profile: {
      ...INITIAL_PROFILE,
      id: 'prof-8',
      userId: 'usr-8',
      fullName: 'Neha Chawla',
      college: 'Thapar University',
      branch: 'Computer Science & Design',
      course: 'B.Tech',
      currentYear: '3rd Year',
      cgpa: 8.9,
      skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research'],
      interests: ['Design', 'Software Development'],
      preferredRoles: ['UI/UX Designer', 'Product Design Intern'],
      preferredLocation: 'Chandigarh / Remote',
      workPreference: 'Remote',
      resumeScore: 91
    }
  }
];

export const MOCK_RECRUITER_CANDIDATES: RecruiterCandidate[] = [
  {
    id: 'cand-1',
    name: 'Abhishek Sharma',
    email: 'abhishek.sharma@galgotiasuniversity.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'Galgotias University',
    branch: 'Computer Science',
    cgpa: 8.4,
    graduationYear: '2026',
    targetRole: 'Backend Development',
    matchScore: 92,
    selectionProbability: 88,
    skills: ['Java', 'SQL', 'Git', 'DSA', 'OOP', 'Spring Boot'],
    status: 'Shortlisted',
    appliedFor: 'Backend Developer Intern (TechNova)',
    appliedAt: '2025-02-18'
  },
  {
    id: 'cand-2',
    name: 'Priya Singh',
    email: 'priya.singh@iitd.ac.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    college: 'IIT Delhi',
    branch: 'Information Technology',
    cgpa: 9.1,
    graduationYear: '2025',
    targetRole: 'Machine Learning & AI',
    matchScore: 95,
    selectionProbability: 92,
    skills: ['Python', 'PyTorch', 'FastAPI', 'ML', 'SQL'],
    status: 'Interview Scheduled',
    appliedFor: 'Machine Learning Intern (NexGen AI)',
    appliedAt: '2025-02-16'
  },
  {
    id: 'cand-3',
    name: 'Rohan Gupta',
    email: 'rohan.g@dtu.ac.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'Delhi Technological University',
    branch: 'Computer Engineering',
    cgpa: 8.7,
    graduationYear: '2026',
    targetRole: 'Frontend Developer',
    matchScore: 89,
    selectionProbability: 84,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    status: 'New',
    appliedFor: 'Software Engineer Intern (CloudScale)',
    appliedAt: '2025-02-19'
  },
  {
    id: 'cand-4',
    name: 'Ananya Verma',
    email: 'ananya.v@bits-pilani.ac.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    branch: 'Electronics & CS',
    cgpa: 8.8,
    graduationYear: '2025',
    targetRole: 'Cloud & DevOps Engineer',
    matchScore: 86,
    selectionProbability: 81,
    skills: ['Docker', 'AWS', 'Kubernetes', 'Linux', 'Python'],
    status: 'Shortlisted',
    appliedFor: 'Cloud & DevOps Intern (ScaleForge)',
    appliedAt: '2025-02-17'
  }
];
