import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "./sidebar.scss";
import {
  FaArrowAltCircleLeft,
  FaGem,
  FaHeart,
  FaTachometerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminSideBar = (props) => {
  const { image, collapsed, toggle, handleToggleSidebar } = props;
  const navigate = useNavigate();

  return (
    <>
      <ProSidebar
        image=""
        toggled={toggle}
        collapsed={collapsed}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "hidden",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <FaHeart size={"3em"} color="white" />
            &nbsp; TK
          </div>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem icon={<FaTachometerAlt />}>
                Dashboard
                <Link to="/admin" />
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu icon={<FaGem />} title="Features">
                <MenuItem>
                  User
                  <Link to="/admin/manage-user" />
                </MenuItem>
                <MenuItem>Admin</MenuItem>
                <MenuItem>Quiz</MenuItem>
              </SubMenu>
            </Menu>
          </SidebarContent>
          <SidebarFooter style={{ textAlign: "center" }}>
            <div
              className="sidebar-btn-wrapper"
              style={{ padding: "20px 24px" }}
            >
              <a
                className="sidebar-btn"
                target="_blank"
                onClick={() => navigate("/")}
              >
                <FaArrowAltCircleLeft />
                &nbsp;
                <span
                  style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                >
                  Back
                </span>
              </a>
            </div>
          </SidebarFooter>
        </SidebarHeader>
      </ProSidebar>
    </>
  );
};

export default AdminSideBar;
