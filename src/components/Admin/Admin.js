import { useState } from "react";
import AdminSideBar from "./SideBar";
import "./admin.scss";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <AdminSideBar collapsed={collapsed} />
      </div>
      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            size={24}
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: "pointer" }}
          />
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
