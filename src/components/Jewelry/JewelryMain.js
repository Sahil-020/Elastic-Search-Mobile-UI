import React, { Component } from "react";
// import kwiat from "../Logo/kwiat-logo-removebg-preview.png";
import {
  ReactiveList,
  ReactiveBase,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import { Offcanvas, Accordion } from "react-bootstrap";
import {
  AppbaseAppUrl,
  AppbaseCredentials,
  JewelrySerialApp,
} from "../../utils/constants";
import Results from "../Results/Results";
import SerialSearchComponent from "../search-components/SerialSearchComponent";
import ItemTypeSearch from "../search-components/ItemTypeSearch";
import ItemSubtype from "../search-components/ItemSubtype";
import Collection from "../search-components/Collection";
import SubCollection from "../search-components/SubCollection";
import Maker from "../search-components/Maker";
import RetailPriceRange from "../search-components/RetailPriceRange";
import WholesalePriceRange from "../search-components/WholesalePriceRange";
import DiamondCarats from "../search-components/DiamondCarat";
import ColorCarat from "../search-components/ColorCarat";
import KwiatOnly from "../search-components/KwiatOnly";
import IsSold from "../search-components/IsSold";
import FredLeightonOnly from "../search-components/FredLeightonOnly";
import SearchCriteria from "../search-components/SearchCriteria";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CenterShape from "../search-components/CenterShape";
import Metal from "../search-components/Metal";
import Period from "../search-components/Period";
import RfidSearch from "../search-components/RfidSearch";
import Keyword from "../search-components/Keyword";
import WRShape from "../search-components/WRShape";
import WRSetting from "../search-components/WRSetting";
import EternPart from "../search-components/EternPart";
import Warehouse from "../search-components/Warehouse";
import MemoOut from "../search-components/MemoOut";
import RingSizeRange from "../search-components/RingSizeRange";
import PurchasDateRange from "../search-components/PurchaseDateRange";
import IsCom from "../search-components/IsCom";
import IsVirtual from "../search-components/IsVirtual";
import IsSemimount from "../search-components/IsSemimount";
import TiaraOnly from "../search-components/TiaraOnly";
import FLRoundOnly from "../search-components/FLRoundOnly";
import AshokaOnly from "../search-components/AshokaOnly";
import KWCushionOnly from "../search-components/KWCushionOnly";
import { data } from "../../assets/icons/Sampledata";
import Grid2 from "../../assets/icons/grid-two-up-16.png";
import Grid3 from "../../assets/icons/grid-three-up-16.png";
import Grid1 from "../../assets/icons/square-16.png";
import ListView from "../../assets/icons/list-2-16.png";
import $ from "jquery";
import Navigation from "../Navigation";
import SoldCustomerSearch from "../search-components/SoldCustomerSearch";
import StyleNumber from "../search-components/StyleNumber";

class JewelryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      result: data,
      viewType: "List",
      soldCustSignal: false,
      serialSearchSignal: false,
      rfidSearchSignal: false,
    };
    // this.clearFilters = this.clearFilters.bind(this)
    this.defaultQuery = this.defaultQuery.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleSoldCustSignal = this.handleSoldCustSignal.bind(this);
    this.handleSerialSearchSignal = this.handleSerialSearchSignal.bind(this);

    this.handleRfidSearchSignal = this.handleRfidSearchSignal.bind(this);
  }

  handleSoldCustSignal(value) {
    this.setState({ soldCustSignal: value });
  }
  handleRfidSearchSignal(value) {
    this.setState({ rfidSearchSignal: value });
  }

  handleSerialSearchSignal(value) {
    this.setState({ serialSearchSignal: value });
  }

  handleView(e, value) {
    console.log(
      "result element : ",
      document.getElementById("ES_Results").className,
      "\n Type : ",
      typeof document.getElementById("ES_Results").className
    );

    $(".result_view_options").children().removeClass("active");
    // console.log("Selected value: ", value);
    this.setState({ viewType: value });
    e.target.className = "active";
    if (value === "Grid1") {
      document.getElementById("ES_Results").className = "Grid_result_container";
    } else if (value === "Grid2") {
      document.getElementById("ES_Results").className =
        "Grid2_result_container";
    } else if (value === "Grid3") {
      document.getElementById("ES_Results").className =
        "Grid3_result_container";
    } else if (value === "List") {
      document.getElementById("ES_Results").className = "List_result_container";
    }
  }
  defaultQuery() {
    return {
      track_total_hits: true,
      query: {
        match: { ItemStatus: "Active" },
      },
    };
  }

  render() {
    let { showFilters, serialSearchSignal, rfidSearchSignal, soldCustSignal } =
      this.state;
    let { handleBackButton } = this.props;
    // console.log();
    let andQuery = [];
    if (serialSearchSignal) {
      andQuery = ["SerialSearch"];
    } else if (soldCustSignal) {
      andQuery = ["SoldCust"];
    } else if (rfidSearchSignal) {
      andQuery = ["RFID_Search"];
    } else {
      andQuery = [
        "StyleNumber",
        "ItemType",
        "KwiatOnly",
        "SubType",
        "Collection",
        "SubCollection",
        "CenterSahape",
        "Maker",
        "Metal",
        "Period",
        "SearchKeyword",
        "WRShape",
        "WRSetting",
        "EternPart",
        "Warehouse",
        "MemoOut",
        "RetailPriceRange",
        "WholeSalePriceRange",
        "DiamondCarats",
        "ColorCarats",
        "RingSizeRange",
        "PurchaseDate",
        "KwiatOnly",
        "FredLeightonOnly",
        "IncludeSold",
        "IncludeCom",
        "ExcludeVirtual",
        "IncludeRTV",
        "IncludeSemimount",
        "TiaraOnly",
        "FLRoundOnly",
        "AshokaOnly",
        "KWCushionOnly",
      ];
    }
    return (
      <>
        <div className="navbar_container">
          <Navigation />
        </div>
        <div className="content">
          <ReactiveBase
            app={JewelrySerialApp}
            url={AppbaseAppUrl}
            credentials={AppbaseCredentials}
          >
            <div className="search_components_container">
              <SerialSearchComponent
                handleSerialSearchSignal={this.handleSerialSearchSignal}
              />
              <button onClick={() => this.setState({ showFilters: true })}>
                Filters
              </button>

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
                        <StyleNumber />
                        <ItemTypeSearch />
                        <ItemSubtype />
                        <Collection />
                        <SubCollection />
                        <CenterShape />
                        <Metal />
                        <Period />
                        <Maker />
                        <RfidSearch
                          handleRfidSearchSignal={this.handleRfidSearchSignal}
                        />
                        <Keyword />
                        <WRShape />
                        <WRSetting />
                        <EternPart />
                        <Warehouse />
                        <MemoOut />
                        <SoldCustomerSearch
                          handleSoldCustSignal={this.handleRfidSearchSignal}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Range Fields</Accordion.Header>
                      <Accordion.Body className="range_fields">
                        <RetailPriceRange />
                        <WholesalePriceRange />
                        <DiamondCarats />
                        <ColorCarat />
                        <RingSizeRange />
                        <PurchasDateRange />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Selection Fields</Accordion.Header>
                      <Accordion.Body className="selection_fields">
                        <KwiatOnly />
                        <FredLeightonOnly />
                        <IsSold />
                        <IsCom />
                        <IsVirtual />
                        <IsSemimount />
                        <TiaraOnly />
                        <FLRoundOnly />
                        <AshokaOnly />
                        <KWCushionOnly />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
            {/* <SelectedFilters className="selectedFilters" /> */}
            {/* <SearchCriteria /> */}

            <ReactiveList
              componentId="results"
              dataField="RetailPrice"
              react={{
                and: andQuery,
                // or: andQuery,
              }}
              renderResultStats={({ numberOfResults, time }) => (
                <div className="result_status_view_option_container">
                  <label>
                    {numberOfResults} results found in {time}ms
                  </label>
                  <div className="result_view_options">
                    <img
                      className="active"
                      src={ListView}
                      onClick={(e) => this.handleView(e, "List")}
                    />
                    <img
                      src={Grid1}
                      onClick={(e) => this.handleView(e, "Grid1")}
                    />
                    <img
                      src={Grid2}
                      onClick={(e) => this.handleView(e, "Grid2")}
                    />
                    <img
                      src={Grid3}
                      onClick={(e) => this.handleView(e, "Grid3")}
                    />
                  </div>
                </div>
              )}
              render={({ data }) => (
                <Results
                  items={data}
                  viewType={this.state.viewType}
                  // items={this.state.result}
                  handleBackButton={handleBackButton}
                />
              )}
              defaultQuery={() => this.defaultQuery()}
            />
          </ReactiveBase>
        </div>
      </>
    );
  }
}

export default JewelryMain;
