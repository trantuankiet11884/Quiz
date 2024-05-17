import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalCreateUser from "./ModalCreateUser";
import "./manageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import TableUser from "./TableUser";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);

  const fetchAllUsers = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT.reverse());
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

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
        <div className="table-user-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchAllUsers={fetchAllUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
