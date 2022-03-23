import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setBasketFormInput,
  toggleLoader,
  setToken,
} from "../../actions/index";
import LoadingOverlay from "react-loading-overlay";
import { CSVLink } from "react-csv";
import { CSVDownloader, jsonToCSV } from "react-papaparse";
import {
  jewelrySerialIncludeFields,
  jewelryStyleIncludeFields,
} from "../FieldsIncludeExport";
// import { Parser } from "json";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};
class ExportJewelryModal extends Component {
  csvLink = "#";
  csvLink = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      // fieldsToInclude: {
      //   SerialNumber: false,
      //   StyleNumber: false,
      //   Brand: false,
      //   Collection: false,
      //   ItemType: false,
      // },
      // fieldsToInclude: jewelrySerialIncludeFields.reduce(
      //   (x, y) => ({ ...x, [y]: false }),
      //   {}
      // ),
      generalFields: jewelrySerialIncludeFields.GeneralData,
      dimensionFields: jewelrySerialIncludeFields.Dimensions,
      statusFields: jewelrySerialIncludeFields.Status,
      generalGroupFields: false,
      dimensionGroupFields: false,
      statusGroupFields: false,
      advancedGroupFields: false,
      showAdvancedFields: "none",
      itemData: JSON.parse(JSON.stringify(props.cartItems.items)),
      csvData: [],
    };
    this.onModalHide = this.onModalHide.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleGroupChecked = this.handleGroupChecked.bind(this);
    this.toggleAdvancedFields = this.toggleAdvancedFields.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cartItems.items !== nextProps.cartItems.items) {
      this.setState({
        itemData: JSON.parse(JSON.stringify(nextProps.cartItems.items)),
      });
    }
  }

  toggleAdvancedFields() {
    let { showAdvancedFields } = this.state;
    this.setState({
      showAdvancedFields: showAdvancedFields === "none" ? "flex" : "none",
    });
    // document.querySelector(".advanced").innerHTML =
    //   showAdvancedFields === "none" ? "+" : "-";
    let elements = document.querySelectorAll(".advanced_field_toggle");
    // console.log("elements :", elements);

    for (let element of elements) {
      // console.log("Element :", element);
      element.style.display = showAdvancedFields === "none" ? "flex" : "none";
    }
  }

  handleGroupChecked(groupFieldName, e) {
    let { generalFields, dimensionFields, statusFields } = this.state;
    // console.log("e :", e, "\ngroupFieldName :", groupFieldName);
    if (groupFieldName === "GeneralFields") {
      this.setState({ generalGroupFields: e.target.checked });

      for (let generalDataKey of Object.keys(generalFields)) {
        if (generalFields[generalDataKey]["advanced"] === false) {
          this.setState((prevState) => ({
            generalFields: {
              ...prevState.generalFields,
              [generalDataKey]: {
                ...prevState.generalFields[generalDataKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }
    } else if (groupFieldName === "DimensionFields") {
      this.setState({ dimensionGroupFields: e.target.checked });

      for (let dimensionFieldKey of Object.keys(dimensionFields)) {
        if (dimensionFields[dimensionFieldKey]["advanced"] === false) {
          this.setState((prevState) => ({
            dimensionFields: {
              ...prevState.dimensionFields,
              [dimensionFieldKey]: {
                ...prevState.dimensionFields[dimensionFieldKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }
    } else if (groupFieldName === "StatusFields") {
      this.setState({ statusGroupFields: e.target.checked });
      for (let statusFieldKey of Object.keys(statusFields)) {
        if (statusFields[statusFieldKey]["advanced"] === false) {
          this.setState((prevState) => ({
            statusFields: {
              ...prevState.statusFields,
              [statusFieldKey]: {
                ...prevState.statusFields[statusFieldKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }
    } else if (groupFieldName === "AdvancedFields") {
      this.setState({ advancedGroupFields: e.target.checked });

      for (let generalDataKey of Object.keys(generalFields)) {
        if (generalFields[generalDataKey]["advanced"] === true) {
          this.setState((prevState) => ({
            generalFields: {
              ...prevState.generalFields,
              [generalDataKey]: {
                ...prevState.generalFields[generalDataKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }

      for (let dimensionFieldKey of Object.keys(dimensionFields)) {
        if (dimensionFields[dimensionFieldKey]["advanced"] === true) {
          this.setState((prevState) => ({
            dimensionFields: {
              ...prevState.dimensionFields,
              [dimensionFieldKey]: {
                ...prevState.dimensionFields[dimensionFieldKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }

      for (let statusFieldKey of Object.keys(statusFields)) {
        if (statusFields[statusFieldKey]["advanced"] === true) {
          this.setState((prevState) => ({
            statusFields: {
              ...prevState.statusFields,
              [statusFieldKey]: {
                ...prevState.statusFields[statusFieldKey],
                checkbox: e.target.checked,
              },
            },
          }));
        }
      }
    }
  }

  handleExport(value) {
    let {
      basketInputObj,
      selectedItems,
      handleCsvData,
      handleCsvRenderData,
      showPreviewModal,
    } = this.props;
    // this.props.toggleLoader({
    //   isLoading: true,
    // });
    let { itemData, generalFields, statusFields, dimensionFields } = this.state;
    let data =
      selectedItems && selectedItems.length
        ? JSON.parse(JSON.stringify(selectedItems))
        : JSON.parse(JSON.stringify(itemData));
    let processedData;
    let flag = 0;
    // let includeAllFields = 0;
    // for (let key in fieldsToInclude) {
    //   // console.log(key, " :", fieldsToInclude[key]);
    //   if (fieldsToInclude[key] === true) {
    //     includeAllFields = 1;
    //     // console.log("includeAllFields: ", includeAllFields);
    //     break;
    //   }
    // }
    // if (includeAllFields === 0) {
    //   processedData = JSON.parse(JSON.stringify(itemData)).map((data) => {
    //     for (let dataKey of Object.keys(data)) {
    //       // console.log("dataKey", dataKey);

    //       for (let generalDataKey of Object.keys(generalFields)) {
    //         // console.log("generalDataKey", generalDataKey);

    //         if (dataKey === generalDataKey) {
    //           // console.log(
    //             "inside if dataKey === generalDataKey && generalFields[generalDataKey] === true "
    //           );
    //           // console.log("data: ", data);
    //           flag = 1;
    //           // if () {
    //           //   // console.log("inside if generalFields[generalDataKey] === true");
    //           //   // console.log("field key value", generalFields[generalDataKey]);

    //           // } else {
    //           //   // console.log("inside else generalFields[generalDataKey] === true");
    //           //   delete data[dataKey];
    //           //   // console.log("data: ", data);
    //         }
    //         // } else {
    //         //   // console.log("inside else dataKey === generalDataKey ");
    //         //   delete data[generalDataKey];
    //         //   // console.log("data: ", data);
    //         // }
    //       }
    //       if (flag === 0) {
    //         // console.log("inside if flag = 0");
    //         delete data[dataKey];
    //         // console.log("data: ", data);
    //       }
    //       flag = 0;
    //     }

    //     return data;
    //   });
    // } else {
    // let { cartItems } = this.props;
    // console.log("cartItems.items", this.props.cartItems.items);
    // let itemData = [...this.props.cartItems.items];
    // console.log("itemData: ", itemData);
    processedData = data.map((data) => {
      for (let dataKey of Object.keys(data)) {
        // console.log("dataKey", dataKey);

        for (let generalDataKey of Object.keys(generalFields)) {
          // console.log("generalDataKey", generalDataKey);

          if (dataKey === generalDataKey) {
            if (generalFields[generalDataKey]["checkbox"] === true) {
              // console.log(
              //   "inside if dataKey === generalDataKey && generalFields[generalDataKey][checkbox] === true "
              // );
              // console.log("data: ", data);
              flag = 1;
              // if () {
              //   // console.log("inside if generalFields[generalDataKey] === true");
              //   // console.log("field key value", generalFields[generalDataKey]);

              // } else {
              //   // console.log("inside else generalFields[generalDataKey] === true");
              //   delete data[dataKey];
              //   // console.log("data: ", data);
            }
            if (dataKey === "RetailPrice") {
              if (
                basketInputObj.includeRetail &&
                (data.priceVisibility === "Default" ||
                  data.priceVisibility === "Hide Wholesale Price") &&
                data.RetailPrice &&
                parseInt(data.RetailPrice) > 0
              ) {
                // console.log("Retail Price:", data.RetailPrice);
                flag = 1;
              }
            }
            if (dataKey === "WholesalePrice") {
              if (
                basketInputObj.includeWholesale &&
                (data.priceVisibility === "Default" ||
                  data.priceVisibility === "Hide Retail Price") &&
                data.WholesalePrice &&
                parseInt(data.WholesalePrice) > 0
              ) {
                // console.log("Wholesale:", data.WholesalePrice);
                flag = 1;
              }
            }
          }
          // } else {
          //   // console.log("inside else dataKey === generalDataKey ");
          //   delete data[generalDataKey];
          //   // console.log("data: ", data);
          // }
        }
        // if (flag === 0) {
        //   // console.log("inside if flag = 0");
        //   delete data[dataKey];
        //   // console.log("data: ", data);
        //   continue;
        // }
        // flag = 0;
        if (flag === 0) {
          for (let dimensionFieldKey of Object.keys(dimensionFields)) {
            // console.log("dimensionFieldKey", dimensionFieldKey);

            if (
              dataKey === dimensionFieldKey &&
              dimensionFields[dimensionFieldKey]["checkbox"] === true
            ) {
              //  console.log(
              //   "inside if dataKey === dimensionFieldKey && dimensionFields[dimensionFieldKey][checkbox] === true "
              // );
              // console.log("data: ", data);
              flag = 1;
              // if () {
              //   // console.log("inside if dimensionFields[dimensionFieldKey] === true");
              //   // console.log("field key value", dimensionFields[dimensionFieldKey]);

              // } else {
              //   // console.log("inside else dimensionFields[dimensionFieldKey] === true");
              //   delete data[dataKey];
              //   // console.log("data: ", data);
            }
            // } else {
            //   // console.log("inside else dataKey === dimensionFieldKey ");
            //   delete data[dimensionFieldKey];
            //   // console.log("data: ", data);
            // }
          }
          // if (flag === 0) {
          //   // console.log("inside if flag = 0");
          //   delete data[dataKey];
          //   // console.log("data: ", data);
          //   continue;
          // }
          // flag = 0;
          if (flag === 0) {
            for (let statusFieldKey of Object.keys(statusFields)) {
              // console.log("statusFieldKey", statusFieldKey);

              if (
                dataKey === statusFieldKey &&
                statusFields[statusFieldKey]["checkbox"] === true
              ) {
                //  console.log(
                //   "inside if dataKey === statusFieldKey && statusFields[statusFieldKey][checkbox] === true "
                // );
                // console.log("data: ", data);
                flag = 1;
                // if () {
                //   // console.log("inside if statusFields[statusFieldKey] === true");
                //   // console.log("field key value", statusFields[statusFieldKey]);

                // } else {
                //   // console.log("inside else statusFields[statusFieldKey] === true");
                //   delete data[dataKey];
                //   // console.log("data: ", data);
              }
              // } else {
              //   // console.log("inside else dataKey === statusFieldKey ");
              //   delete data[statusFieldKey];
              //   // console.log("data: ", data);
              // }
            }
            if (flag === 0) {
              // console.log("inside if flag = 0");
              delete data[dataKey];
              // console.log("data: ", data);
            }
            flag = 0;
          } else {
            flag = 0;
            continue;
          }
        } else {
          flag = 0;
          continue;
        }

        // if (flag === 0) {
        //   // console.log("inside if flag = 0");
        //   delete data[dataKey];
        //   // console.log("data: ", data);
        // }
        // flag = 0;
      }
      return data;
    });
    // }
    // console.log("processed data: ", processedData);
    // this.props.toggleLoader({
    //   isLoading: false,
    // });
    // this.setState({ csvData: processedData }, () => {
    //   console.log("value : ", value);
    //   if (value) {
    //     console.log(processedData);
    //     const csv = jsonToCSV(processedData);
    //     // const csv = Parser.parse(processedData);
    //     console.log("csv :", csv);
    //     handleCsvData(csv);
    //     showPreviewModal();
    //     return ;
    //   }
    //   this.csvLink.current.link.click();
    // });
    // console.log("csvData: ", this.state.csvData);
    if (value) {
      const csv = jsonToCSV(processedData);
      // const csv = Parser.parse(processedData);
      // console.log("csv :", csv);
      handleCsvData(csv);
      handleCsvRenderData(processedData);
      showPreviewModal();
    }
    return processedData;
  }

  onModalHide() {
    let { hide } = this.props;
    this.setState(() => {
      hide && hide();
    });
  }
  render() {
    let { show, basketInputObj } = this.props;
    let { isLoading } = this.props.loaderActions;
    let {
      generalFields,
      statusFields,
      dimensionFields,
      csvData,
      generalGroupFields,
      dimensionGroupFields,
      statusGroupFields,
      advancedGroupFields,
    } = this.state;
    // console.log("state: ", this.state);
    return (
      <Modal
        animation={false}
        autoFocus={false}
        enforceFocus={false}
        className="export-jewelry-modal"
        centered="true"
        size="sm"
        show={show}
        onHide={() => this.onModalHide()}
      >
        {/* <LoadingOverlay active={isLoading} spinner text="Loading..."> */}
        <Modal.Header closeButton>
          Select the fields to be included in the file:
        </Modal.Header>
        <Modal.Body>
          <div className="fields_checkbox_wrapper">
            <div className="field_toggle">
              <h4>
                General Fields:{" "}
                <input
                  type="checkbox"
                  checked={generalGroupFields}
                  onChange={(e) => {
                    e.persist();
                    this.handleGroupChecked("GeneralFields", e);
                  }}
                />
              </h4>
            </div>

            {Object.keys(generalFields).map((key, index) =>
              generalFields[key]["advanced"] === false &&
              key !== "RetailPrice" &&
              key !== "WholesalePrice" &&
              (("role" in generalFields[key] &&
                generalFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in generalFields[key])) ? (
                // key !== "RetailPrice" && key !== "WholesalePrice" ? (
                <div key={index} className="field_toggle">
                  <label>{generalFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={generalFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        generalFields: {
                          ...prevState.generalFields,
                          [key]: {
                            ...prevState.generalFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                // : key === "RetailPrice" ? (
                //     basketDetails.includeRetail &&
                //     (item.priceVisibility === "Default" ||
                //       item.priceVisibility === "Hide Wholesale Price") ? (
                //       <div key={index} className="field_toggle">
                //         <label>{generalFields[key]["label"]}: </label>
                //         <input
                //           type="checkbox"
                //           checked={generalFields[key]["checkbox"]}
                //           onChange={(e) => {
                //             e.persist();
                //             this.setState((prevState) => ({
                //               generalFields: {
                //                 ...prevState.generalFields,
                //                 [key]: {
                //                   ...prevState.generalFields[key],
                //                   checkbox: e.target.checked,
                //                 },
                //               },
                //             }));
                //           }}
                //         />
                //       </div>
                //     ) : (
                //       ``
                //     )
                //   ) : key === "WholesalePrice" ? (
                //     basketDetails.includeWholesale &&
                //     (item.priceVisibility === "Default" ||
                //       item.priceVisibility === "Hide Retail Price") ? (
                //       <div key={index} className="field_toggle">
                //         <label>{generalFields[key]["label"]}: </label>
                //         <input
                //           type="checkbox"
                //           checked={generalFields[key]["checkbox"]}
                //           onChange={(e) => {
                //             e.persist();
                //             this.setState((prevState) => ({
                //               generalFields: {
                //                 ...prevState.generalFields,
                //                 [key]: {
                //                   ...prevState.generalFields[key],
                //                   checkbox: e.target.checked,
                //                 },
                //               },
                //             }));
                //           }}
                //         />
                //       </div>
                //     ) : (
                //       ``
                //     )
                //   ) : (
                //     ``
                //   )
                // )
                ``
              )
            )}

            <div className="field_toggle">
              <h4>
                Dimension Fields:{" "}
                <input
                  type="checkbox"
                  checked={dimensionGroupFields}
                  onChange={(e) => {
                    e.persist();
                    this.handleGroupChecked("DimensionFields", e);
                  }}
                />
              </h4>
            </div>

            {Object.keys(dimensionFields).map((key, index) =>
              dimensionFields[key]["advanced"] === false &&
              (("role" in dimensionFields[key] &&
                dimensionFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in dimensionFields[key])) ? (
                <div key={index} className="field_toggle">
                  <label>{dimensionFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={dimensionFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        dimensionFields: {
                          ...prevState.dimensionFields,
                          [key]: {
                            ...prevState.dimensionFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                ``
              )
            )}

            <div className="field_toggle">
              <h4>
                Status Fields:{" "}
                <input
                  type="checkbox"
                  checked={statusGroupFields}
                  onChange={(e) => {
                    e.persist();
                    this.handleGroupChecked("StatusFields", e);
                  }}
                />
              </h4>
            </div>

            {Object.keys(statusFields).map((key, index) =>
              statusFields[key]["advanced"] === false &&
              (("role" in statusFields[key] &&
                statusFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in statusFields[key])) ? (
                <div key={index} className="field_toggle">
                  <label>{statusFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={statusFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        statusFields: {
                          ...prevState.statusFields,
                          [key]: {
                            ...prevState.statusFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                ``
              )
            )}

            <div className="field_toggle">
              <h4>
                Advanced Fields:{" "}
                <input
                  type="checkbox"
                  checked={advancedGroupFields}
                  onChange={(e) => {
                    e.persist();
                    this.handleGroupChecked("AdvancedFields", e);
                  }}
                />
              </h4>
              <span className="advanced" onClick={this.toggleAdvancedFields}>
                +
              </span>
            </div>
            {Object.keys(generalFields).map((key, index) =>
              generalFields[key]["advanced"] === true &&
              (("role" in generalFields[key] &&
                generalFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in generalFields[key])) ? (
                <div key={index} className="advanced_field_toggle">
                  <label>{generalFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={generalFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        generalFields: {
                          ...prevState.generalFields,
                          [key]: {
                            ...prevState.generalFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                ``
              )
            )}
            {Object.keys(dimensionFields).map((key, index) =>
              dimensionFields[key]["advanced"] === true &&
              (("role" in dimensionFields[key] &&
                dimensionFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in dimensionFields[key])) ? (
                <div key={index} className="advanced_field_toggle">
                  <label>{dimensionFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={dimensionFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        dimensionFields: {
                          ...prevState.dimensionFields,
                          [key]: {
                            ...prevState.dimensionFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                ``
              )
            )}
            {Object.keys(statusFields).map((key, index) =>
              statusFields[key]["advanced"] === true &&
              (("role" in statusFields[key] &&
                statusFields[key]["role"] ===
                  this.props.basketInputObj.access) ||
                !("role" in statusFields[key])) ? (
                <div key={index} className="advanced_field_toggle">
                  <label>{statusFields[key]["label"]}: </label>
                  <input
                    type="checkbox"
                    checked={statusFields[key]["checkbox"]}
                    onChange={(e) => {
                      e.persist();
                      this.setState((prevState) => ({
                        statusFields: {
                          ...prevState.statusFields,
                          [key]: {
                            ...prevState.statusFields[key],
                            checkbox: e.target.checked,
                          },
                        },
                      }));
                    }}
                  />
                </div>
              ) : (
                ``
              )
            )}
            <div className="field_toggle">
              <CSVDownloader
                className="csv-link"
                data={() => this.handleExport()}
                type="button"
                filename="Basket_Items"
                ref={this.csvLink}
                bom={true}
                config={{}}
              >
                Export
              </CSVDownloader>
              {/* <button onClick={() => this.handleExport(null)}>Export</button> */}
              <button onClick={() => this.handleExport("email")}>Email</button>
            </div>
          </div>
          {/* <CSVLink
            className="csv-link"
            data={csvData}
            target="_self"
            filename="Basket_Items.csv"
            ref={this.csvLink}
          /> */}
          {/* <CSVDownloader
            className="csv-link"
            data={() => this.handleExport()}
            type="button"
            filename="Basket_Items"
            ref={this.csvLink}
            bom={true}
            config={{}}
          >
            Download
          </CSVDownloader> */}
        </Modal.Body>
        {/* </LoadingOverlay> */}
      </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ExportJewelryModal);
