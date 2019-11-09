import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon
} from "mdbreact";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState("false");

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MDBNavbar color="special-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Movies Eeee</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar></MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
