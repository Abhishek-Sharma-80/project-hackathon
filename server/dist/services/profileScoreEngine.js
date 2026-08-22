"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateProfileScore = calculateProfileScore;
function calculateProfileScore(profile) {
    const suggestions = [];
    // 1. Academic score (max 15)
    const cgpa = profile.cgpa || 0;
    const academicScore = Math.min(15, Math.round((cgpa / 10) * 15));
    if (cgpa < 7.5) {
        suggestions.push("Focus on boosting your academic CGPA above 8.0 for top-tier eligibility.");
    }
    // 2. Skill score (max 25)
    const skills = profile.skills || [];
    const skillCount = skills.length;
    const avgLevel = skillCount > 0 ? skills.reduce((acc, s) => acc + s.level, 0) / skillCount : 0;
    let skillScore = 0;
    if (skillCount >= 8)
        skillScore += 15;
    else if (skillCount >= 4)
        skillScore += 10;
    else if (skillCount >= 1)
        skillScore += 5;
    skillScore += Math.min(10, Math.round((avgLevel / 100) * 10));
    if (skillCount < 6) {
        suggestions.push("Add at least 6 core technical skills to broaden your internship matching opportunities.");
    }
    // 3. Project score (max 25)
    const projects = profile.projects || [];
    const projectCount = projects.length;
    let projectScore = 0;
    if (projectCount >= 4)
        projectScore = 25;
    else if (projectCount === 3)
        projectScore = 20;
    else if (projectCount === 2)
        projectScore = 15;
    else if (projectCount === 1)
        projectScore = 10;
    else {
        suggestions.push("Add at least 2 full-stack or technical projects with GitHub links.");
    }
    // 4. Certification score (max 15)
    const certs = profile.certifications || [];
    const certCount = certs.length;
    let certificationScore = 0;
    if (certCount >= 4)
        certificationScore = 15;
    else if (certCount >= 2)
        certificationScore = 10;
    else if (certCount >= 1)
        certificationScore = 5;
    else {
        suggestions.push("Earn industry certifications (e.g. AWS, Oracle Java, Google Cloud) to boost credibility.");
    }
    // 5. Career goal score (max 10)
    const careerGoals = profile.careerGoals || [];
    const careerGoalScore = careerGoals.length > 0 ? 10 : 0;
    if (careerGoals.length === 0) {
        suggestions.push("Set your primary career goal to receive targeted AI recommendations.");
    }
    // 6. Assessments score (max 10)
    const assessments = profile.assessments || [];
    const verifiedCount = assessments.length;
    let assessmentScore = 0;
    if (verifiedCount >= 3)
        assessmentScore = 10;
    else if (verifiedCount >= 1)
        assessmentScore = 5;
    else {
        suggestions.push("Take verified skill assessment tests to validate your proficiencies.");
    }
    const totalScore = Math.min(100, academicScore + skillScore + projectScore + certificationScore + careerGoalScore + assessmentScore);
    // Career Readiness is a blended indicator of profile completeness + high-level technical capability
    const highLevelSkills = skills.filter(s => s.level >= 75).length;
    const skillReadiness = Math.min(40, highLevelSkills * 8);
    const projectReadiness = Math.min(30, projectCount * 8);
    const certReadiness = Math.min(15, certCount * 3);
    const assessmentReadiness = Math.min(15, verifiedCount * 5);
    const careerReadiness = Math.min(98, Math.max(35, Math.round(skillReadiness + projectReadiness + certReadiness + assessmentReadiness)));
    return {
        academicScore,
        skillScore,
        projectScore,
        certificationScore,
        careerGoalScore,
        assessmentScore,
        totalScore,
        careerReadiness,
        suggestions: suggestions.length > 0 ? suggestions : ["Your profile is well optimized! Keep expanding your project portfolio."],
    };
}
