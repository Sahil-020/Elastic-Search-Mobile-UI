import React, { Component } from "react";
import currencyFormatter from "currency-formatter";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { toast } from "react-toastify";
import Results from "../Results/Results";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  removeFromCart,
  setToken,
  setBasketFormInput,
  toggleLoader,
} from "./../actions/index";
import HandleView from "../OtherComponents/HandleView";
import GetAuthToken from "../Api/Authenticate";
import {
  AppbaseBasketApp,
  appbaseBasketUrl,
  basketApikey,
} from "../../utils/constants";
import axios from "axios";
import $ from "jquery";
import isEmpty from "lodash/isEmpty";
import BasketForm from "./BasketForm";
import Back from "../../assets/icons/BAck.png";
import Email from "../../assets/icons/Email.png";
import Print from "../../assets/icons/Print.png";
import Save from "../../assets/icons/Save.png";
import Clear from "../../assets/icons/Clear.png";
import Reset from "../../assets/icons/Clear.png";

const mapStateToProps = (state) => {
  return {
    items: state.cartActions.items,
    basketForm: state.basketInputChange,
  };
};

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.basketItems,
      basketDetails: {
        basketNo: "New",
        description: "",
        internalNotes: "",
        customer: "",
        contact: "",
        occassion: "",
        showBasketForm: false,
      },
      allBaskets: [],
      basketToOpen: "",
      allBasketDetails: [],
    };
    this.handleView = this.handleView.bind(this);
    this.handleShowBasketForm = this.handleShowBasketForm.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  async componentDidMount() {
    let token;
    // if (this.props.tokenState.token === "") {
    token = await GetAuthToken();
    // console.log("token :", token);
    // if (token) {
    this.props.setToken(token.access_token);
    // }
    // } else token = this.props.tokenState.token;
  }

  handleOpenBasketForm() {
    if (this.props.items.length !== 0) {
      this.handleShowBasketForm(true);
    } else {
      toast.error("Basket is empty !", {
        // position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  }

  handleShowBasketForm(value) {
    this.setState({ showBasketForm: value });
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
      document.getElementById("ES_Results_Baskets").className =
        "Grid_result_container";
    } else if (value === "Grid2") {
      document.getElementById("ES_Results_Baskets").className =
        "Grid2_result_container";
    } else if (value === "Grid3") {
      document.getElementById("ES_Results_Baskets").className =
        "Grid3_result_container";
    } else if (value === "List") {
      document.getElementById("ES_Results_Baskets").className =
        "List_result_container";
    }
  }

  async handleSave(type) {
    // let user;

    // // console.log("items : ", this.state.items);
    // if (window.parent.document.getElementById("btnUserMenu")) {
    //   user = window.parent.document
    //     .getElementById("btnUserMenu")
    //     .querySelector(".user-name").textContent;
    // } else {
    //   user = null;
    //   // user = "Sayyed, Sahil";
    // }

    if (this.props.basketForm.orderNbr === "New") {
      // this.props.setBasketFormInput({
      //   basketUserDetails: this.state.userLoggedIn,
      // });
    }
    var currentdate = new Date();
    var dateTime =
      currentdate.getFullYear() +
      "" +
      (currentdate.getMonth() + 1) +
      "" +
      currentdate.getDate() +
      "" +
      currentdate.getHours() +
      "" +
      currentdate.getMinutes() +
      "" +
      currentdate.getSeconds();
    //  console.log("dateTime: ", dateTime);
    // let initialID = "B-100";
    let initialID = 1000;
    let basketID;
    let { basketForm, items } = this.props;
    this.props.toggleLoader({
      isLoading: true,
    });
    if (basketForm.orderNbr === "New") {
      var payload = {
        data: {
          defaults: {
            index: AppbaseBasketApp,
          },
        },
      };
      let id_Results = await axios
        .post(appbaseBasketUrl + "get-all-basket", payload, {
          headers: {
            "x-api-key": basketApikey,
          },
        })
        .then((response) => {
          console.log("Basket Found Successfully");
          // console.log("response : ", response.data.data);
          return response.data.data.sort(
            (a, b) => parseInt(a._id) - parseInt(b._id)
          );
        })
        .catch((error) => {
          console.log("error : ", error);
          return error;
        });

      // lastID = typeof lastID;
      //console.log("idResults: ", id_Results);
      //
      if (id_Results.length !== 0) {
        let lastID = parseInt(id_Results[id_Results.length - 1]._id);
        // console.log("lastID: ", lastID);
        basketID = lastID + 1;
      } else {
        // let firstPart = initialID.slice(0, 2);
        // let lastPart = parseInt(initialID.slice(2)) + 1;
        // let newID = firstPart + lastPart;
        // basketID = newID;
        basketID = initialID + 1;
      }
      // console.log("basketID: ", basketID);
    }

    // let { basketInputs, items } = this.state;
    // console.log(
    //   " state basketInputs: ",
    //   basketInputs,
    //   "\n state items: ",
    //   items
    // );
    // console.log("this.props.basketForm :", this.props.basketForm);
    // let { basketForm } = this.props;
    var contactInput = basketForm.contact.ContactId;
    var customerInput = basketForm.customer.CustomerId;

    // let user;

    // // console.log("items : ", this.state.items);
    // if (window.parent.document.getElementById("btnUserMenu")) {
    //   user = window.parent.document
    //     .getElementById("btnUserMenu")
    //     .querySelector(".user-name").textContent;
    // } else {
    //   user = null;
    // }
    var updatedItemsArray;
    // console.log("basketInputs ", basketForm);

    // if (!contactInput && !customerInput) {
    //   this.props.toggleLoader({
    //     isLoading: false,
    //   });
    //   alert("Please enter customer or contact");
    //   return;
    // }

    if (!basketForm.desc) {
      this.props.toggleLoader({
        isLoading: false,
      });
      alert("Please enter description");
      return;
    }

    var contactName = basketForm.contact.DisplayName;
    // var contactEmail = basketForm.contact.ContactEmail;
    var customerName = basketForm.customer.Customer;
    var customerClass = basketForm.customer.CustomerClass;

    // this.props.toggleLoader({
    //   isLoading: true,
    // });
    // if (basketForm.orderNbr !== "New") {
    //   updatedItemsArray = items.slice().reverse();
    // } else {
    // updatedItemsArray = items;
    // }
    updatedItemsArray = items;
    updatedItemsArray = updatedItemsArray.map((el) => {
      var productArr = {
        SerialNumber: el.SerialNumber,
        StyleNumber: el.StyleNumber,
        InternalNote: el.InternalNote,
        RetailPrice: el.RetailPrice,
        WholesalePrice: el.WholesalePrice,
        Quantity: el.quantity,
        PriceVisibility: el.priceVisibility,
        LinkVisibility: el.linkVisibility,
        ItemSelected: el.itemSelected,
        ProductType: el.productType,
        AssetOrMemo: el.assetOrmemo,
      };
      return productArr;
    });
    // console.log("items to save ", updatedItemsArray);
    var products = JSON.stringify(updatedItemsArray).replace(/"/g, "'");

    // console.log("basketForm :", basketForm);
    var productObject = {
      BasketType: { value: basketForm.basketType },
      Contact: { value: contactInput === undefined ? null : contactInput },
      ContactName: { value: contactName === undefined ? null : contactName },
      // ContactEmail: { value: contactEmail === undefined ? null : contactEmail },
      Customer: { value: customerInput === undefined ? null : customerInput },
      CustomerName: {
        value: customerName === undefined ? null : customerName,
      },
      CustomerClass: {
        value: customerClass === undefined ? null : customerClass,
      },
      Description: {
        value: basketForm.desc === "" ? null : basketForm.desc,
      },
      IncludeRetailPrice: { value: basketForm.includeRetail },
      IncludeWholesalePrice: { value: basketForm.includeWholesale },
      InternalNotes: {
        value:
          basketForm.internalNotes === "" ? null : basketForm.internalNotes,
      },
      Occasion: {
        value: basketForm.occasion === "default" ? null : basketForm.occasion,
      },
      // OrderNbr: { value: basketForm.orderNbr },
      OrdersList: {
        value: products,
      },
      ActionType: {
        value: basketForm.orderNbr === "New" ? null : "Save",
      },

      ...(basketForm.orderNbr === "New" && {
        UILoggedInUser: { value: this.state.userLoggedIn },
      }),
      ...(basketForm.orderNbr === "New" && {
        CreatedAt: parseInt(dateTime),
      }),
      ...(basketForm.orderNbr !== "New" && {
        UpdatedAt: parseInt(dateTime),
      }),
      MakePrivate: { value: basketForm.makePrivate },
      Edit: { value: basketForm.edit },
      AssetOrMemo: {
        value: basketForm.assetOrmemo === "" ? null : basketForm.assetOrmemo,
      },
      // CreatedDate:
      //   basketForm.orderNbr === "New" ? parseInt(dateTime) : undefined,
      // UpdatedDate:
      //   basketForm.orderNbr !== "New" ? parseInt(dateTime) : undefined,
      // ...(type === "Delete" && { Status: "Deleted" }),
      Status: ["Deleted", "Archived", "Active"].includes(type)
        ? type
        : "Active",
    };
    // let token = this.props.tokenState.token;
    var payload = {
      data: {
        defaults: {
          // baseURL: basketBaseUrl,
          // token: token,
          index: AppbaseBasketApp,
        },
        id: basketForm.orderNbr !== "New" ? basketForm.orderNbr : basketID,
        type: ["Deleted", "Archived", "Active", "Update"].includes(type)
          ? // type === "Delete" ||
            // type === "Archived" ||
            // type === "Active" ||
            // type === "Update"
            "Update"
          : "New",
        inputs: productObject,
      },
    };
    // console.log("payload : ", payload);
    var resp = await axios
      // .post(ApiBaseUrl + "order", payload, {
      //   headers: {
      //     "x-api-key": ApiKey,
      //   },
      // })

      .post(appbaseBasketUrl + "basket", payload, {
        headers: {
          "x-api-key": basketApikey,
        },
      })
      .catch((error) => {
        toast.error("Error while saving basket !", {
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        });
        this.props.toggleLoader({
          isLoading: false,
        });
      });
    if (resp && resp.data.statusCode === 200) {
      // console.log("In if loop, resp: ", resp);
      this.props.setBasketFormInput({
        orderNbr: resp.data.data._id,
      });
      toast.success(
        `${
          ["Deleted", "Archived", "Active", "Update"].includes(type)
            ? // type === "Delete" || type === "Archived" || type === "Active"
              `Basket ${type} !`
            : "Basket saved !"
        }`,
        {
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        }
      );
      this.props.toggleLoader({
        isLoading: false,
      });
      return;
    }
    // else if (resp && JSON.parse(resp.data.body).errorCode === 401) {

    //   let token = await GetAuthToken();
    //   if (token) {
    //     this.props.setToken(token.access_token);
    //     await this.handleSave();
    //   } else {
    //     this.props.toggleLoader({
    //       isLoading: false,
    //     });
    //     return [];
    //   }
    // }
    else {
      // console.log("In else loop resp : ", resp);
      toast.error("Error while saving basket !", {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
      });
      this.props.toggleLoader({
        isLoading: false,
      });
    }
  }

  render() {
    let { items, isValueEmpty, isMultipleValueEmpty, basketForm } = this.props;
    // let { allBaskets, items } = this.state;
    return (
      <>
        <div className="basket_container" id="basket">
          <div className="basket_no_container">
            <label>{basketForm.orderNbr}</label>
            <button>
              <img src={Clear} />
              Clear list
            </button>
          </div>
          <HandleView handleView={this.handleView} items={items} />
          <div className="es_basket_results">
            <div
              id="ES_Results_Baskets"
              className="List_result_container"
              // className="compact_result_container"
            >
              <Results
                items={items}
                isValueEmpty={isValueEmpty}
                isMultipleValueEmpty={isMultipleValueEmpty}
              />
            </div>
          </div>
          <div className="basket_primary_action_container">
            <button>
              <img src={Print}></img>
            </button>
            <button>
              <img src={Email}></img>
            </button>
            <button onClick={() => this.handleOpenBasketForm(true)}>
              <img src={Save}></img> Save
            </button>
          </div>
        </div>
        <BasketForm
          handleShowBasketForm={this.handleShowBasketForm}
          handleSave={this.handleSave}
          show={this.state.showBasketForm}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { removeFromCart, setToken, setBasketFormInput, toggleLoader },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
