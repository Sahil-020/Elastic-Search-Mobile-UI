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
  GemstoneSerialApp,
  GemstoneKeywordSearch,
} from "../../utils/constants";
import Results from "../Results/Results";
import SerialSearchComponent from "../search-components/SerialSearchComponent";

import RetailPriceRange from "../search-components/RetailPriceRange";
import WholesalePriceRange from "../search-components/WholesalePriceRange";

import IsSold from "../search-components/IsSold";
import SearchCriteria from "../search-components/SearchCriteria";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RfidSearch from "../search-components/RfidSearch";
import Warehouse from "../search-components/Warehouse";
import MemoOut from "../search-components/MemoOut";
import IsVirtual from "../search-components/IsVirtual";
import GemstoneShape from "./search-components/GemstoneShape";
import { data } from "../../assets/icons/Sampledata";
import $ from "jquery";
import Navigation from "../Navigation";
import StyleNumber from "../search-components/StyleNumber";
import MountedNumberStock from "../search-components/MountedNumberStock";
import CaratWeight from "./search-components/CaratWeight";
import GemstoneType from "./search-components/GemstoneType";
import CountryofOrigin from "./search-components/CountryofOrigin";
import GemEnhancement from "./search-components/GemEnhancement";
import Report from "../search-components/Report";
import LooseOnly from "../search-components/LooseOnly";
import IsRtv from "../search-components/IsRtv";
import HandleView from "./../OtherComponents/HandleView";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleBasket } from "../actions";
import Basket from "./../Basket/Basket";
import isEmpty from "lodash/isEmpty";
import currencyFormatter from "currency-formatter";
import ShowCode from "../OtherComponents/ShowCode";
import HandleWholesale from "../OtherComponents/HandleWholesale";
import Options from "../../assets/icons/Options.png";
import Clear from "../../assets/icons/Clear.png";
import Filter from "../../assets/icons/Filter.png";


const mapStateToProps = (state) => {
  return {
    basket: state.basket,
  };
};

class GemstoneMain extends Component {
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
      showBasketOptions: false,
      selected: "RetailPrice",
      sort: "asc",
      sizeLimit: 15,
    };
    // this.clearFilters = this.clearFilters.bind(this)

    this.handleView = this.handleView.bind(this);
    this.defaultQuery = this.defaultQuery.bind(this);
    this.handleSerialSearchSignal = this.handleSerialSearchSignal.bind(this);
    this.handleRfidSearchSignal = this.handleRfidSearchSignal.bind(this);
    this.handleMountedSearchSignal = this.handleMountedSearchSignal.bind(this);
    this.isValueEmpty = this.isValueEmpty.bind(this);
    this.isMultipleValueEmpty = this.isMultipleValueEmpty.bind(this);
    this.onCheckSelect = this.onCheckSelect.bind(this);
    this.handleShowFilters = this.handleShowFilters.bind(this);
    this.handleShowBasketOptions = this.handleShowBasketOptions.bind(this);

  }

  // componentDidMount() {
  //   this.setState({ showFilters: true });
  //   // this.setState({ showFilters: false });
  // }
  handleShowBasketOptions(value) {
    this.setState({ showBasketOptions: value });
  }
  handleShowFilters(value) {
    document.getElementById("Search_Filters").className = value;
    if (value === "show_filters") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
  onCheckSelect(value) {
    this.setState({
      checked: value,
    });
  }

  isValueEmpty(res) {
    let result = "";
    if (!isEmpty(res)) {
      result = res;
    }
    return result;
  }
  isMultipleValueEmpty(res, expr) {
    let { checked } = this.state;
    let result = "";
    switch (expr) {
      case "WholesalePrice":
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
      case "WholesalePerCarat":
        if (checked === true) {
          result = res.WholesalePerCaratCode || "";
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

      case "RetailPrice":
        if (!isEmpty(res)) {
          result = currencyFormatter.format(`${res}`, {
            code: "USD",
            precision: 0,
          });
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
    let {
      showFilters,
      serialSearchSignal,
      mountedSearchSignal,
      rfidSearchSignal,
      selected,
      sizeLimit,
      sort,   
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
        "GemstoneShape",
        "MountedNumberStock",
        "GemstoneType",
        "CountryofOrigin",
        "GemEnhancement",
        "Warehouse",
        "MemoOut",
        "RFID_Search",
        "Report",
        "CaratWeight",
        "RetailPriceRange",
        "WholeSalePriceRange",
        "LooseOnly",
        "IncludeSold",
        "ExcludeVirtual",
        "IncludeRTV",
      ];
    }
    return (
      <>
        <div className="navbar_container">
          <Navigation />
        </div>
        <div className="content">
          <ReactiveBase
            app={GemstoneSerialApp}
            url={AppbaseAppUrl}
            credentials={AppbaseCredentials}
          >
            <div id="Search_Components" className="search_components_container">
              <div className="serial_search_container">
                <SerialSearchComponent
                  handleSerialSearchSignal={this.handleSerialSearchSignal}
                />
                 <img
                  src={Filter}
                  //  onClick={() => this.setState({ showFilters: true })}
                  onClick={() => this.handleShowFilters("show_filters")}
                />
              </div>
              <div className="showcode_container">
                <ShowCode onCheck={this.onCheckSelect} />
                <HandleWholesale />
              </div>
              {/* <Offcanvas
                show={showFilters}
                onHide={() => this.setState({ showFilters: false })}
                placement="bottom"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filters</Offcanvas.Title>
                  <SearchCriteria />
                </Offcanvas.Header>
                <Offcanvas.Body> */}
              <div className="filters" id="Search_Filters">
                <div className="filter_header">
                  <h4>Filters</h4>{" "}
                  <span>
                    <img src={Clear} /> Clear filters
                  </span>
                  <button onClick={() => this.handleShowFilters("filters")}>
                    X
                  </button>
                </div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>General Fields</Accordion.Header>
                    <Accordion.Body>
                      <SerialSearchComponent
                        handleSerialSearchSignal={this.handleSerialSearchSignal}
                      />
                      <StyleNumber />
                      <GemstoneShape />
                      <MountedNumberStock
                        handleMountedSearchSignal={
                          this.handleMountedSearchSignal
                        }
                      />
                      <GemstoneType />
                      <CountryofOrigin />
                      <GemEnhancement />
                      <Warehouse />
                      <MemoOut />
                      <RfidSearch
                        handleRfidSearchSignal={this.handleRfidSearchSignal}
                      />
                      <Report data={GemstoneKeywordSearch} />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Range Fields</Accordion.Header>
                    <Accordion.Body className="range_fields">
                      <CaratWeight />
                      <RetailPriceRange />
                      <WholesalePriceRange />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Selection Fields</Accordion.Header>
                    <Accordion.Body className="selection_fields">
                      <LooseOnly />
                      <IsSold />
                      <IsVirtual />
                      <IsRtv />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              {/* </Offcanvas.Body>
              </Offcanvas> */}
            </div>
            {/* <SelectedFilters className="selectedFilters" /> */}
            {/* <SearchCriteria /> */}

            <ReactiveList
              componentId="results"
             // dataField="RetailPrice"
             dataField={selected}
             size={sizeLimit}
             sortBy={sort}  
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
              render={({ data }) => (
                <div className="es_results">
                  <div
                    id="ES_Results"
                    className="List_result_container"
                    // className="compact_result_container"
                  >
                    <Results
                      items={data}
                      viewType={this.state.viewType}
                      isValueEmpty={this.isValueEmpty}
                      isMultipleValueEmpty={this.isMultipleValueEmpty}
                      // items={this.state.result}
                      handleBackButton={handleBackButton}
                    />
                  </div>
                </div>
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
            <Offcanvas.Title>Basket list</Offcanvas.Title>
            <img
              src={Options}
              onClick={() => this.handleShowBasketOptions(true)}
            ></img>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Basket
              isValueEmpty={this.isValueEmpty}
              isMultipleValueEmpty={this.isMultipleValueEmpty}
              showBasketOptions={this.state.showBasketOptions}
              handleShowBasketOptions={this.handleShowBasketOptions}              />
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleBasket }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(GemstoneMain);
