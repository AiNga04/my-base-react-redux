// Profile.js
import React from "react";
import { useSelector } from "react-redux";
import "./Profile.scss";
import { useNavigate } from "react-router";

const Profile = () => {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  // Thông tin bổ sung trong accountDetail
  const accountDetail = {
    fullName: "John Michael Doe",
    phone: "+1 (555) 123-4567",
    joinDate: "March 24, 2023",
    bio: "Enthusiastic learner and quiz enthusiast",
    points: 850,
    quizzesTaken: 12,
  };

  // Kết hợp dữ liệu từ Redux và dữ liệu bổ sung, với fallback mặc định
  const userData = {
    username: account?.username || "John Doe",
    email: account?.email || "john.doe@example.com",
    role: account?.role || "User",
    image: account?.image || "",
    ...accountDetail,
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="content-left">
          <div className="avatar-wrapper">
            <img
              src={
                userData.image
                  ? `data:image/jpeg;base64,${userData.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="avatar"
            />
            <div className="status-dot"></div>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">{userData.quizzesTaken}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{userData.points}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>
        <div className="content-right">
          <h2>{userData.username}</h2>
          <p className="role">{userData.role}</p>
          <p className="email">{userData.email}</p>
          <div className="additional-info">
            <div className="info-item">
              <span className="label">Full Name:</span>
              <span className="value">{userData.fullName}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{userData.phone}</span>
            </div>
            <div className="info-item">
              <span className="label">Joined:</span>
              <span className="value">{userData.joinDate}</span>
            </div>
            <div className="info-item bio">
              <span className="label">Bio:</span>
              <span className="value">{userData.bio}</span>
            </div>
          </div>
          <button
            className="edit-button"
            onClick={() => {
              navigate("/users/profile/edit");
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
