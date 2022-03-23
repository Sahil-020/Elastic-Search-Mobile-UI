import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import ReactImageFallback from "react-image-fallback";
import { Modal, Tabs, Tab, Table } from "react-bootstrap";
import { CSVDownloader, jsonToCSV } from "react-papaparse";
import LoadingOverlay from "react-loading-overlay";
import currencyFormatter from "currency-formatter";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setBasketFormInput,
  toggleLoader,
  setToken,
} from "../../actions/index";
import {
  ApiBaseUrl,
  ApiKey,
  basketBaseUrl,
  basketEmailUrl,
  emailApikey,
} from "../../../utils/constants";
import { ReactMultiEmail, isEmail } from "react-multi-email";
// import currencyFormatter from "currency-formatter";
import axios from "axios";
import { toast } from "react-toastify";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import emailjs from "emailjs-com";
import { saveAs } from "@progress/kendo-file-saver";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";
import ReactQuill from "react-quill";
import DetailLayout from "../PDF_Layouts/Detail Layout/DetailLayout";
import MinDetailLayout from "../PDF_Layouts/Min Detail Layout/MinDetailLayout";
import ProductBrochure from "../PDF_Layouts/Product Brochure/ProductBrochure";
import LookBook from "../PDF_Layouts/Look Book/LookBook";
import arrow from "../../../assets/icons/arrow-141-32.png";
import Kwiat from "../PDF Covers/Kwiat/Kwiat";
import FredLeighton from "../PDF Covers/Fred Leighton/FredLeighton";
import CoBrandedKWFL from "../PDF Covers/Co Branded KWFL/CoBrandedKWFL";
import Bridal from "../PDF Covers/Bridal/Bridal";
import GetAuthToken from "../../Api/Authenticate";
import { object } from "prop-types";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    loaderActions: state.loaderActions,
    tokenState: state.tokenState,
  };
};

class PreviewEmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailDetails: {
        to: props.basketInputObj.contact.ContactEmail
          ? [props.basketInputObj.contact.ContactEmail]
          : [],
        from:
          props.basketInputObj.user && props.basketInputObj.user.BasketEmail
            ? props.basketInputObj.user.BasketEmail
            : "",
        cc: [],
        bcc:
          props.basketInputObj.user &&
          (props.basketInputObj.user.BasketEmail ||
            props.basketInputObj.user.BasketBccEmail)
            ? [
                props.basketInputObj.user.BasketEmail,
                props.basketInputObj.user.BasketBccEmail &&
                  props.basketInputObj.user.BasketBccEmail,
              ].filter(Boolean)
            : [],
        subject: `Basket # - ${props.basketInputObj.orderNbr}, Jewels from Kwiat | Fred Leighton`,
        text: props.basketInputObj.user
          ? `<p><br><br></p><p>--------------------</p>${
              props.basketInputObj.user.FirstName
            } ${props.basketInputObj.user.LastName}${
              props.basketInputObj.user.Title
                ? ` | ${props.basketInputObj.user.Title}`
                : ``
            }<br><b>KWIAT | FRED LEIGHTON</b><br>
            ${
              props.basketInputObj.user.AddressLine1 &&
              props.basketInputObj.user.AddressLine2
                ? `${props.basketInputObj.user.AddressLine1}, ${props.basketInputObj.user.AddressLine2}<br>`
                : props.basketInputObj.user.AddressLine1
                ? `${props.basketInputObj.user.AddressLine1}<br>`
                : props.basketInputObj.user.AddressLine2
                ? `${props.basketInputObj.user.AddressLine2}<br>`
                : ``
            }
            ${
              props.basketInputObj.user.City &&
              props.basketInputObj.user.State &&
              props.basketInputObj.user.PostalCode
                ? `${props.basketInputObj.user.City}, ${props.basketInputObj.user.State} ${props.basketInputObj.user.PostalCode}<br>`
                : props.basketInputObj.user.City &&
                  props.basketInputObj.user.State
                ? `${props.basketInputObj.user.City}, ${props.basketInputObj.user.State}<br>`
                : props.basketInputObj.user.City &&
                  props.basketInputObj.user.PostalCode
                ? `${props.basketInputObj.user.City}, ${props.basketInputObj.user.PostalCode}<br>`
                : props.basketInputObj.user.State &&
                  props.basketInputObj.user.PostalCode
                ? `${props.basketInputObj.user.State}, ${props.basketInputObj.user.PostalCode}<br>`
                : ``
            }
            ${
              props.basketInputObj.user.Phone1
                ? `${props.basketInputObj.user.Phone1}<br>`
                : ``
            }${
              props.basketInputObj.user.BasketEmail
                ? `${props.basketInputObj.user.BasketEmail} | <a href= "https://kwiat.com" target="_blank">Kwiat.com</a> | <a href="https://www.fredleighton.com" target="_blank">FredLeighton.com</a> `
                : `<a href= "https://kwiat.com" target="_blank">Kwiat.com</a> | <a href="https://www.fredleighton.com" target="_blank">FredLeighton.com</a>`
            }</p>`
          : "<p><br><br></p>",
      },
      senderName:
        props.basketInputObj.user &&
        props.basketInputObj.user.FirstName &&
        props.basketInputObj.user.LastName
          ? `${props.basketInputObj.user.FirstName} ${props.basketInputObj.user.LastName}`
          : "",
      showEmailSizeExceedsModal: false,
      items: "9",
      includeStoneValues: false,
      includeLocation: false,
      priceLabel: "Price",
      pdfAttachments: true,
      itemsInEmailBody: true,
      activeTabKey: "email_body_items",
    };
    this.Content_To_Print = React.createRef(null);
    this.Div_To_Print = React.createRef();
    this.emailTo = React.createRef(null);
    this.onModalHide = this.onModalHide.bind(this);
    this.printDoc = this.printDoc.bind(this);
    this.thumbnailImage = this.thumbnailImage.bind(this);
    this.showZoomImage = this.showZoomImage.bind(this);
    this.showDiaImage = this.showDiaImage.bind(this);
    this.diaIcon = this.diaIcon.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    // this.handleTo = this.handleTo.bind(this);
    // this.handleSubject = this.handleSubject.bind(this);
    this.handleText = this.handleText.bind(this);
    // this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.viewPDF = this.viewPDF.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    // this.handleTabChange = this.handleTabChange.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSecondPageTemplate = this.handleSecondPageTemplate.bind(this);
    this.handleEmptyPageTemplate = this.handleEmptyPageTemplate.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handlePageTemplate = this.handlePageTemplate.bind(this);
    this.quillRef = null;
    this.reactQuillRef = React.createRef(null);
    this.handleImage = this.handleImage.bind(this);
    this.viewCsvFile = this.viewCsvFile.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log("component will mount");
    if (
      this.props.basketInputObj.contact !== nextProps.basketInputObj.contact ||
      this.props.basketInputObj.user !== nextProps.basketInputObj.user ||
      this.props.basketInputObj !== nextProps.basketInputObj
    ) {
      this.setState((prevState) => ({
        emailDetails: {
          ...prevState.emailDetails,
          bcc:
            nextProps.basketInputObj.user &&
            (nextProps.basketInputObj.user.BasketEmail ||
              nextProps.basketInputObj.user.BasketBccEmail)
              ? [
                  nextProps.basketInputObj.user.BasketEmail,
                  nextProps.basketInputObj.user.BasketBccEmail &&
                    nextProps.basketInputObj.user.BasketBccEmail,
                ].filter(Boolean)
              : [],

          to: nextProps.basketInputObj.contact.ContactEmail
            ? [nextProps.basketInputObj.contact.ContactEmail]
            : [],
          from:
            nextProps.basketInputObj.user &&
            nextProps.basketInputObj.user.BasketEmail
              ? nextProps.basketInputObj.user.BasketEmail
              : "",
          subject: `Basket # - ${nextProps.basketInputObj.orderNbr}, Jewels from Kwiat | Fred Leighton`,
          text: nextProps.basketInputObj.user
            ? `<p><br><br></p><p>--------------------</p>${
                nextProps.basketInputObj.user.FirstName
              } ${nextProps.basketInputObj.user.LastName}${
                nextProps.basketInputObj.user.Title
                  ? ` | ${nextProps.basketInputObj.user.Title}`
                  : ``
              }<br><b>KWIAT | FRED LEIGHTON</b><br>
            ${
              nextProps.basketInputObj.user.AddressLine1 &&
              nextProps.basketInputObj.user.AddressLine2
                ? `${nextProps.basketInputObj.user.AddressLine1}, ${nextProps.basketInputObj.user.AddressLine2}<br>`
                : nextProps.basketInputObj.user.AddressLine1
                ? `${nextProps.basketInputObj.user.AddressLine1}<br>`
                : nextProps.basketInputObj.user.AddressLine2
                ? `${nextProps.basketInputObj.user.AddressLine2}<br>`
                : ``
            }
            ${
              nextProps.basketInputObj.user.City &&
              nextProps.basketInputObj.user.State &&
              nextProps.basketInputObj.user.PostalCode
                ? `${nextProps.basketInputObj.user.City}, ${nextProps.basketInputObj.user.State} ${nextProps.basketInputObj.user.PostalCode}<br>`
                : nextProps.basketInputObj.user.City &&
                  nextProps.basketInputObj.user.State
                ? `${nextProps.basketInputObj.user.City}, ${nextProps.basketInputObj.user.State}<br>`
                : nextProps.basketInputObj.user.City &&
                  nextProps.basketInputObj.user.PostalCode
                ? `${nextProps.basketInputObj.user.City}, ${nextProps.basketInputObj.user.PostalCode}<br>`
                : nextProps.basketInputObj.user.State &&
                  nextProps.basketInputObj.user.PostalCode
                ? `${nextProps.basketInputObj.user.State}, ${nextProps.basketInputObj.user.PostalCode}<br>`
                : ``
            }
            ${
              nextProps.basketInputObj.user.Phone1
                ? `${nextProps.basketInputObj.user.Phone1}<br>`
                : ``
            }${
                nextProps.basketInputObj.user.BasketEmail
                  ? `${nextProps.basketInputObj.user.BasketEmail} | <a href="https://kwiat.com" target="_blank">Kwiat.com</a> | <a href="https://www.fredleighton.com" target="_blank">FredLeighton.com</a> `
                  : `<a href="https://kwiat.com" target="_blank">Kwiat.com</a> | <a href="https://www.fredleighton.com" target="_blank">FredLeighton.com</a>`
              }</p>`
            : "<p><br><br></p>",
        },
        senderName:
          nextProps.basketInputObj.user &&
          nextProps.basketInputObj.user.FirstName &&
          nextProps.basketInputObj.user.LastName
            ? `${nextProps.basketInputObj.user.FirstName} ${nextProps.basketInputObj.user.LastName}`
            : "",
      }));
    }
  }

  componentDidMount() {
    // this.attachQuillRefs();
    // // this.handleClick();
    // let editor = document.getElementsByClassName("ql-editor");
    // console.log("Editor: ", editor);
    // editor.innerHTML = "<br><p>Cory Kwiat</p>";
    // // this.emailTo.state.focused = true;
    // let emailToContainer =
    //   document.getElementsByClassName("react-multi-email empty") &&
    //   document.getElementsByClassName("react-multi-email empty")[0].children[0];
    // console.log("emailToContainer :", emailToContainer);
    // console.log("emailTo : ", this.emailTo);
  }

  componentDidUpdate() {
    // this.attachQuillRefs();
    // // this.handleClick();
    // let editor = document.getElementsByClassName("ql-editor");
    // console.log("Editor: ", editor);
    // editor.innerHTML = "<br><p>Cory Kwiat</p>";
    // let emailToContainer =
    //   document.getElementsByClassName("react-multi-email empty") &&
    //   document.getElementsByClassName("react-multi-email empty")[0];
    // console.log("emailToContainer :", emailToContainer);
    // console.log("emailTo : ", this.emailTo);
  }

  viewCsvFile(csvData) {
    // var blob = new Blob(["\ufeff", csvData]);
    // var url = URL.createObjectURL(blob);
    let data = `
        <table>
          <thead>
            <tr>
              ${
                csvData &&
                // console.log(
                //   csvData
                //     .map((data) => ({
                //       length: Object.keys(data).length,
                //       fields: Object.keys(data),
                //     }))
                //     .find(
                //       (data) =>
                //         data.length ===
                //         Math.max.apply(
                //           Math,
                //           csvData
                //             .map((data) => ({
                //               length: Object.keys(data).length,
                //               fields: Object.keys(data),
                //             }))
                //             .map((o) => o.length)
                //         )
                //     )
                // )
                csvData
                  .map((data) => ({
                    length: Object.keys(data).length,
                    fields: Object.keys(data),
                  }))
                  .find(
                    (data) =>
                      data.length ===
                      Math.max.apply(
                        Math,
                        csvData
                          .map((data) => ({
                            length: Object.keys(data).length,
                            fields: Object.keys(data),
                          }))
                          .map((o) => o.length)
                      )
                  )
                  .fields.map(
                    (field, index) => `<th key=${index}>${field}</th>`
                  )
                // Object.keys(csvData[0]).map((key, index) => (
                //   <th key={index}>{key}</th>
                // ))
              }
            </tr>
          </thead>
          <tbody>
            ${
              csvData &&
              csvData.map(
                (data, index) =>
                  `<tr key={50 + index}>
                  ${Object.keys(data).map(
                    (key, index) =>
                      `<td key=${100 + index}>${
                        data[key] ? data[key] : " "
                      }</td>`
                  )}
                </tr>`
              )
            }
          </tbody>
        </table>
      `;
    var tab = window.open("about:blank", "_blank");
    tab.document.write(data); // where 'html' is a variable containing your HTML
    tab.document.close();
    // window.open(url);
  }

  handleImage(item) {
    if (
      (item.transformType === "JewelrySerial" || !item.transformType) &&
      item.WebImage1
    ) {
      //   console.log(item);
      let str = item.WebImage1.replace(".jpg", "-product@2x.jpg");
      let imageurl = "https://cdn.kwiat.com/source-images/web/product/" + str;
      return imageurl;
    } else if (
      item.transformType === "DiamondSerial" ||
      item.transformType === "GemstoneSerial" ||
      ((item.transformType === "JewelrySerial" || !item.transformType) &&
        item.Shape)
    ) {
      let imageurl =
        "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
        item.Shape +
        ".jpg";
      return imageurl;
    } else if (item.LargeImageName) {
      let searchimage;
      searchimage = item.LargeImageName;
      let str = searchimage.split("\\");
      searchimage = str[str.length - 1];
      let imageurl = "https://cdn.kwiat.com/source-images/large/" + searchimage;
      return imageurl;
    } else {
      let imageurl =
        "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
      return imageurl;
    }
  }

  handlePageTemplate(props) {
    // console.log("data: ", props);
    // if (props === "LookBook") {
    let template = "";
    if (this.props.coverType !== "NoCover") {
      if (props.pageNum === 1) {
        return (
          <div className="cover_footer">
            {this.props.coverType === "Kwiat"
              ? "KWIAT.COM"
              : this.props.coverType === "Fred"
              ? "FREDLEIGHTON.COM"
              : this.props.coverType === "KWFL"
              ? "KWIAT.COM / FREDLEIGHTON.COM"
              : this.props.coverType === "Bridal"
              ? "KWIAT.COM"
              : ""}{" "}
            / NEW YORK / LAS VEGAS
          </div>
        );
      } else if (this.props.layoutType === "LookBook") {
        return (
          <>
            {/* <div
              className="layout_second_header"
              // style={{
              //   position: "absolute",
              //   top: "10px",
              //   left: "10px",
              // }}
            >
              {this.props.basketInputObj.desc}
            </div> */}
            <div className="layout_second_footer">
              <span>
                {new Date().toLocaleString("default", { month: "short" })}{" "}
                {new Date().getFullYear()} - #
                {this.props.basketInputObj.orderNbr}
              </span>
              <span>
                <img
                  className={
                    {
                      NoCover: "kwfl",
                      Kwiat: "kwiat",
                      Fred: "fred",
                      KWFL: "kwfl",
                      Bridal: "bridal",
                    }[this.props.coverType]
                  }
                  src={
                    {
                      NoCover:
                        "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                      Kwiat:
                        "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                      Fred: "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                      KWFL: "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                      Bridal:
                        "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                    }[this.props.coverType]
                  }
                />
                <br />
                Copyright {new Date().getFullYear()} All Rights Reserved
              </span>

              <span>Page {props.pageNum - 1}</span>
            </div>
          </>
        );
      } else {
        return <div />;
      }
    } else if (this.props.layoutType === "LookBook") {
      return (
        <>
          <div
            className="layout_second_header"
            // style={{
            //   position: "absolute",
            //   top: "10px",
            //   left: "10px",
            // }}
          >
            {this.props.basketInputObj.desc}
          </div>
          <div className="layout_second_footer">
            <span>
              {new Date().toLocaleString("default", { month: "short" })}{" "}
              {new Date().getFullYear()} - #{this.props.basketInputObj.orderNbr}
            </span>
            <span>
              <img
                className="kwfl"
                src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png"
              />
              <br />
              Copyright {new Date().getFullYear()} All Rights Reserved
            </span>

            <span>Page {props.pageNum}</span>
          </div>
        </>
      );
    } else {
      return <div />;
    }
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

  scrollToTop() {
    // scroll.scrollToTop();
    let element = document.getElementById("preview-modal");
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  handleEmptyPageTemplate(props) {
    return <div />;
  }

  handleSecondPageTemplate(props) {
    // console.log("data: ", props);
    // if (props === "LookBook") {
    return (
      <>
        <div className="layout_second_header">
          {this.props.basketInputObj.desc}
        </div>
        <div className="layout_second_footer">
          <span>
            {new Date().toLocaleString("default", { month: "short" })}{" "}
            {new Date().getFullYear()} - #{this.props.basketInputObj.orderNbr}
          </span>
          <span>
            <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png" />
            <br />
            Copyright {new Date().getFullYear()} All Rights Reserved
          </span>

          <span>Page {props.pageNum}</span>
        </div>
      </>
    );
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

  onModalHide() {
    // this.setState({
    //   emailDetails: {
    //     to: [],
    //     from: "notifications@kwiat.com",
    //     cc: [],
    //     bcc: [],
    //     subject: "",
    //     text: "",
    //   },
    // });
    let { hide } = this.props;
    this.setState(() => {
      hide && hide();
    });
  }

  handleBack() {
    this.onModalHide();
    this.props.showChooseLayout("Email");
    if (this.props.item) {
      this.props.handleCurrentRes(this.props.item[0]);
    }
  }

  handleText(content, editor) {
    let text = editor.getHTML();
    // console.log("text : ", text);
    // console.log("text: ", content);
    this.setState((prevState) => ({
      emailDetails: {
        ...prevState.emailDetails,
        text: content,
      },
    }));
  }

  async sendEmail(dataContent) {
    let { cartItems, basketInputObj, item, selectedItems, csvData } =
      this.props;

    let cartDetails = item
      ? item
      : selectedItems && selectedItems.length
      ? selectedItems
      : cartItems.items;

    // console.log("emailDetails: ", this.state.emailDetails);
    // console.log("email state: ", this.state);
    // console.log("dataContent: ", dataContent);
    // let products = document.querySelector(".email_body_items").innerHTML;

    let products =
      cartDetails.length < 40 && this.state.itemsInEmailBody
        ? `<div
          style="text-align: left; width:505px;"
        >
          ${
            cartDetails &&
            cartDetails.map(
              (item, index) =>
                `<div
                key=${index}
                style="text-align:center;max-width:600px;max-height: 600px;"
              >
                <div style="width:100%;">
                  ${
                    basketInputObj.includeLinks === "Web or Internal Imagery" &&
                    item.webProductURL &&
                    item.webProductURL !== "" &&
                    item.webProductURL !== null &&
                    ((item.linkVisibility &&
                      item.linkVisibility === "Default") ||
                      !item.linkVisibility)
                      ? `<a
                      href=${item.webProductURL}
                      style="width: 50%;"
                      target="_blank"
                    >
                      <img
                        style="width:100%;"
                        src=${this.handleImage(item)}
                        onError=${(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>`
                      : basketInputObj.includeLinks === "ONLY Web Imagery" &&
                        item.hasWebImage &&
                        item.hasWebImage === "1" &&
                        item.webProductURL &&
                        item.webProductURL !== "" &&
                        item.webProductURL !== null &&
                        ((item.linkVisibility &&
                          item.linkVisibility === "Default") ||
                          !item.linkVisibility)
                      ? `<a
                      href=${item.webProductURL}
                      style"width:50%;"
                      target="_blank"
                    >
                      <img
                        style="width:100%;"
                        src=${this.handleImage(item)}
                        onError=${(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>`
                      : `
                      <img
                        style="width:50%;"
                        src=${this.handleImage(item)}
                        onError=${(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    `
                  }
                </div>
                ${
                  item.Description
                    ? `<div style="margin-top:10px;">${item.Description}</div>`
                    : ``
                }
                ${
                  item.SerialNumber || item.StyleNumber
                    ? `<div>
                    ${
                      item.StyleNumber && item.SerialNumber
                        ? item.StyleNumber + " | " + item.SerialNumber
                        : item.StyleNumber
                        ? item.StyleNumber
                        : item.SerialNumber
                        ? item.SerialNumber
                        : ``
                    }
                  </div>`
                    : ``
                }
                ${item.Metal ? `<div>${item.Metal}</div>` : ``}
                ${
                  item.InternalNote
                    ? `  <div>
                    ${
                      item.InternalNote && item.InternalNote !== ""
                        ? `Notes: ${item.InternalNote}`
                        : ``
                    }
                  </div>`
                    : ``
                }
                ${
                  this.state.includeStoneValues
                    ? `<div>
                    ${
                      item.DiamondCarats ||
                      item.Color ||
                      item.Clarity ||
                      item.ColorCarats
                        ? `${
                            item.DiamondCarats
                              ? ` ${item.DiamondCarats} carats,`
                              : ""
                          }
                    ${item.Color ? ` ${item.Color} color,` : ""}
                    ${item.Clarity ? ` ${item.Clarity} clarity.` : ""} 
                    ${item.ColorCarats ? `${item.ColorCarats} carats.` : ""}`
                        : ``
                    }
                  </div>`
                    : ``
                }

                <div style="margin-bottom:10px;">
                  ${
                    basketInputObj.includeRetail &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Wholesale Price" ||
                      !item.priceVisibility) &&
                    basketInputObj.includeWholesale &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Retail Price" ||
                      !item.priceVisibility) &&
                    item.RetailPrice &&
                    parseInt(item.RetailPrice) > 0 &&
                    item.WholesalePrice &&
                    parseInt(item.WholesalePrice) > 0
                      ? `${
                          this.state.priceLabel === "Price" ? "Price" : "MSRP"
                        } : ${currencyFormatter.format(`${item.RetailPrice}`, {
                          code: "USD",
                          precision: 0,
                        })} | Wholesale : ${
                          (item.WholesalePrice &&
                            currencyFormatter.format(`${item.WholesalePrice}`, {
                              code: "USD",
                              precision: 0,
                            })) ||
                          "$0"
                        }`
                      : basketInputObj.includeWholesale &&
                        (item.priceVisibility === "Default" ||
                          item.priceVisibility === "Hide Retail Price" ||
                          !item.priceVisibility) &&
                        item.WholesalePrice &&
                        parseInt(item.WholesalePrice) > 0
                      ? `Wholesale : ${
                          (item.WholesalePrice &&
                            currencyFormatter.format(`${item.WholesalePrice}`, {
                              code: "USD",
                              precision: 0,
                            })) ||
                          "$0"
                        }`
                      : basketInputObj.includeRetail &&
                        (item.priceVisibility === "Default" ||
                          item.priceVisibility === "Hide Wholesale Price" ||
                          !item.priceVisibility) &&
                        item.RetailPrice &&
                        parseInt(item.RetailPrice) > 0
                      ? `${
                          this.state.priceLabel === "Price" ? "Price" : "MSRP"
                        } : ${
                          (item.RetailPrice &&
                            currencyFormatter.format(`${item.RetailPrice}`, {
                              code: "USD",
                              precision: 0,
                            })) ||
                          "$0"
                        }`
                      : ``
                  }${" "}
                  ${
                    basketInputObj.includeLinks === "Web or Internal Imagery" &&
                    item.webProductURL &&
                    item.webProductURL !== "" &&
                    item.webProductURL !== null &&
                    ((item.linkVisibility &&
                      item.linkVisibility === "Default") ||
                      !item.linkVisibility)
                      ? `<a style="cursor:pointer;" href=${item.webProductURL} target="_blank">view online</a>`
                      : basketInputObj.includeLinks === "ONLY Web Imagery" &&
                        item.hasWebImage &&
                        item.hasWebImage === "1" &&
                        item.webProductURL &&
                        item.webProductURL !== "" &&
                        item.webProductURL !== null &&
                        ((item.linkVisibility &&
                          item.linkVisibility === "Default") ||
                          !item.linkVisibility)
                      ? `<a style="cursor:pointer;" href=${item.webProductURL} target="_blank" >view online</a>`
                      : ``
                  }
                </div>
              </div>`
            )
          }
        </div>`
        : "";
    // console.log("products :", products);
    // console.log("data contents : ", dataContent);

    if (
      this.state.emailDetails.to.length !== 0 &&
      this.state.emailDetails.subject !== "" &&
      this.state.emailDetails.text !== ""
    ) {
      // let emailFileObject = {
      //   to: this.state.emailDetails.to,
      //   from: {
      //     // email: "notifications@kwiat.com",
      //     email: this.state.emailDetails.from,
      //     name: this.state.senderName,
      //   },
      //   // from: this.state.emailDetails.from,
      //   cc: this.state.emailDetails.cc,
      //   bcc: [...this.state.emailDetails.bcc, "dev@kwiat.com"],
      //   subject: this.state.emailDetails.subject,
      //   // subject: "Jewels from Kwiat | Fred Leighton",
      //   text: " ",
      //   html: this.state.emailDetails.text,
      //   attachments: [
      //     {
      //       content: dataContent,
      //       filename: `${
      //         this.props.filename
      //           ? this.props.filename
      //           : basketInputObj.contact.DisplayName
      //           ? basketInputObj.contact.DisplayName
      //           : basketInputObj.customer.Customer
      //           ? basketInputObj.customer.Customer
      //           : "KWFL"
      //       } - ${this.getCurrentDate()}.pdf`,
      //       type: "application/pdf",
      //       disposition: "attachment",
      //     },
      //   ],
      // };
      // email object for EmailJS
      let emailFileObject = {
        to: this.state.emailDetails.to,
        // from: {
        from: "notifications@kwiat.com",
        // from: this.state.emailDetails.from,
        from_name: this.state.senderName,
        reply_to: this.state.emailDetails.from,
        // },
        // from: this.state.emailDetails.from,
        cc: this.state.emailDetails.cc,
        bcc: [...this.state.emailDetails.bcc, "dev@kwiat.com"],
        subject: this.state.emailDetails.subject,
        // subject: "Jewels from Kwiat | Fred Leighton",
        // text: " ",
        message: this.state.emailDetails.text,
        ...(!csvData && { products: products }),
        // attachments: [
        //   {
        content: !csvData
          ? dataContent
          : window.btoa(unescape(encodeURIComponent(dataContent))),
        filename: `${
          !csvData
            ? `${
                this.props.filename
                  ? this.props.filename
                  : basketInputObj.contact.DisplayName
                  ? basketInputObj.contact.DisplayName
                  : basketInputObj.customer.Customer
                  ? basketInputObj.customer.Customer
                  : "Kwiat-Fred-Leighton"
              } - ${this.getCurrentDate()}.pdf`
            : `Basket_Items.csv`
        }`,
        // type: "application/pdf",
        //     disposition: "attachment",
        //   },
        // ],
      };
      // var payload = {
      //   data: {
      //     inputs: emailFileObject,
      //   },
      // };
      // console.log("emailFileObject : ", emailFileObject);

      var resp = await emailjs
        .send(
          "service_xv360ne",
          // "template_zcfznt9",
          "template_g3iuhws",
          emailFileObject,
          "user_VdYyVJ5pMO4CQdUPQUNak"
        )
        .then(
          (result) => {
            // console.log(result);
            return result;
          },
          (error) => {
            console.log(error);
          }
        );
      // this.props.toggleLoader({
      //   isLoading: false,
      // });

      // var resp = await axios
      //   .post(basketEmailUrl + "email", payload, {
      //     headers: {
      //       "x-api-key": emailApikey,
      //     },
      //   })
      //   .catch((error) => {
      //     // console.log("error: ", error);
      //   });

      if (resp && resp.status === 200) {
        // console.log("In if loop, resp: ", resp);
        toast.success("Mail Sent !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
        // this.props.toggleLoader({
        //   isLoading: false,
        // });
        // return;
      } else {
        // console.log("In else loop resp : ", resp);
        toast.error("Error while sending mail !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
        this.props.toggleLoader({
          isLoading: false,
        });
        // this.props.toggleLoader({
        //   isLoading: false,
        // });
        // this.setState({ showEmailSizeExceedsModal: true });
        return;
      }
      if (
        (basketInputObj.customer.CustomerId ||
          basketInputObj.contact.ContactId) &&
        !csvData
      ) {
        let getToken = await GetAuthToken();
        if (token) {
          this.props.setToken(getToken.access_token);
        }
        // console.log("productObject: ", productObject);
        let token = getToken.access_token;

        var activityMessageObject = {
          ActivityType: { value: "AE" },
          ...(basketInputObj.customer.CustomerId && {
            Customer: { value: basketInputObj.customer.CustomerId },
          }),
          ...(basketInputObj.contact.ContactId && {
            Contact: { value: basketInputObj.contact.ContactId },
          }),
          FromEmail: { value: this.state.emailDetails.from },
          ToEmail: { value: this.state.emailDetails.to.join(";") },
          CCEmail: { value: this.state.emailDetails.cc.join(";") },
          BCCEmail: {
            value: [...this.state.emailDetails.bcc, "dev@kwiat.com"].join(";"),
          },
          Message: { value: `${this.state.emailDetails.text}<br>${products}` },
          Subject: { value: this.state.emailDetails.subject },
        };
        var payload = {
          data: {
            defaults: {
              baseURL: basketBaseUrl,
              token: token,
            },
            inputs: activityMessageObject,
          },
        };
        // console.log("payload: ", payload);
        var response = await axios
          .post(ApiBaseUrl + "order", payload, {
            headers: {
              "x-api-key": ApiKey,
            },
          })
          .then((res) => {
            // console.log("resp : ", res);
            // return JSON.parse(res.data.body);
            return res;
          })
          .catch((err) => {
            // console.log("error : ", err);
            console.log("Create Activity error.");
            this.props.toggleLoader({
              isLoading: false,
            });
            return;
          });
        // console.log("response: ", response);
        if (
          response &&
          response.data.statusCode &&
          response.data.statusCode === 200
        ) {
          // if (!products) {
          toast.success(`Activity Created Successfully`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
          this.props.toggleLoader({
            isLoading: false,
          });
          // }
          // return;
        } else {
          toast.error(`Failed To Create Activity`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
          // let token = await GetAuthToken();
          // if (token) {
          //   this.props.setToken(token.access_token);
          // }
          this.props.toggleLoader({
            isLoading: false,
          });
          return;
        }
      } else {
        // toast.error("Customer or Contact required!", {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 2000,
        //   pauseOnHover: false,
        // });
        this.props.toggleLoader({
          isLoading: false,
        });
      }
    } else {
      window.alert("Please fill the compulsory fields");
      this.props.toggleLoader({
        isLoading: false,
      });
    }
  }

  printDoc() {
    // let headerLookBook = $(".layout_second_header_preview");
    // let kwiatFooter = $("#kwiat_footer");
    // console.log("kwiatFooter : ", kwiatFooter);
    // let flFooter = $("#fl_footer");
    // let bridalFooter = $("#bridal_footer");
    // let kwflFooter = $("#kwfl_footer");
    // // console.log("header :", headerLookBook);
    // if (headerLookBook) headerLookBook.remove();
    // if (kwiatFooter) kwiatFooter.css("display", "none");
    // if (flFooter) flFooter.css("display", "none");
    // if (bridalFooter) bridalFooter.css("display", "none");
    // if (kwflFooter) kwflFooter.css("display", "none");
    // console.log("Inside Print Doc Function.");

    // // // // kendo-React library with component
    // this.Content_To_Print.current.save();

    // // // // kendo-React library with method

    // savePDF(this.Div_To_Print.current, {
    //   paperSize: "Letter",
    //   margin: { top: 10, left: 15, right: 15, bottom: 10 },
    //   fileName: "Basket.pdf",
    // });
    // console.log(this.Content_To_Print.current);
    const data = document.getElementById("Doc_To_Print");
    // const data = this.Content_To_Print.current;
    this.props.toggleLoader({
      isLoading: true,
    });
    // console.log("data: ", data);

    // // // // kendo react draw option.

    // console.log("coverType: ", this.props.coverType);

    drawDOM(data, {
      paperSize: "Letter",
      margin: {
        top: "0.75in",
        left: "0.70in",
        right: "0.70in",
        bottom: "0.75in",
      },
      template:
        this.props.layoutType === "LookBook"
          ? (data) => {
              if (this.props.coverType !== "NoCover") {
                if (data.pageNum === 1) {
                  return `
                    <div class="cover_footer">
                      ${
                        this.props.coverType === "Kwiat"
                          ? "KWIAT.COM"
                          : this.props.coverType === "Fred"
                          ? "FREDLEIGHTON.COM"
                          : this.props.coverType === "KWFL"
                          ? "KWIAT.COM / FREDLEIGHTON.COM"
                          : this.props.coverType === "Bridal"
                          ? "KWIAT.COM"
                          : ""
                      } / NEW YORK / LAS VEGAS
                    </div>
                  `;
                } else if (this.props.layoutType === "LookBook") {
                  return `<div>
                  ${
                    0
                      ? `<div class="layout_second_header">
                      ${this.props.basketInputObj.desc}
                   </div>`
                      : `<div />`
                  }
                  <div class="layout_second_footer">
                    <span>
                        ${new Date().toLocaleString("default", {
                          month: "short",
                        })} ${new Date().getFullYear()} - #${
                    this.props.filename
                      ? this.props.filename
                      : this.props.basketInputObj.orderNbr
                  }
                    </span>
                    <span>
                        <img class=${
                          {
                            NoCover: "kwfl",
                            Kwiat: "kwiat",
                            Fred: "fred",
                            KWFL: "kwfl",
                            Bridal: "Bridal",
                          }[this.props.coverType]
                        }
                        src=${
                          {
                            NoCover:
                              "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                            Kwiat:
                              "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                            Fred: "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                            KWFL: "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                            Bridal:
                              "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                          }[this.props.coverType]
                        } />
                        <br />
                        Copyright ${new Date().getFullYear()} All Rights Reserved
                    </span>
                    <span>Page ${data.pageNum - 1}</span>
                  </div>            
              </div>`;
                } else {
                  return ``;
                }
              } else if (this.props.layoutType === "LookBook") {
                return `<div>
                <div class="layout_second_header">
                    ${this.props.basketInputObj.desc}
                </div>
                <div class="layout_second_footer">
                  <span>
                      ${new Date().toLocaleString("default", {
                        month: "short",
                      })} ${new Date().getFullYear()} - #${
                  this.props.filename
                    ? this.props.filename
                    : this.props.basketInputObj.orderNbr
                }
                  </span>
                  <span>
                      <img class="kwfl" src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png" />
                      <br />
                      Copyright ${new Date().getFullYear()} All Rights Reserved
                  </span>
                  <span>Page ${data.pageNum}</span>
                </div>            
            </div>`;
              } else {
                return ``;
              }
            }
          : (data) => ``,
      // scale: 0.7,
    })
      .then((group) => {
        return exportPDF(group);
      })
      .then((dataUri) => {
        // saveAs(dataUri, "export.pdf");
        // console.log("dataUri: ", dataUri);
        // console.log(dataUri.split(";base64,")[1]);
        let fileData = dataUri.split(";base64,")[1];
        let n = fileData.length;
        let y = fileData.endsWith("==") ? 2 : 1;
        let x = n * (3 / 4) - y;
        let sizeLimit = 19922944;
        // console.log("n: ", n, "\ny: ", y, "\nx: ", x);
        if (n >= sizeLimit) {
          this.props.toggleLoader({
            isLoading: false,
          });
          this.setState({ showEmailSizeExceedsModal: true });
          return;
        }
        // let data = window.btoa(dataUri);
        this.sendEmail(fileData);
      });
    // if (kwiatFooter) kwiatFooter.css("display", "block");
    // if (flFooter) flFooter.css("display", "block");
    // if (bridalFooter) bridalFooter.css("display", "block");
    // if (kwflFooter) kwflFooter.css("display", "block");
  }

  downloadPDF() {
    this.Content_To_Print.current.save();
  }

  viewPDF() {
    let { layoutType } = this.props;
    // let headerLookBook = $(".layout_second_header_preview");
    // let kwiatFooter = $("#kwiat_footer");
    // console.log("kwiatFooter : ", kwiatFooter);
    // let flFooter = $("#fl_footer");
    // let bridalFooter = $("#bridal_footer");
    // let kwflFooter = $("#kwfl_footer");
    // // console.log("header :", headerLookBook);
    // if (headerLookBook) headerLookBook.remove();
    // if (kwiatFooter) kwiatFooter.css("display", "none");
    // if (flFooter) flFooter.css("display", "none");
    // if (bridalFooter) bridalFooter.css("display", "none");
    // if (kwflFooter) kwflFooter.css("display", "none");
    const data = document.getElementById("Doc_To_Print");
    drawDOM(data, {
      paperSize: "Letter",
      margin: {
        top: "0.75in",
        left: "0.75in",
        right: "0.75in",
        bottom: "0.75in",
      },
      template:
        layoutType === "LookBook"
          ? (data) => {
              if (this.props.coverType !== "NoCover") {
                if (data.pageNum === 1) {
                  return `return (
                  <div className="cover_footer">
                    ${
                      this.props.coverType === "Kwiat"
                        ? "KWIAT.COM"
                        : this.props.coverType === "Fred"
                        ? "FREDLEIGHTON.COM"
                        : this.props.coverType === "KWFL"
                        ? "KWIAT.COM / FREDLEIGHTON.COM"
                        : this.props.coverType === "Bridal"
                        ? "KWIAT.COM"
                        : ""
                    }{" "}
                    / NEW YORK / LAS VEGAS
                  </div>
                );`;
                } else if (this.props.layoutType === "LookBook") {
                  return `<div>
                  ${
                    0
                      ? `<div class="layout_second_header">
                      ${this.props.basketInputObj.desc}
                   </div>`
                      : `<div />`
                  }
                <div class="layout_second_footer">
                  <span>
                      ${new Date().toLocaleString("default", {
                        month: "short",
                      })} ${new Date().getFullYear()} - #${
                    this.props.filename
                      ? this.props.filename
                      : this.props.basketInputObj.orderNbr
                  }
                  </span>
                  <span>
                      <img class=${
                        {
                          NoCover: "kwfl",
                          Kwiat: "kwiat",
                          Fred: "fred",
                          KWFL: "kwfl",
                          Bridal: "Bridal",
                        }[this.props.coverType]
                      }
                      src=${
                        {
                          NoCover:
                            "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                          Kwiat:
                            "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                          Fred: "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                          KWFL: "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                          Bridal:
                            "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                        }[this.props.coverType]
                      } />
                      <br />
                      Copyright ${new Date().getFullYear()} All Rights Reserved
                  </span>
                  <span>Page ${data.pageNum - 1}</span>
                </div>            
            </div>`;
                } else {
                  return ``;
                }
              } else if (this.props.layoutType === "LookBook") {
                return `<div>
              <div class="layout_second_header">
                  ${this.props.basketInputObj.desc}
              </div>
              <div class="layout_second_footer">
                <span>
                    ${new Date().toLocaleString("default", {
                      month: "short",
                    })} ${new Date().getFullYear()} - #${
                  this.props.filename
                    ? this.props.filename
                    : this.props.basketInputObj.orderNbr
                }
                </span>
                <span>
                    <img class="kwfl" src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png" />
                    <br />
                    Copyright ${new Date().getFullYear()} All Rights Reserved
                </span>
                <span>Page ${data.pageNum}</span>
              </div>            
          </div>`;
              } else {
                return ``;
              }
            }
          : (data) => ``,
      // scale: 0.7,
    })
      .then((group) => {
        return exportPDF(group);
      })
      .then((dataUri) => {
        // saveAs(dataUri, "export.pdf");
        // console.log("dataUri: ", dataUri);
        let fileData = dataUri.split(";base64,")[1];
        let pdfWindow = window.open("");
        pdfWindow.document.write(
          "<iframe width='100%' height='99.5%' src='data:application/pdf;base64," +
            encodeURI(fileData) +
            "'></iframe>"
        );

        // window.open("data:application/pdf;base64, " + encodeURI(dataUri));

        // window.open(
        //   "data:application/octet-stream;charset=utf-16le;base64," + dataUri
        // );
      });
    // if (kwiatFooter) kwiatFooter.css("display", "block");
    // if (flFooter) flFooter.css("display", "block");
    // if (bridalFooter) bridalFooter.css("display", "block");
    // if (kwflFooter) kwflFooter.css("display", "block");
  }

  showWebImage(img) {
    var src =
      "https://cdn4.kwiat.com/source-images/web/altviews/" +
      img.replace(/\.[^.]*$/, "") +
      "-altview@2x.jpg";
    return src;
  }
  showimage(image) {
    var str, img;
    if (image && image != null) {
      let searchimage;
      searchimage = image;
      str = searchimage.split("\\");
      searchimage = str[str.length - 1].replace(/icon/g, "search");
      searchimage = searchimage.replace(/Icon/g, "search");
      img = "https://cdn.kwiat.com/source-images/search/" + searchimage;
    } else {
      img = "";
    }
    return img;
  }

  thumbnailImage(res) {
    // console.log("e : ", e.target);
    var src = false;
    if (
      res.SerialVideoLink &&
      res.SerialVideoLink.includes("/v360/") &&
      res.IconImageName &&
      res.IconImageName.includes("still")
    ) {
      var productId = res.SerialVideoLink.match("imaged/(.*)/")[1];
      src = `https://cdn.kwiat.com/kwiat/v360/imaged/${productId}/still.jpg`;
    } else if (res.WebImage1) {
      src = this.showWebImage(res.WebImage1);
    } else if (res.IconImageName) {
      src = this.showimage(res.IconImageName);
    }
    return src;
  }

  showZoomImage(res, eventPosition) {
    function showWebImage(img) {
      var src = "https://cdn4.kwiat.com/source-images/web/original/" + img;
      return src;
    }
    function showimage(image) {
      let img,
        str = "";
      if (image && image != null) {
        let searchimage;
        searchimage = image;
        str = searchimage.split("\\");
        searchimage = str[str.length - 1];
        img = "https://cdn.kwiat.com/source-images/large/" + searchimage;
      } else {
        img = "";
      }
      return img;
    }
    const webImgName = (img) => img.replace(/ /g, "");
    const largeImgName = (img) => {
      var str = img.split("\\");
      return str[str.length - 1];
    };

    var imgArr = [];
    if (eventPosition === "onWebImageIcon") {
      imgArr.push({
        original: showWebImage(res.WebImage1),
        thumbnail: showWebImage(res.WebImage1),
        imgName: webImgName(res.WebImage1),
      });
    } else {
      if (res.LargeImageName) {
        imgArr.push({
          original: showimage(res.LargeImageName),
          thumbnail: showimage(res.LargeImageName),
          imgName: largeImgName(res.LargeImageName),
        });
      }
      for (let i = 1; i < 6; i++) {
        var field = "WebImage" + i;
        if (res[field]) {
          imgArr.push({
            original: showWebImage(res[field]),
            thumbnail: showWebImage(res[field]),
            imgName: webImgName(res[field]),
          });
        }
      }
    }
    this.setState({
      showImageModal: true,
      zoomImage: imgArr,
    });
  }

  showDiaImage(image) {
    var img, str;
    if (image && image != null) {
      img = image;
      str = img.split("=");
      if (str[1] && str[1].trim() === "") {
        img = "";
        str = "";
      }
    } else {
      img = "";
      str = "";
    }
    return img;
  }

  diaIcon(shape) {
    var img;
    if (shape && shape != null) {
      img =
        "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
        shape +
        ".svg";
    }
    return img;
  }

  render() {
    let {
      show,
      cartItems,
      basketInputObj,
      layoutType,
      coverType,
      item,
      selectedItems,
      includeGIA,
      csvData,
      csvRenderData,
      handleCsvData,
      handleCsvRenderData,
    } = this.props;
    let { isLoading } = this.props.loaderActions;
    let { margin, emailDetails } = this.state;
    let cartDetails = item
      ? item
      : selectedItems && selectedItems.length
      ? selectedItems
      : cartItems.items;

    // console.log("layout type: ", layoutType);
    // console.log("csvRenderData :", csvRenderData);
    return (
      <>
        <Modal
          show={show}
          size="lg"
          onHide={() => {
            this.onModalHide();
            handleCsvData("");
            handleCsvRenderData("");
          }}
          animation={false}
          // dialogClassName="email_modal"
          className="email_modal"
          // className="preview-details-modal"
          aria-labelledby="contained-modal-title-vcenter"
          backdrop="static"
          id="preview-modal"
        >
          {/* <LoadingOverlay active={isLoading} spinner text="Loading..."> */}
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Basket Preview
            </Modal.Title>
            <div className="email_modal_header">
              <div className="lookbook_options">
                {basketInputObj.includeRetail ? (
                  <div className="price_label_checkbox_wrapper">
                    <h4>Price Label:</h4>
                    <div className="price_label_toggle">
                      <input
                        type="radio"
                        id="Price"
                        name="price_label_options"
                        value="Price"
                        checked={
                          this.state.priceLabel === "Price" ? true : false
                        }
                        onChange={(e) =>
                          // console.log("value : ", e.target.value);
                          this.setState({ priceLabel: e.target.value })
                        }
                      />
                      <label htmlFor="Price">Price</label>
                    </div>
                    <div className="price_label_toggle">
                      <input
                        type="radio"
                        id="MSRP"
                        name="price_label_options"
                        value="MSRP"
                        checked={
                          this.state.priceLabel === "MSRP" ? true : false
                        }
                        onChange={(e) =>
                          // console.log("value : ", e.target.value);
                          this.setState({ priceLabel: e.target.value })
                        }
                      />
                      <label htmlFor="MSRP">MSRP</label>
                    </div>
                  </div>
                ) : (
                  ``
                )}
                {layoutType === "LookBook" ? (
                  <>
                    {" "}
                    <div className="item_No_checkbox_wrapper">
                      <h4># per PDF page:</h4>
                      <div className="item_No_toggle">
                        <input
                          type="radio"
                          id="9_items"
                          name="item_options"
                          value="9"
                          checked={this.state.items === "9" ? true : false}
                          onChange={(e) => {
                            console.log("value : ", e.target.value);
                            this.setState({ items: e.target.value });
                          }}
                        />
                        <label htmlFor="9_items">9</label>
                      </div>
                      <div className="item_No_toggle">
                        <input
                          type="radio"
                          id="6_items"
                          name="item_options"
                          value="6"
                          checked={this.state.items === "6" ? true : false}
                          onChange={(e) => {
                            console.log("value : ", e.target.value);
                            this.setState({ items: e.target.value });
                          }}
                        />
                        <label htmlFor="6_items">6</label>
                      </div>
                    </div>
                    <div className="include_stones_checkbox">
                      <input
                        type="checkbox"
                        id="stone_check"
                        checked={this.state.includeStoneValues}
                        onChange={(e) =>
                          this.setState({
                            includeStoneValues: e.target.checked,
                          })
                        }
                      />
                      <label htmlFor="stone_check">Include Stone Details</label>
                    </div>{" "}
                    <div className="include_location_checkbox">
                      <input
                        type="checkbox"
                        id="location_check"
                        checked={this.state.includeLocation}
                        onChange={(e) =>
                          this.setState({ includeLocation: e.target.checked })
                        }
                      />
                      <label htmlFor="location_check">Include Location </label>
                    </div>
                  </>
                ) : (
                  ``
                )}
                {cartDetails && cartDetails.length <= 40 ? (
                  <div className="price_label_checkbox_wrapper">
                    <div className="price_label_toggle">
                      <input
                        type="checkbox"
                        id="PDF_Attachment"
                        checked={this.state.pdfAttachments}
                        onChange={(e) =>
                          this.setState({ pdfAttachments: e.target.checked })
                        }
                      />
                      <label htmlFor="PDF_Attachment">PDF Attachment</label>
                    </div>
                    <div className="price_label_toggle">
                      <input
                        type="checkbox"
                        id="Items_in_Email_Body"
                        checked={this.state.itemsInEmailBody}
                        onChange={(e) =>
                          this.setState({ itemsInEmailBody: e.target.checked })
                        }
                      />
                      <label htmlFor="Items_in_Email_Body">
                        Items in Email Body
                      </label>
                    </div>
                  </div>
                ) : (
                  ``
                )}
              </div>

              {/* <div className="action-buttons">
              <button className="email" onClick={() => this.printDoc()}>
                Download PDF
              </button>
              <button className="back" onClick={() => this.handleBack()}>
                Back
              </button>
            </div> */}
            </div>
          </Modal.Header>
          <Modal.Body id="preview-modal">
            {/* <h4>Email Details:</h4> */}
            <div className="basket__input__wrapper">
              <div className="basket__input">
                <label>
                  <p>*</p> To:
                </label>

                <ReactMultiEmail
                  ref={this.emailTo}
                  // style={myStyle}
                  emails={emailDetails.to && emailDetails.to}
                  onChange={(_emails) => {
                    this.setState((prevState) => ({
                      emailDetails: {
                        ...prevState.emailDetails,
                        to: _emails,
                      },
                    }));
                    // this.handleTabChange(_emails);
                  }}
                  getLabel={(email, index, removeEmail) => {
                    return (
                      <label key={index}>
                        {email}
                        <span
                          data-tag-handle
                          onClick={() => removeEmail(index)}
                        >
                          ×
                        </span>
                      </label>
                    );
                  }}
                  // onKeyDown={(e) => this.handleTabChange(e)}
                />
              </div>
              <div className="basket__input">
                <label>CC: </label>

                <ReactMultiEmail
                  // style={myStyle}
                  emails={emailDetails.cc && emailDetails.cc}
                  onChange={(_emails) => {
                    this.setState((prevState) => ({
                      emailDetails: {
                        ...prevState.emailDetails,
                        cc: _emails,
                      },
                    }));
                  }}
                  getLabel={(email, index, removeEmail) => {
                    return (
                      <label key={index}>
                        {email}
                        <span
                          data-tag-handle
                          onClick={() => removeEmail(index)}
                        >
                          ×
                        </span>
                      </label>
                    );
                  }}
                />
              </div>
              <div className="basket__input">
                <label>Bcc: </label>
                <ReactMultiEmail
                  // style={myStyle}
                  // defaultValue={[]}
                  emails={emailDetails.bcc && emailDetails.bcc}
                  onChange={(_emails) => {
                    this.setState((prevState) => ({
                      emailDetails: {
                        ...prevState.emailDetails,
                        bcc: _emails,
                      },
                    }));
                  }}
                  getLabel={(email, index, removeEmail) => {
                    return (
                      <label key={index}>
                        {email}
                        <span
                          data-tag-handle
                          onClick={() => removeEmail(index)}
                        >
                          ×
                        </span>
                      </label>
                    );
                  }}
                />
              </div>
              <div className="basket__input">
                <label>
                  <p>*</p> Subject:
                </label>
                <input
                  type="text"
                  // placeholder="Subject"
                  value={emailDetails.subject || ""}
                  onChange={(e) => {
                    e.persist();
                    // let { value } = e.target;
                    this.setState((prevState) => ({
                      emailDetails: {
                        ...prevState.emailDetails,
                        subject: e.target.value,
                      },
                    }));
                    // this.handleSubject(e.target.value);
                  }}
                />
              </div>
              <div className="basket__input">
                <label>
                  <p>*</p> Message:
                </label>
                <ReactQuill
                  ref={(el) => {
                    this.reactQuillRef = el;
                  }}
                  theme="snow"
                  value={emailDetails.text}
                  onChange={(content, delta, source, editor) =>
                    this.handleText(content, editor)
                  }
                />
              </div>
            </div>
            <div className="email_modal_header">
              <div className="action-buttons">
                <button
                  className="clear"
                  onClick={() => {
                    if (!csvData) {
                      this.handleBack();
                    } else {
                      this.onModalHide();
                      handleCsvData("");
                      handleCsvRenderData("");
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  className="email"
                  onClick={() => {
                    !csvData ? this.printDoc() : this.sendEmail(csvData);
                  }}
                >
                  Email
                </button>
              </div>
            </div>
            <hr className="divider" />
            <div className="preview-header">
              <h4 style={csvData ? { width: "70%" } : {}}>Preview: </h4>
              {!csvData ? (
                <button className="email" onClick={() => this.viewPDF()}>
                  View PDF
                </button>
              ) : (
                <CSVDownloader
                  className="csv-link"
                  data={csvRenderData}
                  type="button"
                  filename="Basket_Items"
                  // ref={this.csvLink}
                  bom={true}
                  config={{}}
                >
                  Download Csv File
                </CSVDownloader>
                // <button onClick={() => this.viewCsvFile(csvRenderData)}>
                //   View Csv Data
                // </button>
              )}
            </div>
            {/* {cartDetails && cartDetails.length <= 40 ? (
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.activeTabKey}
                onSelect={(k) => this.setState({ activeTabKey: k })}
                className="mb-3"
              >
                <Tab eventKey="email_body_items" title="Email Body Items">
                  <div className="email_body_items">
                    <div
                      style={{
                        textAlign: "left",
                        width: "505px",
                        // margin: "auto",
                      }}
                    >
                      {cartDetails &&
                        cartDetails.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              textAlign: "center",
                              maxWidth: "600px",
                              // marginBottom: "25px !important",
                              maxHeight: "600px",
                              // fontsize: "6px",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              {basketInputObj.includeLinks ===
                                "Web or Internal Imagery" &&
                              item.webProductURL &&
                              item.webProductURL !== "" &&
                              item.webProductURL !== null &&
                              ((item.linkVisibility &&
                                item.linkVisibility === "Default") ||
                                !item.linkVisibility) ? (
                                <a
                                  href={item.webProductURL}
                                  style={{ width: "100%" }}
                                  target="_blank"
                                >
                                  <img
                                    style={{ width: "100%" }}
                                    src={this.handleImage(item)}
                                    onError={(event) => {
                                      event.target.src =
                                        "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                                    }}
                                  />
                                </a>
                              ) : basketInputObj.includeLinks ===
                                  "ONLY Web Imagery" &&
                                item.hasWebImage &&
                                item.hasWebImage === "1" &&
                                item.webProductURL &&
                                item.webProductURL !== "" &&
                                item.webProductURL !== null &&
                                ((item.linkVisibility &&
                                  item.linkVisibility === "Default") ||
                                  !item.linkVisibility) ? (
                                <a
                                  href={item.webProductURL}
                                  style={{ width: "100%" }}
                                  target="_blank"
                                >
                                  <img
                                    style={{ width: "100%" }}
                                    src={this.handleImage(item)}
                                    onError={(event) => {
                                      event.target.src =
                                        "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                                    }}
                                  />
                                </a>
                              ) : (
                                <a
                                  href={this.handleImage(item)}
                                  style={{ width: "100%" }}
                                  target="_blank"
                                >
                                  <img
                                    style={{ width: "100%" }}
                                    src={this.handleImage(item)}
                                    onError={(event) => {
                                      event.target.src =
                                        "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                                    }}
                                  />
                                </a>
                              )}
                            </div>
                            {item.Description ? (
                              <div style={{ marginTop: "10px" }}>
                                {item.Description}
                              </div>
                            ) : (
                              ``
                            )}
                            {item.SerialNumber || item.StyleNumber ? (
                              <div>
                                {item.StyleNumber && item.SerialNumber
                                  ? item.StyleNumber + " | " + item.SerialNumber
                                  : item.StyleNumber
                                  ? item.StyleNumber
                                  : item.SerialNumber
                                  ? item.SerialNumber
                                  : ``}
                              </div>
                            ) : (
                              ``
                            )}
                            {item.Metal ? <div>{item.Metal}</div> : ``}
                            {item.InternalNote ? (
                              <div>
                                {item.InternalNote && item.InternalNote !== ""
                                  ? `Notes: ${item.InternalNote}`
                                  : ``}
                              </div>
                            ) : (
                              ``
                            )}
                            {this.state.includeStoneValues ? (
                              <div>
                                {item.DiamondCarats ||
                                item.Color ||
                                item.Clarity ||
                                item.ColorCarats
                                  ? `${
                                      item.DiamondCarats
                                        ? ` ${item.DiamondCarats} carats,`
                                        : ""
                                    }
                      ${item.Color ? ` ${item.Color} color,` : ""}
                      ${item.Clarity ? ` ${item.Clarity} clarity.` : ""} 
                      ${item.ColorCarats ? `${item.ColorCarats} carats.` : ""}`
                                  : ``}
                              </div>
                            ) : (
                              ``
                            )}

                            <div style={{ marginBottom: "10px" }}>
                              {basketInputObj.includeRetail &&
                              (item.priceVisibility === "Default" ||
                                item.priceVisibility ===
                                  "Hide Wholesale Price" ||
                                !item.priceVisibility) &&
                              (basketInputObj.includeWholesale &&
                                (item.priceVisibility === "Default" ||
                                  item.priceVisibility ===
                                    "Hide Retail Price" ||
                                  !item.priceVisibility)) &&
                              (item.RetailPrice &&
                                parseInt(item.RetailPrice) > 0) &&
                              (item.WholesalePrice &&
                                parseInt(item.WholesalePrice) > 0)
                                ? `${
                                    this.state.priceLabel === "Price"
                                      ? "Price"
                                      : "MSRP"
                                  } : ${currencyFormatter.format(
                                    `${item.RetailPrice}`,
                                    {
                                      code: "USD",
                                      precision: 0,
                                    }
                                  )} | Wholesale : ${(item.WholesalePrice &&
                                    currencyFormatter.format(
                                      `${item.WholesalePrice}`,
                                      {
                                        code: "USD",
                                        precision: 0,
                                      }
                                    )) ||
                                    "$0"}`
                                : basketInputObj.includeWholesale &&
                                  (item.priceVisibility === "Default" ||
                                    item.priceVisibility ===
                                      "Hide Retail Price" ||
                                    !item.priceVisibility) &&
                                  (item.WholesalePrice &&
                                    parseInt(item.WholesalePrice) > 0)
                                ? `Wholesale : ${(item.WholesalePrice &&
                                    currencyFormatter.format(
                                      `${item.WholesalePrice}`,
                                      {
                                        code: "USD",
                                        precision: 0,
                                      }
                                    )) ||
                                    "$0"}`
                                : basketInputObj.includeRetail &&
                                  (item.priceVisibility === "Default" ||
                                    item.priceVisibility ===
                                      "Hide Wholesale Price" ||
                                    !item.priceVisibility) &&
                                  (item.RetailPrice &&
                                    parseInt(item.RetailPrice) > 0)
                                ? `${
                                    this.state.priceLabel === "Price"
                                      ? "Price"
                                      : "MSRP"
                                  } : ${(item.RetailPrice &&
                                    currencyFormatter.format(
                                      `${item.RetailPrice}`,
                                      {
                                        code: "USD",
                                        precision: 0,
                                      }
                                    )) ||
                                    "$0"}`
                                : ``}{" "}
                              {basketInputObj.includeLinks ===
                                "Web or Internal Imagery" &&
                              item.webProductURL &&
                              item.webProductURL !== "" &&
                              item.webProductURL !== null &&
                              ((item.linkVisibility &&
                                item.linkVisibility === "Default") ||
                                !item.linkVisibility) ? (
                                <a href={item.webProductURL}>view online</a>
                              ) : basketInputObj.includeLinks ===
                                  "ONLY Web Imagery" &&
                                item.hasWebImage &&
                                item.hasWebImage === "1" &&
                                item.webProductURL &&
                                item.webProductURL !== "" &&
                                item.webProductURL !== null &&
                                ((item.linkVisibility &&
                                  item.linkVisibility === "Default") ||
                                  !item.linkVisibility) ? (
                                <a href={item.webProductURL}>view online</a>
                              ) : (
                                ``
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="pdf_attachments" title="PDF Attachments">
                  <h5>PDF Attachment:</h5>
                  <PDFExport
                    ref={this.Content_To_Print}
                    paperSize="Letter"
                    margin={{
                      top: "0.75in",
                      left: "0.75in",
                      right: "0.75in",
                      bottom: "0.75in",
                    }}
                    // scale={1}
                    fileName={`${
                      this.props.filename
                        ? this.props.filename
                        : basketInputObj.contact.DisplayName
                        ? basketInputObj.contact.DisplayName
                        : basketInputObj.customer.Customer
                        ? basketInputObj.customer.Customer
                        : "KWFL"
                    } - ${this.getCurrentDate()}`}
                    // date={new Date()}
                    pageTemplate={
                      this.handlePageTemplate
                      // layoutType === "LookBook"
                      //   ? this.handleSecondPageTemplate
                      //   : this.handleEmptyPageTemplate
                    }
                  >
                    <div
                      className="basket_preview"
                      id="Doc_To_Print"
                      ref={this.Div_To_Print}
                      // ref={(el) => (this.componentRef = el)}
                      style={{ fontSize: "small" }}
                    >
                      {
                        {
                          NoCover: "",
                          Kwiat: <Kwiat />,
                          Fred: <FredLeighton />,
                          KWFL: <CoBrandedKWFL />,
                          Bridal: <Bridal />,
                        }[coverType]
                      }
                     
                      {
                        {
                          // DetailLayout: (
                          //   <DetailLayout
                          //     basketDetails={basketInputObj}
                          //     cartDetails={cartItems.items}
                          //     showZoomImage={this.showZoomImage}
                          //     showDiaImage={this.showDiaImage}
                          //     thumbnailImage={this.thumbnailImage}
                          //     diaIcon={this.diaIcon}
                          //   />
                          // ),
                          // MinDetailLayout: (
                          //   <MinDetailLayout
                          //     basketDetails={basketInputObj}
                          //     cartDetails={cartItems.items}
                          //     showZoomImage={this.showZoomImage}
                          //     showDiaImage={this.showDiaImage}
                          //     thumbnailImage={this.thumbnailImage}
                          //     diaIcon={this.diaIcon}
                          //   />
                          // ),
                          ProductBrochure: (
                            <ProductBrochure
                              basketDetails={basketInputObj}
                              cartDetails={
                                item
                                  ? item
                                  : selectedItems && selectedItems.length
                                  ? selectedItems
                                  : cartItems.items
                              }
                              showZoomImage={this.showZoomImage}
                              showDiaImage={this.showDiaImage}
                              thumbnailImage={this.thumbnailImage}
                              diaIcon={this.diaIcon}
                              includeGIA={includeGIA}
                            />
                          ),
                          LookBook: (
                            <LookBook
                              basketDetails={basketInputObj}
                              cartDetails={
                                item
                                  ? item
                                  : selectedItems && selectedItems.length
                                  ? selectedItems
                                  : cartItems.items
                              }
                              showZoomImage={this.showZoomImage}
                              showDiaImage={this.showDiaImage}
                              thumbnailImage={this.thumbnailImage}
                              diaIcon={this.diaIcon}
                              includeGIA={includeGIA}
                              coverType={coverType}
                              items={this.state.items}
                              includeStoneValues={this.state.includeStoneValues}
                              priceLabel={this.state.priceLabel}
                              handleImage={this.handleImage}
                            />
                          ),
                        }[layoutType]
                      }

                     
                    </div>
                  </PDFExport>
                </Tab>
              </Tabs>
            ) : ( */}
            {!csvData ? (
              <>
                <PDFExport
                  ref={this.Content_To_Print}
                  paperSize="Letter"
                  margin={{
                    top: "0.75in",
                    left: "0.75in",
                    right: "0.75in",
                    bottom: "0.75in",
                  }}
                  // scale={1}
                  fileName={`${
                    this.props.filename
                      ? this.props.filename
                      : basketInputObj.contact.DisplayName
                      ? basketInputObj.contact.DisplayName
                      : basketInputObj.customer.Customer
                      ? basketInputObj.customer.Customer
                      : "KWFL"
                  } - ${this.getCurrentDate()}`}
                  // date={new Date()}
                  pageTemplate={
                    this.handlePageTemplate
                    // layoutType === "LookBook"
                    //   ? this.handleSecondPageTemplate
                    //   : this.handleEmptyPageTemplate
                  }
                >
                  <div
                    className="basket_preview"
                    id="Doc_To_Print"
                    ref={this.Div_To_Print}
                    // ref={(el) => (this.componentRef = el)}
                    style={{ fontSize: "small" }}
                  >
                    {
                      {
                        NoCover: "",
                        Kwiat: <Kwiat />,
                        Fred: <FredLeighton />,
                        KWFL: <CoBrandedKWFL />,
                        Bridal: <Bridal />,
                      }[coverType]
                    }

                    {
                      {
                        ProductBrochure: (
                          <ProductBrochure
                            basketDetails={basketInputObj}
                            cartDetails={
                              item
                                ? item
                                : selectedItems && selectedItems.length
                                ? selectedItems
                                : cartItems.items
                            }
                            showZoomImage={this.showZoomImage}
                            showDiaImage={this.showDiaImage}
                            thumbnailImage={this.thumbnailImage}
                            diaIcon={this.diaIcon}
                            includeGIA={includeGIA}
                          />
                        ),
                        LookBook: (
                          <LookBook
                            basketDetails={basketInputObj}
                            cartDetails={
                              item
                                ? item
                                : selectedItems && selectedItems.length
                                ? selectedItems
                                : cartItems.items
                            }
                            showZoomImage={this.showZoomImage}
                            showDiaImage={this.showDiaImage}
                            thumbnailImage={this.thumbnailImage}
                            diaIcon={this.diaIcon}
                            includeGIA={includeGIA}
                            coverType={coverType}
                            items={this.state.items}
                            includeStoneValues={this.state.includeStoneValues}
                            includeLocation={this.state.includeLocation}
                            priceLabel={this.state.priceLabel}
                            handleImage={this.handleImage}
                          />
                        ),
                      }[layoutType]
                    }
                  </div>
                </PDFExport>
                {/* )} */}

                {layoutType === "LookBook" ? (
                  <div className="layout_second_footer_preview">
                    <span>
                      {new Date().toLocaleString("default", { month: "short" })}{" "}
                      {new Date().getFullYear()} - #
                      {this.props.filename
                        ? this.props.filename
                        : this.props.basketInputObj.orderNbr}
                    </span>
                    <span>
                      <img
                        className={
                          {
                            NoCover: "kwfl",
                            Kwiat: "kwiat",
                            Fred: "fred",
                            KWFL: "kwfl",
                            Bridal: "Bridal",
                          }[this.props.coverType]
                        }
                        src={
                          {
                            NoCover:
                              "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                            Kwiat:
                              "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                            Fred: "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                            KWFL: "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                            Bridal:
                              "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                          }[this.props.coverType]
                        }
                      />
                      <br /> Copyright {new Date().getFullYear()} All Rights
                      Reserved
                    </span>
                    <span>Page</span>
                  </div>
                ) : (
                  ``
                )}
              </>
            ) : (
              <div className="csvData_container">
                <Table>
                  <thead>
                    <tr>
                      {
                        csvRenderData &&
                          // console.log(
                          //   csvRenderData
                          //     .map((data) => ({
                          //       length: Object.keys(data).length,
                          //       fields: Object.keys(data),
                          //     }))
                          //     .find(
                          //       (data) =>
                          //         data.length ===
                          //         Math.max.apply(
                          //           Math,
                          //           csvRenderData
                          //             .map((data) => ({
                          //               length: Object.keys(data).length,
                          //               fields: Object.keys(data),
                          //             }))
                          //             .map((o) => o.length)
                          //         )
                          //     )
                          // )
                          csvRenderData
                            .map((data) => ({
                              length: Object.keys(data).length,
                              fields: Object.keys(data),
                            }))
                            .find(
                              (data) =>
                                data.length ===
                                Math.max.apply(
                                  Math,
                                  csvRenderData
                                    .map((data) => ({
                                      length: Object.keys(data).length,
                                      fields: Object.keys(data),
                                    }))
                                    .map((o) => o.length)
                                )
                            )
                            .fields.map((field, index) => (
                              <th key={index}>{field}</th>
                            ))

                        // Object.keys(csvRenderData[0]).map((key, index) => (
                        //   <th key={index}>{key}</th>
                        // ))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    {csvRenderData &&
                      csvRenderData.map((data, index) => (
                        <tr key={50 + index}>
                          {Object.keys(data).map((key, index) => (
                            <td key={100 + index}>
                              {key === "RetailPrice" || key === "WholesalePrice"
                                ? currencyFormatter.format(`${data[key]}`, {
                                    code: "USD",
                                    precision: 0,
                                  })
                                : data[key]}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              // <></>
            )}
          </Modal.Body>
          {/* </LoadingOverlay> */}
          <button onClick={this.scrollToTop}>
            <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/arrow-141-32.png" />
          </button>
        </Modal>
        <Modal
          animation={false}
          autoFocus={false}
          enforceFocus={false}
          className="show_alert_modal"
          centered="true"
          size="sm"
          show={this.state.showEmailSizeExceedsModal}
          onHide={() => this.setState({ showEmailSizeExceedsModal: false })}
        >
          <Modal.Header closeButton>PDF attachment size alert.</Modal.Header>
          <Modal.Body>
            <div>
              The size of the pdf attachment exceeds the maximum size limit.
              Please{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  this.downloadPDF();
                  return false;
                }}
              >
                download
              </a>{" "}
              the pdf attachment and send through external mail.
            </div>
          </Modal.Body>
        </Modal>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewEmailModal);
