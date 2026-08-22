import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding SmartEdu AI Database at Root...');

  // Clear existing records
  await prisma.chatMessage.deleteMany();
  await prisma.skillAssessment.deleteMany();
  await prisma.assessmentQuestion.deleteMany();
  await prisma.learningLesson.deleteMany();
  await prisma.learningModule.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.skillGap.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.application.deleteMany();
  await prisma.internshipSkill.deleteMany();
  await prisma.internship.deleteMany();
  await prisma.company.deleteMany();
  await prisma.careerGoal.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.project.deleteMany();
  await prisma.studentSkill.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.user.deleteMany();

  const hashedStudentPassword = await bcrypt.hash('Aryan@123', 10);
  const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
  const hashedDefaultPassword = await bcrypt.hash('Student@123', 10);

  // 1. Create Core Skills
  const skillsData = [
    { name: 'Java', category: 'Programming', industryDemand: 92, description: 'Core Java, OOP, Streams, Concurrency, JVM internals' },
    { name: 'Python', category: 'Programming', industryDemand: 95, description: 'Python syntax, scripting, data handling, and backend frameworks' },
    { name: 'SQL', category: 'Database', industryDemand: 90, description: 'Relational query design, indexing, normalization, and ACID transactions' },
    { name: 'Data Structures & Algorithms', category: 'Core CS', industryDemand: 94, description: 'Trees, graphs, dynamic programming, sorting, and complexity analysis' },
    { name: 'Git', category: 'Tools', industryDemand: 88, description: 'Branching, PR workflows, merge conflict resolution, and CI integration' },
    { name: 'Spring Boot', category: 'Backend', industryDemand: 89, description: 'Dependency injection, Spring MVC, Spring Data JPA, and security' },
    { name: 'REST API', category: 'Backend', industryDemand: 91, description: 'Stateless HTTP API design, OpenAPI, JWT authentication, and pagination' },
    { name: 'Docker', category: 'DevOps', industryDemand: 93, description: 'Containerization, Dockerfile optimization, multi-container compose' },
    { name: 'AWS', category: 'Cloud', industryDemand: 90, description: 'EC2, S3, RDS, Lambda, VPC, IAM policies, and cloud deployment' },
    { name: 'React', category: 'Web', industryDemand: 92, description: 'Component architecture, hooks, state management, and virtual DOM' },
    { name: 'TypeScript', category: 'Programming', industryDemand: 89, description: 'Static typing, generics, interfaces, and modern ES features' },
    { name: 'Node.js', category: 'Backend', industryDemand: 87, description: 'Event loop, asynchronous I/O, Express, and microservices' },
    { name: 'System Design', category: 'Core CS', industryDemand: 86, description: 'High availability, load balancing, caching strategies, and partitioning' },
    { name: 'PostgreSQL', category: 'Database', industryDemand: 88, description: 'Advanced relational modeling, JSONB, indexing, and tuning' },
    { name: 'Redis', category: 'Database', industryDemand: 84, description: 'In-memory caching, pub/sub, key expiration, and session stores' },
    { name: 'Kubernetes', category: 'DevOps', industryDemand: 85, description: 'Container orchestration, pods, deployments, and cluster management' },
    { name: 'Machine Learning', category: 'AI/ML', industryDemand: 91, description: 'Supervised/unsupervised models, scikit-learn, evaluation metrics' },
    { name: 'Deep Learning', category: 'AI/ML', industryDemand: 88, description: 'Neural networks, PyTorch, CNNs, transformers, and embeddings' },
    { name: 'MongoDB', category: 'Database', industryDemand: 80, description: 'Document stores, aggregations, schema validation, and replica sets' },
    { name: 'Linux', category: 'Tools', industryDemand: 86, description: 'Shell scripting, file permissions, process management, and networking' },
    { name: 'Next.js', category: 'Web', industryDemand: 87, description: 'Server-side rendering, App Router, API routes, and static generation' },
    { name: 'Cybersecurity', category: 'Security', industryDemand: 84, description: 'OWASP top 10, encryption, vulnerability scanning, and secure coding' },
    { name: 'Microservices', category: 'Backend', industryDemand: 88, description: 'Service discovery, API gateways, circuit breakers, and event buses' },
    { name: 'FastAPI', category: 'Backend', industryDemand: 82, description: 'High performance async Python APIs with Pydantic validation' },
    { name: 'CI/CD', category: 'DevOps', industryDemand: 86, description: 'GitHub Actions, automated testing, container builds, and deployment pipelines' },
  ];

  const skillMap = new Map<string, any>();
  for (const s of skillsData) {
    const skill = await prisma.skill.create({ data: s });
    skillMap.set(s.name, skill);
  }

  // 2. Create Companies
  const companiesData = [
    {
      name: 'TechNova',
      industry: 'Enterprise Software & Cloud Platforms',
      description: 'TechNova builds high-throughput enterprise infrastructure and distributed backend solutions for Fortune 500 companies.',
      website: 'https://technova.io',
      location: 'Bangalore, India',
      companySize: '500-1000 employees',
    },
    {
      name: 'CloudScale Systems',
      industry: 'Cloud Infrastructure & DevOps',
      description: 'CloudScale is an industry leader in resilient Kubernetes infrastructure, serverless compute, and distributed telemetry.',
      website: 'https://cloudscale.tech',
      location: 'Hyderabad, India',
      companySize: '200-500 employees',
    },
    {
      name: 'DataMind AI',
      industry: 'Artificial Intelligence & Analytics',
      description: 'Pioneering generative AI workflows, intelligent recommendation engines, and enterprise machine learning platforms.',
      website: 'https://datamind.ai',
      location: 'Pune, India',
      companySize: '100-250 employees',
    },
    {
      name: 'FinEdge Analytics',
      industry: 'Fintech & Algorithmic Systems',
      description: 'Building low-latency financial settlement gateways and automated algorithmic transaction analysis engines.',
      website: 'https://finedge.com',
      location: 'Mumbai, India',
      companySize: '250-500 employees',
    },
    {
      name: 'CyberShield Labs',
      industry: 'Cybersecurity & Defense Tech',
      description: 'Zero-trust architecture, automated threat detection, and next-generation cloud security vulnerability analysis.',
      website: 'https://cybershield.security',
      location: 'Gurugram, India',
      companySize: '150-300 employees',
    },
    {
      name: 'Nexus Labs',
      industry: 'Web3 & Distributed Systems',
      description: 'Pioneering distributed state protocols, high-frequency transaction networks, and secure cryptographic tools.',
      website: 'https://nexuslabs.dev',
      location: 'Noida, India',
      companySize: '50-150 employees',
    },
    {
      name: 'InnovateX Technologies',
      industry: 'E-Commerce & Retail Tech',
      description: 'Scaling multi-tenant retail platforms, predictive supply chain algorithms, and omnichannel commerce solutions.',
      website: 'https://innovatex.io',
      location: 'Bangalore, India',
      companySize: '300-600 employees',
    },
    {
      name: 'BrightLearn AI',
      industry: 'EdTech & Intelligent Learning',
      description: 'Next-gen adaptive education software powered by real-time skill mapping and cognitive learning analytics.',
      website: 'https://brightlearn.ai',
      location: 'Delhi NCR, India',
      companySize: '80-200 employees',
    },
    {
      name: 'HyperScale Cloud',
      industry: 'Cloud Architecture & Multi-Cloud',
      description: 'Architecting resilient hybrid-cloud migrations, edge compute nodes, and high-concurrency microservice fabrics.',
      website: 'https://hyperscale.cloud',
      location: 'Chennai, India',
      companySize: '400-800 employees',
    },
    {
      name: 'Apex Mobility',
      industry: 'Smart Mobility & IoT',
      description: 'Real-time telemetry pipelines, smart EV fleet optimization, and high-speed embedded IoT systems.',
      website: 'https://apexmobility.com',
      location: 'Pune, India',
      companySize: '150-350 employees',
    },
  ];

  const companyMap = new Map<string, any>();
  for (const c of companiesData) {
    const comp = await prisma.company.create({ data: c });
    companyMap.set(c.name, comp);
  }

  // 3. Create Internships
  const technova = companyMap.get('TechNova');
  const cloudscale = companyMap.get('CloudScale Systems');
  const datamind = companyMap.get('DataMind AI');
  const finedge = companyMap.get('FinEdge Analytics');
  const cybershield = companyMap.get('CyberShield Labs');
  const innovatex = companyMap.get('InnovateX Technologies');
  const brightlearn = companyMap.get('BrightLearn AI');

  const internshipsData = [
    {
      companyId: technova.id,
      title: 'Backend Developer Intern',
      careerCategory: 'Backend',
      workMode: 'Remote',
      location: 'Bangalore / Remote',
      stipend: '₹35,000 / month',
      duration: '6 Months',
      deadline: '2026-07-15',
      description: 'Join TechNova’s Core Infrastructure team to engineer scalable microservices, write clean REST APIs, optimize database queries, and deploy containerized services to production clusters.',
      responsibilities: 'Design and implement REST APIs using Spring Boot and Java; Write performant SQL queries; Containerize applications using Docker; Participate in code reviews and automated test suites.',
      eligibility: 'B.Tech/BE in CS/IT or related branch. Strong fundamentals in Java, SQL, and DSA.',
      skills: [
        { name: 'Java', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'SQL', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Data Structures & Algorithms', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'Git', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Spring Boot', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'REST API', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Docker', requiredLevel: 60, importance: 'PREFERRED' },
      ],
    },
    {
      companyId: technova.id,
      title: 'Distributed Systems & Cloud Intern',
      careerCategory: 'Cloud',
      workMode: 'Hybrid',
      location: 'Bangalore, India',
      stipend: '₹40,000 / month',
      duration: '6 Months',
      deadline: '2026-07-20',
      description: 'Work on distributed caching, Redis clustering, and AWS cloud deployments for global scale APIs.',
      skills: [
        { name: 'Java', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'AWS', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Docker', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Redis', requiredLevel: 65, importance: 'PREFERRED' },
        { name: 'System Design', requiredLevel: 60, importance: 'PREFERRED' },
      ],
    },
    {
      companyId: cloudscale.id,
      title: 'DevOps & Cloud Engineering Intern',
      careerCategory: 'Cloud',
      workMode: 'Remote',
      location: 'Hyderabad / Remote',
      stipend: '₹32,000 / month',
      duration: '4-6 Months',
      deadline: '2026-08-01',
      description: 'Build CI/CD automation pipelines, manage Docker containers, and provision AWS infrastructure.',
      skills: [
        { name: 'Docker', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'AWS', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Linux', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'CI/CD', requiredLevel: 65, importance: 'PREFERRED' },
        { name: 'Git', requiredLevel: 75, importance: 'REQUIRED' },
      ],
    },
    {
      companyId: datamind.id,
      title: 'AI & Data Engineering Intern',
      careerCategory: 'AI/ML',
      workMode: 'Hybrid',
      location: 'Pune, India',
      stipend: '₹38,000 / month',
      duration: '6 Months',
      deadline: '2026-07-30',
      description: 'Develop data ingestion pipelines, fine-tune machine learning models, and build high-speed inference APIs.',
      skills: [
        { name: 'Python', requiredLevel: 80, importance: 'REQUIRED' },
        { name: 'SQL', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'Machine Learning', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'FastAPI', requiredLevel: 65, importance: 'PREFERRED' },
      ],
    },
    {
      companyId: finedge.id,
      title: 'Fintech Full Stack Developer Intern',
      careerCategory: 'Full Stack',
      workMode: 'On-site',
      location: 'Mumbai, India',
      stipend: '₹45,000 / month',
      duration: '6 Months',
      deadline: '2026-06-30',
      description: 'Engineer responsive web dashboards in React and resilient backend payment transaction services.',
      skills: [
        { name: 'React', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'TypeScript', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Java', requiredLevel: 70, importance: 'PREFERRED' },
        { name: 'SQL', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'REST API', requiredLevel: 75, importance: 'REQUIRED' },
      ],
    },
    {
      companyId: cybershield.id,
      title: 'Security Analyst & Threat Defense Intern',
      careerCategory: 'CyberSecurity',
      workMode: 'Remote',
      location: 'Gurugram / Remote',
      stipend: '₹30,000 / month',
      duration: '3-6 Months',
      deadline: '2026-08-10',
      description: 'Perform automated vulnerability audits, review API security posture, and analyze log streams.',
      skills: [
        { name: 'Cybersecurity', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'Linux', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'Python', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'REST API', requiredLevel: 65, importance: 'PREFERRED' },
      ],
    },
    {
      companyId: innovatex.id,
      title: 'E-Commerce Platform Engineer Intern',
      careerCategory: 'Backend',
      workMode: 'Remote',
      location: 'Bangalore / Remote',
      stipend: '₹30,000 / month',
      duration: '4 Months',
      deadline: '2026-07-25',
      description: 'Build backend microservices for order processing, inventory sync, and dynamic discounts.',
      skills: [
        { name: 'Java', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'SQL', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'REST API', requiredLevel: 70, importance: 'REQUIRED' },
        { name: 'Git', requiredLevel: 70, importance: 'REQUIRED' },
      ],
    },
    {
      companyId: brightlearn.id,
      title: 'Frontend Web Engineering Intern',
      careerCategory: 'Frontend',
      workMode: 'Remote',
      location: 'Delhi NCR / Remote',
      stipend: '₹28,000 / month',
      duration: '3-6 Months',
      deadline: '2026-08-15',
      description: 'Craft interactive learning UI components, gamified quiz widgets, and accessible web experiences in React & Next.js.',
      skills: [
        { name: 'React', requiredLevel: 80, importance: 'REQUIRED' },
        { name: 'TypeScript', requiredLevel: 75, importance: 'REQUIRED' },
        { name: 'Next.js', requiredLevel: 70, importance: 'PREFERRED' },
        { name: 'REST API', requiredLevel: 65, importance: 'REQUIRED' },
      ],
    },
  ];

  const createdInternships: any[] = [];
  for (const item of internshipsData) {
    const { skills, ...internshipFields } = item;
    const created = await prisma.internship.create({
      data: internshipFields,
    });
    createdInternships.push(created);

    for (const req of skills) {
      const skillObj = skillMap.get(req.name);
      if (skillObj) {
        await prisma.internshipSkill.create({
          data: {
            internshipId: created.id,
            skillId: skillObj.id,
            requiredLevel: req.requiredLevel,
            importance: req.importance,
          },
        });
      }
    }
  }

  // 4. Create Admin User
  await prisma.user.create({
    data: {
      name: 'Dr. Ramesh Kulkarni (Dean / Admin)',
      email: 'admin@smartedu.ai',
      passwordHash: hashedAdminPassword,
      role: 'ADMIN',
    },
  });

  // 5. Create Demo Student Persona: Aryan Sharma
  const aryanUser = await prisma.user.create({
    data: {
      name: 'Aryan Sharma',
      email: 'aryan@smartedu.ai',
      passwordHash: hashedStudentPassword,
      role: 'STUDENT',
      profile: {
        create: {
          college: 'Galgotias University',
          course: 'B.Tech',
          branch: 'Computer Science & Engineering',
          graduationYear: 2026,
          cgpa: 8.7,
          semester: 6,
          profileScore: 82,
          careerReadiness: 76,
          targetRole: 'Backend Developer',
          bio: 'Passionate 3rd-year CS undergraduate focused on Java, scalable distributed backend systems, and database optimization.',
        },
      },
    },
    include: { profile: true },
  });

  const aryanProfileId = aryanUser.profile!.id;

  // Aryan's Skills
  const aryanSkills = [
    { name: 'Java', level: 90, isVerified: true, verifiedLevel: 90 },
    { name: 'SQL', level: 85, isVerified: true, verifiedLevel: 85 },
    { name: 'Data Structures & Algorithms', level: 80, isVerified: true, verifiedLevel: 80 },
    { name: 'Git', level: 75, isVerified: true, verifiedLevel: 75 },
    { name: 'Spring Boot', level: 20, isVerified: false },
    { name: 'REST API', level: 40, isVerified: false },
    { name: 'Docker', level: 30, isVerified: false },
    { name: 'AWS', level: 50, isVerified: false },
    { name: 'React', level: 55, isVerified: false },
    { name: 'System Design', level: 25, isVerified: false },
  ];

  for (const s of aryanSkills) {
    const skillObj = skillMap.get(s.name);
    if (skillObj) {
      await prisma.studentSkill.create({
        data: {
          studentId: aryanProfileId,
          skillId: skillObj.id,
          level: s.level,
          verifiedLevel: s.verifiedLevel || null,
          isVerified: s.isVerified || false,
        },
      });
    }
  }

  // Aryan's Projects
  await prisma.project.createMany({
    data: [
      {
        studentId: aryanProfileId,
        title: 'Distributed Task Queue & Job Scheduler',
        description: 'High-throughput asynchronous job execution service in Java with priority queues, dead-letter storage, and worker pools.',
        technologies: 'Java, SQL, Concurrency, Git',
        githubUrl: 'https://github.com/aryan-sharma/distributed-task-queue',
        projectUrl: 'https://taskqueue-demo.smartedu.ai',
      },
      {
        studentId: aryanProfileId,
        title: 'High-Throughput E-Commerce Inventory API',
        description: 'Designed a transactional relational database schema with optimistic locking to prevent double-booking under high concurrent flash sales.',
        technologies: 'Java, PostgreSQL, SQL, REST API',
        githubUrl: 'https://github.com/aryan-sharma/ecommerce-inventory-engine',
        projectUrl: 'https://inventory-api.smartedu.ai',
      },
      {
        studentId: aryanProfileId,
        title: 'Real-Time Telemetry & Log Aggregator',
        description: 'Multi-threaded streaming pipeline analyzing server access metrics and error rate alerts in real-time.',
        technologies: 'Java, Data Structures, Git',
        githubUrl: 'https://github.com/aryan-sharma/log-aggregator',
      },
      {
        studentId: aryanProfileId,
        title: 'Student Innovation & Portfolio Showcase',
        description: 'Full stack responsive portal showcasing academic projects with search, tags, and faculty review ratings.',
        technologies: 'React, Node.js, SQL, REST API',
        githubUrl: 'https://github.com/aryan-sharma/student-showcase',
        projectUrl: 'https://showcase.galgotias.edu',
      },
    ],
  });

  // Aryan's Certifications
  await prisma.certification.createMany({
    data: [
      {
        studentId: aryanProfileId,
        name: 'Oracle Certified Professional: Java SE 17 Developer',
        provider: 'Oracle University',
        completionDate: '2025-11-15',
        credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=JAVA17-ARYAN',
      },
      {
        studentId: aryanProfileId,
        name: 'Meta Database Engineer Professional Certificate',
        provider: 'Meta / Coursera',
        completionDate: '2025-09-20',
        credentialUrl: 'https://coursera.org/verify/professional-cert/DB-ENG-982',
      },
      {
        studentId: aryanProfileId,
        name: 'AWS Certified Cloud Practitioner (CLF-C02)',
        provider: 'Amazon Web Services',
        completionDate: '2025-12-10',
        credentialUrl: 'https://aws.amazon.com/verification/AWS-CCP-7821',
      },
      {
        studentId: aryanProfileId,
        name: 'Algorithms Specialization (4-Course Series)',
        provider: 'Stanford Online',
        completionDate: '2025-08-05',
        credentialUrl: 'https://coursera.org/verify/specialization/STANFORD-ALGO',
      },
      {
        studentId: aryanProfileId,
        name: 'Docker Essentials & Container Fundamentals',
        provider: 'Docker Inc.',
        completionDate: '2026-01-18',
        credentialUrl: 'https://docker.com/verify/cert-8812',
      },
      {
        studentId: aryanProfileId,
        name: 'Git & Distributed Version Control Mastery',
        provider: 'Linux Foundation',
        completionDate: '2025-07-14',
        credentialUrl: 'https://training.linuxfoundation.org/verify/LFD108-GIT',
      },
    ],
  });

  // Aryan's Career Goal
  await prisma.careerGoal.create({
    data: {
      studentId: aryanProfileId,
      careerPath: 'Backend Developer',
      targetDate: '2026-08-01',
    },
  });

  // Aryan's Learning Path
  await prisma.learningPath.create({
    data: {
      studentId: aryanProfileId,
      careerPath: 'Backend Developer',
      overallProgress: 24,
      modules: {
        create: [
          {
            title: 'Spring Boot 3 Fundamentals',
            description: 'Master Dependency Injection, IoC container, Spring MVC, REST Controllers, and Spring Boot auto-configuration.',
            estimatedHours: 10,
            order: 1,
            status: 'IN_PROGRESS',
            progress: 65,
            skillsImproved: 'Spring Boot, Java',
            lessons: {
              create: [
                {
                  title: '1.1 Spring Framework & IoC Core Concepts',
                  duration: '45 mins',
                  completed: true,
                  order: 1,
                  summary: 'Understand ApplicationContext, Bean lifecycle, and constructor-based Dependency Injection.',
                  codeSnippet: '@Service\npublic class InternshipService {\n  private final StudentRepository studentRepo;\n\n  public InternshipService(StudentRepository studentRepo) {\n    this.studentRepo = studentRepo;\n  }\n}',
                  resources: 'Spring Framework Documentation, Baeldung Spring Guides',
                },
                {
                  title: '1.2 Building RESTful APIs with @RestController',
                  duration: '60 mins',
                  completed: true,
                  order: 2,
                  summary: 'Create production-ready GET, POST, PUT, DELETE endpoints with ResponseEntity and HTTP status codes.',
                  codeSnippet: '@RestController\n@RequestMapping("/api/v1/internships")\npublic class InternshipController {\n  @GetMapping("/{id}")\n  public ResponseEntity<InternshipDTO> getById(@PathVariable String id) {\n    return ResponseEntity.ok(service.getById(id));\n  }\n}',
                  resources: 'REST API Best Practices RFC 7231',
                },
                {
                  title: '1.3 Data Persistence with Spring Data JPA & Hibernate',
                  duration: '75 mins',
                  completed: false,
                  order: 3,
                  summary: 'Map entities, derive query methods, handle One-to-Many relationships and transaction management.',
                  codeSnippet: '@Entity\n@Table(name = "applications")\npublic class ApplicationEntity {\n  @Id @GeneratedValue\n  private UUID id;\n  @ManyToOne(fetch = FetchType.LAZY)\n  private StudentEntity student;\n}',
                  resources: 'Spring Data JPA Reference Manual',
                },
                {
                  title: '1.4 Global Exception Handling & Validation',
                  duration: '40 mins',
                  completed: false,
                  order: 4,
                  summary: 'Centralize API error responses with @ControllerAdvice, @ExceptionHandler, and @Valid constraints.',
                  codeSnippet: '@RestControllerAdvice\npublic class GlobalErrorHandler {\n  @ExceptionHandler(ResourceNotFoundException.class)\n  public ProblemDetail handleNotFound(ResourceNotFoundException ex) {\n    return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());\n  }\n}',
                  resources: 'RFC 7807 Problem Details for HTTP APIs',
                },
              ],
            },
          },
          {
            title: 'REST API Architecture & Microservices Basics',
            description: 'Design robust REST APIs, versioning, JWT stateless authentication, API documentation with OpenAPI / Swagger, and pagination.',
            estimatedHours: 12,
            order: 2,
            status: 'AVAILABLE',
            progress: 0,
            skillsImproved: 'REST API, System Design',
            lessons: {
              create: [
                {
                  title: '2.1 Stateless JWT Authentication & Security Filter Chain',
                  duration: '60 mins',
                  completed: false,
                  order: 1,
                  summary: 'Implement Spring Security 6, JWT token extraction, and role-based request authorization.',
                  codeSnippet: '@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n  return http.csrf(csrf -> csrf.disable())\n    .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))\n    .build();\n}',
                  resources: 'Spring Security 6 Architecture Guide',
                },
              ],
            },
          },
          {
            title: 'Docker & Containerization for Developers',
            description: 'Containerize backend microservices, write multi-stage Dockerfiles, configure Docker Compose with PostgreSQL & Redis.',
            estimatedHours: 8,
            order: 3,
            status: 'AVAILABLE',
            progress: 0,
            skillsImproved: 'Docker, DevOps',
            lessons: {
              create: [
                {
                  title: '3.1 Writing Optimized Multi-Stage Dockerfiles',
                  duration: '45 mins',
                  completed: false,
                  order: 1,
                  summary: 'Build small, secure production images with Eclipse Temurin JRE alpine base images.',
                  codeSnippet: 'FROM maven:3.9-eclipse-temurin-21-alpine AS build\nWORKDIR /app\nCOPY . .\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:21-jre-alpine\nCOPY --from=build /app/target/*.jar app.jar\nENTRYPOINT ["java", "-jar", "app.jar"]',
                  resources: 'Docker Official Best Practices',
                },
              ],
            },
          },
          {
            title: 'Build a Full-Stack Production Backend Project',
            description: 'Put your Spring Boot, REST API, Docker, and SQL skills into practice by engineering a high-concurrency internship matching service.',
            estimatedHours: 15,
            order: 4,
            status: 'LOCKED',
            progress: 0,
            skillsImproved: 'Spring Boot, Docker, SQL, REST API',
            lessons: {
              create: [
                {
                  title: '4.1 System Design & Schema Architecture',
                  duration: '60 mins',
                  completed: false,
                  order: 1,
                  summary: 'Plan entity relationships, database indexing, and API contract specifications.',
                  codeSnippet: '// Architecture blueprint',
                  resources: 'System Design Primer',
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Aryan's Applications
  const appStatusConfigs = [
    { idx: 0, status: 'APPLIED', notes: 'Applied to TechNova Backend Intern. Top 91% Match.' },
    { idx: 1, status: 'SHORTLISTED', notes: 'Recruiter reached out for technical interview scheduling.' },
    { idx: 2, status: 'INTERVIEW', notes: 'Technical Round 1 scheduled for next Tuesday (System Architecture).' },
    { idx: 3, status: 'SAVED', notes: 'Saved for later after completing Docker roadmap module.' },
    { idx: 4, status: 'SELECTED', notes: 'Offer letter received for Summer 2026 Developer Track!' },
    { idx: 5, status: 'SHORTLISTED', notes: 'Application under review with engineering manager.' },
    { idx: 6, status: 'APPLIED', notes: 'Direct referral through college placement cell.' },
    { idx: 7, status: 'INTERVIEW', notes: 'Live coding round on Data Structures & Trees.' },
  ];

  for (const cfg of appStatusConfigs) {
    if (createdInternships[cfg.idx]) {
      await prisma.application.create({
        data: {
          studentId: aryanProfileId,
          internshipId: createdInternships[cfg.idx].id,
          status: cfg.status,
          matchScore: 85 + (cfg.idx % 10),
          notes: cfg.notes,
        },
      });
    }
  }

  // Assessment Questions
  const assessmentsQuestionsData = [
    {
      skillName: 'Java',
      questions: [
        {
          question: 'What is the primary difference between Comparable and Comparator in Java?',
          options: JSON.stringify([
            'Comparable provides single natural sorting via compareTo(), Comparator provides custom multi-attribute sorting via compare()',
            'Comparable is used for primitive types, Comparator for objects',
            'Comparator is part of java.lang, Comparable is in java.util',
            'There is no functional difference; they are interchangeable',
          ]),
          correctIndex: 0,
          explanation: 'Comparable is implemented by the class to define its natural ordering, while Comparator is an external strategy interface passed to sort methods.',
          difficulty: 'MEDIUM',
        },
        {
          question: 'Which garbage collection algorithm was introduced as the default GC starting from Java 9?',
          options: JSON.stringify(['Parallel GC', 'G1 (Garbage-First) GC', 'CMS (Concurrent Mark Sweep)', 'ZGC']),
          correctIndex: 1,
          explanation: 'G1 GC replaced Parallel GC as the default collector in Java 9 to provide high throughput with low pause times.',
          difficulty: 'MEDIUM',
        },
        {
          question: 'In Java multithreading, what happens when a thread calls wait() on an object?',
          options: JSON.stringify([
            'It releases the monitor lock and enters the WAITING state until notify()/notifyAll() is invoked',
            'It keeps the lock and sleeps for a specified time',
            'The thread is immediately terminated',
            'It yields CPU execution without releasing synchronization locks',
          ]),
          correctIndex: 0,
          explanation: 'The wait() method releases the lock held on the object monitor and places the calling thread in the wait set.',
          difficulty: 'HARD',
        },
      ],
    },
    {
      skillName: 'SQL',
      questions: [
        {
          question: 'What is the primary purpose of a B-Tree index in a relational database?',
          options: JSON.stringify([
            'To reduce disk I/O operations by maintaining sorted tree nodes for O(log N) key lookups',
            'To compress stored text data in columns',
            'To automatically generate foreign key constraints',
            'To convert relational tables into document objects',
          ]),
          correctIndex: 0,
          explanation: 'B-Tree indexes maintain a balanced hierarchical tree that allows range and equality queries in logarithmic disk reads.',
          difficulty: 'MEDIUM',
        },
      ],
    },
    {
      skillName: 'Spring Boot',
      questions: [
        {
          question: 'What does the @SpringBootApplication annotation combine under the hood?',
          options: JSON.stringify([
            '@Configuration, @EnableAutoConfiguration, and @ComponentScan',
            '@Controller, @Service, and @Repository',
            '@Entity, @Table, and @Id',
            '@Component, @Autowired, and @Qualifier',
          ]),
          correctIndex: 0,
          explanation: '@SpringBootApplication is a meta-annotation that bundles @Configuration, @EnableAutoConfiguration, and @ComponentScan.',
          difficulty: 'EASY',
        },
      ],
    },
  ];

  for (const group of assessmentsQuestionsData) {
    const skillObj = skillMap.get(group.skillName);
    if (skillObj) {
      for (const q of group.questions) {
        await prisma.assessmentQuestion.create({
          data: {
            skillId: skillObj.id,
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            difficulty: q.difficulty,
          },
        });
      }
    }
  }

  // Seed 20 Realistic Students
  const dummyStudents = [
    { name: 'Priya Verma', email: 'priya@galgotias.edu', cgpa: 9.1, branch: 'Computer Science', role: 'Frontend Developer', score: 88, readiness: 85 },
    { name: 'Rohan Gupta', email: 'rohan.g@galgotias.edu', cgpa: 8.4, branch: 'Information Technology', role: 'Full Stack Developer', score: 79, readiness: 74 },
    { name: 'Ananya Iyer', email: 'ananya.i@iitd.ac.in', cgpa: 9.4, branch: 'AI & Data Science', role: 'AI Engineer', score: 94, readiness: 92 },
    { name: 'Vikram Singh', email: 'vikram.s@nitk.edu', cgpa: 7.8, branch: 'Computer Science', role: 'Cloud Engineer', score: 72, readiness: 68 },
    { name: 'Sneha Patel', email: 'sneha.p@dtu.ac.in', cgpa: 8.9, branch: 'Computer Science', role: 'Backend Developer', score: 86, readiness: 82 },
    { name: 'Karan Malhotra', email: 'karan.m@bits.ac.in', cgpa: 8.2, branch: 'Electronics & CS', role: 'Cybersecurity', score: 75, readiness: 70 },
    { name: 'Tanvi Joshi', email: 'tanvi.j@galgotias.edu', cgpa: 6.9, branch: 'Information Technology', role: 'Frontend Developer', score: 58, readiness: 52 },
    { name: 'Rahul Deshmukh', email: 'rahul.d@pune.edu', cgpa: 8.6, branch: 'Data Science', role: 'Data Scientist', score: 83, readiness: 80 },
    { name: 'Ishita Nair', email: 'ishita.n@galgotias.edu', cgpa: 9.0, branch: 'Computer Science', role: 'Backend Developer', score: 89, readiness: 87 },
    { name: 'Aditya Choudhury', email: 'aditya.c@iitb.ac.in', cgpa: 9.5, branch: 'Computer Science', role: 'AI Engineer', score: 96, readiness: 95 },
  ];

  for (const ds of dummyStudents) {
    const sUser = await prisma.user.create({
      data: {
        name: ds.name,
        email: ds.email,
        passwordHash: hashedDefaultPassword,
        role: 'STUDENT',
        profile: {
          create: {
            college: ds.email.includes('galgotias') ? 'Galgotias University' : 'Top Tier Engineering Institute',
            course: 'B.Tech',
            branch: ds.branch,
            graduationYear: 2026,
            cgpa: ds.cgpa,
            semester: 6,
            profileScore: ds.score,
            careerReadiness: ds.readiness,
            targetRole: ds.role,
          },
        },
      },
      include: { profile: true },
    });

    const javaSkill = skillMap.get('Java');
    const sqlSkill = skillMap.get('SQL');
    if (javaSkill && sUser.profile) {
      await prisma.studentSkill.create({
        data: {
          studentId: sUser.profile.id,
          skillId: javaSkill.id,
          level: Math.round(ds.readiness * 0.9),
          isVerified: ds.readiness > 80,
        },
      });
    }
    if (sqlSkill && sUser.profile) {
      await prisma.studentSkill.create({
        data: {
          studentId: sUser.profile.id,
          skillId: sqlSkill.id,
          level: Math.round(ds.readiness * 0.85),
          isVerified: ds.readiness > 80,
        },
      });
    }
  }

  console.log('✅ Root Database seeded successfully with Aryan Sharma & Admin!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
