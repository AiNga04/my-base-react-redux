import React from "react";
import "./Home.scss";
import quizHome from "../../assets/videos/quizhome.mp4";

const Home = (props) => {
  return (
    <div className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src={quizHome} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="home-content">
        <div className="content">
          <h1>Welcome to Quiz App</h1>
          <p>
            Test your knowledge with a wide range of quizzes across various
            topics. Play now, challenge yourself, and climb the leaderboard!
          </p>
          <button className="btn btn-start-quiz">Start Quiz</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
