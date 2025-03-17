import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../layouts/Header/Header";

const User = () => {
  return (
    <div className="user-container">
      <Header />
      <Outlet />
    </div>
  );
};

export default User;
