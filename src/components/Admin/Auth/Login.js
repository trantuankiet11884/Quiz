import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../services/apiService";
import { toast } from "react-toastify";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitLogin = async () => {
    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Invalid Email Address");
      return;
    }

    if (!password) {
      toast.error("Password is Empty");
      return;
    }

    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have a acctoun yet?</span>
        <button>Sign up</button>
      </div>
      <div className="title col-4 mx-auto">Login</div>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn-submit" onClick={() => handleSubmitLogin()}>
            Login
          </button>
        </div>
        <div className="back text-center">
          <span onClick={() => navigate("/")}>&#60;- Go to HomePage</span>
        </div>
      </div>
    </div>
  );
};

export default Login;