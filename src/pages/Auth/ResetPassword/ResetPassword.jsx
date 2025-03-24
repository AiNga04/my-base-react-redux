import React, { useState } from "react";
import "./ResetPassword.scss"; // Đổi tên để phân biệt với ForgotPassword nếu cần
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setVisible(!isVisible);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "newPassword":
        if (!value) error = "New password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== newPassword) error = "Passwords do not match";
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

  const handleSubmit = (e) => {
    e.preventDefault();

    validateField("newPassword", newPassword);
    validateField("confirmPassword", confirmPassword);

    if (
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword ||
      newPassword.length < 6
    ) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setActive(true);
    // Giả lập xử lý đặt lại mật khẩu
    setTimeout(() => {
      toast.success("Password has been reset successfully");
      setActive(false);
      setNewPassword("");
      setConfirmPassword("");
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="content-header">
          <h2>Reset Password</h2>
          <p>Enter your new password</p>
        </div>
        <div className="content-main">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type={!isVisible ? "password" : "text"}
                className={`form-control ${
                  errors.newPassword ? "is-invalid" : ""
                }`}
                placeholder="Enter new password"
                value={newPassword}
                name="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={handleBlur}
              />
              <span className="icon" onClick={toggle}>
                {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
              {errors.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type={!isVisible ? "password" : "text"}
                className={`form-control ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm new password"
                value={confirmPassword}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isActive}
            >
              Reset Password
            </button>
            <div>
              <span>Back to </span>
              <span className="link" onClick={() => navigate("/auth/login")}>
                Login
              </span>
            </div>
            <div>
              <span className="link" onClick={() => navigate("/")}>
                Go back home
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
