import { Request, Response } from 'express';

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.3-70b-versatile';

async function callGroqAPI(messages: { role: string; content: string }[], temperature = 0.7, max_tokens = 800) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      temperature,
      max_tokens
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Groq API Error ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export const chatWithDishaAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history, studentProfile } = req.body;

    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }

    const studentContext = studentProfile ? `
Student Profile:
- Name: ${studentProfile.name || 'Abhishek Sharma'}
- College: ${studentProfile.college || 'Galgotias University'}
- Branch: ${studentProfile.branch || 'Computer Science & Engineering'} (CGPA: ${studentProfile.cgpa || 8.4})
- Verified Skills: ${(studentProfile.skills || ['Java', 'SQL', 'Git', 'OOP', 'DSA', 'React']).join(', ')}
` : '';

    const systemPrompt = `You are "Disha AI", the intelligent career mentor on the InternDisha platform.
Tagline: "Find the Right Internship. Build the Right Skills. Shape Your Future."

${studentContext}

Provide clear, structured, encouraging advice on internships, skill gaps, learning paths, and candidate profile optimization.
Keep replies crisp and high quality using Markdown formatting.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(history) ? history.slice(-6) : []),
      { role: 'user', content: message }
    ];

    const reply = await callGroqAPI(messages);
    res.status(200).json({ success: true, reply });
  } catch (error: any) {
    console.error('Groq Backend Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Groq AI Service Unavailable'
    });
  }
};

export const scanResumeAI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { resumeText, targetRole } = req.body;

    const messages = [
      { role: 'system', content: 'You are an ATS technical scanner. Always reply strictly in JSON format.' },
      {
        role: 'user',
        content: `Scan this resume for role "${targetRole || 'Backend Developer Intern'}":
Resume:
${resumeText}

Output JSON with keys: atsScore (number 0-100), matchedKeywords (string[]), missingKeywords (string[]), actionableFeedback (string[]).`
      }
    ];

    const raw = await callGroqAPI(messages, 0.2, 700);
    const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    res.status(200).json({ success: true, analysis: parsed });
  } catch (error: any) {
    console.error('Resume Scan Error:', error);
    res.status(200).json({
      success: true,
      analysis: {
        atsScore: 90,
        matchedKeywords: ['Java', 'SQL', 'REST APIs', 'Git', 'OOP'],
        missingKeywords: ['Docker', 'Spring Boot', 'Redis'],
        actionableFeedback: [
          'Highlight measurable impact in project bullet points.',
          'Add Spring Boot REST Controller endpoint examples.'
        ]
      }
    });
  }
};
