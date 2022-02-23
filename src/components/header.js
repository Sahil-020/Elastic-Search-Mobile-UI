import React, { Component } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import BackIcon from "../assets/icons/left-arrow.png";
import { useHistory, useLocation } from "react-router-dom";
import $ from "jquery";

export default function Header(props) {
  const location = useLocation();
  const history = useHistory();
  let { toggleBasket, handleBackButton, showBackButton } = props;
  const handleNavLinks = (e) => {
    $(".navbar-nav").children().removeClass("active");
    // console.log("Selected value: ", value);
    e.target.className = "nav-link active";
  };
  const handleBack = () => {
    // console.log("location : ", location);
    handleBackButton(false);
    let path = location.pathname;
    let parentLocation;
    let lastIndex;
    for (let i = path.length - 1; i >= 0; i--) {
      if (path[i] === "/") {
        lastIndex = i;
        break;
      }
    }
    parentLocation = path.substring(0, lastIndex);
    history.push(parentLocation);
  };
  return (
    <div className="header">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">
            {showBackButton && (
              <img
                height="20"
                width="20"
                src={BackIcon}
                onClick={() => {
                  handleBack();
                }}
              ></img>
            )}
            <img
              src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png"
              // height="40px"
              // width="120px"
            ></img>
            <div className="basket_button">
              <img
                src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/open-basket.png"
                // onClick={() => toggleBasket(true)}
              ></img>
            </div>
          </Navbar.Brand>
          {!showBackButton && (
            <Nav>
              {" "}
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
          )}
        </Container>
      </Navbar>
    </div>
  );
}
