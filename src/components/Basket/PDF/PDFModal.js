import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
// import currencyFormatter from "currency-formatter";
import ProductBrochure from "../PDF_Layouts/Product Brochure/ProductBrochure";
import LookBook from "../PDF_Layouts/Look Book/LookBook";
import DetailLayout from "../PDF_Layouts/Detail Layout/DetailLayout";
import MinDetailLayout from "../PDF_Layouts/Min Detail Layout/MinDetailLayout";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import arrow from "../../../assets/icons/arrow-141-32.png";
import Kwiat from "../PDF Covers/Kwiat/Kwiat";
import FredLeighton from "../PDF Covers/Fred Leighton/FredLeighton";
import CoBrandedKWFL from "../PDF Covers/Co Branded KWFL/CoBrandedKWFL";
import Bridal from "../PDF Covers/Bridal/Bridal";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
  };
};

class PDFModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTemplate: "",
      is_visible: false,
      items: "9",
      includeStoneValues: false,
      priceLabel: "Price",
      includeLocation: false,
    };
    this.Content_To_Print = React.createRef(null);
    this.Div_To_Print = React.createRef();
    this.onModalHide = this.onModalHide.bind(this);
    this.printDoc = this.printDoc.bind(this);
    this.thumbnailImage = this.thumbnailImage.bind(this);
    this.showZoomImage = this.showZoomImage.bind(this);
    this.showDiaImage = this.showDiaImage.bind(this);
    this.diaIcon = this.diaIcon.bind(this);
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handlePageTemplate = this.handlePageTemplate.bind(this);
    // this.handleEmptyPageTemplate = this.handleEmptyPageTemplate.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  componentDidMount() {
    // $(document).on("scroll", function() {
    //   console.log("preview top: ", $("#preview-modal").scrollTop());
    //   if ($("#preview-modal").scrollTop() < 100) {
    //     $(".scroll_top").css({ opacity: 0 });
    //   } else {
    //     $(".scroll_top").css({ opacity: 1 });
    //   }
    // });
    // document.querySelector("scroll_top").style.opacity = 1;
  }

  // componentWillUnmount() {
  //   Events.scrollEvent.remove("begin");
  //   Events.scrollEvent.remove("end");
  // }

  scrollToTop() {
    // scroll.scrollToTop();
    let element = document.getElementById("preview-modal");
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  // handleEmptyPageTemplate(props) {
  //   return <div />;
  // }

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
                      Fred:
                        "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                      KWFL:
                        "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
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

  onModalHide() {
    let { hide } = this.props;
    this.setState(() => {
      hide && hide();
    });
  }

  handleBack() {
    this.onModalHide();
    this.props.showChooseLayout("Print");
    if (this.props.item) {
      this.props.handleCurrentRes(this.props.item[0]);
    }
  }

  async printDoc() {
    // let headerLookBook = $(".layout_second_header_preview");
    // let kwiatFooter = $("#kwiat_footer");
    // // let kwiatFooter = document.getElementById("kwiat_footer");
    // console.log("kwiatFooter : ", kwiatFooter);
    // let flFooter = $("#fl_footer");
    // let bridalFooter = $("#bridal_footer");
    // let kwflFooter = $("#kwfl_footer");
    // // console.log("header :", headerLookBook);
    // if (headerLookBook) headerLookBook.css("display", "none");
    // // if (kwiatFooter) kwiatFooter.style.display = "none";
    // if (kwiatFooter) kwiatFooter.css("display", "none");
    // if (flFooter) flFooter.css("display", "none");
    // if (bridalFooter) bridalFooter.css("display", "none");
    // if (kwflFooter) kwflFooter.css("display", "none");

    // setTimeout(() => {
    //   this.Content_To_Print.current.save();
    // }, 3000);

    // console.log("Inside Print Doc Function.");

    // // // // kendo-React library with component

    await this.Content_To_Print.current.save();

    // // // // kendo-React library with method

    // savePDF(this.Div_To_Print.current, {
    //   paperSize: "Letter",
    //   margin: { top: 10, left: 15, right: 15, bottom: 10 },
    //   fileName: "Basket.pdf",
    // });

    // const data = document.getElementById("Doc_To_Print");
    // this.props.toggleLoader({
    //   isLoading: true,
    // });
    // // console.log("data: ", data);

    // // // // // kendo react draw option.

    // drawDOM(data, {
    //   paperSize: "Letter",
    //   margin: this.state.margin,
    //   scale: 0.6,
    // })
    //   .then((group) => {
    //     return exportPDF(group);
    //   })
    //   .then((dataUri) => {
    //     // console.log(dataUri.split(";base64,")[1]);
    //     let fileData = dataUri.split(";base64,")[1];
    //     this.sendEmail(fileData);
    //   });

    // if (headerLookBook) headerLookBook.css("display", "block");
    // if (kwiatFooter) kwiatFooter.css("display", "block");
    // // if (kwiatFooter) kwiatFooter.style.display = "block";
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
      // console.log("Inside shape");
      let imageurl =
        "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
        item.Shape +
        ".jpg";
      return imageurl;
    } else if (item.LargeImageName) {
      // console.log("Inside Large Image Name");
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
    } = this.props;

    // console.log("basketInputObj: ", basketInputObj);
    // console.log("cartItems: ", cartItems);
    // console.log("coverType : ", coverType);
    // console.log("item : ", item);

    return (
      <Modal
        show={show}
        size="lg"
        onHide={() => this.onModalHide()}
        animation={false}
        // dialogClassName="preview_modal"
        className="pdf_modal"
        // className="preview-details-modal"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        id="preview-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Basket Preview
          </Modal.Title>
          <div className="pdf_modal_header">
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
                      checked={this.state.priceLabel === "Price" ? true : false}
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
                      checked={this.state.priceLabel === "MSRP" ? true : false}
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
                    <h4># per page:</h4>
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
                        this.setState({ includeStoneValues: e.target.checked })
                      }
                    />
                    <label htmlFor="stone_check">Include Stone Details</label>
                  </div>
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
            </div>

            <div className="action-buttons">
              <button className="email" onClick={() => this.printDoc()}>
                Download PDF
              </button>
              <button className="back" onClick={() => this.handleBack()}>
                Back
              </button>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {/* {layoutType === "LookBook" ? (
            <div className="layout_second_header_preview">
              {this.props.basketInputObj.desc}
            </div>
          ) : (
            ``
          )} */}
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
              {/* {layoutType === "LookBook" ? (
                <div className="layout_second_header_preview">
                  {this.props.basketInputObj.desc}
                </div>
              ) : (
                ``
              )} */}

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
                      includeLocation={this.state.includeLocation}
                      priceLabel={this.state.priceLabel}
                      handleImage={this.handleImage}
                    />
                  ),
                }[layoutType]
              }
              {/* <DetailLayout
                basketDetails={basketInputObj}
                cartDetails={cartItems.items}
                showZoomImage={this.showZoomImage}
                showDiaImage={this.showDiaImage}
                thumbnailImage={this.thumbnailImage}
                diaIcon={this.diaIcon}
              /> */}
              {/* <MaxDetailLayout
                basketDetails={basketInputObj}
                cartDetails={cartItems.items}
                showZoomImage={this.showZoomImage}
                showDiaImage={this.showDiaImage}
                thumbnailImage={this.thumbnailImage}
                diaIcon={this.diaIcon}
              /> */}
            </div>
          </PDFExport>
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
                      Fred:
                        "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg",
                      KWFL:
                        "https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png",
                      Bridal:
                        "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg",
                    }[this.props.coverType]
                  }
                />
                <br /> Copyright {new Date().getFullYear()} All Rights Reserved
              </span>
              <span>Page</span>
            </div>
          ) : (
            ``
          )}
          {/* <button onClick={this.scrollToTop}>Go to top!</button> */}
        </Modal.Body>
        <button onClick={this.scrollToTop}>
          <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/arrow-141-32.png" />
        </button>
      </Modal>
    );
  }
}

export default connect(mapStateToProps)(PDFModal);
