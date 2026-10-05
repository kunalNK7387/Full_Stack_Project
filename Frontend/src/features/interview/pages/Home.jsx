import React from "react";
import "../style/home.scss";

const Home = () => {
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

          <button type="button" className="generate-btn">
            ✦ Generate My Interview Strategy
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <section className="recent-reports">
        <h2>My Recent Interview Plans</h2>

        <ul className="reports-list">
          <li className="report-item">
            <h3>Frontend Developer</h3>

            <p className="report-meta">Generated on 04/10/2026</p>

            <p className="match-score score--high">Match Score: 85%</p>
          </li>

          <li className="report-item">
            <h3>Full Stack Developer</h3>

            <p className="report-meta">Generated on 28/09/2026</p>

            <p className="match-score score--mid">Match Score: 72%</p>
          </li>
        </ul>
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
