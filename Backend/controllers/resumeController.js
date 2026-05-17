import Resume from "../models/Resume.js";
import { parseResume } from "../utils/resumeParser.js";
import { extractKeywords } from "../utils/keywordExtractor.js";
import { calculateATSScore } from "../utils/atsScore.js";
import { analyzeWithGemini } from "../utils/aiAnalyzer.js";

/* =========================
   UPLOAD + PARSE RESUME
   ========================= */

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uint8Array = new Uint8Array(req.file.buffer);
    const text = await parseResume(uint8Array);

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text extracted from PDF" });
    }

    console.log("Resume parsed. Length:", text.length);

    res.json({
      success: true,
      preview: text.substring(0, 500),
      text,
      fileName: req.file.originalname
    });

  } catch (err) {
    console.error("Upload Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};


/* =========================
   ANALYZE RESUME + SAVE
   ========================= */

export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription, fileName } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: "Missing resumeText or jobDescription"
      });
    }

    // ✅ Extract keywords
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);

    // ✅ Calculate ATS score
    const score = calculateATSScore(jdKeywords, resumeKeywords);
    console.log("ATS Score:", score);

    // ✅ AI Analysis (Gemini)
    const suggestions = await analyzeWithGemini(
      resumeText,
      jobDescription
    );

    const report = suggestions?.analysis ?? suggestions;

    // 🔥 SAVE FULL REPORT TO DATABASE
    await Resume.create({
      userId: req.user.id,   // from auth middleware
      fileName: fileName || "Resume.pdf",
      resumeText: resumeText,
      compatibilityScore: report?.compatibility_score ?? score,

      analysis: {
        resumeSkills: report?.resume_skills || [],
        jobDescriptionSkills: report?.job_description_skills || [],
        missingSkillsFromResume:
          report?.missing_skills?.from_resume_for_job_description || [],
        extraSkillsInResume:
          report?.missing_skills?.from_job_description_for_resume || [],
        atsOptimizationTips: report?.ats_optimization_tips || [],

        bulletPointImprovements:
          report?.ats_optimized_bullet_point_improvements?.map((item) => ({
            originalSummary: item.original_summary,
            reasoning: item.reasoning,
            suggestedBullets: item.suggested_bullets || [],
          })) || [],

        overallAssessment: report?.overall_assessment || "",
      },
    });

    // ✅ Send response back to frontend
    res.json({
      success: true,
      score,
      suggestions
    });

  } catch (err) {
    console.error("Analyze Resume Error:", err);
    res.status(500).json({ error: err.message });
  }
};


export const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      resumes
    });

  } catch (err) {
    console.error("Get Resume History Error:", err);
    res.status(500).json({ error: err.message });
  }
};