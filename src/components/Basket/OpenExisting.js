import React, { Component } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import {
  resetStates,
  setBasketFormInput,
  openCartItems,
  toggleLoader,
  setToken,
} from "../actions/index";
import {
  fetchBasket,
  getUniqueItemWithQty,
  getItemFromAppBase,
} from "./ReadAndOpenBasket";
import {
  AppbaseBasketApp,
  appbaseBasketUrl,
  basketApikey,
} from "../../utils/constants";
import GetAuthToken from "../Api/Authenticate";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
  };
};

class OpenExisting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allBasketSelected: "",
      myBasketSelected: "",
      allMyBasketSelected: "",
    };
    this.handleAllBasketChange = this.handleAllBasketChange.bind(this);
    this.handleMyBasketChange = this.handleMyBasketChange.bind(this);
    this.handleAllMyBasketChange = this.handleAllMyBasketChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleAllBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        allBasketSelected: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        allBasketSelected: selectedOption,
      });
    }
  }

  handleMyBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        myBasketSelected: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        myBasketSelected: selectedOption,
      });
    }
  }

  handleAllMyBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        allMyBasketSelected: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        allMyBasketSelected: selectedOption,
      });
    }
  }

  async handleOpen() {
    let { allBasketSelected, myBasketSelected, allMyBasketSelected } =
      this.state;
    var basketSelected;
    if (
      (myBasketSelected && allBasketSelected) ||
      (myBasketSelected && allMyBasketSelected) ||
      (allBasketSelected && allMyBasketSelected) ||
      (myBasketSelected && allMyBasketSelected && allBasketSelected)
    ) {
      alert("Please select single basket.");
      return;
    } else {
      basketSelected = myBasketSelected
        ? myBasketSelected.value
        : allBasketSelected
        ? allBasketSelected.value
        : allMyBasketSelected
        ? allMyBasketSelected.value
        : null;
    }
    if (!basketSelected) {
      alert("Please select basket.");
      return;
    } else {
      // Accordian styling
      if (document.querySelector("#basket__collapse__open")) {
        var collapseNode = document.querySelector("#basket__collapse__open");
        collapseNode.className = "collapse";
        var nodeAttr = collapseNode.getAttribute("aria-expanded");
        var btnNode = document.querySelector(".basket__open");
        var accordianNode = document.querySelector(".basket__action__group");
        if (nodeAttr === "true") {
          accordianNode.style.border = "1px solid transparent";
          btnNode.className = "basket__open collapsed";
        } else {
          accordianNode.style.border = "1px solid #000";
        }
      } else {
        if (document.querySelector(".basket__more__actions")) {
          document.querySelector(".basket__more__actions").click();
        }
      }
      this.props.resetStates();
      // Read Basket api

      this.props.toggleLoader({
        isLoading: true,
      });
      // let token = this.props.tokenState.token;
      var data;
      // var rawData = await fetchBasket({ basketSelected, token: token });
      var payload = {
        data: {
          defaults: {
            // baseURL: basketBaseUrl,
            // token: token,
            index: AppbaseBasketApp,
          },
          inputs: {
            id: basketSelected,
          },
        },
      };
      var rawData = await axios
        // .post(ApiBaseUrl + "order", payload, {
        //   headers: {
        //     "x-api-key": ApiKey,
        //   },
        // })

        .post(appbaseBasketUrl + "getbasket", payload, {
          headers: {
            "x-api-key": basketApikey,
          },
        })
        .catch((error) => {
          this.props.toggleLoader({
            isLoading: false,
          });
          console.log("error : ", error);
          return error;
        });
      // console.log("rawdata: ", rawData);
      if (!rawData || rawData.statusCode === 500) {
        // console.log("Error in fetching basket details");
        // console.log("data : ", rawData);
        console.log("Error in fetching basket details");
        this.props.toggleLoader({
          isLoading: false,
        });
        return;
      }
      // if (rawData.errorCode === 401) {
      //   let token = await GetAuthToken();
      //   if (token) {
      //     this.props.setToken(token.access_token);
      //     rawData = await fetchBasket({
      //       basketSelected,
      //       token: token.access_token,
      //     });
      //   }
      // }
      if (rawData && rawData.data.statusCode === 200) {
        data = rawData.data.data._source;
        // this.props.toggleLoader({
        //   isLoading: false,
        // });
        console.log("basket details fetched successfully");
        // console.log("data : ", rawData);
      }
      // console.log("data : ", data);
      var desc = data.Description.value;
      var includeRetail = data.IncludeRetailPrice.value;
      var includeWholesale = data.IncludeWholesalePrice.value;
      var internalNotes = data.InternalNotes.value;
      var occasion = data.Occasion.value;
      var basketUserDetails = data.UILoggedInUser
        ? data.UILoggedInUser.value
        : "";
      var makePrivate = data.MakePrivate ? data.MakePrivate.value : false;
      var status = data.Status ? data.Status : "Active";
      var edit = data.Edit ? data.Edit.value : false;
      var assetOrmemo =
        data.AssetOrMemo &&
        data.AssetOrMemo.value &&
        data.AssetOrMemo.value !== true &&
        data.value !== false
          ? data.AssetOrMemo.value
          : "";
      var basketItems = JSON.parse(data.OrdersList.value.replace(/'/g, '"'));
      // console.log("basketItem : ", basketItems);
      this.props.setBasketFormInput({
        contact: {
          ContactId: data.Contact.value,
          DisplayName: data.ContactName.value,
          // ContactEmail: data.ContactEmail.value,
        },
        customer: {
          CustomerId: data.Customer.value,
          Customer: data.CustomerName.value,
          CustomerClass: data.CustomerClass.value,
        },
        desc: desc,
        internalNotes: internalNotes,
        occasion: occasion,
        includeRetail: includeRetail,
        includeWholesale: includeWholesale,
        basketUserDetails: basketUserDetails,
        makePrivate: makePrivate,
        status: status,
        edit: edit,
        assetOrmemo: assetOrmemo,
      });

      // Appbase call
      let uniqueArrayFromBasket = getUniqueItemWithQty(basketItems);
      // console.log("uniqueArrayFromBasket : ", uniqueArrayFromBasket);
      var fromAppbaseCall = [];
      for (var i = 0; i < uniqueArrayFromBasket.length; i++) {
        // console.log("uniqueArrayFromBasket[i]: ", uniqueArrayFromBasket[i]);
        var res = await getItemFromAppBase({
          item: uniqueArrayFromBasket[i],
          searchOption: "mixed",
        });
        // console.log("res : ", res);
        if (!res.length) {
          continue;
        } else if (res.length && typeof res[0]["_source"] !== "object") {
          toast.error("Appbase fetching products error !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
          continue;
        }
        let { RetailPrice, WholesalePrice, ...omitted } = res[0]["_source"];
        fromAppbaseCall.push({
          ...omitted,
          RetailPrice: uniqueArrayFromBasket[i].RetailPrice,
          WholesalePrice: uniqueArrayFromBasket[i].WholesalePrice,
          quantity: uniqueArrayFromBasket[i].Quantity,
          InternalNote: uniqueArrayFromBasket[i].InternalNote,
          priceVisibility: uniqueArrayFromBasket[i].PriceVisibility,
          productType: uniqueArrayFromBasket[i].ProductType,
          linkVisibility: uniqueArrayFromBasket[i].LinkVisibility
            ? uniqueArrayFromBasket[i].LinkVisibility
            : "Default",
          itemSelected: uniqueArrayFromBasket[i].ItemSelected
            ? uniqueArrayFromBasket[i].ItemSelected
            : true,
          LineNbr: uniqueArrayFromBasket[i].LineNbr,
          assetOrmemo:
            uniqueArrayFromBasket[i].AssetOrMemo &&
            uniqueArrayFromBasket[i].AssetOrMemo !== true &&
            uniqueArrayFromBasket[i].AssetOrMemo !== false
              ? uniqueArrayFromBasket[i].AssetOrMemo
              : "",
        });
      }
      // console.log("Items before ", uniqueArrayFromBasket);
      // sort by LineNbr
      fromAppbaseCall.sort(function (a, b) {
        return b.LineNbr - a.LineNbr;
      });
      // console.log("items for basket ", fromAppbaseCall);
      this.props.setBasketFormInput({ orderNbr: basketSelected });
      this.props.openCartItems(fromAppbaseCall);
      this.props.toggleLoader({
        isLoading: false,
      });
    }
  }

  render() {
    let { allBaskets, myBaskets, allMyBaskets } = this.props;
    // console.log("allBaskets: ", allBaskets);
    return (
      <div className="basket__open__grouped">
        {/* <div className="my__basket__container">
          <label>My Active Baskets:</label>
          <div className="open__input">
            <Select
              className="Select"
              value={this.state.myBasketSelected}
              onChange={this.handleMyBasketChange}
              options={[
                {
                  value: "default",
                  label:
                    myBaskets.length === 0 ? "Loading..." : "Select Basket",
                },
                ...myBaskets.map((basket) => {
                  // console.log("basket: ", basket);
                  return {
                    value: basket._id,
                    label: ` ${basket._id && `#${basket._id}`}${
                      basket._source.ContactName.value
                        ? ` - ${basket._source.ContactName.value}`
                        : basket._source.CustomerName.value
                        ? ` - ${basket._source.CustomerName.value}`
                        : ``
                    }${
                      basket._source.Description.value &&
                      ` - ${basket._source.Description.value}`
                    }`,
                  };
                }),
              ]}
              placeholder="Select basket"
            />
          </div>
        </div> */}

        {/* <div className="my__basket__container">
          <label>All My Baskets:</label>
          <div className="open__input">
            <Select
              className="Select"
              value={this.state.allMyBasketSelected}
              onChange={this.handleAllMyBasketChange}
              options={[
                {
                  value: "default",
                  label:
                    allMyBaskets.length === 0 ? "Loading..." : "Select Basket",
                },
                ...allMyBaskets.map((basket) => {
                  // console.log("basket: ", basket);
                  return {
                    value: basket._id,
                    label: ` ${basket._id && `#${basket._id}`}${
                      basket._source.ContactName.value
                        ? ` - ${basket._source.ContactName.value}`
                        : basket._source.CustomerName.value
                        ? ` - ${basket._source.CustomerName.value}`
                        : ``
                    }${
                      basket._source.Description.value &&
                      ` - ${basket._source.Description.value}`
                    }`,
                  };
                }),
              ]}
              placeholder="Select basket"
            />
          </div>
        </div> */}

        <div className="all__basket__container">
          <label>All Baskets:</label>
          <div className="open__input">
            <Select
              className="Select"
              value={this.state.allBasketSelected}
              onChange={this.handleAllBasketChange}
              options={[
                {
                  value: "default",
                  label:
                    allBaskets.length === 0 ? "Loading..." : "Select Basket",
                },
                ...allBaskets.map((basket) => {
                  // console.log("basket: ", basket);
                  return {
                    value: basket._id,
                    label: `${basket._id && `#${basket._id}`}${
                      basket._source.UILoggedInUser
                        ? basket._source.UILoggedInUser.value !== null
                          ? ` - ${basket._source.UILoggedInUser.value}`
                          : ``
                        : ``
                    }${
                      basket._source.ContactName.value
                        ? ` - ${basket._source.ContactName.value}`
                        : basket._source.CustomerName.value
                        ? ` - ${basket._source.CustomerName.value}`
                        : ``
                    }${
                      basket._source.Description.value &&
                      ` - ${basket._source.Description.value}`
                    }`,
                  };
                }),
              ]}
              placeholder="Select basket"
            />
            <button onClick={this.handleOpen}>Open</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      resetStates,
      setBasketFormInput,
      openCartItems,
      toggleLoader,
      setToken,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OpenExisting);
