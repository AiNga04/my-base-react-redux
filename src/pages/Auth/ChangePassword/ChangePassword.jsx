import React, { useState } from "react";
import "./ChangePassword.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
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
      case "currentPassword":
        if (!value) error = "Current password is required";
        break;
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

    validateField("currentPassword", currentPassword);
    validateField("newPassword", newPassword);
    validateField("confirmPassword", confirmPassword);

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword ||
      newPassword.length < 6
    ) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setActive(true);
    // Giả lập xử lý đổi mật khẩu
    setTimeout(() => {
      toast.success("Password changed successfully");
      setActive(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="content-header">
          <h2>Change Password</h2>
          <p>Please enter your password details</p>
        </div>
        <div className="content-main">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                type={!isVisible ? "password" : "text"}
                className={`form-control ${
                  errors.currentPassword ? "is-invalid" : ""
                }`}
                placeholder="Enter current password"
                value={currentPassword}
                name="currentPassword"
                onChange={(e) => setCurrentPassword(e.target.value)}
                onBlur={handleBlur}
              />
              <span className="icon" onClick={toggle}>
                {isVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
              {errors.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword}</div>
              )}
            </div>
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
              Change Password
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

export default ChangePassword;
