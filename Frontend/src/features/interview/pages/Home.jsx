import React, { useEffect, useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, reportsLoading, generateReport, reports, getReports } =
    useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const resumeInputRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    getReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });

    console.log("HOME DATA:", data);

    navigate(`/interview/${data.interviewReport._id}`);
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <div className="home-page">
      {/* Page Header */}
      <header className="page-header">
        <h1>
          Create Your Custom <span className="highlight">Interview Plan</span>
        </h1>

        <p>
          Let our AI analyze the job requirements and your unique profile to
          build a winning strategy.
        </p>
      </header>

      {/* Main Card */}
      <div className="interview-card">
        <div className="interview-card__body">
          {/* Left Panel */}
          <div className="panel panel--left">
            <div className="panel__header">
              <span className="panel__icon">💼</span>

              <h2>Target Job Description</h2>

              <span className="badge badge--required">Required</span>
            </div>

            <textarea
              onChange={(e) => {
                setJobDescription(e.target.value);
              }}
              className="panel__textarea"
              placeholder={
                "Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              }
              maxLength={5000}
            />

            <div className="char-counter">0 / 5000 chars</div>
          </div>

          {/* Divider */}
          <div className="panel-divider"></div>

          {/* Right Panel */}
          <div className="panel panel--right">
            <div className="panel__header">
              <span className="panel__icon">👤</span>

              <h2>Your Profile</h2>
            </div>

            {/* Upload Resume */}
            <div className="upload-section">
              <label className="section-label">
                Upload Resume
                <span className="badge badge--best">Best Results</span>
              </label>

              <label className="dropzone" htmlFor="resume">
                <span className="dropzone__icon">↑</span>

                <p className="dropzone__title">
                  Click to upload or drag &amp; drop
                </p>

                <p className="dropzone__subtitle">PDF or DOCX (Max 5MB)</p>

                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                />
              </label>
            </div>

            {/* OR Divider */}
            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* Self Description */}
            <div className="self-description">
              <label className="section-label" htmlFor="selfDescription">
                Quick Self-Description
              </label>

              <textarea
                onChange={(e) => {
                  setSelfDescription(e.target.value);
                }}
                id="selfDescription"
                name="selfDescription"
                className="panel__textarea panel__textarea--short"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              ></textarea>
            </div>

            {/* Info Box */}
            <div className="info-box">
              <span className="info-box__icon">i</span>

              <p>
                Either a <strong>Resume</strong> or a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="interview-card__footer">
          <span className="footer-info">
            AI-Powered Strategy Generation &bull; Approx 30s
          </span>

          <button
            onClick={handleGenerateReport}
            type="button"
            className="generate-btn"
          >
            ✦ Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports */}

      <section className="recent-reports">
        <h2>My Recent Interview Plans</h2>

        {reportsLoading ? (
          <p className="no-reports">Loading recent reports...</p>
        ) : reports.length === 0 ? (
          <p className="no-reports">No interview plans generated yet.</p>
        ) : (
          <ul className="reports-list">
            {reports.map((report) => {
              const scoreClass =
                report.matchScore >= 80
                  ? "score--high"
                  : report.matchScore >= 60
                    ? "score--mid"
                    : "score--low";

              return (
                <li
                  key={report._id}
                  className="report-item"
                  onClick={() => navigate(`/interview/${report._id}`)}
                >
                  <h3>{report.title || "Untitled Position"}</h3>

                  <p className="report-meta">
                    Generated on{" "}
                    {new Date(report.createdAt).toLocaleDateString("en-GB")}
                  </p>

                  <p className={`match-score ${scoreClass}`}>
                    Match Score: {report.matchScore}%
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </div>
  );
};

export default Home;
