import React from "react";
import "./Sidebar.scss";
import bgSidebar from "../../assets/images/bg-sidebar.jpg";
import { NavLink } from "react-router-dom";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaGithub,
  FaHome,
  FaQuestionCircle,
  FaChartBar,
} from "react-icons/fa";
import { SiQuizlet } from "react-icons/si";
const Sidebar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  return (
    <ProSidebar
      image={bgSidebar}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      className="sidebar"
    >
      <div className="sidebar-header">
        <SiQuizlet className="sidebar-logo" />
        {!collapsed && <span>Zyna Quiz</span>}
      </div>
      <div className="sidebar-content">
        <Menu iconShape="circle">
          <MenuItem icon={<FaHome />}>
            {" "}
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>{" "}
          </MenuItem>
          <SubMenu label="Quizzes" icon={<FaQuestionCircle />}>
            <MenuItem> General Knowledge </MenuItem>
            <MenuItem> Science </MenuItem>
            <MenuItem> History </MenuItem>
            <MenuItem> Sports </MenuItem>
          </SubMenu>
          <MenuItem icon={<FaChartBar />}> Leaderboard </MenuItem>
          <MenuItem icon={<FaUser />}> Profile </MenuItem>
          <MenuItem icon={<FaCog />}> Settings </MenuItem>
          <MenuItem icon={<FaSignOutAlt />}> Logout </MenuItem>
        </Menu>
      </div>
      <div className="sidebar-footer">
        <a
          className="github"
          href="https://github.com/AiNga04"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="footer-icon" />
          {!collapsed && <span>GitHub AiNga04</span>}
        </a>
      </div>
    </ProSidebar>
  );
};

export default Sidebar;
