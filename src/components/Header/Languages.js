import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

const Languages = (props) => {
  return (
    <>
      <NavDropdown className="languages" title="EN" id="basic-nav-dropdown">
        <NavDropdown.Item>EN</NavDropdown.Item>
        <NavDropdown.Item>VI</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Languages;
