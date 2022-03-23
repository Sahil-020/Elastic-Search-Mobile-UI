import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ExportJewelryModal from "./ExportJewelryModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setBasketFormInput,
  toggleLoader,
  setToken,
} from "../../actions/index.js";
import LoadingOverlay from "react-loading-overlay";
import { CSVLink } from "react-csv";
import {
  jewelrySerialIncludeFields,
  jewelryStyleIncludeFields,
  diamondDataExport,
  gemstoneDataExport,
  diamondDataHeaderExport,
} from "../FieldsIncludeExport";
import { CSVDownloader, jsonToCSV } from "react-papaparse";
import DiamondExportModal from "./DiamondExportOptionModal";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};

class ChooseExportModal extends Component {
  daimondcsvLink = "#";
  diamondcsvLink = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      diamondFields: diamondDataExport,
      showExportJewelryModal: false,
      itemData: JSON.parse(JSON.stringify(props.cartItems.items)),
      diamondcsvData: [],
      showDiamondModal: false,
    };
    this.onModalHide = this.onModalHide.bind(this);
    this.showExportJewelryModal = this.showExportJewelryModal.bind(this);
    this.hideExportJewelryModal = this.hideExportJewelryModal.bind(this);
    this.handleDiamondExport = this.handleDiamondExport.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handleDiamondModal = this.handleDiamondModal.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // console.log("nextprops :", nextProps);
    if (this.props.cartItems.items !== nextProps.cartItems.items) {
      this.setState({
        itemData: JSON.parse(JSON.stringify(nextProps.cartItems.items)),
      });
    }
  }

  handleDiamondModal(value) {
    this.setState({ showDiamondModal: value });
  }

  handleDiamondExport(value) {
    let { itemData, diamondFields } = this.state;
    let {
      basketInputObj,
      selectedItems,
      handleCsvData,
      handleCsvRenderData,
      showPreviewModal,
    } = this.props;
    let flag = 0;
    // console.log("selectedItems: ", selectedItems);
    let productItems =
      selectedItems && selectedItems.length
        ? JSON.parse(JSON.stringify(selectedItems))
        : JSON.parse(JSON.stringify(itemData));
    // console.log(
    //   "productItems :",
    //   productItems,
    //   "\n diamondFields :",
    //   diamondFields
    // );
    let processedData1 = JSON.parse(JSON.stringify(productItems)).filter(
      (item) => {
        if (item.productType === "D") {
          itemLoop: for (let itemKey of Object.keys(item)) {
            fieldLoop: for (let diamondFieldKey of Object.keys(diamondFields)) {
              if (itemKey === diamondFieldKey) {
                // console.log(
                //   "itemKey :",
                //   itemKey,
                //   " :",
                //   item[itemKey],
                //   " | diamondFieldKey :",
                //   diamondFieldKey,
                //   " :",
                //   diamondFields[diamondFieldKey]
                // );
                if (itemKey === diamondFields[diamondFieldKey]["label"]) {
                  // console.log("itemKey :", itemKey);
                  continue itemLoop;
                }
                if (itemKey === "RetailPrice") {
                  if (
                    basketInputObj.includeRetail &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Wholesale Price") &&
                    item.RetailPrice &&
                    parseInt(item.RetailPrice) > 0
                  ) {
                    // console.log("Retail Price:", item.RetailPrice);
                  } else {
                    delete item[itemKey];
                    continue itemLoop;
                  }
                }
                if (itemKey === "WholesalePrice") {
                  if (
                    basketInputObj.includeWholesale &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Retail Price") &&
                    item.WholesalePrice &&
                    parseInt(item.WholesalePrice) > 0
                  ) {
                    // console.log("Wholesale:", item.WholesalePrice);
                  } else {
                    delete item[itemKey];
                    continue itemLoop;
                  }
                }

                // flag = 1;
                item[diamondFields[diamondFieldKey]["label"]] = item[itemKey];
              }
            }
            // if (flag === 0) {
            delete item[itemKey];
            // }
            // flag = 0;
          }

          item["Lab Report"] =
            item.LabReportNbr !== null && item["Lab Report"] !== null
              ? `=HYPERLINK(""https://cdn.kwiat.com/kwiat/certs-pdfs/${item.LabReportNbr}.pdf"",""VIEW ${item["Lab Report"]}"")`
              : ``;
          delete item.LabReportNbr;

          item["Video"] = item.DiaVideoLink
            ? `=HYPERLINK(""${item.DiaVideoLink}"",""VIEW VIDEO"")`
            : ``;
          delete item.DiaVideoLink;

          // item.Price = "$ " + item.Price;

          if (item.Color !== null && item.Color !== "*") {
            delete item.FancyColorGIA;
          } else if (item.FancyColorGIA !== null) {
            if (item.FancyColorGIA.includes("[*], ")) {
              // console.log("Inside if item.FancyColorGIA.includes('[*], ')");
              item.Color = item.FancyColorGIA.replace("[*], ", "");
            } else {
              item.Color = item.FancyColorGIA;
            }
            delete item.FancyColorGIA;
          } else {
            item.Color = "";
            delete item.FancyColorGIA;
          }
          item["Fluoresence"] = item.StoneFluoresenceColor
            ? item.StoneFluoresence + " " + item.StoneFluoresenceColor
            : item.StoneFluoresence;
          delete item.StoneFluoresence;
          delete item.StoneFluoresenceColor;
          item["Dimensions"] =
            item.Length &&
            item.Length &&
            !item.Length.startsWith("0.0") &&
            item.Width &&
            item.Width &&
            !item.Width.startsWith("0.0") &&
            item.Depth &&
            item.Depth &&
            !item.Depth.startsWith("0.0")
              ? `${item.Length} x ${item.Width} x ${item.Depth}`
              : item.Length &&
                item.Length &&
                !item.Length.startsWith("0.0") &&
                item.Width &&
                item.Width &&
                !item.Width.startsWith("0.0")
              ? `${item.Length} x ${item.Width}`
              : item.Width &&
                item.Width &&
                !item.Width.startsWith("0.0") &&
                item.Depth &&
                item.Depth &&
                !item.Depth.startsWith("0.0")
              ? `${item.Width} x ${item.Depth}`
              : item.Length &&
                item.Length &&
                !item.Length.startsWith("0.0") &&
                item.Depth &&
                item.Depth &&
                !item.Depth.startsWith("0.0")
              ? `${item.Length} x ${item.Depth}`
              : item.Length && item.Length && !item.Length.startsWith("0.0")
              ? `${item.Length}`
              : item.Width && item.Width && !item.Width.startsWith("0.0")
              ? `${item.Width}`
              : item.Depth && item.Depth && !item.Depth.startsWith("0.0")
              ? `${item.Depth}`
              : ``;

          delete item.Length;
          delete item.Width;
          delete item.Depth;
          return item;
        }
      }
    );
    // console.log("processedData1 :", processedData1);
    // this.setState(
    //   {
    //     diamondcsvData: processedData1,
    //   },
    //   () => {
    //     this.diamondcsvLink.current.link.click();
    //   }
    // );
    if (value) {
      const csv = jsonToCSV(processedData1);
      // const csv = Parser.parse(processedData);
      // console.log("csv :", csv);
      handleCsvData(csv);
      handleCsvRenderData(processedData1);
      showPreviewModal();
    }
    // return processedData;
    return processedData1;
    // console.log("dianondcsvData : ", this.state.diamondcsvData);
  }

  showExportJewelryModal() {
    this.setState({ showExportJewelryModal: true });
  }

  hideExportJewelryModal() {
    this.setState({ showExportJewelryModal: false });
  }

  onModalHide() {
    let { hide } = this.props;
    this.setState(() => {
      hide && hide();
    });
  }
  getCurrentDate() {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${year}-${month}-${date}`;
  }
  render() {
    let {
      show,
      basketInputObj,
      selectedItems,
      handleCsvData,
      handleCsvRenderData,
      showPreviewModal,
    } = this.props;
    // console.log("selectedItems : ", selectedItems);
    return (
      <div>
        <Modal
          animation={false}
          autoFocus={false}
          enforceFocus={false}
          className="show-export-modal"
          centered="true"
          size="sm"
          show={show}
          onHide={() => this.onModalHide()}
        >
          {/* <LoadingOverlay active={isLoading} spinner text="Loading..."> */}
          <Modal.Header closeButton> Export Option </Modal.Header>
          <Modal.Body>
            <div className="price__checkbox__wrapper">
              <div className="price__toggle retail__checkbox">
                <label htmlFor="retail_check">Include Retail Price:</label>
                <input
                  type="checkbox"
                  id="retail_check"
                  checked={basketInputObj.includeRetail}
                  onChange={(e) =>
                    this.props.setBasketFormInput({
                      includeRetail: e.target.checked,
                    })
                  }
                />
              </div>
              {this.props.basketInputObj.showWholesale && (
                <div className="price__toggle wholesale__checkbox">
                  <label htmlFor="wholesale_check">
                    Include Wholesale Price:
                  </label>
                  <input
                    type="checkbox"
                    id="wholesale_check"
                    checked={basketInputObj.includeWholesale}
                    onChange={(e) =>
                      this.props.setBasketFormInput({
                        includeWholesale: e.target.checked,
                      })
                    }
                  />
                </div>
              )}
            </div>
            <div className="export-option">
              <ul>
                <li onClick={this.showExportJewelryModal}>
                  Export Jewelry Items
                </li>
                <li onClick={() => this.handleDiamondModal(true)}>
                  Export Diamonds Items
                </li>
                {/* <CSVDownloader
                  className="csv-link"
                  data={() => this.handleDiamondExport()}
                  type="button"
                  filename="Basket_Items"
                  ref={this.csvLink}
                  bom={true}
                  config={{}}
                >
                  Export Diamonds Items
                </CSVDownloader> */}
              </ul>
            </div>
            {/* <CSVLink
              className="csv-link"
              data={this.state.diamondcsvData}
              headers={diamondDataHeaderExport}
              target="_blank"
              filename={`Kwiat-Diamonds-Export-${this.getCurrentDate()}.csv`}
              ref={this.diamondcsvLink}
            /> */}
          </Modal.Body>
          {/* </LoadingOverlay> */}
        </Modal>
        <ExportJewelryModal
          show={this.state.showExportJewelryModal}
          hide={this.hideExportJewelryModal}
          selectedItems={this.props.selectedItems}
          showPreviewModal={showPreviewModal}
          handleCsvData={handleCsvData}
          handleCsvRenderData={handleCsvRenderData}
        />
        <DiamondExportModal
          show={this.state.showDiamondModal}
          hide={this.handleDiamondModal}
          handleDiamondExport={this.handleDiamondExport}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setBasketFormInput,
      toggleLoader,
      setToken,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseExportModal);
