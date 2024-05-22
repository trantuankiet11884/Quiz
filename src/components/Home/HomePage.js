import React from "react";
import videoHomePage from "../../assets/hero.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="homepage-container flex">
      <div className="video-wrapper">
        <video autoPlay loop muted>
          <source src={videoHomePage} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        <div className="title-1">Make forms worth filling out</div>
        <div className="title-2">
          Get more data—like signups, feedback, and anything else—with forms
          designed to be refreshingly different.
        </div>
        <div className="title-3">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              Get's started. It's free
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
