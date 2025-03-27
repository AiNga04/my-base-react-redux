import React from "react";
import "./RecentQuizzes.scss";
import { useNavigate } from "react-router";

const RecentQuizzes = () => {
  const navigate = useNavigate();

  const quizzes = [
    {
      title: "General Knowledge",
      score: 85,
      date: "Mar 23, 2025",
      time: "4:45",
    },
    { title: "Math Challenge", score: 92, date: "Mar 20, 2025", time: "6:12" },
    { title: "Science Basics", score: 78, date: "Mar 18, 2025", time: "5:23" },
    { title: "History Trivia", score: 88, date: "Mar 15, 2025", time: "4:58" },
    { title: "Geography Quiz", score: 95, date: "Mar 12, 2025", time: "5:10" },
  ];

  return (
    <div className="recent-quizzes-container">
      <div className="header">
        <h1>Recent Quizzes</h1>
        <p>Review your past performances</p>
      </div>

      <div className="quizzes-content">
        <div className="quizzes-table">
          <div className="table-header">
            <span>Title</span>
            <span>Score</span>
            <span>Date</span>
            <span>Time</span>
            <span>Action</span>
          </div>
          <div className="table-body">
            {quizzes.map((quiz, index) => (
              <div key={index} className="quiz-row">
                <span className="quiz-title">{quiz.title}</span>
                <span className="quiz-score">
                  <span className="score-badge">{quiz.score}%</span>
                </span>
                <span className="quiz-date">{quiz.date}</span>
                <span className="quiz-time">{quiz.time}</span>
                <span className="quiz-action">
                  <button
                    className="review-button"
                    onClick={() => navigate(`/users/quiz/review/${index}`)}
                  >
                    Review
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="back-button-container">
          <button className="back-button" onClick={() => navigate("/users")}>
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentQuizzes;
