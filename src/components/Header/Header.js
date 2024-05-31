import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickBtnLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    const res = await postLogout("account.email", account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      toast.success(res.EM);
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">Logo</Navbar.Brand> */}
        <NavLink className="navbar-brand" to="/">
          LOGO
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
            <NavLink className="nav-link" to="/user">
              User
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ? (
              <>
                <button
                  className="btn-login"
                  onClick={() => handleClickBtnLogin()}
                >
                  Log in
                </button>
                <button className="btn-signup">Sign up</button>
              </>
            ) : (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
