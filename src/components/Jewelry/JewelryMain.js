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
import isEmpty from "lodash/isEmpty";
import currencyFormatter from "currency-formatter";
import Results from "../Results/Results";
import SerialSearchComponent from "../search-components/SerialSearchComponent";
import ItemTypeSearch from "./search-components/ItemTypeSearch";
import ItemSubtype from "./search-components/ItemSubtype";
import Collection from "./search-components/Collection";
import SubCollection from "./search-components/SubCollection";
import Maker from "./search-components/Maker";
import RetailPriceRange from "../search-components/RetailPriceRange";
import WholesalePriceRange from "../search-components/WholesalePriceRange";
import DiamondCarats from "./search-components/DiamondCarat";
import ColorCarat from "./search-components/ColorCarat";
import KwiatOnly from "./search-components/KwiatOnly";
import IsSold from "../search-components/IsSold";
import FredLeightonOnly from "./search-components/FredLeightonOnly";
import SearchCriteria from "../search-components/SearchCriteria";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CenterShape from "./search-components/CenterShape";
import Metal from "./search-components/Metal";
import Period from "./search-components/Period";
import RfidSearch from "../search-components/RfidSearch";
import Keyword from "./search-components/Keyword";
import WRShape from "./search-components/WRShape";
import WRSetting from "./search-components/WRSetting";
import EternPart from "./search-components/EternPart";
import Warehouse from "../search-components/Warehouse";
import MemoOut from "../search-components/MemoOut";
import RingSizeRange from "./search-components/RingSizeRange";
import PurchasDateRange from "./search-components/PurchaseDateRange";
import IsCom from "./search-components/IsCom";
import IsVirtual from "../search-components/IsVirtual";
import IsSemimount from "./search-components/IsSemimount";
import TiaraOnly from "../search-components/TiaraOnly";
import FLRoundOnly from "../search-components/FLRoundOnly";
import AshokaOnly from "./search-components/AshokaOnly";
import KWCushionOnly from "../search-components/KWCushionOnly";
import { data } from "../../assets/icons/Sampledata";
import $ from "jquery";
import Navigation from "../Navigation";
import SoldCustomerSearch from "./search-components/SoldCustomerSearch";
import StyleNumber from "../search-components/StyleNumber";
import Basket from "../Basket/Basket";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleBasket } from "../actions";
import HandleView from "./../OtherComponents/HandleView";
import IsOpenJob from "../search-components/IsOpenJob";
import ShowCode from "../OtherComponents/ShowCode";
import HandleWholesale from "../OtherComponents/HandleWholesale";
import Options from "../../assets/icons/Options.png";
import Clear from "../../assets/icons/Clear.png";
import Filter from "../../assets/icons/Filter.png";
import IsRtv from "./../search-components/IsRtv";
import StockModal from "../OtherComponents/JewelryStockModal";

const mapStateToProps = (state) => {
  return {
    basket: state.basket,
  };
};

class JewelryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      result: data,
      checked: false,
      viewType: "List",
      soldCustSignal: false,
      serialSearchSignal: false,
      rfidSearchSignal: false,
      showBasketOptions: false,
      selected: "RetailPrice",
      sort: "asc",
      sizeLimit: 45,
      showResults: false,
      showStockModal: false,
      res: [],
    };
    // this.clearFilters = this.clearFilters.bind(this)
    this.defaultQuery = this.defaultQuery.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleSoldCustSignal = this.handleSoldCustSignal.bind(this);
    this.handleSerialSearchSignal = this.handleSerialSearchSignal.bind(this);
    this.handleRfidSearchSignal = this.handleRfidSearchSignal.bind(this);
    this.isValueEmpty = this.isMultipleValueEmpty.bind(this);
    this.isMultipleValueEmpty = this.isMultipleValueEmpty.bind(this);
    this.onCheckSelect = this.onCheckSelect.bind(this);
    this.handleShowFilters = this.handleShowFilters.bind(this);
    this.handleShowBasketOptions = this.handleShowBasketOptions.bind(this);
    this.handleShowResults = this.handleShowResults.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleStockPopUpModal = this.handleStockPopUpModal.bind(this);
  }

  // componentDidMount() {
  //   this.setState({ showFilters: true });
  //   // this.setState({ showFilters: false });
  // }

  handleStockPopUpModal(value, item) {
    this.setState({ showStockModal: value, res: item });
  }

  handleClearFilters() {
    console.log("Inside handle clear filters");
    this.handleShowResults(false);
    this.handleRfidSearchSignal(false);
    this.handleSerialSearchSignal(false);
    this.handleSoldCustSignal(false);
  }

  handleShowResults(value) {
    console.log("inside show results", { value });
    this.setState({ showResults: value });
  }

  handleShowBasketOptions(value) {
    this.setState({ showBasketOptions: value });
  }

  handleShowFilters(value) {
    if (value === "show_filters") {
      document.getElementById("Search_Components").style.position = "inherit";
      document.body.style.overflow = "hidden";
    } else {
      document.getElementById("Search_Components").style.position = "sticky";
      document.body.style.overflow = "auto";
    }
    document.getElementById("Search_Filters").className = value;
  }

  onCheckSelect(value) {
    this.setState({
      checked: value,
    });
  }

  isValueEmpty(res) {
    // console.log("res & name :", res, name);
    let result = "";
    if (!isEmpty(res) && res !== "0.00") {
      // result = `${name} : ${res}`;
      result = res;
    }
    // else {
    //   result = `${name} : null`;
    // }
    // console.log("result : ", result);
    return result;
  }
  isMultipleValueEmpty(res, expr) {
    let { checked } = this.state;
    let result = "";
    switch (expr) {
      case "CenterDetails":
        if (!isEmpty(res.CenterShape)) {
          result = `Center Details:
          ${(res.CenterCaratWeight && res.CenterCaratWeight + " cts") || ""}
          ${res.CenterShape || ""} ${
            (res.CenterColor && res.CenterColor + " /") || ""
          }
          ${(res.CenterClarity && res.CenterClarity + " /") || ""} ${
            res.CenterCut || ""
          } ${res.CenterEnhancement || ""} ${
            (res.CenterOrigin && res.CenterOrigin + " - #") || ""
          }  ${res.CenterStoneNbr || ""}`;
        }
        break;

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

      case "ItemSubtype":
        if (!isEmpty(res.ItemSubtype)) {
          result = res.ItemSubtype;
        } else {
          result = res.ItemType || "";
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
      case "ColorClarity":
        result = `${res.Color || ""}
          ${res.Color && res.Clarity ? "/" : ""}
          ${res.Clarity || ""}
        `;
        break;
      case "DiamondDetails":
        result = `${res.DiamondDetails || ""}
          ${res.DiamondDetails && res.ColorComment ? " & " : ""}
          ${res.ColorComment || ""}
        `;
        break;
      default:
        return result.trim();
    }
    return result.trim();
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
    console.log("Inside Render");
    let {
      showFilters,
      serialSearchSignal,
      rfidSearchSignal,
      soldCustSignal,
      selected,
      sizeLimit,
      sort,
      showResults,
    } = this.state;
    let { basket, toggleBasket } = this.props;
    console.log(this.state);
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
        "CenterShape",
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
        "IncludeOpenJob",
        "TiaraOnly",
        "FLRoundOnly",
        "AshokaOnly",
        "KWCushionOnly",
      ];
    }
    return (
      <>
        <div className="navbar_container">
          <Navigation handleShowResults={this.handleShowResults} />
        </div>
        <div className="content">
          <ReactiveBase
            app={JewelrySerialApp}
            url={AppbaseAppUrl}
            credentials={AppbaseCredentials}
          >
            <div id="Search_Components" className="search_components_container">
              <div className="serial_search_container">
                <SerialSearchComponent
                  handleSerialSearchSignal={this.handleSerialSearchSignal}
                  handleShowResults={this.handleShowResults}
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
              <SearchCriteria handleClearFilters={this.handleClearFilters} />
              <div className="filters" id="Search_Filters">
                <div className="filter_header">
                  <h4>Filters</h4>{" "}
                  {/* <span>
                    <img src={Clear} />{" "}
                    <SearchCriteria
                      handleShowResults={this.handleShowResults}
                    />
                  </span> */}
                  <button
                    onClick={() => {
                      this.handleShowFilters("filters");
                      this.handleShowResults(true);
                    }}
                  >
                    Search
                  </button>
                </div>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>General Fields</Accordion.Header>
                    <Accordion.Body>
                      <SerialSearchComponent
                        handleSerialSearchSignal={this.handleSerialSearchSignal}
                        handleShowResults={this.handleShowResults}
                      />
                      <StyleNumber handleShowResults={this.handleShowResults} />
                      <ItemTypeSearch
                        handleShowResults={this.handleShowResults}
                      />
                      <ItemSubtype handleShowResults={this.handleShowResults} />
                      <Collection handleShowResults={this.handleShowResults} />
                      <SubCollection
                        handleShowResults={this.handleShowResults}
                      />
                      <CenterShape handleShowResults={this.handleShowResults} />
                      <Metal handleShowResults={this.handleShowResults} />
                      <Period handleShowResults={this.handleShowResults} />
                      <Maker handleShowResults={this.handleShowResults} />
                      <RfidSearch
                        handleRfidSearchSignal={this.handleRfidSearchSignal}
                        handleShowResults={this.handleShowResults}
                      />
                      <Keyword handleShowResults={this.handleShowResults} />
                      <WRShape handleShowResults={this.handleShowResults} />
                      <WRSetting handleShowResults={this.handleShowResults} />
                      <EternPart handleShowResults={this.handleShowResults} />
                      <Warehouse handleShowResults={this.handleShowResults} />
                      <MemoOut handleShowResults={this.handleShowResults} />
                      <SoldCustomerSearch
                        handleSoldCustSignal={this.handleSoldCustSignal}
                        handleShowResults={this.handleShowResults}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Range Fields</Accordion.Header>
                    <Accordion.Body className="range_fields">
                      <RetailPriceRange
                        handleShowResults={this.handleShowResults}
                      />
                      <WholesalePriceRange
                        handleShowResults={this.handleShowResults}
                      />
                      <DiamondCarats
                        handleShowResults={this.handleShowResults}
                      />
                      <ColorCarat handleShowResults={this.handleShowResults} />
                      <RingSizeRange
                        handleShowResults={this.handleShowResults}
                      />
                      <PurchasDateRange
                        handleShowResults={this.handleShowResults}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Selection Fields</Accordion.Header>
                    <Accordion.Body className="selection_fields">
                      <KwiatOnly handleShowResults={this.handleShowResults} />
                      <FredLeightonOnly
                        handleShowResults={this.handleShowResults}
                      />
                      <IsSold handleShowResults={this.handleShowResults} />
                      <IsCom handleShowResults={this.handleShowResults} />
                      <IsVirtual handleShowResults={this.handleShowResults} />
                      <IsRtv handleShowResults={this.handleShowResults} />
                      <IsSemimount handleShowResults={this.handleShowResults} />
                      <IsOpenJob handleShowResults={this.handleShowResults} />
                      <TiaraOnly handleShowResults={this.handleShowResults} />
                      <FLRoundOnly handleShowResults={this.handleShowResults} />
                      <AshokaOnly handleShowResults={this.handleShowResults} />
                      <KWCushionOnly
                        handleShowResults={this.handleShowResults}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            {/* <SelectedFilters className="selectedFilters" /> */}
            {/* <SearchCriteria /> */}

            {showResults ? (
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
                        handleStockPopUpModal={this.handleStockPopUpModal}
                        // items={this.state.result}
                        // handleBackButton={handleBackButton}
                      />
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="banner text-center">
                <img
                  src={
                    // appType === "original"
                    // ?
                    "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Search-Background-Jewelry.png"
                    // :
                    // "https://cdn.kwiat.com/apps/kwiat-elastic-search-consumer/icons/Search-Background-Jewelry.svg"
                  }
                  alt="banner"
                  className="img-responsive"
                />
              </div>
            )}
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
              handleShowBasketOptions={this.handleShowBasketOptions}
            />
          </Offcanvas.Body>
        </Offcanvas>
        {this.state.showStockModal && (
          <StockModal
            show={this.state.showStockModal}
            callback={this.handleStockPopUpModal}
            result={this.state.res}
            checked={this.state.checked}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleBasket }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(JewelryMain);
