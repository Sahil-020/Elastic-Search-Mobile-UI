import React, { Component, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import BackIcon from "../assets/icons/left-arrow.png";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleBasket } from "./actions";
import Basket from "../assets/icons/basket_white.png";

export default function Header(props) {
  let { showBackButton, handleBackButton } = props;
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    // console.log({ queryString });
    for (let pair of queryString.entries()) {
      // console.log({ pair });
      // console.log("Key is: " + pair[0]);
      // console.log("Value is: " + pair[1]);

      if (pair[0] === "Basket") {
        // this.setState({ showBasketModal: true });
        dispatch(toggleBasket({ show: true }));
        // document.location.reload(true);
      }
    }
  }, []);

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">
          {/* {showBackButton && (
            <img
              height="20"
              width="20"
              src={BackIcon}
              onClick={() => {
                handleBack();
              }}
            ></img>
          )} */}
          <img
            src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png"
            // height="40px"
            // width="120px"
          ></img>
          <div className="basket_button">
            <img
              src={Basket}
              onClick={() => dispatch(toggleBasket({ show: true }))}
            ></img>
          </div>
        </Navbar.Brand>{" "}
      </Container>
    </Navbar>
  );
}
