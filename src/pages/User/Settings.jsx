import React, { useState } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
    },
    theme: "light",
    privacy: {
      profileVisible: true,
      showActivity: false,
    },
    password: "",
    confirmPassword: "",
  });

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  const handleThemeChange = (e) => {
    setSettings((prev) => ({
      ...prev,
      theme: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (settings.password && settings.password !== settings.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Settings saved:", settings);
    alert("Settings updated successfully!");
  };

  const handleCancel = () => {
    // Reset về giá trị ban đầu hoặc điều hướng về trang trước
    setSettings({
      notifications: { email: true, push: false },
      theme: "light",
      privacy: { profileVisible: true, showActivity: false },
      password: "",
      confirmPassword: "",
    });
    console.log("Settings reset");
  };

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <p>Customize your experience</p>
      </header>

      <div className="settings-content">
        <form onSubmit={handleSubmit}>
          <section className="settings-section">
            <h2>Notifications</h2>
            <div className="setting-item">
              <label>Email Notifications</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={() => handleToggle("notifications", "email")}
                />
                <span className="slider"></span>
              </div>
            </div>
            <div className="setting-item">
              <label>Push Notifications</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.notifications.push}
                  onChange={() => handleToggle("notifications", "push")}
                />
                <span className="slider"></span>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2>Appearance</h2>
            <div className="setting-item">
              <label>Theme</label>
              <select value={settings.theme} onChange={handleThemeChange}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </section>

          <section className="settings-section">
            <h2>Privacy</h2>
            <div className="setting-item">
              <label>Profile Visibility</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.profileVisible}
                  onChange={() => handleToggle("privacy", "profileVisible")}
                />
                <span className="slider"></span>
              </div>
            </div>
            <div className="setting-item">
              <label>Show Activity Status</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.privacy.showActivity}
                  onChange={() => handleToggle("privacy", "showActivity")}
                />
                <span className="slider"></span>
              </div>
            </div>
          </section>

          <section className="settings-section">
            <h2>Change Password</h2>
            <div className="setting-item">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={settings.password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </div>
            <div className="setting-item">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="save-button">
              Save Settings
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
