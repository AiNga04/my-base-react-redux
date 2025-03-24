import React from "react";
import "./Leaderboard.scss";

const Leaderboard = () => {
  // Dữ liệu giả cho leaderboard
  const leaderboardData = [
    {
      rank: 1,
      username: "QuizMaster",
      points: 2500,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 2,
      username: "Brainiac",
      points: 2200,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 3,
      username: "KnowledgeKing",
      points: 2000,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 4,
      username: "TriviaStar",
      points: 1800,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 5,
      username: "SmartPants",
      points: 1600,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 6,
      username: "QuizWizard",
      points: 1400,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 7,
      username: "GeniusJoe",
      points: 1200,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 8,
      username: "LearnLover",
      points: 1000,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 9,
      username: "FactFinder",
      points: 900,
      avatar: "https://via.placeholder.com/50",
    },
    {
      rank: 10,
      username: "QuizRookie",
      points: 800,
      avatar: "https://via.placeholder.com/50",
    },
  ];

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Top performers in our quiz community</p>
      </header>

      <div className="leaderboard-content">
        <div className="podium-section">
          <div className="podium-item second">
            <div className="podium-rank">2</div>
            <img src={leaderboardData[1].avatar} alt="Second place" />
            <h3>{leaderboardData[1].username}</h3>
            <p>{leaderboardData[1].points} points</p>
          </div>
          <div className="podium-item first">
            <div className="podium-rank">1</div>
            <img src={leaderboardData[0].avatar} alt="First place" />
            <h3>{leaderboardData[0].username}</h3>
            <p>{leaderboardData[0].points} points</p>
          </div>
          <div className="podium-item third">
            <div className="podium-rank">3</div>
            <img src={leaderboardData[2].avatar} alt="Third place" />
            <h3>{leaderboardData[2].username}</h3>
            <p>{leaderboardData[2].points} points</p>
          </div>
        </div>

        <div className="ranking-table">
          <div className="table-header">
            <span>Rank</span>
            <span>User</span>
            <span>Points</span>
          </div>
          {leaderboardData.map((user) => (
            <div
              key={user.rank}
              className={`table-row ${user.rank <= 3 ? "top-three" : ""}`}
            >
              <span className="rank">{user.rank}</span>
              <div className="user-info">
                <img src={user.avatar} alt={user.username} />
                <span>{user.username}</span>
              </div>
              <span className="points">{user.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
