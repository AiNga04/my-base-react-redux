import { toast } from "react-toastify";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./EditProfile.scss";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  // Thông tin bổ sung trong accountDetail
  const accountDetail = {
    fullName: "John Michael Doe",
    phone: "+1 (555) 123-4567",
    joinDate: "March 24, 2023",
    bio: "Enthusiastic learner and quiz enthusiast",
    points: 850,
    quizzesTaken: 12,
  };

  // Kết hợp dữ liệu từ Redux và dữ liệu bổ sung, với fallback mặc định
  const initialData = {
    username: account?.username || "John Doe",
    email: account?.email || "john.doe@example.com",
    role: account?.role || "User",
    image: account?.image || "",
    ...accountDetail,
  };

  const [formData, setFormData] = useState(initialData);
  const [imagePreview, setImagePreview] = useState(
    initialData.image
      ? `data:image/jpeg;base64,${initialData.image}`
      : "https://via.placeholder.com/150"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result.split(",")[1] }); // Lấy base64 sau dấu phẩy
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated profile data:", formData);
    toast.success("Profile updated successfully!");
    navigate("/users/profile");
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        <div className="content-left">
          <div className="avatar-wrapper">
            <img src={imagePreview} alt="avatar" />
            <div className="status-dot"></div>
            <label className="image-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
              Change Photo
            </label>
          </div>
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-number">{formData.quizzesTaken}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{formData.points}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
        </div>
        <div className="content-right">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                disabled // Email thường không cho chỉnh sửa
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  navigate("/users/profile");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
