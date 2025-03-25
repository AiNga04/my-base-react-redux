import React from "react";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="section recent-quizzes">
            <div className="section-header">
              <h2>Recent Quizzes</h2>
              <a href="#" className="view-all">
                View All →
              </a>
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
              <a href="#" className="view-all">
                View All →
              </a>
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
              <a href="#" className="open-link">
                Open →
              </a>
            </div>
            <div className="resource-item">
              <h3>Performance Metrics</h3>
              <p>Monitor quiz performance</p>
              <a href="#" className="open-link">
                Open →
              </a>
            </div>
            <div className="resource-item">
              <h3>Learning Resources</h3>
              <p>Tutorials and best practices</p>
              <a href="#" className="open-link">
                Open →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
