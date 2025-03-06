import React, { useState } from "react";
import "./ForgotPassword.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateField = (name, value) => {
    let error = "";
    if (name === "email" && !validateEmail(value)) {
      error = "Invalid email format";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    // Handle forgot password logic here
    toast.success("Password reset link sent to your email");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
        <div className="content-header">
          <h2>Forgot Password</h2>
          <p>Please enter your email to reset your password</p>
        </div>
        <div className="content-main">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
            <div>
              <span>Remember your password?</span>{" "}
              <span
                className="link"
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Login
              </span>
            </div>
            <div>
              <span
                className="link"
                onClick={() => {
                  navigate("/");
                }}
              >
                Go back home
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
