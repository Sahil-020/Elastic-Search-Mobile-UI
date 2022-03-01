import React, { Component, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import BackIcon from "../assets/icons/left-arrow.png";
import { useHistory, useLocation } from "react-router-dom";

export default function Header(props) {
  let { showBackButton, handleBackButton } = props;
  const location = useLocation();
  const history = useHistory();

  const handleBack = () => {
    console.log("location : ", location);
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
    // history.push(parentLocation);
    // history.goBack();
    window.history.pushState("", "", `${parentLocation}`);
  };
  useEffect(() => {
    let count = 0;
    let path = location.pathname;
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "/") {
        count++;
      }
    }
    if (count === 2) {
      handleBackButton(true);
    }
  }, []);

  return (
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
        </Navbar.Brand>{" "}
      </Container>
    </Navbar>
  );
}
