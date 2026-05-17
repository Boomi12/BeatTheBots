import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    fileName: {
      type: String,
      required: true,
    },

    resumeText: {
      type: String,
      required: true,
    },

    compatibilityScore: {
      type: Number,
    },

    analysis: {
      resumeSkills: [String],
      jobDescriptionSkills: [String],
      missingSkillsFromResume: [String],
      extraSkillsInResume: [String],
      atsOptimizationTips: [String],

      bulletPointImprovements: [
        {
          originalSummary: String,
          reasoning: String,
          suggestedBullets: [String],
        },
      ],

      overallAssessment: String,
    },
  },
  { timestamps: true } // adds createdAt automatically
);

export default mongoose.model("Resume", resumeSchema);