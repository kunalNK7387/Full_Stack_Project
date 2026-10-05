import React, { useState } from "react";
import "../style/interview.scss";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const interviewReport = {
  matchScore: 85,

  technicalQuestions: [
    {
      question:
        "What is the difference between useState and useEffect in React?",
      intention:
        "To evaluate your understanding of React hooks and component lifecycle.",
      answer:
        "useState is used to manage component state, while useEffect is used to perform side effects such as API calls, subscriptions, or updating the DOM.",
    },
    {
      question: "What is the Virtual DOM in React?",
      intention:
        "To check your understanding of React's rendering and performance model.",
      answer:
        "The Virtual DOM is a lightweight representation of the actual DOM. React compares changes in the Virtual DOM and updates only the necessary parts of the real DOM.",
    },
    {
      question: "What is the difference between props and state?",
      intention: "To test fundamental React concepts.",
      answer:
        "Props are data passed from a parent component to a child component, while state is data managed internally by a component.",
    },
    {
      question: "What is middleware in Express.js?",
      intention:
        "To evaluate your understanding of backend request processing.",
      answer:
        "Middleware functions have access to the request, response, and next function. They can execute code, modify requests or responses, end the request cycle, or pass control to the next middleware.",
    },
  ],

  behavioralQuestions: [
    {
      question: "Tell me about yourself.",
      intention:
        "To understand your background, communication skills, and career goals.",
      answer:
        "I am a web developer with a strong interest in building modern applications using React, JavaScript, Node.js, Express, and MongoDB.",
    },
    {
      question: "Tell me about a challenging project you worked on.",
      intention:
        "To understand your problem-solving ability and practical experience.",
      answer:
        "I worked on an interview preparation application where I integrated frontend and backend functionality and worked with authentication, APIs, and MongoDB.",
    },
    {
      question: "How do you handle a technical problem you don't understand?",
      intention: "To evaluate your problem-solving and learning approach.",
      answer:
        "I first reproduce the problem, understand the error message, isolate the issue, research the relevant concept, and then test the solution step by step.",
    },
  ],

  skillGaps: [
    {
      skill: "TypeScript",
      severity: "medium",
    },
    {
      skill: "Testing",
      severity: "medium",
    },
    {
      skill: "System Design",
      severity: "high",
    },
    {
      skill: "Docker",
      severity: "low",
    },
  ],

  preparationPlan: [
    {
      day: 1,
      focus: "JavaScript Fundamentals",
      tasks: [
        "Revise ES6+ concepts",
        "Practice promises and async/await",
        "Review closures and scope",
      ],
    },
    {
      day: 2,
      focus: "React.js",
      tasks: [
        "Revise React hooks",
        "Practice component patterns",
        "Review Context API",
      ],
    },
    {
      day: 3,
      focus: "Backend Development",
      tasks: [
        "Revise Express.js",
        "Practice REST APIs",
        "Review authentication concepts",
      ],
    },
    {
      day: 4,
      focus: "MongoDB",
      tasks: [
        "Review CRUD operations",
        "Practice Mongoose",
        "Revise data relationships",
      ],
    },
  ],
};

// Question Card
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="q-card">
      <div
        className="q-card__header"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="q-card__index">Q{index + 1}</span>

        <p className="q-card__question">{item.question}</p>

        <span
          className={`q-card__chevron ${open ? "q-card__chevron--open" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {open && (
        <div className="q-card__body">
          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--intention">
              Intention
            </span>

            <p>{item.intention}</p>
          </div>

          <div className="q-card__section">
            <span className="q-card__tag q-card__tag--answer">
              Model Answer
            </span>

            <p>{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Road Map Day
const RoadMapDay = ({ day }) => (
  <div className="roadmap-day">
    <div className="roadmap-day__header">
      <span className="roadmap-day__badge">Day {day.day}</span>

      <h3 className="roadmap-day__focus">{day.focus}</h3>
    </div>

    <ul className="roadmap-day__tasks">
      {day.tasks.map((task, index) => (
        <li key={index}>
          <span className="roadmap-day__bullet" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

// Main Component
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");

  const report = interviewReport;

  const scoreColor =
    report.matchScore >= 80
      ? "score--high"
      : report.matchScore >= 60
        ? "score--mid"
        : "score--low";

  return (
    <div className="interview-page">
      <div className="interview-layout">
        {/* Left Navigation */}
        <nav className="interview-nav">
          <div className="nav-content">
            <p className="interview-nav__label">Sections</p>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`interview-nav__item ${
                  activeNav === item.id ? "interview-nav__item--active" : ""
                }`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="interview-nav__icon">{item.icon}</span>

                {item.label}
              </button>
            ))}
          </div>

          <button className="button primary-button">
            <svg
              height="0.8rem"
              style={{ marginRight: "0.8rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
            </svg>
            Download Resume
          </button>
        </nav>

        <div className="interview-divider" />

        {/* Center Content */}
        <main className="interview-content">
          {activeNav === "technical" && (
            <section>
              <div className="content-header">
                <h2>Technical Questions</h2>

                <span className="content-header__count">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              <div className="q-list">
                {report.technicalQuestions.map((question, index) => (
                  <QuestionCard key={index} item={question} index={index} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section>
              <div className="content-header">
                <h2>Behavioral Questions</h2>

                <span className="content-header__count">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              <div className="q-list">
                {report.behavioralQuestions.map((question, index) => (
                  <QuestionCard key={index} item={question} index={index} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section>
              <div className="content-header">
                <h2>Preparation Road Map</h2>

                <span className="content-header__count">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>

              <div className="roadmap-list">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        <div className="interview-divider" />

        {/* Right Sidebar */}
        <aside className="interview-sidebar">
          {/* Match Score */}
          <div className="match-score">
            <p className="match-score__label">Match Score</p>

            <div className={`match-score__ring ${scoreColor}`}>
              <span className="match-score__value">{report.matchScore}</span>

              <span className="match-score__pct">%</span>
            </div>

            <p className="match-score__sub">Strong match for this role</p>
          </div>

          <div className="sidebar-divider" />

          {/* Skill Gaps */}
          <div className="skill-gaps">
            <p className="skill-gaps__label">Skill Gaps</p>

            <div className="skill-gaps__list">
              {report.skillGaps.map((gap, index) => (
                <span
                  key={index}
                  className={`skill-tag skill-tag--${gap.severity}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
