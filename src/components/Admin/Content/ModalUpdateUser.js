import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaFileUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { putUpdateNewUser } from "../../../services/apiService";
import _ from "lodash";
const ModalUpdateUser = (props) => {
  const {
    show,
    setShow,
    dataUpdate,
    fetchAllUsers,
    resetUpdateData,
    currentPage,
    fetchAllUsersWithPaginate,
  } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
  const [image, setImage] = useState("");
  const [previewImage, setPrevewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      // setImage(dataUpdate.image);
      setRole(dataUpdate.role);
      setImage("");
      setUsername(dataUpdate.username);
      if (dataUpdate.image) {
        setPrevewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setImage("");
    setPassword("");
    setPrevewImage("");
    setRole("USER");
    setImage("");
    setUsername("");
    resetUpdateData();
  };
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPrevewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      //   setPrevewImage("");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitUpdateUser = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email Address");
      return;
    }

    let data = await putUpdateNewUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchAllUsersWithPaginate(currentPage);
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                disabled
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                disabled
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <select
                id="role"
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="col-md-12 ">
              <label htmlFor="image" className="form-label label-upload">
                <FaFileUpload size={16} color="#77ea97" />
                Upload File Image
              </label>
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="imgae" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateUser;
