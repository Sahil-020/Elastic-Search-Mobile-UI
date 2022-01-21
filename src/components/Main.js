import React, { Component } from "react";
import kwiat from "../Logo/kwiat-logo-removebg-preview.png";
import { ReactiveList, ReactiveBase } from "@appbaseio/reactivesearch";
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
import jewelrySearch from "./jewelry/jewelrySearch";
import Results from "./jewelry/Results";
import SerialSearchComponent from "./search-components/SerialSearchComponent";
import ItemTypeSearch from "./search-components/ItemTypeSearch";
import PriceRange from "./search-components/PriceRange";

class Main extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <div className="main_container">
        <div className="navbar_container">
          <Navbar bg="light" expand={false}>
            <Container fluid>
              <Navbar.Brand href="#">
                <img src={kwiat} height="50px" width="80px"></img>
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
        </div>
        <div className="content">
          <ReactiveBase
            app={JewelrySerialApp}
            url={AppbaseAppUrl}
            credentials={AppbaseCredentials}
          >
            <div className="search_components_container">
              <SerialSearchComponent />
              <ItemTypeSearch />
              <PriceRange />
            </div>
            <ReactiveList
              componentId="results"
              dataField="RetailPrice"
              react={{
                and: ["SerialSearch", "ItemType", "PriceRange"],
                // or: andQuery,
              }}
              renderResultStats={({ numberOfResults, time }) => (
                <label>
                  {numberOfResults} results found in {time}ms
                </label>
              )}
              render={({ data }) => <Results items={data} />}
            />
          </ReactiveBase>
        </div>
        {/* */}
      </div>
    );
  }
}

export default Main;
