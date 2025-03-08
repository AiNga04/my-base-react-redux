import React, { useState } from "react";
import "./Login.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { postLogin } from "../../../services/api/AuthService";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setVisible(!isVisible);
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
      case "password":
        if (!value) {
          error = "Password is required";
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
    if (!password) {
      toast.error("Password is required");
      return;
    }

    const data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      dispatch(doLogin(data));
      navigate("/");
    }
    if (data && data.EC !== 0) toast.error(data.EM);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="content-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details</p>
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
              <label>Password</label>
              <input
                type={!isVisible ? "password" : "text"}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
              <span className="icon" onClick={toggle}>
                {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>

              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group form-check">
              <label>
                <input type="checkbox" name="remember" />
                Remember
              </label>
              <span
                className="link"
                onClick={() => {
                  navigate("/auth/forgot-password");
                }}
              >
                Forgot password
              </span>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div>
              <span>Don't have an account?</span>{" "}
              <span
                className="link"
                onClick={() => {
                  navigate("/auth/sign-up");
                }}
              >
                Sign up
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

export default Login;
