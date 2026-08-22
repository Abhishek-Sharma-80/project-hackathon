"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const authCtrl = __importStar(require("../controllers/authController"));
const profileCtrl = __importStar(require("../controllers/profileController"));
const internshipCtrl = __importStar(require("../controllers/internshipController"));
const recCtrl = __importStar(require("../controllers/recommendationController"));
const gapCtrl = __importStar(require("../controllers/skillGapController"));
const learningCtrl = __importStar(require("../controllers/learningPathController"));
const assessCtrl = __importStar(require("../controllers/assessmentController"));
const appCtrl = __importStar(require("../controllers/applicationController"));
const aiCtrl = __importStar(require("../controllers/aiAssistantController"));
const adminCtrl = __importStar(require("../controllers/adminController"));
const router = (0, express_1.Router)();
// ================= AUTH ROUTES =================
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);
router.post('/auth/demo-login', authCtrl.demoLogin);
router.get('/auth/me', auth_1.requireAuth, authCtrl.getMe);
// ================= PROFILE ROUTES =================
router.get('/profile', auth_1.requireAuth, profileCtrl.getProfile);
router.put('/profile', auth_1.requireAuth, profileCtrl.updateProfile);
router.post('/profile/onboarding', auth_1.requireAuth, profileCtrl.saveOnboarding);
router.post('/profile/skills', auth_1.requireAuth, profileCtrl.addSkill);
router.put('/profile/skills/:id', auth_1.requireAuth, profileCtrl.updateSkill);
router.delete('/profile/skills/:id', auth_1.requireAuth, profileCtrl.deleteSkill);
router.post('/profile/projects', auth_1.requireAuth, profileCtrl.createProject);
router.delete('/profile/projects/:id', auth_1.requireAuth, profileCtrl.deleteProject);
router.post('/profile/certifications', auth_1.requireAuth, profileCtrl.createCertification);
router.delete('/profile/certifications/:id', auth_1.requireAuth, profileCtrl.deleteCertification);
// ================= INTERNSHIP ROUTES =================
// Note: Optional authentication so public visitors can browse internships, but logged in students get match scores
router.get('/internships', (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return (0, auth_1.requireAuth)(req, res, next);
    }
    next();
}, internshipCtrl.getInternships);
router.get('/internships/:id', (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return (0, auth_1.requireAuth)(req, res, next);
    }
    next();
}, internshipCtrl.getInternshipById);
// ================= RECOMMENDATIONS & EXPLAINABILITY =================
router.get('/recommendations', auth_1.requireAuth, recCtrl.getRecommendations);
router.get('/recommendations/:internshipId/explanation', auth_1.requireAuth, recCtrl.getRecommendationExplanation);
// ================= SKILL GAPS =================
router.get('/skill-gaps', auth_1.requireAuth, gapCtrl.getSkillGaps);
// ================= LEARNING PATH & ROADMAP =================
router.get('/learning-path', auth_1.requireAuth, learningCtrl.getLearningPath);
router.post('/learning-path/complete-lesson', auth_1.requireAuth, learningCtrl.completeLesson);
// ================= ASSESSMENTS =================
router.get('/assessments', auth_1.requireAuth, assessCtrl.getAssessmentSkills);
router.get('/assessments/:skillName', auth_1.requireAuth, assessCtrl.getQuestionsForSkill);
router.post('/assessments/submit', auth_1.requireAuth, assessCtrl.submitAssessment);
// ================= APPLICATION TRACKER =================
router.get('/applications', auth_1.requireAuth, appCtrl.getApplications);
router.post('/applications', auth_1.requireAuth, appCtrl.createApplication);
router.put('/applications/:id/status', auth_1.requireAuth, appCtrl.updateApplicationStatus);
router.delete('/applications/:id', auth_1.requireAuth, appCtrl.deleteApplication);
// ================= AI ASSISTANT =================
router.post('/assistant/chat', auth_1.requireAuth, aiCtrl.chatWithAssistant);
router.get('/assistant/history', auth_1.requireAuth, aiCtrl.getChatHistory);
// ================= ADMIN MANAGEMENT & ANALYTICS =================
router.get('/admin/analytics', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getAdminAnalytics);
router.get('/admin/interventions', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getInterventionStudents);
router.get('/admin/students', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getStudentsList);
router.get('/admin/students/:id', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getStudentById);
router.get('/admin/reports', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getReports);
router.get('/admin/companies', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.getCompanies);
router.post('/admin/companies', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.createCompany);
router.post('/admin/internships', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.createInternship);
router.put('/admin/internships/:id', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.updateInternship);
router.delete('/admin/internships/:id', auth_1.requireAuth, auth_1.requireAdmin, adminCtrl.deleteInternship);
exports.default = router;
