import React from "react";
import { useSelector } from "react-redux";
import "./Profile.scss";

const Profile = () => {
  const account = useSelector((state) => state.user.account);
  console.log(account);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="profile-content">
        <div className="content-left">
          <img src={`data:image/jpeg;base64,${account.image}`} alt="avatar" />
        </div>
        <div className="content-right">
          <h2>{account.username}</h2>
          <p>{account.role}</p>
          <p>{account.email}</p>
        </div>
      </div>
      <div className="profile-footer"></div>
    </div>
  );
};

export default Profile;
