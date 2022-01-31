import React, { Component } from "react";
import kwiat from "../Logo/kwiat-logo-removebg-preview.png";
import {
  ReactiveList,
  ReactiveBase,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
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
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import ItemSubtype from "./search-components/ItemSubtype";
import Collection from "./search-components/Collection";
import SubCollection from "./search-components/SubCollection";
import Maker from "./search-components/Maker";
import RetailPriceRange from "./search-components/RetailPriceRange";
import WholesalePriceRange from "./search-components/WholesalePriceRange";
import DiamondCarats from "./search-components/DiamondCarat";
import ColorCarat from "./search-components/ColorCarat";
import KwiatOnly from "./search-components/KwiatOnly";
import IsSold from "./search-components/IsSold";
import FredLeightonOnly from "./search-components/FredLeightonOnly";
import SearchCriteria from "./search-components/SearchCriteria";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      showResult: false,
    };
    // this.clearFilters = this.clearFilters.bind(this)
  }

  render() {
    let { showFilters, showResult } = this.state;
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
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>General Fields</Accordion.Header>
                      <Accordion.Body>
                        <ItemTypeSearch />
                        <ItemSubtype />
                        <Collection />
                        <SubCollection />
                        <Maker />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Range Fields</Accordion.Header>
                      <Accordion.Body className="range_fields">
                        <RetailPriceRange />
                        <WholesalePriceRange />
                        <DiamondCarats />
                        <ColorCarat />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Selection Fields</Accordion.Header>
                      <Accordion.Body className="selection_fields">
                        <KwiatOnly />
                        <FredLeightonOnly />
                        <IsSold />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            {/* <SelectedFilters className="filters" /> */}
            <SearchCriteria />

            <ReactiveList
              componentId="results"
              dataField="RetailPrice"
              react={{
                and: [
                  "SerialSearch",
                  "ItemType",
                  "PriceRange",
                  "KwiatOnly",
                  "SubType",
                  "Collection",
                  "SubCollection",
                  "Maker",
                  "DiamondCarats",
                  "ColorCarats",
                  "KwiatOnly",
                  "FredLeightonOnly",
                  "IncludeSold",
                ],
                // or: andQuery,
              }}
              renderResultStats={({ numberOfResults, time }) => (
                <label>
                  {numberOfResults} results found in {time}ms
                </label>
              )}
              render={({ data }) => (
                <Results showResult={showResult} items={data} />
              )}
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
