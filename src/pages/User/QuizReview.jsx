import React from "react";
import "./QuizReview.scss";
import { useNavigate } from "react-router";

const QuizReview = () => {
  const navigate = useNavigate();

  const quizData = {
    title: "General Knowledge",
    date: "Mar 23, 2025",
    score: 85,
    time: "4:45",
    questions: [
      {
        question: "What is the capital of France?",
        userAnswer: "Paris",
        correctAnswer: "Paris",
        options: ["London", "Paris", "Berlin", "Madrid"],
        explanation:
          "France's capital is Paris, a major cultural and economic center.",
      },
      {
        question: "Which planet is known as the Red Planet?",
        userAnswer: "Jupiter",
        correctAnswer: "Mars",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        explanation:
          "Mars is called the Red Planet due to its reddish appearance caused by iron oxide (rust) on its surface.",
      },
      {
        question: "What is 2 + 2?",
        userAnswer: "4",
        correctAnswer: "4",
        options: ["3", "4", "5", "6"],
        explanation: "Basic arithmetic: 2 + 2 equals 4.",
      },
    ],
  };

  return (
    <div className="quiz-review-container">
      <div className="header">
        <h1>{quizData.title} - Review</h1>
        <p>
          Score: {quizData.score}% | Date: {quizData.date} | Time:{" "}
          {quizData.time}
        </p>
      </div>

      <div className="review-content">
        <div className="questions-list">
          {quizData.questions.map((q, index) => (
            <div key={index} className="question-card">
              <div className="question-header">
                <h3>
                  Question {index + 1}: {q.question}
                </h3>
                <span
                  className={`status-badge ${
                    q.userAnswer === q.correctAnswer ? "correct" : "incorrect"
                  }`}
                >
                  {q.userAnswer === q.correctAnswer ? "Correct" : "Incorrect"}
                </span>
              </div>

              <div className="answer-section">
                <p>
                  <strong>Your Answer:</strong>{" "}
                  <span
                    className={
                      q.userAnswer === q.correctAnswer
                        ? "correct-answer"
                        : "incorrect-answer"
                    }
                  >
                    {q.userAnswer}
                  </span>
                </p>
                <p>
                  <strong>Correct Answer:</strong>{" "}
                  <span className="correct-answer">{q.correctAnswer}</span>
                </p>
                <div className="options">
                  {q.options.map((option, i) => (
                    <span
                      key={i}
                      className={`option ${
                        option === q.correctAnswer
                          ? "correct"
                          : option === q.userAnswer &&
                            q.userAnswer !== q.correctAnswer
                          ? "incorrect"
                          : ""
                      }`}
                    >
                      {option}
                    </span>
                  ))}
                </div>
                <p className="explanation">
                  <strong>Explanation:</strong> {q.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="back-button-container">
          <button
            className="back-button"
            onClick={() => navigate("/users/recent-quizzes")}
          >
            ← Back to Recent Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
