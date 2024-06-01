import { useState } from "react";
import AdminSideBar from "./SideBar";
import "./admin.scss";
import { FaBars } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import Languages from "../Header/Languages";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <AdminSideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <span onClick={() => setCollapsed(!collapsed)}>
            <FaBars
              size={24}
              style={{ cursor: "pointer" }}
              className="leftside"
            />
          </span>
          <div className="rightside">
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Logout</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown>
            {/* <Languages /> */}
          </div>
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};

export default Admin;
