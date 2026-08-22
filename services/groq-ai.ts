import prisma from '@/lib/prisma';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL_NAME = 'llama-3.3-70b-versatile'; // Ultra-fast, highly intelligent LLaMA 3.3 70B on Groq LPUs

export class GroqAIService {
  /**
   * Generates intelligent, profile-grounded career advice using Groq LLaMA 3.3 70B
   */
  public async generateStudentResponse(studentId: string, userMessage: string): Promise<string> {
    try {
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

      const strongSkills = student.skills.filter((s) => s.level >= 75).map((s) => `${s.skill.name} (${s.level}%)`);
      const weakSkills = student.skills.filter((s) => s.level < 60).map((s) => `${s.skill.name} (${s.level}%)`);
      const topRec = student.recommendations[0]?.internship;

      const systemPrompt = `You are the official SmartEdu AI Career Coach for Smart India Hackathon 2026 (Problem Statement 26205, Smart Education, AICTE).
Your mission is to bridge the gap between what students learn in college and what industry needs.

CURRENT STUDENT CONTEXT:
- Name: ${student.user.name}
- College: ${student.college} (${student.branch}, Semester ${student.semester}, CGPA ${student.cgpa}/10)
- Target Role: ${student.targetRole}
- Profile Score: ${student.profileScore}/100
- Career Readiness Index: ${student.careerReadiness}%
- Strong Skills: ${strongSkills.join(', ') || 'Java, SQL, DSA'}
- Priority Skill Gaps (Need Improvement): ${weakSkills.join(', ') || 'Spring Boot, Docker, REST APIs'}
- Top Recommended Opportunity: ${topRec ? `${topRec.title} at ${topRec.company?.name}` : 'Backend Developer Intern at TechNova (91% Match)'}
- Active Applications: ${student.applications.length} applications tracked.

INSTRUCTIONS:
1. Provide concise, highly actionable, encouraging, and intelligent career guidance grounded specifically in the student's actual skills and gaps.
2. If asked what to learn next, recommend closing their highest-priority gaps (Spring Boot, Docker, REST APIs) and following their SmartEdu AI Learning Roadmap.
3. If asked about internship recommendations, explain how their Java/SQL strengths match TechNova's stack and how learning Spring Boot boosts their match to 97%.
4. Keep formatting clean with markdown bullet points and bold highlights. Keep responses around 2-3 concise paragraphs.`;

      // Call Groq Cloud API
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL_NAME,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMessage },
          ],
          temperature: 0.6,
          max_tokens: 600,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Groq API responded with status ${response.status}:`, errorText);
        return this.deterministicFallback(student, userMessage);
      }

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content;
      if (aiReply) {
        return aiReply.trim();
      }

      return this.deterministicFallback(student, userMessage);
    } catch (error: any) {
      console.error('Groq AI Service error:', error);
      // Fallback gracefully to deterministic rule engine
      const student = await prisma.studentProfile.findUnique({
        where: { id: studentId },
        include: { user: true, skills: { include: { skill: true } } },
      });
      return this.deterministicFallback(student, userMessage);
    }
  }

  /**
   * Deterministic fallback provider in case of network issues
   */
  private deterministicFallback(student: any, userMessage: string): string {
    const studentName = student?.user?.name?.split(' ')[0] || 'Aryan';
    const query = userMessage.toLowerCase();
    const strongSkills = (student?.skills || []).filter((s: any) => s.level >= 75).map((s: any) => s.skill?.name);
    const targetRole = student?.targetRole || 'Backend Developer';

    if (query.includes('what should i learn') || query.includes('next') || query.includes('roadmap')) {
      return `Hi ${studentName}! Based on your current profile, your ${strongSkills.slice(0, 2).join(' and ') || 'programming'} foundations are solid. However, to be fully qualified for top ${targetRole} internships, your highest priority skill gaps are **Spring Boot 3, REST APIs, and Docker**. I recommend continuing your **${targetRole} Roadmap** starting with the *Spring Boot Fundamentals* module.`;
    }

    if (query.includes('why') && (query.includes('recommend') || query.includes('match') || query.includes('technova'))) {
      return `SmartEdu AI recommended **Backend Developer Intern** at **TechNova** with a **91% Match** because your proficiencies in Java, SQL, and DSA cover 70% of their critical stack. Closing your gap in Spring Boot and Docker via your learning path will push your readiness to **97%**!`;
    }

    if (query.includes('ready') || query.includes('am i ready')) {
      return `Your current Career Readiness index is **${student?.careerReadiness || 76}%**. While you have strong fundamental programming skills (${strongSkills.join(', ')}), top hiring managers look for framework expertise like Spring Boot and containerization with Docker. Completing 2 more roadmap modules will elevate you to 85%+ readiness.`;
    }

    return `Hello ${studentName}! As your SmartEdu AI Coach, I analyzed your profile for **${targetRole}**. You currently hold an **${student?.profileScore || 82}% Profile Score** and **${student?.careerReadiness || 76}% Career Readiness**. Your strongest skills are ${strongSkills.slice(0, 3).join(', ') || 'Java, SQL, DSA'}. Ask me anything about your learning roadmap, internship match explanations, skill assessments, or interview preparation!`;
  }
}

export const groqAIService = new GroqAIService();
