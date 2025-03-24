import React from "react";
import "./UserDashboard.scss";
import { useNavigate } from "react-router";

const UserDashboard = () => {
  const navigate = useNavigate();

  const userStats = {
    completedQuizzes: 12,
    totalScore: 850,
    averageTime: "5:32",
    rank: 42,
  };

  const recentQuizzes = [
    { title: "General Knowledge", score: 85, date: "Mar 23, 2025" },
    { title: "Math Challenge", score: 92, date: "Mar 20, 2025" },
    { title: "Science Basics", score: 78, date: "Mar 18, 2025" },
  ];

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, User!</h1>
        <p>Your learning journey continues</p>
      </div>

      <div className="dashboard-content">
        {/* User Stats */}
        <div className="stats-section">
          <h2>Your Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{userStats.completedQuizzes}</h3>
              <p>Completed Quizzes</p>
            </div>
            <div className="stat-card">
              <h3>{userStats.totalScore}</h3>
              <p>Total Score</p>
            </div>
            <div className="stat-card">
              <h3>{userStats.averageTime}</h3>
              <p>Avg. Time</p>
            </div>
            <div className="stat-card">
              <h3>#{userStats.rank}</h3>
              <p>Your Rank</p>
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="recent-quizzes-section">
          <div className="section-header">
            <h2>Recent Quizzes</h2>
            <a href="#" className="view-all">
              View All →
            </a>
          </div>
          <div className="quizzes-list">
            {recentQuizzes.map((quiz, index) => (
              <div key={index} className="quiz-card">
                <div className="quiz-info">
                  <h3>{quiz.title}</h3>
                  <p>Date: {quiz.date}</p>
                </div>
                <div className="quiz-score">
                  <span>{quiz.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <button
              className="action-button"
              onClick={() => {
                navigate("/users/quiz");
              }}
            >
              <span>🎓</span> Start New Quiz
            </button>
            <button className="action-button">
              <span>📊</span> View Progress
            </button>
            <button className="action-button">
              <span>🏆</span> Leaderboard
            </button>
            <button className="action-button">
              <span>⚙️</span> Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
