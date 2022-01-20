import React, { Component } from "react";
import {
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Navbar,
  Container,
  Offcanvas,
} from "react-bootstrap";
import {
  JewelryStyleApp,
  AppbaseAppUrl,
  AppbaseCredentials,
  SerialDataField,
  JewelrySerialApp,
} from "../utils/constants";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="main_container">
        <Navbar bg="light" expand={false}>
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                src="https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg"
                height="50px"
                width="80px"
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              //   placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Search
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">JewelrySerial</Nav.Link>
                  <Nav.Link href="#action2">JewelryStyle</Nav.Link>
                  <Nav.Link href="#action3">Diamond</Nav.Link>
                  <Nav.Link href="#action4">Gemstone</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>

        {/* */}
      </div>
    );
  }
}

export default Main;
