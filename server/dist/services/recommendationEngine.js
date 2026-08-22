"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendationEngine = exports.RecommendationEngine = void 0;
class RecommendationEngine {
    /**
     * Calculates deterministic 6-factor match score and explainability breakdown
     */
    calculateMatch(studentProfile, internship) {
        const studentSkillsMap = new Map();
        (studentProfile.skills || []).forEach((ss) => {
            const skillName = ss.skill?.name || ss.name || '';
            studentSkillsMap.set(skillName.toLowerCase(), ss.level || 0);
        });
        const requiredSkillsList = internship.requiredSkills || [];
        let matchedRequiredCount = 0;
        let totalProficiencyWeight = 0;
        let maxProficiencyWeight = 0;
        const matchingSkills = [];
        const missingSkills = [];
        const strengths = [];
        const weaknesses = [];
        const skillComparison = requiredSkillsList.map((req) => {
            const skillName = req.skill?.name || 'Skill';
            const requiredLevel = req.requiredLevel || 70;
            const studentLevel = studentSkillsMap.get(skillName.toLowerCase()) || 0;
            const importance = req.importance || 'REQUIRED';
            const isMet = studentLevel >= requiredLevel;
            if (studentLevel >= requiredLevel * 0.7) {
                matchingSkills.push(skillName);
                if (studentLevel >= 80) {
                    strengths.push(`${skillName} (${studentLevel}% - Advanced)`);
                }
            }
            else {
                missingSkills.push(skillName);
                weaknesses.push(`${skillName} (Current: ${studentLevel}%, Needed: ${requiredLevel}%)`);
            }
            if (studentLevel >= requiredLevel) {
                matchedRequiredCount++;
            }
            const weight = importance === 'REQUIRED' ? 1.5 : 1.0;
            totalProficiencyWeight += Math.min(1.0, studentLevel / requiredLevel) * weight;
            maxProficiencyWeight += weight;
            return {
                skillName,
                studentLevel,
                requiredLevel,
                isMet,
                importance,
            };
        });
        // 1. Skill Overlap Score (40%)
        const skillCount = Math.max(1, requiredSkillsList.length);
        const overlapRatio = Math.min(1, (matchingSkills.length) / skillCount);
        const skillOverlapScore = Math.round(overlapRatio * 100);
        // 2. Proficiency Score (20%)
        const proficiencyRatio = maxProficiencyWeight > 0 ? totalProficiencyWeight / maxProficiencyWeight : 0.5;
        const proficiencyScore = Math.round(proficiencyRatio * 100);
        // 3. Career Interest Match (15%)
        const targetRole = (studentProfile.targetRole || '').toLowerCase();
        const internshipCategory = (internship.careerCategory || '').toLowerCase();
        const internshipTitle = (internship.title || '').toLowerCase();
        let careerInterestScore = 60;
        if (targetRole && (internshipCategory.includes(targetRole) || internshipTitle.includes(targetRole) || targetRole.includes(internshipCategory))) {
            careerInterestScore = 100;
        }
        else if (targetRole && (targetRole.includes('full stack') || internshipCategory.includes('software') || internshipTitle.includes('developer'))) {
            careerInterestScore = 85;
        }
        // 4. Academic Profile Score (10%)
        const cgpa = studentProfile.cgpa || 7.5;
        const academicScore = Math.min(100, Math.round((cgpa / 10) * 100));
        // 5. Project Relevance (10%)
        const projects = studentProfile.projects || [];
        let projectRelevance = 40;
        if (projects.length >= 4)
            projectRelevance = 95;
        else if (projects.length >= 2)
            projectRelevance = 80;
        else if (projects.length >= 1)
            projectRelevance = 65;
        // Check project tech overlap
        const projectTechs = projects.flatMap((p) => (p.technologies || '').toLowerCase().split(','));
        const matchedProjectTech = requiredSkillsList.filter((req) => projectTechs.some((t) => t.trim() === (req.skill?.name || '').toLowerCase()));
        if (matchedProjectTech.length >= 2)
            projectRelevance = Math.min(100, projectRelevance + 10);
        // 6. Certification Relevance (5%)
        const certs = studentProfile.certifications || [];
        let certificationScore = 50;
        if (certs.length >= 4)
            certificationScore = 100;
        else if (certs.length >= 2)
            certificationScore = 85;
        else if (certs.length >= 1)
            certificationScore = 70;
        // Weighted Formula
        const breakdown = {
            skillOverlapScore,
            proficiencyScore,
            careerInterestScore,
            academicScore,
            projectScore: projectRelevance,
            certificationScore,
        };
        const calculatedMatch = Math.round(skillOverlapScore * 0.40 +
            proficiencyScore * 0.20 +
            careerInterestScore * 0.15 +
            academicScore * 0.10 +
            projectRelevance * 0.10 +
            certificationScore * 0.05);
        const matchScore = Math.min(99, Math.max(25, calculatedMatch));
        const potentialMatchAfterLearning = Math.min(99, matchScore + Math.min(15, missingSkills.length * 4 + 4));
        const explanation = this.generateExplanation(studentProfile, internship, matchingSkills, missingSkills, matchScore, potentialMatchAfterLearning);
        return {
            internshipId: internship.id,
            matchScore,
            potentialMatchAfterLearning,
            matchingSkills,
            missingSkills,
            strengths,
            weaknesses,
            explanation,
            breakdown,
            skillComparison,
        };
    }
    /**
     * Generates rich, deterministic natural language explanation
     */
    generateExplanation(student, internship, matchingSkills, missingSkills, matchScore, potentialScore) {
        const studentName = student.user?.name || student.name || 'Candidate';
        const topMatches = matchingSkills.slice(0, 4).join(', ');
        const topGaps = missingSkills.slice(0, 3).join(', ');
        if (matchScore >= 85) {
            return `Outstanding match! Your solid foundation in ${topMatches || 'core engineering'} directly satisfies ${internship.company?.name || 'this company'}'s primary requirements. ${topGaps ? `Improving ${topGaps} via your personalized learning roadmap will elevate your readiness from ${matchScore}% to ${potentialScore}%, making you a standout tier-1 applicant.` : 'You already meet or exceed all critical qualifications for this position.'}`;
        }
        else if (matchScore >= 70) {
            return `Strong potential match. You possess key prerequisites (${topMatches || 'fundamental skills'}), but ${internship.company?.name || 'the role'} heavily emphasizes ${topGaps || 'specialized tools'}. Completing the recommended learning modules will unlock a projected ${potentialScore}% match.`;
        }
        else {
            return `Developing match. While your academic background and foundational knowledge provide a base, this position requires specific hands-on experience in ${topGaps || 'advanced domain skills'}. Follow the step-by-step SmartEdu AI roadmap to bridge this gap.`;
        }
    }
}
exports.RecommendationEngine = RecommendationEngine;
exports.recommendationEngine = new RecommendationEngine();
