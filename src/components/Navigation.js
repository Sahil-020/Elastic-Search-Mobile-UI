import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import $ from "jquery";

export default function Navigation(props) {
  let { toggleBasket, handleBackButton, showBackButton } = props;
  const handleNavLinks = (e) => {
    $(".navbar-nav").children().removeClass("active");
    // console.log("Selected value: ", value);
    e.target.className = "nav-link active";
  };

  return (
    <Nav>
      <LinkContainer to="/JewelrySerial">
        <Nav.Link
          // className="active"
          onClick={(e) => handleNavLinks(e)}
        >
          Jewelry Serial
        </Nav.Link>
      </LinkContainer>
      {/* <Nav.Link onClick={(e) => handleNavLinks(e)}>
            <Link to="/JewelryStyle"> JewelryStyle</Link>
            </Nav.Link> */}
      <LinkContainer to="/DiamondSerial">
        <Nav.Link onClick={(e) => handleNavLinks(e)}>Diamond</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/GemstoneSerial">
        <Nav.Link onClick={(e) => handleNavLinks(e)}>Gemstone</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}
