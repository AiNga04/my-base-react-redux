import React, { useState } from "react";
import "./SignUp.scss"; // Sử dụng file SCSS
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { postRegister } from "../../../services/api/AuthService";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVisiblePassword, setVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const togglePassword = () => {
    setVisiblePassword(!isVisiblePassword);
  };
  const toggleConfirmPassword = () => {
    setVisibleConfirmPassword(!isVisibleConfirmPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!validateEmail(value)) {
          error = "Invalid email format";
        }
        break;
      case "username":
        if (!value) {
          error = "Username is required";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        }
        break;
      case "confirmPassword":
        if (value !== password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!username) {
      toast.error("Username is required");
      return;
    }
    if (!password) {
      toast.error("Password is required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const data = await postRegister(email, password, username);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/auth/login");
    }
    if (data && data.EC !== 0) toast.error(data.EM);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-content">
        <div className="content-header">
          <h2>Sign Up</h2>
          <p>Please enter your details to create an account</p>
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
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                placeholder="Enter username"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={handleBlur}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type={!isVisiblePassword ? "password" : "text"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
              <span className="icon" onClick={togglePassword}>
                {isVisiblePassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type={!isVisibleConfirmPassword ? "password" : "text"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleBlur}
              />
              <span className="icon" onClick={toggleConfirmPassword}>
                {isVisibleConfirmPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </span>
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div>
              <span>Already have an account?</span>{" "}
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

export default SignUp;
