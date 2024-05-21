import { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../../redux/action/userAction";
import { FaSpinner } from "react-icons/fa";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    setIsLoading(true);
    let data = await postLogin(email, password);
    if (data && +data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have a acctoun yet?</span>
        <button onClick={() => navigate("/register")}>Sign up</button>
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
          <button
            className="btn-submit"
            onClick={() => handleSubmitLogin()}
            disabled={isLoading}
          >
            {isLoading === true ? (
              <FaSpinner className="loader-icon" />
            ) : (
              <span>Login</span>
            )}
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
