import React from "react";
import videoHomePage from "../../assets/hero.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const HomePage = (props) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const { t } = useTranslation();

  return (
    <div className="homepage-container flex">
      <div className="video-wrapper">
        <video autoPlay loop muted>
          <source src={videoHomePage} type="video/mp4" />
        </video>
      </div>
      <div className="homepage-content">
        <div className="title-1">{t("homepage.title1")}</div>
        <div className="title-2">{t("homepage.title2")}</div>
        <div className="title-3">
          {isAuthenticated === false ? (
            <button onClick={() => navigate("/login")}>
              {t("homepage.title3.login")}
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>
              {t("homepage.title4")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
