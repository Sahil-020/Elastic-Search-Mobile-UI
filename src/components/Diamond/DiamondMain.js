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
  DiamondCaratWeight,
  DiamondSearchKeyword,
  DiamondSerialApp,
} from "../../utils/constants";
import Results from "../Results/Results";
import SerialSearchComponent from "../search-components/SerialSearchComponent";
import RetailPriceRange from "../search-components/RetailPriceRange";
import WholesalePriceRange from "../search-components/WholesalePriceRange";
import IsSold from "../search-components/IsSold";
import SearchCriteria from "../search-components/SearchCriteria";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RfidSearch from "../search-components/RfidSearch";
import Warehouse from "../search-components/Warehouse";
import MemoOut from "../search-components/MemoOut";
import IsVirtual from "../search-components/IsVirtual";
import TiaraOnly from "../search-components/TiaraOnly";
import FLRoundOnly from "../search-components/FLRoundOnly";
import KWCushionOnly from "../search-components/KWCushionOnly";
import { data } from "../../assets/icons/Sampledata";
import Grid2 from "../../assets/icons/grid-two-up-16.png";
import Grid3 from "../../assets/icons/grid-three-up-16.png";
import Grid1 from "../../assets/icons/square-16.png";
import ListView from "../../assets/icons/list-2-16.png";
import $ from "jquery";
import Navigation from "../Navigation";
import Shape from "./search-components/Shape";
import MountedNumberStock from "../search-components/MountedNumberStock";
import StyleNumber from "../search-components/StyleNumber";
import DiamondCaratWeightComponent from "./search-components/DiamondCartWeight";
import DiamondColorRange from "./search-components/DiamondColorRange";
import DiamondClarityRange from "./search-components/DiamondClarityRange";
import DiamondCutRange from "./search-components/DiamondCutRange";
import StoneRatio from "./search-components/StoneRatio";
import FancyColor from "./search-components/FancyColor";
import FancyColorIntensity from "./search-components/FancyColorIntensity";
import Report from "../search-components/Report";
import LooseOnly from "../search-components/LooseOnly";
import LooseAndRingsOnly from "./search-components/LooseAndRingsOnly";
import IsRtv from "../search-components/IsRtv";
import FLCushionsOnly from "./search-components/FLCusionsOnly";
class DiamondMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      result: data,
      viewType: "List",
      serialSearchSignal: false,
      rfidSearchSignal: false,
      mountedSearchSignal: false,
    };
    // this.clearFilters = this.clearFilters.bind(this)
    this.defaultQuery = this.defaultQuery.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleSerialSearchSignal = this.handleSerialSearchSignal.bind(this);
    this.handleRfidSearchSignal = this.handleRfidSearchSignal.bind(this);
    this.handleMountedSearchSignal = this.handleMountedSearchSignal.bind(this);
  }

  handleMountedSearchSignal(value) {
    this.setState({ mountedSearchSignal: value });
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
  defaultQuery() {
    return {
      track_total_hits: true,
      query: {
        match: { ItemStatus: "Active" },
      },
    };
  }

  render() {
    let {
      showFilters,
      serialSearchSignal,
      rfidSearchSignal,
      mountedSearchSignal,
    } = this.state;
    let { handleBackButton } = this.props;
    // console.log();
    let andQuery = [];
    if (serialSearchSignal) {
      andQuery = ["SerialSearch"];
    } else if (mountedSearchSignal) {
      andQuery = ["MountedNumberStock"];
    } else if (rfidSearchSignal) {
      andQuery = ["RFID_Search"];
    } else {
      andQuery = [
        "StyleNumber",
        "Shape",
        "MountedNumberStock",
        "FancyColor",
        "FancyColorIntensity",
        "Warehouse",
        "MemoOut",
        "RFID_Search",
        "Report",
        "DiamondCaratWeight",
        "DiamondColorRange",
        "DiamondClarityRange",
        "DiamondCutRange",
        "StoneRatio",
        "LooseOnly",
        "LooseAndRingsOnly",
        "IncludeSold",
        "ExcludeVirtual",
        "IncludeRTV",
        "TiaraOnly",
        "FLRoundOnly",
        "FLCushionsOnly",
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
            app={DiamondSerialApp}
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
                        <Shape />
                        <MountedNumberStock
                          handleMountedSearchSignal={
                            this.handleMountedSearchSignal
                          }
                        />
                        <FancyColor />
                        <FancyColorIntensity />
                        <Warehouse />
                        <MemoOut />
                        <RfidSearch
                          handleRfidSearchSignal={this.handleRfidSearchSignal}
                        />
                        <Report data={DiamondSearchKeyword} />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Range Fields</Accordion.Header>
                      <Accordion.Body className="range_fields">
                        <DiamondCaratWeightComponent
                          data={DiamondCaratWeight}
                        />
                        <DiamondColorRange />
                        <DiamondClarityRange />
                        <DiamondCutRange />
                        <StoneRatio />

                        <RetailPriceRange />
                        <WholesalePriceRange />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Selection Fields</Accordion.Header>
                      <Accordion.Body className="selection_fields">
                        <LooseOnly />
                        <LooseAndRingsOnly />
                        <IsSold />
                        <IsVirtual />
                        <IsRtv />
                        <TiaraOnly />
                        <FLRoundOnly />
                        <FLCushionsOnly />
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
              defaultQuery={() => this.defaultQuery()}
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
