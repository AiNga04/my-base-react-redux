import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import DashBoard from "./pages/Admin/Content/DashBoard";
import ManageUser from "./pages/Admin/Content/User/ManageUser";
import Login from "./pages/Auth/Login/Login";
import SignUp from "./pages/Auth/SignUp/SignUp";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import { ToastContainer } from "react-toastify";
import Quiz from "./pages/User/Quiz";
import QuizDetail from "./pages/User/QuizDetail";
import NotFound from "./layouts/NotFound/NotFound";
import ManageQuiz from "./pages/Admin/Content/Quiz/ManageQuiz";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Quiz />} />
          <Route path="abouts" element={<About />} />
        </Route>

        <Route path="quiz/:id" element={<QuizDetail />} />

        <Route path="admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
        </Route>

        <Route path="auth/login" element={<Login />} />
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
        <Route path="auth/sign-up" element={<SignUp />} />

        <Route path="*" element={<NotFound />} />
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
