import React, { Component } from "react";
import {
  ReactiveList,
  ReactiveBase,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import { Offcanvas, Accordion } from "react-bootstrap";
import {
  AppbaseAppUrl,
  AppbaseCredentials,
  DiamondSerialApp,
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
import { toast } from "react-toastify";
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
class DiamondMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      result: data,
      viewType: "List",
    };
    // this.clearFilters = this.clearFilters.bind(this)

    this.handleView = this.handleView.bind(this);
  }
  handleView(e, value) {
    console.log(
      "result element : ",
      document.getElementById("ES_Results").className,
      "\n Type : ",
      typeof document.getElementById("ES_Results").className
    );
    // let value = e.target.value;
    // document
    //   .getElementById("ES_Results")
    //   .classList.toggle("compact_result_container");
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

    // if (e.target.innerHTML === "List") {
    //   e.target.innerHTML = "Grid";
    // } else {
    //   e.target.innerHTML = "List";
    // }
  }

  render() {
    let { showFilters } = this.state;
    let { handleBackButton } = this.props;
    console.log();
    return (
      <>
        <div className="navbar_container">
          <Navigation />
        </div>
        <div className="content">
          <ReactiveBase
            app={DiamondSerialApp}
            url={AppbaseAppUrl}
            credentials={AppbaseCredentials}
          >
            <div className="search_components_container">
              <SerialSearchComponent />
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
                        <ItemTypeSearch />
                        <ItemSubtype />
                        <Collection />
                        <SubCollection />
                        <CenterShape />
                        <Metal />
                        <Period />
                        <Maker />
                        <RfidSearch />
                        <Keyword />
                        <WRShape />
                        <WRSetting />
                        <EternPart />
                        <Warehouse />
                        <MemoOut />
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
                and: [
                  "SerialSearch",
                  "ItemType",
                  "PriceRange",
                  "KwiatOnly",
                  "SubType",
                  "Collection",
                  "SubCollection",
                  "CenterSahape",
                  "Maker",
                  "Metal",
                  "Period",
                  "RFID_Search",
                  "SearchKeyword",
                  "WRShape",
                  "WRSetting",
                  "EternPart",
                  "Warehouse",
                  "MemoOut",
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
                ],
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
            />
          </ReactiveBase>
        </div>
      </>
    );
  }
}

export default DiamondMain;
