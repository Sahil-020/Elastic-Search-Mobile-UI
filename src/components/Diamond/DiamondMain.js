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
import isEmpty from "lodash/isEmpty";
import currencyFormatter from "currency-formatter";
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
import HandleView from "./../OtherComponents/HandleView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleBasket } from "../actions";
import Basket from "./../Basket/Basket";
const mapStateToProps = (state) => {
  return {
    basket: state.basket,
  };
};

class DiamondMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      result: data,
      viewType: "List",
      checked: false,
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
    this.isValueEmpty = this.isValueEmpty.bind(this);
    this.isMultipleValueEmpty = this.isMultipleValueEmpty.bind(this);
    this.onCheckSelect = this.onCheckSelect.bind(this);
  }

  onCheckSelect(value) {
    this.setState({
      checked: value,
    });
  }
  isValueEmpty(res) {
    let result = "";
    if (!isEmpty(res) && res !== "NaN") {
      result = res;
    }
    return result;
  }
  isMultipleValueEmpty(res, expr) {
    let { checked } = this.state;
    let result = "";
    switch (expr) {
      case "Measurements":
        if (!isEmpty(res.Length)) {
          result = `${res.Length && res.Length + " x"}  ${
            res.Width && res.Width + " x"
          }  ${res.Depth}`;
        }
        break;
      case "Polish":
        result = `${res.Polish || ""}
            ${res.Polish && res.Symmetry ? "/" : ""}
            ${res.Symmetry || ""}
          `;
        break;
      case "GradingLab":
        if (!isEmpty(res.GradingLab))
          result = `${res.GradingLab} -  ${res.LabReportNbr || ""}`;
        break;
      case "StoneFluoresence":
        result = `${res.StoneFluoresence || ""}
          ${res.StoneFluoresenceColor || ""}`;
        break;
      case "DiamondColorRange":
        result = `${
          this.isValueEmpty(res.DiamondColorRange)
            ? res.DiamondColorRange + "/"
            : res.FancyColorGIA || ""
        }
          ${res.DiamondClarityRange || ""}
        `;
        break;
      case "WholesalePriceCode":
        if (checked === true) {
          result = res.WholesalePriceCode || "";
        } else {
          result =
            (res.WholesalePrice &&
              currencyFormatter.format(`${res.WholesalePrice}`, {
                code: "USD",
                precision: 0,
              })) ||
            "";
        }
        break;
      case "WholesalePerCaratCode":
        if (checked === true) {
          result = res.WholesalePerCaratCode;
        } else {
          result =
            (res.WholesalePerCarat &&
              currencyFormatter.format(`${res.WholesalePerCarat}`, {
                code: "USD",
                precision: 0,
              })) ||
            "";
        }
        break;
      default:
        return result;
    }
    return result;
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
    let { handleBackButton, basket, toggleBasket } = this.props;
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
                  <SearchCriteria />
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>General Fields</Accordion.Header>
                      <Accordion.Body>
                        <SerialSearchComponent
                          handleSerialSearchSignal={
                            this.handleSerialSearchSignal
                          }
                        />
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
                <HandleView
                  numberOfResults={numberOfResults}
                  time={time}
                  handleView={this.handleView}
                />
              )}
              // scrollOnChange={false}
              render={({ data }) => (
                <Results
                  items={data}
                  viewType={this.state.viewType}
                  isValueEmpty={this.isValueEmpty}
                  isMultipleValueEmpty={this.isMultipleValueEmpty}
                  // items={this.state.result}

                  handleBackButton={handleBackButton}
                />
              )}
            />
          </ReactiveBase>
        </div>
        <Offcanvas
          show={basket.show}
          onHide={() => toggleBasket({ show: false })}
          placement="bottom"
          className="basket_offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Basket</Offcanvas.Title>
            <span>...</span>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Basket />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleBasket }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DiamondMain);
