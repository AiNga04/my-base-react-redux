import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Admin/Content/DashBoard";
import ManageUser from "./pages/Admin/Content/ManageUser";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<User />} />
          <Route path="abouts" element={<About />} />
        </Route>

        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
        </Route>

        <Route path="auth/login" element={<Login />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/sign-up" element={<SignUp />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
