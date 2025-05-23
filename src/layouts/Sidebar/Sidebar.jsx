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
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../services/api/UserService";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";

const Sidebar = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;
  const navigate = useNavigate();
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const rs = await userLogout(account.email, account.refresh_token);
    if (rs && rs.EC === 0) {
      dispatch(doLogout());
      navigate("/auth/login");
      toast.success("Logged out successfully");
    } else {
      toast.error("Failed to logout");
    }
  };
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
          <MenuItem icon={<FaChartBar />}>
            {" "}
            <NavLink className="nav-link" to="/admins">
              DashBoard
            </NavLink>
          </MenuItem>
          <SubMenu label="Quizzes" icon={<FaQuestionCircle />}>
            <MenuItem>
              <NavLink className="nav-link" to="/admins/manage-users">
                Manage User
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className="nav-link" to="/admins/manage-quizzes">
                Manage Quiz
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className="nav-link" to="/admins/manage-questions">
                Manage Questions
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink className="nav-link" to="/admins/history">
                History
              </NavLink>
            </MenuItem>
          </SubMenu>
          <MenuItem icon={<FaUser />}>
            {" "}
            <NavLink className="nav-link" to="/users/profile">
              Profile
            </NavLink>{" "}
          </MenuItem>
          <MenuItem icon={<FaCog />}> Settings </MenuItem>
          <MenuItem
            icon={<FaSignOutAlt />}
            onClick={() => {
              handleLogout();
            }}
          >
            {" "}
            Logout{" "}
          </MenuItem>
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
