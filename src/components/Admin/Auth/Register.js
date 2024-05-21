import { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { postRegister } from "../../../services/apiService";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitRegister = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email Address");
      return;
    }

    if (!password) {
      toast.error("Password is Empty");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    let data = await postRegister(email, password, username);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="title col-4 mx-auto">Register</div>
      <div className="welcom col-4 mx-auto">Hello, who's this?</div>
      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group pass-group">
          <label htmlFor="password">Password</label>
          <input
            type={isShowPassword ? "text" : "password"}
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleSubmitRegister()}>
            Register
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;- Go to HomePage</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
