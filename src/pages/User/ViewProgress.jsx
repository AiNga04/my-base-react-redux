import React from "react";
import "./ViewProgress.scss";

const ViewProgress = () => {
  // Dữ liệu giả cho progress
  const progressData = {
    totalQuizzes: 25,
    completedQuizzes: 18,
    averageScore: 85,
    pointsEarned: 1250,
    recentQuizzes: [
      {
        id: 1,
        title: "General Knowledge",
        score: 90,
        date: "2025-03-20",
        points: 100,
      },
      {
        id: 2,
        title: "Math Basics",
        score: 75,
        date: "2025-03-18",
        points: 80,
      },
      {
        id: 3,
        title: "Science Trivia",
        score: 95,
        date: "2025-03-15",
        points: 110,
      },
      {
        id: 4,
        title: "History Quiz",
        score: 80,
        date: "2025-03-12",
        points: 85,
      },
    ],
  };

  // Tính phần trăm hoàn thành
  const completionPercentage = Math.round(
    (progressData.completedQuizzes / progressData.totalQuizzes) * 100
  );

  return (
    <div className="progress-container">
      <header className="progress-header">
        <h1>Your Progress</h1>
        <p>Track your learning journey</p>
      </header>

      <div className="progress-content">
        <div className="stats-section">
          <div className="stat-card">
            <h3>Total Quizzes</h3>
            <p>{progressData.totalQuizzes}</p>
          </div>
          <div className="stat-card">
            <h3>Completed</h3>
            <p>{progressData.completedQuizzes}</p>
          </div>
          <div className="stat-card">
            <h3>Average Score</h3>
            <p>{progressData.averageScore}%</p>
          </div>
          <div className="stat-card">
            <h3>Points Earned</h3>
            <p>{progressData.pointsEarned}</p>
          </div>
        </div>

        <div className="progress-chart">
          <h2>Completion Progress</h2>
          <div className="progress-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${completionPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {completionPercentage}%
              </text>
            </svg>
          </div>
        </div>

        <div className="recent-quizzes">
          <h2>Recent Quizzes</h2>
          <div className="quiz-table">
            <div className="table-header">
              <span>Title</span>
              <span>Score</span>
              <span>Date</span>
              <span>Points</span>
            </div>
            {progressData.recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="table-row">
                <span>{quiz.title}</span>
                <span>{quiz.score}%</span>
                <span>{quiz.date}</span>
                <span>{quiz.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProgress;
