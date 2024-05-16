import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser";
import "./manageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const handleShowHideModal = (val) => {
    setShowModalCreateUser(val);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div>
          <button
            className="btn-add-new btn btn-success"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FaPlusCircle size={16} color="green" /> Add new User
          </button>
        </div>
        <div className="table-user-container">table</div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
