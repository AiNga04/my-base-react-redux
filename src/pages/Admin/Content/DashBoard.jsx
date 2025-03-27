import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleViewAllQuizzes = () => {
    navigate("/admins/manage-quizzes");
  };

  const handleViewAllActivity = () => {
    navigate("/admins/activity-feed");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="section recent-quizzes">
            <div className="section-header">
              <h2>Recent Quizzes</h2>
              <button
                className="view-all"
                onClick={handleViewAllQuizzes}
                aria-label="View all recent quizzes"
              >
                View All →
              </button>
            </div>
            <div className="quiz-item">
              <h3>General Knowledge Quiz</h3>
              <p>TypeScript</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "75%" }}></div>
              </div>
              <p>75% Complete</p>
            </div>
            <div className="quiz-item">
              <h3>Science Trivia</h3>
              <p>Node.js</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "45%" }}></div>
              </div>
              <p>45% Complete</p>
            </div>
            <div className="quiz-item">
              <h3>History Challenge</h3>
              <p>React</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "90%" }}></div>
              </div>
              <p>90% Complete</p>
            </div>
          </div>
          <div className="section activity-feed">
            <div className="section-header">
              <h2>Activity Feed</h2>
              <button
                className="view-all"
                onClick={handleViewAllActivity}
                aria-label="View all activity feed"
              >
                View All →
              </button>
            </div>
            <div className="feed-item">
              <p>
                Fixed difficulty bug in <span>General Knowledge Quiz</span>
              </p>
              <span className="time">2 hours ago</span>
            </div>
            <div className="feed-item">
              <p>
                Approved PR #42 in <span>Science Trivia</span>
              </p>
              <span className="time">Yesterday</span>
            </div>
            <div className="feed-item">
              <p>
                Created issue #15 in <span>History Challenge</span>
              </p>
              <span className="time">3 days ago</span>
            </div>
            <div className="feed-item">
              <p>
                Deployed to production in <span>General Knowledge Quiz</span>
              </p>
              <span className="time">5 days ago</span>
            </div>
          </div>
          <div className="section resources">
            <div className="resource-item">
              <h3>Quiz Documentation</h3>
              <p>Access quiz creation guides</p>
              <Link to="/admins/quiz-docs" className="open-link">
                Open →
              </Link>
            </div>
            <div className="resource-item">
              <h3>Performance Metrics</h3>
              <p>Monitor quiz performance</p>
              <Link to="/admins/performance-metrics" className="open-link">
                Open →
              </Link>
            </div>
            <div className="resource-item">
              <h3>Learning Resources</h3>
              <p>Tutorials and best practices</p>
              <Link to="/admins/learning-resources" className="open-link">
                Open →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
