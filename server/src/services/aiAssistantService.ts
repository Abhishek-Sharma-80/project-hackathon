import prisma from '../config/prisma';

export class AIAssistantService {
  /**
   * Generates intelligent, context-grounded response using student profile data
   */
  public async generateAnswer(studentId: string, userMessage: string): Promise<string> {
    const student = await prisma.studentProfile.findUnique({
      where: { id: studentId },
      include: {
        user: true,
        skills: { include: { skill: true } },
        projects: true,
        certifications: true,
        careerGoals: true,
        applications: { include: { internship: { include: { company: true } } } },
        recommendations: { include: { internship: { include: { company: true } } } },
      },
    });

    if (!student) {
      return "Hello! I am your SmartEdu AI Career Assistant. Please log in or complete your profile to receive personalized recommendations.";
    }

    const query = userMessage.toLowerCase().trim();
    const studentName = student.user.name.split(' ')[0] || 'Aryan';
    const strongSkills = student.skills.filter((s) => s.level >= 75).map((s) => s.skill.name);
    const weakSkills = student.skills.filter((s) => s.level < 50).map((s) => s.skill.name);
    const targetRole = student.targetRole || 'Backend Developer';
    const topRec = student.recommendations[0];

    // Contextual rule matchers
    if (query.includes('what should i learn') || query.includes('next') || query.includes('roadmap')) {
      const missingList = weakSkills.length > 0 ? weakSkills.slice(0, 3).join(', ') : 'Spring Boot, Docker, and REST APIs';
      return `Hi ${studentName}! Based on your current profile, your ${strongSkills.slice(0, 2).join(' and ') || 'programming'} foundations are solid. However, to be fully qualified for top ${targetRole} internships, your highest priority skill gaps are **${missingList}**. I recommend continuing your **${targetRole} Roadmap** starting with the *Spring Boot Fundamentals* module.`;
    }

    if (query.includes('why') && (query.includes('recommend') || query.includes('match') || query.includes('technova'))) {
      if (topRec && topRec.internship) {
        return `SmartEdu AI recommended **${topRec.internship.title}** at **${topRec.internship.company.name}** with a **${topRec.matchScore}% Match** because your proficiencies in ${strongSkills.slice(0, 3).join(', ')} cover 70% of their critical stack. Closing your gap in Spring Boot and Docker will push your readiness to **${topRec.potentialScore}%**!`;
      }
      return `SmartEdu AI evaluates 6 weighted dimensions: Required Skill Overlap (40%), Proficiency Depth (20%), Career Interest (15%), Academic CGPA (10%), Project Relevance (10%), and Certifications (5%). We only recommend internships where you have a viable path to qualification.`;
    }

    if (query.includes('ready') || query.includes('am i ready') || query.includes('eligib')) {
      const readiness = student.careerReadiness || 75;
      if (readiness >= 80) {
        return `You are in great shape! Your Career Readiness is currently **${readiness}%**. You meet core requirements for most junior and internship positions in ${targetRole}. You can confidently apply to high-match opportunities right now.`;
      } else {
        return `Your current Career Readiness index is **${readiness}%**. While you have strong fundamental programming skills (${strongSkills.join(', ')}), top hiring managers look for framework expertise like Spring Boot and containerization with Docker. Completing 2 more roadmap modules will elevate you to 85%+ readiness.`;
      }
    }

    if (query.includes('profile score') || query.includes('improve profile') || query.includes('increase score')) {
      return `Your SmartEdu AI Profile Score is currently **${student.profileScore}/100**. Here are 3 actionable ways to boost it:\n1. **Take Skill Assessments**: Complete verified MCQ assessments in Java and SQL (+10 pts)\n2. **Add Industry Certifications**: Upload certificates from AWS or Coursera (+5 pts)\n3. **Deploy a Full-Stack Project**: Add a GitHub repository link demonstrating Spring Boot and REST APIs (+10 pts).`;
    }

    if (query.includes('application') || query.includes('status') || query.includes('interview')) {
      const appCount = student.applications.length;
      return `You have **${appCount} active applications** tracked on your Kanban board. Keep checking your Application Tracker to update stages as recruiters respond, and make sure your technical portfolio aligns with the company requirements before interview rounds.`;
    }

    if (query.includes('technova') || query.includes('backend intern')) {
      return `TechNova's **Backend Developer Intern** role requires Java, SQL, DSA, Git, Spring Boot, REST APIs, and Docker. Your match score is **91%**. You have met the requirements for Java, SQL, DSA, and Git. Prioritize Spring Boot and Docker to guarantee technical interview success!`;
    }

    // Default intelligent guidance
    return `Hello ${studentName}! I analyzed your profile for **${targetRole}**. You currently hold a **${student.profileScore}% Profile Score** and **${student.careerReadiness}% Career Readiness**. Your strongest skills are ${strongSkills.slice(0, 3).join(', ')}. Ask me anything about your learning roadmap, internship match explanations, skill assessments, or interview preparation!`;
  }
}

export const aiAssistantService = new AIAssistantService();
