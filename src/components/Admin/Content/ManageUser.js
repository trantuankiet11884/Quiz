import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalCreateUser from "./ModalCreateUser";
import "./manageUser.scss";
import { FaPlusCircle } from "react-icons/fa";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const fetchAllUsers = async () => {
    let data = await getAllUsers();
    if (data.EC === 0) {
      setListUsers(data.DT.reverse());
    }
  };

  const handleClickBtnUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  const handleClickDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
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
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickDeleteUser={handleClickDeleteUser}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchAllUsers={fetchAllUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
          fetchAllUsers={fetchAllUsers}
          resetUpdateData={resetUpdateData}
        />

        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fetchAllUsers={fetchAllUsers}
        />
      </div>
    </div>
  );
};

export default ManageUser;
