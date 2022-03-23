import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setBasketFormInput } from "../actions/index";
// import LayoutFristImage from "../../assets/icons/Layout_First.jpg";
// import LookBookImage from "../../assets/icons/Layout_Second.jpg";
// import KwaitCover from "../../assets/icons/Kwiat-Cover.png";
// import NoCover from "../../assets/icons/No-Cover.png";
// import FredCover from "../../assets/icons/Fred-Cover.png";
// import KWFLCover from "../../assets/icons/Co-Branded-KWFL-Cover.png";

const mapStateToProps = (state) => {
  return {
    basketInputObj: state.basketInputChange,
    cartItems: state.cartActions,
  };
};

class ChooseLayoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onModalHide = this.onModalHide.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectCover = this.handleSelectCover.bind(this);
  }

  componentDidMount() {
    // console.log("component mounted");
  }
  componentDidUpdate() {
    // console.log("component did update");
  }

  handleSelectCover(e, cover) {
    this.props.setCover(cover);
    $(".covers-wrapper").children().removeClass("Active");
    if (e.target.className === "cover_option") {
      e.target.className = "cover_option Active";
    } else {
      // console.log("e :", e.target.parentNode.className);
      e.target.parentNode.className = "cover_option Active";
    }
  }

  onModalHide() {
    let { hide } = this.props;
    this.setState(() => {
      hide && hide();
    });
  }

  handleSubmit() {
    let { showPreviewModal, showPDFModal, goto } = this.props;
    this.onModalHide();
    if (goto === "Email") {
      showPreviewModal();
      return;
    }
    if (goto === "Print") {
      showPDFModal();
    }
  }

  handleSelectChange(e, layout) {
    // e.target.className = "Active";
    // console.log("Handle Select Change function");

    let {
      showPreviewModal,
      showPDFModal,
      goto,
      cartItems,
      showChooseLayout,
      basketInputObj,
    } = this.props;
    if (
      (basketInputObj.includePrice === false &&
        basketInputObj.includeRetail === false &&
        basketInputObj.includeWholesale === false) ||
      basketInputObj.includeLinks === ""
    ) {
      window.alert(
        `Choose an option for: ${
          basketInputObj.includeLinks !== "" ? "Pricing" : "Links"
        }`
      );
    } else {
      let itemsWholeSale;
      if (this.props.selectedItems) {
        itemsWholeSale = this.props.selectedItems.filter((i) => {
          if (
            i.priceVisibility === "Default" ||
            i.priceVisibility === "Hide Retail Price"
          ) {
            return i.SerialNumber || i.StyleNumber;
          }
        });
      }
      if (
        this.props.basketInputObj.includeWholesale &&
        ((this.props.selectedItems && itemsWholeSale.length !== 0) ||
          this.props.item)
      ) {
        let wholesaleAlert = window.prompt(
          "Please enter 'wholesale' in order to show wholesale price for items"
        );
        if (wholesaleAlert === "wholesale") {
          // console.log("layout: ", layout);
          // console.log("goto: ", goto);
          this.props.setLayout(layout);
          this.onModalHide();
          if (goto === "Email") {
            showPreviewModal();
            return;
          }
          if (goto === "Print") {
            showPDFModal();
            return;
          }
          // else {
          //   $("ul.layouts-wrapper")
          //     .children()
          //     .removeClass("Active");
          //   window.alert("Please Enter Correctly");
          // }
        } else {
          // console.log("layout: ", layout);
          // console.log("goto: ", goto);
          // $("ul.layouts-wrapper")
          //   .children()
          //   .removeClass("Active");
          window.alert("Please Enter Correctly");
          return;
          // showChooseLayout(goto);
        }
        // $("ul.layouts-wrapper")
        //   .children()
        //   .removeClass("Active");
        // e.target.className = "Active";
        // console.log("layout: ", layout);
        // this.props.setLayout(layout);
        // this.onModalHide();
        // // if (goto === "Email") {
        //   showPreviewModal();
        //   return;
        // }
        // if (goto === "Print") {
        //   showPDFModal();
      } else {
        // console.log("layout: ", layout);
        // console.log("goto: ", goto);
        this.props.setLayout(layout);
        this.onModalHide();
        if (goto === "Email") {
          showPreviewModal();
          return;
        }
        if (goto === "Print") {
          showPDFModal();
          return;
        }
      }
    }
  }
  render() {
    let { show, basketInputObj, coverType, includeGIA } = this.props;
    // console.log("include GIA :", includeGIA);
    return (
      <div>
        <Modal
          animation={false}
          autoFocus={false}
          enforceFocus={false}
          className="choose-layout-modal"
          centered="true"
          size="sm"
          show={show}
          onHide={() => this.onModalHide()}
        >
          <Modal.Header closeButton>TEMPLATE DETAILS </Modal.Header>
          <Modal.Body>
            <div className="price__checkbox__wrapper">
              <h4>DISPLAY PRICING:</h4>
              <div className="price__toggle retail__checkbox">
                <input
                  type="checkbox"
                  id="no_price_check"
                  checked={basketInputObj.includePrice}
                  onChange={(e) =>
                    this.props.setBasketFormInput({
                      includePrice: e.target.checked,
                      includeRetail: false,
                      includeWholesale: false,
                    })
                  }
                />
                <label htmlFor="no_price_check">No Pricing</label>
              </div>
              <div className="price__toggle retail__checkbox">
                <input
                  type="checkbox"
                  id="retail_check"
                  checked={basketInputObj.includeRetail}
                  onChange={(e) =>
                    this.props.setBasketFormInput({
                      includePrice: false,
                      includeRetail: e.target.checked,
                    })
                  }
                />
                <label htmlFor="retail_check">Retail</label>
              </div>
              {this.props.basketInputObj.showWholesale && (
                <div className="price__toggle wholesale__checkbox">
                  <input
                    type="checkbox"
                    id="wholesale_check"
                    checked={basketInputObj.includeWholesale}
                    onChange={(e) =>
                      this.props.setBasketFormInput({
                        includePrice: false,
                        includeWholesale: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="wholesale_check">Wholesale</label>
                </div>
              )}
            </div>

            <div className="gia__checkbox__wrapper">
              <h4>Include GIA:</h4>
              <div className="gia__toggle">
                <input
                  type="radio"
                  id="giaChoice1"
                  name="gia"
                  value="Yes"
                  checked={includeGIA === "Yes" ? true : false}
                  onChange={(e) =>
                    // console.log("value : ", e.target.value);
                    this.props.handleIncludeGIA(e.target.value)
                  }
                />
                <label htmlFor="giaChoice1">Yes</label>
              </div>
              <div className="gia__toggle">
                <input
                  type="radio"
                  id="giaChoice2"
                  name="gia"
                  value="No"
                  checked={includeGIA === "No" ? true : false}
                  onChange={(e) =>
                    // console.log("value : ", e.target.value);
                    this.props.handleIncludeGIA(e.target.value)
                  }
                />
                <label htmlFor="giaChoice2">No</label>
              </div>
            </div>

            <div className="links__checkbox__wrapper">
              <h4>INCLUDE WEB LINKS:</h4>
              <div className="links__toggle">
                <input
                  type="radio"
                  id="linksChoice1"
                  name="links"
                  value="Web or Internal Imagery"
                  checked={
                    basketInputObj.includeLinks === "Web or Internal Imagery"
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    // console.log("value : ", e.target.value);
                    this.props.setBasketFormInput({
                      includeLinks: e.target.value,
                    });
                  }}
                />
                <label htmlFor="linksChoice1">
                  Yes - White or Internal Images
                </label>
              </div>
              <div className="links__toggle">
                <input
                  type="radio"
                  id="linksChoice2"
                  name="links"
                  value="ONLY Web Imagery"
                  checked={
                    basketInputObj.includeLinks === "ONLY Web Imagery"
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    // console.log("value : ", e.target.value);
                    this.props.setBasketFormInput({
                      includeLinks: e.target.value,
                    });
                  }}
                />
                <label htmlFor="linksChoice2">Yes - ONLY White Images</label>
              </div>
              <div className="links__toggle">
                <input
                  type="radio"
                  id="linksChoice3"
                  name="links"
                  value="No"
                  checked={basketInputObj.includeLinks === "No" ? true : false}
                  onChange={(e) => {
                    // console.log("value : ", e.target.value);
                    this.props.setBasketFormInput({
                      includeLinks: e.target.value,
                    });
                  }}
                />
                <label htmlFor="linksChoice3">No</label>
              </div>
            </div>
            <div className="covers">
              <h4>SELECT COVER:</h4>
              <div className="covers-wrapper">
                <div
                  className={
                    coverType === "NoCover"
                      ? "cover_option Active"
                      : "cover_option"
                  }
                  onClick={(e) => {
                    this.handleSelectCover(e, "NoCover");
                  }}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/No-Cover.png" />
                  <span>No Cover</span>
                </div>
                <div
                  className={
                    coverType === "Kwiat"
                      ? "cover_option Active"
                      : "cover_option"
                  }
                  onClick={(e) => this.handleSelectCover(e, "Kwiat")}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Kwiat-Cover.jpg" />
                  <span>Kwiat</span>
                </div>
                <div
                  className={
                    coverType === "Fred"
                      ? "cover_option Active"
                      : "cover_option"
                  }
                  onClick={(e) => this.handleSelectCover(e, "Fred")}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Fred-Cover.jpg" />
                  <span>Fred Leighton</span>
                </div>
                <div
                  className={
                    coverType === "KWFL"
                      ? "cover_option Active"
                      : "cover_option"
                  }
                  onClick={(e) => this.handleSelectCover(e, "KWFL")}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Co-Branded-KWFL-Cover.jpg" />
                  <span>Co Branded KWFL</span>
                </div>
                <div
                  className={
                    coverType === "Bridal"
                      ? "cover_option Active"
                      : "cover_option"
                  }
                  onClick={(e) => this.handleSelectCover(e, "Bridal")}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Bridal.jpg" />
                  <span>Bridal</span>
                </div>
                {/* <div
                  className="layout_option"
                  onClick={(e) => this.handleSelectChange(e, "LookBook")}
                >
                  <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/Layout_Second.jpg" />
                  <span>Look Book</span>
                </div> */}
              </div>
            </div>

            <div className="layouts">
              <h4>SELECT LAYOUT:</h4>
              <div className="layouts-wrapper">
                {/* <li onClick={(e) => this.handleSelectChange(e, "DetailLayout")}>
                  Detail Layout
                </li> */}
                {/* <li
                  onClick={(e) =>
                    this.handleSelectChange(e, "BriefDetailLayout")
                  }
                >
                  Brief Detail Layout
                </li> */}
                {/* <li
                  onClick={(e) => this.handleSelectChange(e, "MinDetailLayout")}
                >
                  Min Detail Layout
                </li> */}
                <div
                  className="layout_option"
                  onClick={(e) => this.handleSelectChange(e, "ProductBrochure")}
                >
                  <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/Layout_First.jpg" />
                  <span>Brochure</span>
                </div>
                <div
                  className="layout_option"
                  onClick={(e) => this.handleSelectChange(e, "LookBook")}
                >
                  <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/Layout_Second.jpg" />
                  <span>Look Book</span>
                </div>
              </div>
            </div>

            {/* <div className="action-buttons">
              <button className="clear" onClick={() => this.handleSubmit()}>
                Submit
              </button>
            </div> */}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setBasketFormInput,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseLayoutModal);
