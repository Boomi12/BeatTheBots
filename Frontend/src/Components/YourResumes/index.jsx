import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
 
const YourResumes = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resumeHistory, setResumeHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedHistoryResume, setSelectedHistoryResume] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.openHistory) {
      fetchResumeHistory();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state]);

 
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setError("");
  };

  // 🔥 Fetch Resume History
  const fetchResumeHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      setLoadingHistory(true);
      setError("");
      const response = await fetch("http://localhost:5000/api/resume/history", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch history.");
      }

      const data = await response.json();
      setResumeHistory(data.resumes || []);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load resume history.");
    } finally {
      setLoadingHistory(false);
    }
  };
 
  const handleUploadAndAnalyze = async () => {
    if (!selectedFile) {
      setError("Please select a resume to upload.");
      return;
    }
 
    const token = localStorage.getItem("token");
 
    if (!token) {
      setError("You must be logged in.");
      return;
    }
 
    const formData = new FormData();
    formData.append("resume", selectedFile);
 
    try {
      setLoading(true);
      setError("");
 
      // STEP 1️⃣ Upload Resume
      const uploadResponse = await fetch(
        "http://localhost:5000/api/resume/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
 
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        throw new Error(errorText || "Resume upload failed.");
      }
 
      const data = await uploadResponse.json();
 
      // STEP 2️⃣ Analyze Resume
      const rawData = {
        resumeText: data.text, // must match backend
        fileName: data.fileName,
        jobDescription:
          "ANYTHING YOU WANT! For best results, use a real job description from a role you're interested in.",
      };
 
      const analyzeResponse = await fetch(
        "http://localhost:5000/api/resume/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(rawData),
        }
      );
 
      if (!analyzeResponse.ok) {
        const errorText = await analyzeResponse.text();
        throw new Error(errorText || "Resume analysis failed.");
      }
      const analyzeData = await analyzeResponse.json();
      console.log(analyzeData)
      setAnalysisResult(analyzeData);
      setShowModal(true);
 
 
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="resume-container">
      <h2>Upload Your Resume</h2>
 
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />
 
      <button onClick={handleUploadAndAnalyze} disabled={loading}>
        {loading ? "Processing..." : "Upload & Analyze"}
      </button>
 
      {analysisResult && (
        <button onClick={() => setShowModal(true)} style={{ marginLeft: "10px" }}>
            View Report
        </button>
        )}
 
       {showModal && analysisResult?.success && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>ATS Resume Analysis Report</h2>
 
      {(() => {
        const report =
          analysisResult.suggestions?.analysis ??
          analysisResult.suggestions ??
          analysisResult;
 
        return (
          <>
            {/* Score */}
            <p>
              <strong>Compatibility Score:</strong>{" "}
              {report?.compatibility_score ?? analysisResult.score ?? "N/A"}%
            </p>
 
            {/* Resume Skills */}
            <h3>Resume Skills</h3>
            <ul>
              {report?.resume_skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
 
            {/* Job Description Skills */}
            <h3>Job Description Skills</h3>
            <ul>
              {report?.job_description_skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
 
            {/* Missing Skills */}
            <h3>Missing Skills (Add to Resume)</h3>
            <ul>
              {report?.missing_skills?.from_resume_for_job_description?.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
 
            <h3>Extra Skills (Not Required by Job)</h3>
            <ul>
              {report?.missing_skills?.from_job_description_for_resume?.map(
                (skill, index) => (
                  <li key={index}>{skill}</li>
                )
              )}
            </ul>
 
            {/* ATS Optimization Tips */}
            <h3>ATS Optimization Tips</h3>
            <ul>
              {report?.ats_optimization_tips?.map((tip, index) => (
                <li key={index}>{tip.replace(/\*\*/g, "")}</li>
              ))}
            </ul>
 
            {/* Bullet Improvements */}
            <h3>Bullet Point Improvements</h3>
            {report?.ats_optimized_bullet_point_improvements?.map(
              (item, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                  <p>
                    <strong>Original:</strong> {item.original_summary}
                  </p>
 
                  <p>
                    <strong>Reasoning:</strong> {item.reasoning}
                  </p>
 
                  <strong>Suggested Bullets:</strong>
                  <ul>
                    {item.suggested_bullets?.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )
            )}
 
            {/* Overall Assessment */}
            <h3>Overall Assessment</h3>
            <p>{report?.overall_assessment}</p>
 
            <button onClick={() => setShowModal(false)}>Close</button>
          </>
        );
      })()}
    </div>
  </div>
)}
 
 
 
 
 
 
      {error && <p className="error">{error}</p>}

      {/* 📋 Resume History Modal */}
      {showHistory && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Resume History</h2>

            {resumeHistory.length === 0 ? (
              <p>No resumes found. Upload and analyze a resume to see it here.</p>
            ) : (
              <div className="history-list">
                {resumeHistory.map((resume) => (
                  <div
                    key={resume._id}
                    className="history-item"
                    onClick={() => setSelectedHistoryResume(resume)}
                    style={{ cursor: "pointer", padding: "10px", border: "1px solid #ddd", marginBottom: "10px", borderRadius: "5px" }}
                  >
                    <p>
                      <strong>File:</strong> {resume.fileName}
                    </p>
                    <p>
                      <strong>Score:</strong> {resume.compatibilityScore}%
                    </p>
                    <p>
                      <strong>Date:</strong> {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                    <button onClick={() => setSelectedHistoryResume(resume)}>View Details</button>
                  </div>
                ))}
              </div>
            )}

            <button onClick={() => setShowHistory(false)}>Close</button>
          </div>
        </div>
      )}

      {/* 📊 Resume Details Modal */}
      {selectedHistoryResume && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Resume Details - {selectedHistoryResume.fileName}</h2>

            {(() => {
              const analysis = selectedHistoryResume.analysis || {};
              return (
                <>
                  <p>
                    <strong>Compatibility Score:</strong> {selectedHistoryResume.compatibilityScore}%
                  </p>

                  <h3>Resume Skills</h3>
                  <ul>
                    {analysis.resumeSkills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>

                  <h3>Job Description Skills</h3>
                  <ul>
                    {analysis.jobDescriptionSkills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>

                  <h3>Missing Skills</h3>
                  <ul>
                    {analysis.missingSkillsFromResume?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>

                  <h3>Extra Skills</h3>
                  <ul>
                    {analysis.extraSkillsInResume?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>

                  <h3>ATS Optimization Tips</h3>
                  <ul>
                    {analysis.atsOptimizationTips?.map((tip, index) => (
                      <li key={index}>{tip.replace(/\*\*/g, "")}</li>
                    ))}
                  </ul>

                  <h3>Bullet Point Improvements</h3>
                  {analysis.bulletPointImprovements?.map((item, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                      <p>
                        <strong>Original:</strong> {item.originalSummary}
                      </p>
                      <p>
                        <strong>Reasoning:</strong> {item.reasoning}
                      </p>
                      <strong>Suggested Bullets:</strong>
                      <ul>
                        {item.suggestedBullets?.map((bullet, i) => (
                          <li key={i}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <h3>Overall Assessment</h3>
                  <p>{analysis.overallAssessment}</p>

                  <button onClick={() => setSelectedHistoryResume(null)}>Close</button>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
 
export default YourResumes;