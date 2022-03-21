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
                  handleShowBasketSelect(true);
                  handleSelectModalType("clone");
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
