import prisma from '@/lib/prisma';
import { calculateProfileScore } from './profile-score-engine';

export class LearningPathService {
  public async getOrCreateLearningPath(studentId: string, careerPath: string = 'Backend Developer') {
    let learningPath = await prisma.learningPath.findFirst({
      where: { studentId },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    if (!learningPath) {
      learningPath = await this.seedDefaultRoadmap(studentId, careerPath);
    }

    return learningPath;
  }

  public async seedDefaultRoadmap(studentId: string, careerPath: string) {
    const newPath = await prisma.learningPath.create({
      data: {
        studentId,
        careerPath,
        overallProgress: 18,
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
                  {
                    title: '2.2 API Pagination, Filtering & Sorting',
                    duration: '50 mins',
                    completed: false,
                    order: 2,
                    summary: 'Optimize query throughput using Pageable, Page<T>, and JPA Specifications.',
                    codeSnippet: 'Page<Internship> findByActiveTrue(Pageable pageable);',
                    resources: 'Pagination in RESTful Services Guide',
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
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });

    return newPath;
  }

  public async completeLesson(lessonId: string, studentId: string) {
    const lesson = await prisma.learningLesson.update({
      where: { id: lessonId },
      data: { completed: true },
      include: { module: { include: { lessons: true } } },
    });

    const moduleRecord = lesson.module;
    const totalLessons = moduleRecord.lessons.length;
    const completedLessons = moduleRecord.lessons.filter((l) => l.completed || l.id === lessonId).length;
    const moduleProgress = Math.round((completedLessons / totalLessons) * 100);
    const isModuleFinished = moduleProgress === 100;

    await prisma.learningModule.update({
      where: { id: moduleRecord.id },
      data: {
        progress: moduleProgress,
        status: isModuleFinished ? 'COMPLETED' : 'IN_PROGRESS',
      },
    });

    if (isModuleFinished) {
      const nextModule = await prisma.learningModule.findFirst({
        where: {
          learningPathId: moduleRecord.learningPathId,
          order: moduleRecord.order + 1,
        },
      });
      if (nextModule && nextModule.status === 'LOCKED') {
        await prisma.learningModule.update({
          where: { id: nextModule.id },
          data: { status: 'AVAILABLE' },
        });
      }
    }

    const skillNames = moduleRecord.skillsImproved.split(',').map((s) => s.trim());
    for (const skillName of skillNames) {
      const skill = await prisma.skill.findUnique({ where: { name: skillName } });
      if (skill) {
        const studentSkill = await prisma.studentSkill.findUnique({
          where: {
            studentId_skillId: {
              studentId,
              skillId: skill.id,
            },
          },
        });

        const currentLvl = studentSkill ? studentSkill.level : 20;
        const upgradeAmount = isModuleFinished ? 25 : 8;
        const newLevel = Math.min(95, currentLvl + upgradeAmount);

        await prisma.studentSkill.upsert({
          where: {
            studentId_skillId: {
              studentId,
              skillId: skill.id,
            },
          },
          update: { level: newLevel },
          create: {
            studentId,
            skillId: skill.id,
            level: newLevel,
          },
        });
      }
    }

    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        assessments: true,
        user: true,
      },
    });

    if (student) {
      const breakdown = calculateProfileScore(student);
      await prisma.studentProfile.update({
        where: { id: studentId },
        data: {
          profileScore: breakdown.totalScore,
          careerReadiness: breakdown.careerReadiness,
        },
      });
    }

    const allModules = await prisma.learningModule.findMany({
      where: { learningPathId: moduleRecord.learningPathId },
    });
    const avgProgress = Math.round(
      allModules.reduce((acc, m) => acc + (m.id === moduleRecord.id ? moduleProgress : m.progress), 0) /
        allModules.length
    );

    await prisma.learningPath.update({
      where: { id: moduleRecord.learningPathId },
      data: { overallProgress: avgProgress },
    });

    return {
      message: `Lesson "${lesson.title}" marked as complete!`,
      moduleProgress,
      isModuleFinished,
      improvedSkills: skillNames,
    };
  }
}

export const learningPathService = new LearningPathService();
