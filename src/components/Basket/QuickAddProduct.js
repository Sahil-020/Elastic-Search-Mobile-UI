import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isMobileOnly } from "react-device-detect";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import Downshift from "downshift";
import Appbase from "appbase-js";
import { addToCart } from "../actions/index";
import {
  AppbaseCredentials,
  AppbaseAppUrl,
  JewelrySerialApp,
  JewelryStyleApp,
  DiamondSerialApp,
  GemstoneSerialApp,
} from "../../utils/constants";

const mapStateToProps = (state) => {
  return {
    basketInputObj: state.basketInputChange,
  };
};

class QuickAddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchOption: "serial",
      searchText: "",
      searchSuggestions: [],
      searchField: ["SerialNumber"],
      itemSelected: "",
      productType: "J",
      app: JewelrySerialApp,
    };
    // this.handleSearchOption = this.handleSearchOption.bind(this);
    this.handleSelectedApp = this.handleSelectedApp.bind(this);
    // this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleQuickAdd = this.handleQuickAdd.bind(this);
    this.downshiftOnChange = this.downshiftOnChange.bind(this);
    this.onChangeDebounced = debounce(this.onChangeDebounced, 700);
    // this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  // async handleKeyPressed(e) {
  //   if (e.key === "Enter") {
  //     console.log("search text: ", this.state.searchText);
  //     // let val = this.state.searchText;
  //     // await this.handleSuggestions(val);
  //     this.handleQuickAdd();
  //   }
  // }

  handleSelectedApp(e) {
    let { searchOption } = this.state;
    let appSelected = e.target.value;
    // console.log("appSelected: ", appSelected);
    if (appSelected === "Jewelry Serial") {
      // console.log("Jewelry Serial");
      this.setState({
        app: JewelrySerialApp,
        searchOption: "serial",
        searchField: ["SerialNumber"],
        productType: "J",
      });
    }
    if (appSelected === "Jewelry Style") {
      // console.log("Jewelry Style");
      this.setState({
        app: JewelryStyleApp,
        searchOption: "style",
        searchField: ["StyleNumber"],
        productType: "J",
      });
    }
    if (appSelected === "Diamonds") {
      // console.log("Diamonds");
      this.setState({
        app: DiamondSerialApp,
        searchOption: "serial",
        searchField: ["SerialNumber"],
        productType: "D",
      });
    }
    if (appSelected === "Gemstones") {
      // console.log("Gemstones");
      this.setState({
        app: GemstoneSerialApp,
        searchOption: "serial",
        searchField: ["SerialNumber"],
        productType: "G",
      });
    }
  }

  // handleSearchOption(e) {
  //   // console.log("searchOption: ", e.target.value);
  //   // this.setState({
  //   //   searchOption: e.target.value,
  //   // });
  //   console.log("Key Pressed: ", e.key);
  //   console.log();
  // }

  // handleSearchInput(e) {
  //   this.setState({
  //     searchText: e.target.value,
  //   });
  // }
  async fetchProducts({ app, query, searchField }) {
    var serialQuery = [
      {},
      {
        query: {
          bool: {
            must: [
              {
                ...(query.length < 15 && {
                  term: {
                    "SerialNumber.keyword": query,
                  },
                }),
                ...(query.length >= 15 && {
                  multi_match: {
                    query: query,
                    fields: ["RFIDValue"],
                  },
                }),
              },
              {
                match: {
                  ItemStatus: "Active",
                  // searchField: query,
                },
              },
            ],
          },
        },
      },
      // {},
      // {
      //   query: {
      //     bool: {
      //       must: [
      //         {
      //           bool: {
      //             should: [
      //               {
      //                 multi_match: {
      //                   query: query,
      //                   fields: searchField,
      //                   type: "phrase_prefix",
      //                   operator: "and",
      //                 },
      //               },
      //             ],
      //             minimum_should_match: "1",
      //           },
      //         },
      //         {
      //           match: {
      //             ItemStatus: "Active",
      //           },
      //         },
      //       ],
      //     },
      //   },
      //   size: 15,
      // },
    ];

    var styleQuery = [
      {},
      {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      multi_match: {
                        query: query,
                        fields: searchField,
                        type: "phrase_prefix",
                        operator: "and",
                      },
                    },
                  ],
                  minimum_should_match: "1",
                },
              },
              // {
              //   match: {
              //     ItemStatus: "Active",
              //   },
              // },
            ],
          },
        },
        size: 15,
      },
    ];

    var appbase = Appbase({
      url: AppbaseAppUrl,
      app: app,
      credentials: AppbaseCredentials,
    });
    return await appbase
      .msearch({
        body:
          JSON.stringify(searchField) === JSON.stringify(["SerialNumber"])
            ? serialQuery
            : styleQuery,
      })
      .then((response) => {
        return response.responses[0].hits.hits;
      })
      .catch(() => console.log("error while appbase fetch"));
  }
  async handleSuggestions(val) {
    let { searchOption, app, searchField } = this.state;
    // console.log("app: ", app);
    // var appFlag, searchField;
    // , app;
    if (val === "") {
      return;
    }
    // if (val.startsWith("D")) {
    //   appFlag = "D";
    //   searchField = ["SerialNumber"];
    //   app = DiamondSerialApp;
    //   this.setState({
    //     productType: "D",
    //   });
    // } else if (val.startsWith("G")) {
    //   appFlag = "G";
    //   searchField = ["SerialNumber"];
    //   app = GemstoneSerialApp;
    //   this.setState({
    //     productType: "G",
    //   });
    // } else {
    //   appFlag = "J";
    //   if (searchOption === "serial") {
    //     searchField = ["SerialNumber"];
    //     app = JewelrySerialApp;
    //   } else {
    //     searchField = ["StyleNumber"];
    //     app = JewelryStyleApp;
    //   }
    //   this.setState({
    //     productType: "J",
    //   });
    // }

    // if (app === DiamondSerialApp) {
    //   appFlag = "D";
    //   searchField = ["SerialNumber"];
    //   // app = DiamondSerialApp;
    //   this.setState({
    //     productType: "D",
    //   });
    // } else if (app === GemstoneSerialApp) {
    //   appFlag = "G";
    //   searchField = ["SerialNumber"];
    //   // app = GemstoneSerialApp;
    //   this.setState({
    //     productType: "G",
    //   });
    // } else {
    //   appFlag = "J";
    //   if (app === JewelrySerialApp) {
    //     searchField = ["SerialNumber"];
    //     // this.setState({ app: JewelrySerialApp });
    //     // app = JewelrySerialApp;
    //   } else {
    //     // console.log("Inside else of jewelry style")
    //     searchField = ["StyleNumber"];
    //     // this.setState({ app: JewelryStyleApp });
    //     // app = JewelryStyleApp;
    //   }
    //   this.setState({
    //     productType: "J",
    //   });
    // }

    // var end = new Date().getTime();
    // console.log("End time: ",end)
    var res = await this.fetchProducts({
      app,
      searchField,
      query: val,
    });
    // console.log("res :", res);
    if (res && res.length !== 0) {
      this.setState({
        searchSuggestions: res,
      });
      if (res.length === 1) {
        // toast.success("Product found.", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 2000,
        //   pauseOnHover: false,
        // });
        this.setState({
          itemSelected: res[0],
        });
        return res[0];
      }
      // } else {
      //   if (appFlag === "D") {
      //     let res = await this.fetchProducts({
      //       app: GemstoneSerialApp,
      //       searchField: ["SerialNumber"],
      //       query: val,
      //     });
      //     if (res && res.length) {
      //       this.setState({
      //         searchSuggestions: res,
      //         productType: "G",
      //       });
      //       if (res.length === 1) {
      //         this.setState({
      //           itemSelected: res[0],
      //         });
      //       }
      //     } else {
      //       var errorMsg = "Appbase fetching products error !";
      //       if (!res.length) {
      //         errorMsg = "No products found !";
      //       }
      //       toast.error(errorMsg, {
      //         position: toast.POSITION.TOP_RIGHT,
      //         autoClose: 2000,
      //         pauseOnHover: false,
      //       });
      //     }
    } else {
      let errorMsg = "Appbase fetching products error !";
      if (!res.length) {
        errorMsg = "No products found !";
      }
      toast.error(errorMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
      });
    }
    // }
  }
  async handleQuickAdd() {
    let { itemSelected, productType, searchOption, searchText } = this.state;
    if (searchOption === "serial") {
      let item = await this.handleSuggestions(searchText);
      if (item) {
        this.props.addToCart({
          product: item["_source"],
          productType,
          assetOrmemo: this.props.basketInputObj.assetOrmemo,
        });
        this.setState({
          searchText: "",
          itemSelected: "",
        });
      } else console.log("No item");

      return;
    }

    if (itemSelected) {
      this.props.addToCart({
        product: itemSelected["_source"],
        productType,
        assetOrmemo: this.props.basketInputObj.assetOrmemo,
      });
      this.setState({
        searchText: "",
        itemSelected: "",
      });
    } else {
      alert("Select item...");
    }
  }
  async inputOnChange(event) {
    // console.log("Key Pressed: ", event.key);
    // var start = new Date().getTime();
    // console.log("start time: ",start)
    this.setState({
      searchText: event.target.value,
    });
    if (this.state.searchOption === "style") {
      this.onChangeDebounced(event.target.value);
    }
    // else {
    //   let val = event.target.value;
    //   await this.handleSuggestions(val);
    // }
  }
  async onChangeDebounced(val) {
    this.setState({
      searchText: val,
    });
    return await this.handleSuggestions(val);
  }
  downshiftOnChange(selected) {
    if (selected) {
      this.state.searchOption === "serial"
        ? this.setState({
            searchText: selected._source.SerialNumber,
          })
        : this.setState({
            searchText: selected._source.StyleNumber,
          });
      this.setState({
        itemSelected: selected,
      });
    }
  }

  render() {
    let { searchText, searchSuggestions, searchOption } = this.state;
    return (
      <div className="quick__add__form">
        {/* <select name="add" id="quick-add" onChange={this.handleSearchOption}>
          <option value="serial">Serial</option>
          <option value="style">Style</option>
        </select> */}
        <select name="add" id="quick-add" onChange={this.handleSelectedApp}>
          <option value="Jewelry Serial">Jewelry Serial </option>
          <option value="Jewelry Style">Jewelry Style </option>
          <option value="Diamonds">Diamonds</option>
          <option value="Gemstones">Gemstones</option>
        </select>
        <div className="input__button__wrapper">
          <Downshift
            onChange={this.downshiftOnChange}
            itemToString={(item) => (item ? item : "")}
            inputValue={searchText ? searchText : ""}
          >
            {({
              selectedItem,
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              clearSelection,
              setState,
            }) => {
              return (
                <div className="basket__input quickadd__input form-group has-feedback">
                  <div className="input__dropdown__container">
                    <div className="input__container">
                      <input
                        type="text"
                        className="form-control"
                        id="quickadd"
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            this.handleQuickAdd();
                          }
                        }}
                        required
                        {...getInputProps({
                          placeholder: "",
                          onChange: (e) => {
                            this.inputOnChange(e);
                            // console.log("suggestion ", selectedItem);
                            if (e.target.value === "") {
                              clearSelection();
                              this.setState({
                                searchText: "",
                              });
                            }
                          },
                        })}
                      />
                    </div>
                    {isOpen ? (
                      <ul className="downshift-dropdown">
                        {searchSuggestions.length && searchOption === "style"
                          ? searchSuggestions
                              .filter(
                                (item) =>
                                  !inputValue ||
                                  (searchOption === "style"
                                    ? // item._source.SerialNumber &&
                                      //   item._source.SerialNumber.toLowerCase().includes(
                                      //     inputValue.toLowerCase()
                                      //   )
                                      // :
                                      item._source.StyleNumber &&
                                      item._source.StyleNumber.toLowerCase().includes(
                                        inputValue.toLowerCase()
                                      )
                                    : ``)
                              )
                              .map((item, index) => {
                                return (
                                  <li
                                    className="dropdown-item"
                                    {...getItemProps({
                                      key: index,
                                      index,
                                      item,
                                    })}
                                  >
                                    {searchOption === "serial"
                                      ? item._source.SerialNumber
                                      : item._source.StyleNumber}
                                  </li>
                                );
                              })
                          : ``}
                      </ul>
                    ) : null}
                  </div>
                </div>
              );
            }}
          </Downshift>
          <button className="quick__add--btn" onClick={this.handleQuickAdd}>
            {!isMobileOnly && "Quick Add"}
            {isMobileOnly && "Add"}
          </button>
          {/* <button
            className="quick__add_bulk_btn"
            onClick={this.props.showQuickAddBulkProductModal}
          >
          
            {!isMobileOnly && "Import Bulk"}
            {isMobileOnly && "Bulk"}
          </button> */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addToCart,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickAddProduct);
