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
  Accordion,
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
import KwiatOnly from "./search-components/KwiatOnly";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
    };
  }

  render() {
    let { showFilters } = this.state;
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
              <button onClick={() => this.setState({ showFilters: true })}>
                Filters
              </button>
              {/* <ItemTypeSearch />
              <PriceRange />
              <KwiatOnly /> */}

              <Offcanvas
                show={showFilters}
                onHide={() => this.setState({ showFilters: false })}
                placement="bottom"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Accordion Item #1</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            <ReactiveList
              componentId="results"
              dataField="RetailPrice"
              react={{
                and: ["SerialSearch", "ItemType", "PriceRange", "KwiatOnly"],
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
        <div className="es-scroll-button">
          <ScrollUpButton
            // EasingType="linear"
            StopPosition={0}
            ShowAtPosition={150}
            AnimationDuration={0.1}
          />
        </div>
        {/* */}
      </div>
    );
  }
}

export default Main;
