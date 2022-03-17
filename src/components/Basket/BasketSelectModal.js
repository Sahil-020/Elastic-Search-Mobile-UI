import React, { Component } from "react";
import { Modal } from "react-bootstrap";
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

class BasketSelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBasketSelectedValue: "",
      myBasketSelectedValue: "",
      allMyBasketSelectedValue: "",
      allBaskets: [],
      myBaskets: [],
      allMyBaskets: [],
      allMyBasketsSaveExisting: [],
    };
    this.fetchBasketIntermediate = this.fetchBasketIntermediate.bind(this);
    this.fetchBaskets = this.fetchBaskets.bind(this);
    this.handleAllBasketChange = this.handleAllBasketChange.bind(this);
    this.handleMyBasketChange = this.handleMyBasketChange.bind(this);
    this.handleAllMyBasketChange = this.handleAllMyBasketChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
  }

  componentDidMount() {
    this.fetchBasketIntermediate();
  }

  onModalHide() {
    this.props.handleShowBasketSelect(false);
  }

  async fetchBasketIntermediate() {
    let { userLoggedIn } = this.props;
    // console.log("userLoggedIn : ", userLoggedIn);
    // let user;
    // if (window.parent.document.getElementById("btnUserMenu")) {
    //   user = window.parent.document
    //     .getElementById("btnUserMenu")
    //     .querySelector(".user-name").textContent;
    // } else {
    //   // user = "Sayyed, Sahil";
    //   user = null;
    // }
    var allBasketResults = await this.fetchBaskets("All");
    var myBasketResults = await this.fetchBaskets(userLoggedIn);
    // console.log("allBasketResults: ", allBasketResults);
    if (allBasketResults || myBasketResults) {
      if (allBasketResults) {
        this.setState({
          allBaskets: allBasketResults
            .sort((a, b) => parseInt(b._id) - parseInt(a._id))
            .filter(
              (basket) =>
                (!basket._source.Status ||
                  basket._source.Status !== "Deleted") &&
                ((basket._source.UILoggedInUser &&
                  (userLoggedIn === basket._source.UILoggedInUser.value ||
                    (userLoggedIn !== basket._source.UILoggedInUser.value &&
                      (!basket._source.MakePrivate ||
                        basket._source.MakePrivate.value === false)))) ||
                  !basket._source.UILoggedInUser)
            ),
          allMyBasketsSaveExisting: allBasketResults
            .sort((a, b) => parseInt(b._id) - parseInt(a._id))
            .filter(
              (basket) =>
                !basket._source.Status ||
                (basket._source.Status !== "Deleted" &&
                  basket._source.Status !== "Archived" &&
                  basket._source.UILoggedInUser &&
                  (userLoggedIn === basket._source.UILoggedInUser.value ||
                    (userLoggedIn !== basket._source.UILoggedInUser.value &&
                      (!basket._source.MakePrivate ||
                        basket._source.MakePrivate.value === false) &&
                      (!basket._source.Edit ||
                        basket._source.Edit.value === true))))
              //   ||
              // !basket._source.UILoggedInUser)
            ),
        });
      }
      // console.log("allBaskets: ", this.state.allBaskets);
      if (myBasketResults) {
        this.setState({
          allMyBaskets: myBasketResults
            .sort((a, b) => parseInt(b._id) - parseInt(a._id))
            .filter((basket) => basket._source.Status !== "Deleted"),
          myBaskets: myBasketResults
            .sort((a, b) => parseInt(b._id) - parseInt(a._id))
            .filter(
              (basket) =>
                !basket._source.Status || basket._source.Status === "Active"
              // ||
              // basket._source.Status !== "Archived"
            ),
        });
      }
    } else {
      // this.props.toggleLoader({
      //   isLoading: false,
      // });
      return;
    }
    // this.props.toggleLoader({
    //   isLoading: false,
    // });
  }
  async fetchBaskets(user) {
    // let token = this.props.tokenState.token;
    var payload = {
      data: {
        defaults: {
          // baseURL: basketBaseUrl,
          // token: token,
          index: AppbaseBasketApp,
        },
        inputs: {
          user: user,
        },
      },
    };
    if (user === "All") {
      var resp = await axios
        // .post(ApiBaseUrl + "orderlist", payload, {
        //   headers: {
        //     "x-api-key": ApiKey,
        //   },
        // })

        .post(appbaseBasketUrl + "get-all-basket", payload, {
          headers: {
            "x-api-key": basketApikey,
          },
        })
        .catch((error) => {
          toast.error("Error while fetching basket !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
          this.props.toggleLoader({
            isLoading: false,
          });
          return;
        });
      if (!resp) {
        return;
      }
      if (resp.data && resp.data.statusCode === 200) {
        // console.log("Basket fetched successfully");
        // console.log("resp : ", resp);
        return resp.data.data;
        // if (JSON.parse(resp.data.body).OrdersList.value) {
        //   return JSON.parse(JSON.parse(resp.data.body).OrdersList.value);
        // } else {
        //   return [];
        // }
      } else {
        console.log("Error while fetching All baskets");
        // console.log("resp : ", resp);
        // let token = await GetAuthToken();
        // if (token) {
        //   this.props.setToken(token.access_token);
        //   await this.fetchBasketIntermediate();
        // }
      }
    } else {
      var resp = await axios
        // .post(ApiBaseUrl + "orderlist", payload, {
        //   headers: {
        //     "x-api-key": ApiKey,
        //   },
        // })

        .post(appbaseBasketUrl + "get-user-basket", payload, {
          headers: {
            "x-api-key": basketApikey,
          },
        })
        .catch((error) => {
          toast.error("Error while fetching user baskets !", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
          this.props.toggleLoader({
            isLoading: false,
          });
          return;
        });
      if (!resp) {
        return;
      }
      if (resp.data && resp.data.statusCode === 200) {
        // console.log("User Basket fetched successfully");
        // console.log("resp : ", resp);
        return resp.data.data;
        // if (JSON.parse(resp.data.body).OrdersList.value) {
        //   return JSON.parse(JSON.parse(resp.data.body).OrdersList.value);
        // } else {
        //   return [];
        // }
      } else {
        console.log("Error while fetching user baskets");
        // console.log("resp : ", resp);
        // let token = await GetAuthToken();
        // if (token) {
        //   this.props.setToken(token.access_token);
        //   await this.fetchBasketIntermediate();
        // }
      }
    }
  }

  handleAllBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        allBasketSelectedValue: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        allBasketSelectedValue: selectedOption,
      });
    }
  }

  handleMyBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        myBasketSelectedValue: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        myBasketSelectedValue: selectedOption,
      });
    }
  }

  handleAllMyBasketChange(selectedOption) {
    if (selectedOption.value === "default") {
      // console.log("value: ", selectedOption);
      this.setState({
        allMyBasketSelectedValue: null,
      });
    } else {
      // console.log("value: ", selectedOption);
      this.setState({
        allMyBasketSelectedValue: selectedOption,
      });
    }
  }

  async handleOpen() {
    let {
      allBasketSelectedValue,
      myBasketSelectedValue,
      allMyBasketSelectedValue,
    } = this.state;
    var basketSelected;
    if (
      (myBasketSelectedValue && allBasketSelectedValue) ||
      (myBasketSelectedValue && allMyBasketSelectedValue) ||
      (allBasketSelectedValue && allMyBasketSelectedValue) ||
      (myBasketSelectedValue &&
        allMyBasketSelectedValue &&
        allBasketSelectedValue)
    ) {
      alert("Please select single basket.");
      return;
    } else {
      basketSelected = myBasketSelectedValue
        ? myBasketSelectedValue.value
        : allBasketSelectedValue
        ? allBasketSelectedValue.value
        : allMyBasketSelectedValue
        ? allMyBasketSelectedValue.value
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
    let { show } = this.props;
    let { allBaskets } = this.state;
    console.log({ allBaskets });
    return (
      <Modal
        show={show}
        className="basket_select"
        onHide={() => this.onModalHide()}
      >
        <Modal.Header closeButton>
          {/* <div className="basket_selecty_header">
            <h6>Open</h6>
            <span>Choose Existing Basket</span>
            {/* <div className="search_container"> */}
          {/* <input type="search" /> */}
          {/* </div>
          </div> */}
        </Modal.Header>
        <Modal.Body>
          <div className="basket_select_header">
            <h6>Open</h6>
            <span>Choose Existing Basket</span>
            <input type="search" />
          </div>
          <div className="basket_list_container">
            <ul>
              {allBaskets.map((basket) => (
                <li>
                  {basket._id} - {basket._source.Description.value}
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasketSelectModal);
