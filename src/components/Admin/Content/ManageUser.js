import ModalCreateUser from "./ModalCreateUser";
import "./manageUser.scss";
const ManageUser = (props) => {
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button>Add new User</button>
        </div>
        <div>table</div>
        <ModalCreateUser />
      </div>
    </div>
  );
};

export default ManageUser;
