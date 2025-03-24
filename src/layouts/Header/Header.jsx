import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../services/api/UserService";
import "./Header.scss";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to="/">
          Zyna Quiz
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/abouts">
              About
            </NavLink>
            <NavLink className="nav-link" to="/users">
              User
            </NavLink>
            {account.role === "ADMIN" && (
              <NavLink className="nav-link" to="/admins">
                Admin
              </NavLink>
            )}
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn btn-login"
                  onClick={() => {
                    navigate("/auth/login");
                  }}
                >
                  Log in
                </button>
                <button
                  className="btn btn-signup"
                  onClick={() => {
                    navigate("/auth/sign-up");
                  }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <NavLink
                    className="nav-link"
                    to="/auth/login"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Logout
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink className="nav-link" to="/users/profile">
                    Profile
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
