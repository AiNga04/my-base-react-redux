// About.js
import React from "react";
import "./About.scss";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Discover who we are and what drives us</p>
      </header>

      <section className="about-content">
        <div className="about-section mission">
          <h2>Our Mission</h2>
          <p>
            We are committed to providing innovative solutions that empower
            individuals and businesses to achieve their full potential through
            cutting-edge technology and exceptional service.
          </p>
        </div>

        <div className="about-section team">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Jane Smith</h3>
              <p>Lead Developer</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Mike Johnson</h3>
              <p>Design Director</p>
            </div>
          </div>
        </div>

        <div className="about-section values">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <i className="fas fa-lightbulb"></i>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries</p>
            </div>
            <div className="value-item">
              <i className="fas fa-users"></i>
              <h3>Teamwork</h3>
              <p>Collaborating for success</p>
            </div>
            <div className="value-item">
              <i className="fas fa-star"></i>
              <h3>Excellence</h3>
              <p>Striving for perfection</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
