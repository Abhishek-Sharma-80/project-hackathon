import { LearningRoadmap, StudentProfile } from '../types';

export const predefinedRoadmaps: LearningRoadmap[] = [
  {
    id: 'roadmap-frontend',
    role: 'Frontend Developer',
    sector: 'Software Development',
    description: 'Master modern interactive UI development, component architecture, state management, and web performance.',
    estimatedWeeks: 12,
    nodes: [
      {
        id: 'fe-1',
        title: 'HTML5, Semantic Web & CSS Modern Layouts',
        description: 'Master flexbox, grid, responsive mobile-first typography, and web accessibility standards (ARIA).',
        skills: ['HTML5', 'CSS3', 'Tailwind CSS'],
        status: 'completed',
        resources: [
          { name: 'MDN Web Docs (HTML/CSS)', link: 'https://developer.mozilla.org', free: true },
          { name: 'CSS Tricks Flexbox Guide', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', free: true }
        ],
        projectIdea: 'Build a responsive multi-page marketing landing page with pure CSS/Tailwind.'
      },
      {
        id: 'fe-2',
        title: 'JavaScript ES6+ & Asynchronous Programming',
        description: 'Deep dive into DOM manipulation, Promises, Async/Await, closures, event loops, and fetch API.',
        skills: ['JavaScript'],
        status: 'completed',
        resources: [
          { name: 'JavaScript.info Complete Tutorial', link: 'https://javascript.info/', free: true },
          { name: 'Eloquent JavaScript', link: 'https://eloquentjavascript.net/', free: true }
        ],
        projectIdea: 'Create an interactive dynamic budget calculator and currency converter with live APIs.'
      },
      {
        id: 'fe-3',
        title: 'React.js Component Architecture & Hooks',
        description: 'Master functional components, custom hooks (useState, useEffect, useMemo), and component lifecycle.',
        skills: ['React'],
        status: 'completed',
        resources: [
          { name: 'Official React Documentation', link: 'https://react.dev/', free: true },
          { name: 'Scrimba Learn React Course', link: 'https://scrimba.com/learn/learnreact', free: true }
        ],
        projectIdea: 'Build a Kanban task management app with local storage persistence and search filtering.'
      },
      {
        id: 'fe-4',
        title: 'TypeScript for Type-Safe Applications',
        description: 'Learn strict types, interfaces, generics, union types, and React TypeScript prop patterns.',
        skills: ['TypeScript'],
        status: 'in-progress',
        resources: [
          { name: 'TypeScript Handbook', link: 'https://www.typescriptlang.org/docs/', free: true },
          { name: 'React TypeScript Cheatsheet', link: 'https://react-typescript-cheatsheet.netlify.app/', free: true }
        ],
        projectIdea: 'Refactor a standard React dashboard to full TypeScript with strict type checking.'
      },
      {
        id: 'fe-5',
        title: 'Git Version Control & Team Collaboration',
        description: 'Branching strategies, Pull Requests, merge conflict resolution, and GitHub Actions CI.',
        skills: ['Git & GitHub'],
        status: 'in-progress',
        resources: [
          { name: 'Learn Git Branching', link: 'https://learngitbranching.js.org/', free: true },
          { name: 'GitHub Skills Interactive Tutorials', link: 'https://skills.github.com/', free: true }
        ],
        projectIdea: 'Collaborate on an open source GitHub repository with pull requests and automated tests.'
      },
      {
        id: 'fe-6',
        title: 'Next.js & Production Deployment',
        description: 'Server-side rendering, static site generation, API routes, and cloud deployment on Vercel.',
        skills: ['Next.js', 'REST APIs'],
        status: 'locked',
        resources: [
          { name: 'Next.js Official Learn Course', link: 'https://nextjs.org/learn', free: true }
        ],
        projectIdea: 'Build a full-stack SEO-optimized blog with dynamic markdown and server-side data fetching.'
      }
    ]
  },
  {
    id: 'roadmap-backend',
    role: 'Backend Engineer',
    sector: 'Software Development',
    description: 'Learn robust server-side systems, database optimization, microservices, auth, and cloud hosting.',
    estimatedWeeks: 14,
    nodes: [
      {
        id: 'be-1',
        title: 'Node.js & Express.js Core Framework',
        description: 'Event-driven architecture, Express middleware, routing, and request validation.',
        skills: ['Node.js', 'Express.js'],
        status: 'completed',
        resources: [
          { name: 'Node.js Official Documentation', link: 'https://nodejs.org/en/docs/', free: true }
        ],
        projectIdea: 'Build a RESTful API for an e-commerce catalog with query filtering.'
      },
      {
        id: 'be-2',
        title: 'Relational Database Design & SQL',
        description: 'Database schemas, normalization, foreign keys, complex JOINs, indexing, and transactions.',
        skills: ['SQL', 'MySQL', 'PostgreSQL'],
        status: 'completed',
        resources: [
          { name: 'PostgreSQL Tutorial', link: 'https://www.postgresqltutorial.com/', free: true }
        ],
        projectIdea: 'Design a normalized database schema with complex analytical reporting queries.'
      },
      {
        id: 'be-3',
        title: 'Authentication, Security & JWT',
        description: 'Password hashing with bcrypt, JWT token verification, role-based access control (RBAC), and CORS.',
        skills: ['REST APIs', 'Node.js'],
        status: 'in-progress',
        resources: [
          { name: 'OWASP Security Guide', link: 'https://owasp.org/www-project-top-ten/', free: true }
        ],
        projectIdea: 'Build a secure multi-tenant authentication microservice with refresh tokens and rate limiting.'
      },
      {
        id: 'be-4',
        title: 'Docker & Containerization',
        description: 'Containerizing Node.js apps, Docker Compose for local database orchestration, and image optimization.',
        skills: ['Docker', 'Linux'],
        status: 'locked',
        resources: [
          { name: 'Docker Getting Started Guide', link: 'https://docs.docker.com/get-started/', free: true }
        ],
        projectIdea: 'Containerize an Express + PostgreSQL backend using multi-container Docker Compose.'
      }
    ]
  },
  {
    id: 'roadmap-aiml',
    role: 'AI & Data Science Engineer',
    sector: 'Artificial Intelligence',
    description: 'Build predictive machine learning models, neural networks, data pipelines, and intelligent AI apps.',
    estimatedWeeks: 16,
    nodes: [
      {
        id: 'ai-1',
        title: 'Python for Scientific Computing & Data Analysis',
        description: 'Data manipulation with Pandas, numerical computing with NumPy, and exploratory data visualization.',
        skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization'],
        status: 'completed',
        resources: [
          { name: 'Kaggle Python & Pandas Tutorials', link: 'https://www.kaggle.com/learn', free: true }
        ],
        projectIdea: 'Perform exploratory data analysis on a real-world financial or healthcare dataset.'
      },
      {
        id: 'ai-2',
        title: 'Machine Learning Algorithms & Scikit-Learn',
        description: 'Regression, classification, clustering, hyperparameter tuning, and cross-validation techniques.',
        skills: ['Machine Learning', 'Scikit-Learn'],
        status: 'in-progress',
        resources: [
          { name: 'Scikit-Learn User Guide', link: 'https://scikit-learn.org/stable/', free: true }
        ],
        projectIdea: 'Build an internship match score predictor using customer feature vector classification.'
      },
      {
        id: 'ai-3',
        title: 'Deep Learning & Neural Networks with PyTorch',
        description: 'Convolutional neural networks (CNN), NLP transformers, embeddings, and model training loops.',
        skills: ['PyTorch', 'Deep Learning'],
        status: 'locked',
        resources: [
          { name: 'PyTorch 60-Minute Blitz', link: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html', free: true }
        ],
        projectIdea: 'Train an image classification or text sentiment analysis model on GPU.'
      }
    ]
  }
];

export class RoadmapGenerator {
  public static getRoadmapForStudent(profile: StudentProfile, role?: string): LearningRoadmap {
    let targetRoadmap = predefinedRoadmaps[0];

    if (role) {
      const match = predefinedRoadmaps.find(r => r.role.toLowerCase().includes(role.toLowerCase()) || r.id.includes(role.toLowerCase()));
      if (match) targetRoadmap = match;
    } else if (profile.interests && profile.interests.length > 0) {
      const firstInterest = profile.interests[0].toLowerCase();
      if (firstInterest.includes('ai') || firstInterest.includes('data')) {
        targetRoadmap = predefinedRoadmaps.find(r => r.id === 'roadmap-aiml') || predefinedRoadmaps[0];
      } else if (firstInterest.includes('backend')) {
        targetRoadmap = predefinedRoadmaps.find(r => r.id === 'roadmap-backend') || predefinedRoadmaps[0];
      }
    }

    // Personalize node status based on student skills
    const studentSkillsLower = new Set((profile.skills || []).map(s => s.toLowerCase().trim()));

    const personalizedNodes = targetRoadmap.nodes.map(node => {
      const nodeSkillsLower = node.skills.map(s => s.toLowerCase().trim());
      const hasAll = nodeSkillsLower.every(s => studentSkillsLower.has(s));
      const hasSome = nodeSkillsLower.some(s => studentSkillsLower.has(s));

      let status: 'completed' | 'in-progress' | 'locked' = 'locked';
      if (hasAll) status = 'completed';
      else if (hasSome) status = 'in-progress';

      return {
        ...node,
        status
      };
    });

    // Ensure at least one in-progress if not all completed
    const hasInProgress = personalizedNodes.some(n => n.status === 'in-progress');
    if (!hasInProgress) {
      const firstLocked = personalizedNodes.find(n => n.status === 'locked');
      if (firstLocked) firstLocked.status = 'in-progress';
    }

    return {
      ...targetRoadmap,
      nodes: personalizedNodes
    };
  }

  public static getAllRoadmaps(): LearningRoadmap[] {
    return predefinedRoadmaps;
  }
}
