import { Accordion, Modal } from "react-bootstrap";
import React, { Component } from "react";
import {
  resetStates,
  setBasketFormInput,
  openCartItems,
  toggleLoader,
  setToken,
} from "../actions";
import {
  AppbaseBasketApp,
  appbaseBasketUrl,
  basketApikey,
} from "../../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import OpenExisting from "./OpenExisting";
import {
  fetchBasket,
  getUniqueItemWithQty,
  getItemFromAppBase,
} from "./ReadAndOpenBasket";
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
  };
};

class BasketOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBaskets: [],
      myBaskets: [],
      allMyBaskets: [],
      allMyBasketsSaveExisting: [],
    };
    this.fetchBasketIntermediate = this.fetchBasketIntermediate.bind(this);
    this.fetchBaskets = this.fetchBaskets.bind(this);
    this.onModalHide = this.onModalHide.bind(this);
    this.handleClone = this.handleClone.bind(this);
  }
  onModalHide() {
    this.props.handleShowBasketOptions(false);
    this.props.handleSelectModalType("");
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
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
            theme: "colored",
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
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
            theme: "colored",
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

  async handleClone() {
    let { basketInputObj, cartItems, userLoggedIn, selectedItems } = this.props;
    if (selectedItems && !selectedItems.length) {
      toast.error("There are no items selected in the basket.", {
        // position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
      });
      return;
    }
    if (basketInputObj.orderNbr !== "New") {
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
      // console.log("dateTime: ", dateTime);
      // let initialID = "B-100";
      let initialID = 1000;
      let basketID;
      this.props.toggleLoader({
        isLoading: true,
      });
      if (basketInputObj.orderNbr !== "New") {
        var payload = {
          data: {
            defaults: {
              // baseURL: basketBaseUrl,
              // token: token,
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
        // console.log("idResults: ", id_Results);
        // lastID = typeof lastID;
        // console.log("lastID: ", lastID);
        // if (lastID.startsWith("B-")) {
        //   let firstPart = lastID.slice(0, 2);
        //   let lastPart = parseInt(lastID.slice(2)) + 1;
        //   let newID = firstPart + lastPart;
        //   basketID = newID;
        // }
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

      // if (basketInputObj.orderNbr !== "New") {
      var contactInput = basketInputObj.contact.ContactId;
      var customerInput = basketInputObj.customer.CustomerId;
      // var items = cartItems.items;
      let items =
        selectedItems && selectedItems.length ? selectedItems : cartItems.items;
      // let user;
      // if (window.parent.document.getElementById("btnUserMenu")) {
      //   user = window.parent.document
      //     .getElementById("btnUserMenu")
      //     .querySelector(".user-name").textContent;
      // } else {
      //   user = null;
      //   // user = "Sayyed, Sahil";
      // }
      // if (!contactInput && !customerInput) {
      //   alert("Please enter customer or contact");
      //   return;
      // }
      var contactName = basketInputObj.contact.DisplayName;
      // var contactEmail = basketInputObj.contact.ContactEmail;
      var customerName = basketInputObj.customer.Customer;
      var customerClass = basketInputObj.customer.CustomerClass;
      this.props.toggleLoader({
        isLoading: true,
      });
      items = items.map((el) => {
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
      var products = JSON.stringify(items).replace(/"/g, "'");
      var productObject = {
        BasketType: { value: basketInputObj.basketType },
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
          value:
            basketInputObj.desc === "" ? null : "COPY " + basketInputObj.desc,
        },
        IncludeRetailPrice: { value: basketInputObj.includeRetail },
        IncludeWholesalePrice: { value: basketInputObj.includeWholesale },
        InternalNotes: {
          value:
            basketInputObj.internalNotes === ""
              ? null
              : basketInputObj.internalNotes,
        },
        Occasion: {
          value:
            basketInputObj.occasion === "default"
              ? null
              : basketInputObj.occasion,
        },
        // OrderNbr: { value: "New" },
        OrdersList: {
          value: products,
        },
        ActionType: { value: "Clone" },
        UILoggedInUser: { value: userLoggedIn },
        CreatedAt: parseInt(dateTime),
        MakePrivate: { value: basketInputObj.makePrivate },
        Edit: { value: basketInputObj.edit },
        AssetOrMemo: {
          value:
            basketInputObj.assetOrmemo === ""
              ? null
              : basketInputObj.assetOrmemo,
        },
        // MakePrivate: { value: basketInputObj.makePrivate },
        // ...(basketInputObj.orderNbr !== "New" && {
        //   UpdatedAt: parseInt(dateTime),
        // }),
        // CreatedDate:
        //   basketInputObj.orderNbr === "New" ? parseInt(dateTime) : undefined,
        // UpdatedDate:
        //   basketInputObj.orderNbr !== "New" ? parseInt(dateTime) : undefined,
        Status: basketInputObj.status,
      };
      // console.log("saved...", productObject);
      // let token = this.props.tokenState.token;
      var payload = {
        data: {
          defaults: {
            // baseURL: basketBaseUrl,
            // token: token,
            index: AppbaseBasketApp,
          },
          id: basketID,
          type: "New",
          inputs: productObject,
        },
      };
      // console.log("payload: ", payload);
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
          toast.error("Error while clonning basket !", {
            // position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
            theme: "colored",
          });
          this.props.toggleLoader({
            isLoading: false,
          });
        });
      if (resp.data.statusCode === 200) {
        // console.log("resp: ", resp);
        toast.success("Basket Cloned !", {
          // position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
          theme: "colored",
        });
        this.props.resetStates();

        this.props.toggleLoader({
          isLoading: true,
        });
        this.props.setBasketFormInput({
          orderNbr: resp.data.data._id,
        });
        // Read Basket api
        // let token = this.props.tokenState.token;
        var data;
        var rawData = await fetchBasket(
          // basketSelected: JSON.parse(resp.data.body).OrderNbr.value,
          resp.data.data._id
          // token: token,
        );
        // console.log("rawData: ", rawData);
        if (!rawData || rawData.statusCode !== 200) {
          // console.log("rawData: ", rawData);
          // console.log("rawdata is empty or statusCode !==200");
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
        //       basketSelected: JSON.parse(resp.data.body).OrderNbr.value,
        //       token: token.access_token,
        //     });
        //   }
        // }
        if (
          rawData.data._source.OrdersList &&
          rawData.data._source.OrdersList.value
        ) {
          data = rawData.data._source;
        }
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
        var fromAppbaseCall = [];
        for (var i = 0; i < uniqueArrayFromBasket.length; i++) {
          var res = await getItemFromAppBase({
            item: uniqueArrayFromBasket[i],
            searchOption: "mixed",
          });
          if (typeof res[0]["_source"] !== "object") {
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
            linkVisibility: uniqueArrayFromBasket[i].LinkVisibility
              ? uniqueArrayFromBasket[i].LinkVisibility
              : "Default",
            itemSelected: uniqueArrayFromBasket[i].ItemSelected
              ? uniqueArrayFromBasket[i].ItemSelected
              : true,
            productType: uniqueArrayFromBasket[i].ProductType,
            LineNbr: uniqueArrayFromBasket[i].LineNbr,
            assetOrmemo:
              uniqueArrayFromBasket[i].AssetOrMemo &&
              uniqueArrayFromBasket[i].AssetOrMemo !== true &&
              uniqueArrayFromBasket[i].AssetOrMemo !== false
                ? uniqueArrayFromBasket[i].AssetOrMemo
                : "",
          });
        }
        // sort by LineNbr
        fromAppbaseCall.sort(function (a, b) {
          return b.LineNbr - a.LineNbr;
        });
        this.props.openCartItems(fromAppbaseCall);
        this.props.toggleLoader({
          isLoading: false,
        });
        this.onModalHide();
        // this.props.handleShowBasketOptions(false);
      } else {
        toast.error("Error while clonning basket !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
        this.props.toggleLoader({
          isLoading: false,
        });
        return [];

        // if (JSON.parse(resp.data.body).errorCode === 401) {
        //   let token = await GetAuthToken();
        //   if (token) {
        //     this.props.setToken(token.access_token);
        //     await this.handleClone();
        //   } else {
        //     this.props.toggleLoader({
        //       isLoading: false,
        //     });
        //     return [];
        //   }
      }
      // } else {
      //   window.alert("Cannot clone an unsaved basket");
      // }
    } else {
      window.alert("Please select a basket");
    }
  }

  render() {
    let { show, handleShowBasketSelect, handleSelectModalType } = this.props;
    let { allBaskets, myBaskets, allMyBaskets, allMyBasketsSaveExisting } =
      this.state;
    return (
      <Modal
        animation={false}
        autoFocus={false}
        enforceFocus={false}
        className="basket_options"
        // centered="true"
        size="lg"
        show={show}
        onHide={() => this.onModalHide()}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="basket_option_container">
            <ul>
              <li
                onClick={() => {
                  handleShowBasketSelect(true);
                  handleSelectModalType("open");
                }}
              >
                Open list
              </li>
              <li
                onClick={() => {
                  this.handleClone();
                  // handleShowBasketSelect(true);
                  // handleSelectModalType("clone");
                }}
              >
                Clone list
              </li>
              <li>Export list</li>
            </ul>
            {/* <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Open List</Accordion.Header>
                <Accordion.Body>
                  <OpenExisting
                    allBaskets={allBaskets ? allBaskets : []}
                    myBaskets={myBaskets ? myBaskets : []}
                    allMyBaskets={allMyBaskets ? allMyBaskets : []}
                    // userLoggedIn={this.props.userLoggedIn}
                  />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Clone List</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Export List</Accordion.Header>
                <Accordion.Body></Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(BasketOptions);
