import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import * as authCtrl from '../controllers/authController';
import * as profileCtrl from '../controllers/profileController';
import * as internshipCtrl from '../controllers/internshipController';
import * as recCtrl from '../controllers/recommendationController';
import * as gapCtrl from '../controllers/skillGapController';
import * as learningCtrl from '../controllers/learningPathController';
import * as assessCtrl from '../controllers/assessmentController';
import * as appCtrl from '../controllers/applicationController';
import * as aiCtrl from '../controllers/aiAssistantController';
import * as adminCtrl from '../controllers/adminController';

const router = Router();

// ================= AUTH ROUTES =================
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.post('/auth/demo-login', authCtrl.demoLogin);
router.get('/auth/me', requireAuth, authCtrl.getMe);

// ================= PROFILE ROUTES =================
router.get('/profile', requireAuth, profileCtrl.getProfile);
router.put('/profile', requireAuth, profileCtrl.updateProfile);
router.post('/profile/onboarding', requireAuth, profileCtrl.saveOnboarding);
router.post('/profile/skills', requireAuth, profileCtrl.addSkill);
router.put('/profile/skills/:id', requireAuth, profileCtrl.updateSkill);
router.delete('/profile/skills/:id', requireAuth, profileCtrl.deleteSkill);
router.post('/profile/projects', requireAuth, profileCtrl.createProject);
router.delete('/profile/projects/:id', requireAuth, profileCtrl.deleteProject);
router.post('/profile/certifications', requireAuth, profileCtrl.createCertification);
router.delete('/profile/certifications/:id', requireAuth, profileCtrl.deleteCertification);

// ================= INTERNSHIP ROUTES =================
// Note: Optional authentication so public visitors can browse internships, but logged in students get match scores
router.get('/internships', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return requireAuth(req as any, res, next);
  }
  next();
}, internshipCtrl.getInternships);
router.get('/internships/:id', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return requireAuth(req as any, res, next);
  }
  next();
}, internshipCtrl.getInternshipById);

// ================= RECOMMENDATIONS & EXPLAINABILITY =================
router.get('/recommendations', requireAuth, recCtrl.getRecommendations);
router.get('/recommendations/:internshipId/explanation', requireAuth, recCtrl.getRecommendationExplanation);

// ================= SKILL GAPS =================
router.get('/skill-gaps', requireAuth, gapCtrl.getSkillGaps);

// ================= LEARNING PATH & ROADMAP =================
router.get('/learning-path', requireAuth, learningCtrl.getLearningPath);
router.post('/learning-path/complete-lesson', requireAuth, learningCtrl.completeLesson);

// ================= ASSESSMENTS =================
router.get('/assessments', requireAuth, assessCtrl.getAssessmentSkills);
router.get('/assessments/:skillName', requireAuth, assessCtrl.getQuestionsForSkill);
router.post('/assessments/submit', requireAuth, assessCtrl.submitAssessment);

// ================= APPLICATION TRACKER =================
router.get('/applications', requireAuth, appCtrl.getApplications);
router.post('/applications', requireAuth, appCtrl.createApplication);
router.put('/applications/:id/status', requireAuth, appCtrl.updateApplicationStatus);
router.delete('/applications/:id', requireAuth, appCtrl.deleteApplication);

// ================= AI ASSISTANT =================
router.post('/assistant/chat', requireAuth, aiCtrl.chatWithAssistant);
router.get('/assistant/history', requireAuth, aiCtrl.getChatHistory);

// ================= ADMIN MANAGEMENT & ANALYTICS =================
router.get('/admin/analytics', requireAuth, requireAdmin, adminCtrl.getAdminAnalytics);
router.get('/admin/interventions', requireAuth, requireAdmin, adminCtrl.getInterventionStudents);
router.get('/admin/students', requireAuth, requireAdmin, adminCtrl.getStudentsList);
router.get('/admin/students/:id', requireAuth, requireAdmin, adminCtrl.getStudentById);
router.get('/admin/reports', requireAuth, requireAdmin, adminCtrl.getReports);
router.get('/admin/companies', requireAuth, requireAdmin, adminCtrl.getCompanies);
router.post('/admin/companies', requireAuth, requireAdmin, adminCtrl.createCompany);
router.post('/admin/internships', requireAuth, requireAdmin, adminCtrl.createInternship);
router.put('/admin/internships/:id', requireAuth, requireAdmin, adminCtrl.updateInternship);
router.delete('/admin/internships/:id', requireAuth, requireAdmin, adminCtrl.deleteInternship);

export default router;
