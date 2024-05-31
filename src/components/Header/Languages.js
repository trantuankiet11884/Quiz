import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from "react-i18next";

const Languages = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguages = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        className="languages"
        title={i18n.language === "vi" ? "Tiếng Việt" : "Tiếng Anh"}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item onClick={() => handleChangeLanguages("en")}>
          EN
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguages("vi")}>
          VI
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
