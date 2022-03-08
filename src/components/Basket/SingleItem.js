import React, { Component, useEffect, useState } from "react";
import { Carousel } from "bootstrap";
import ImageGallery from "react-image-gallery";
import currencyFormatter from "currency-formatter";
import { Accordion, Modal, Table } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { useParams } from "react-router-dom";
import {
  JewelrySerialApp,
  DiamondSerialApp,
  GemstoneSerialApp,
  AppbaseAppUrl,
  AppbaseCredentials,
} from "../../utils/constants";
import Appbase from "appbase-js";
import { useSelector, useDispatch } from "react-redux";
import { toggleSingleView, addToCart } from "../actions";
import { useSwipeable } from "react-swipeable";
import { FieldData } from "./../OtherComponents/FieldData";

export default function SingleItem(props) {
  let {
    handleItemToView,
    toggleSingleItem,
    addItemToBasket,
    isValueEmpty,
    isMultipleValueEmpty,
  } = props;
  let { id } = useParams();

  const { show, item } = useSelector((state) => state.singleViewModal);
  const showWholesale = useSelector(
    (state) => state.basketInputChange.showWholesale
  );
  const dispatch = useDispatch();

  const handlers = useSwipeable({
    onSwiped: (eventData) =>
      dispatch(toggleSingleView({ show: false, item: {} })),
  });

  // const [item, setItem] = useState({});

  // const getItem = async () => {
  //   console.log("Inside get item");
  //   let app = [JewelrySerialApp, DiamondSerialApp, GemstoneSerialApp];
  //   let result = false;
  //   for (let i = 0; i < app.length; i++) {
  //     let appbaseRef = Appbase({
  //       url: AppbaseAppUrl,
  //       app: app[i],
  //       credentials: AppbaseCredentials,
  //     });

  //     await appbaseRef
  //       .get({
  //         type: "_doc",
  //         id: id,
  //       })
  //       .then((response) => {
  //         // console.log("Success: ", response);
  //         if (response.found && response.found === true) {
  //           setItem(response._source);
  //           result = true;
  //         }
  //       })
  //       .catch((error) => {
  //         console.log("Error: ", error);
  //       });
  //     if (result) {
  //       break;
  //     }
  //   }
  // };
  // const isValueEmpty = (res) => {
  //   // console.log("res & name :", res, name);
  //   let result = "";
  //   if (!isEmpty(res) && res !== "0.00") {
  //     // result = `${name} : ${res}`;
  //     result = res;
  //   }
  //   // else {
  //   //   result = `${name} : null`;
  //   // }
  //   // console.log("result : ", result);
  //   return result;
  // };
  // const isMultipleValueEmpty = (res, expr) => {
  //   let result = "";
  //   switch (expr) {
  //     case "CenterDetails":
  //       if (!isEmpty(res.CenterShape)) {
  //         result = `Center Details:
  //         ${(res.CenterCaratWeight && res.CenterCaratWeight + " cts") || ""}
  //         ${res.CenterShape || ""} ${
  //           (res.CenterColor && res.CenterColor + " /") || ""
  //         }
  //         ${(res.CenterClarity && res.CenterClarity + " /") || ""} ${
  //           res.CenterCut || ""
  //         } ${res.CenterEnhancement || ""} ${
  //           (res.CenterOrigin && res.CenterOrigin + " - #") || ""
  //         }  ${res.CenterStoneNbr || ""}`;
  //       }
  //       break;

  //     case "WholesalePrice":
  //       result =
  //         (res.WholesalePrice &&
  //           currencyFormatter.format(`${res.WholesalePrice}`, {
  //             code: "USD",
  //             precision: 0,
  //           })) ||
  //         "";

  //       break;

  //     case "ItemSubtype":
  //       if (!isEmpty(res.ItemSubtype)) {
  //         result = res.ItemSubtype;
  //       } else {
  //         result = res.ItemType || "";
  //       }
  //       break;
  //     case "RetailPrice":
  //       if (!isEmpty(res)) {
  //         result = currencyFormatter.format(`${res}`, {
  //           code: "USD",
  //           precision: 0,
  //         });
  //       }
  //       break;
  //     case "ColorClarity":
  //       result = `${res.Color || ""}
  //         ${res.Color && res.Clarity ? "/" : ""}
  //         ${res.Clarity || ""}
  //       `;
  //       break;
  //     case "DiamondDetails":
  //       result = `${res.DiamondDetails || ""}
  //         ${res.DiamondDetails && res.ColorComment ? " & " : ""}
  //         ${res.ColorComment || ""}
  //       `;
  //       break;
  //     default:
  //       return result.trim();
  //   }
  //   return result.trim();
  // };

  const handleImageGallery = (res) => {
    // console.log("inside handleImageGallery");
    var imgArr = [];
    if (res) {
      function showShapeImage(shape) {
        let imageurl =
          "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
          shape +
          ".jpg";
        return imageurl;
      }
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

      if (res.LargeImageName) {
        imgArr.push({
          original: showimage(res.LargeImageName),
          thumbnail: showimage(res.LargeImageName),
          imgName: largeImgName(res.LargeImageName),
        });
      }
      if (res.Shape) {
        imgArr.push({
          original: showShapeImage(res.Shape),
          thumbnail: showShapeImage(res.Shape),
          imgName: res.shape,
        });
      }
      if (res.EditorialVideo) {
        imgArr.push({
          thumbnail:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          original:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          embedUrl: res.EditorialVideo,
          // description: "Render custom slides (such as videos)",
          renderItem: renderVideo.bind(this),
        });
      }
      if (res.SerialVideoLink) {
        imgArr.push({
          thumbnail:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          original:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          embedUrl: res.SerialVideoLink,
          // description: "Render custom slides (such as videos)",
          renderItem: renderVideo.bind(this),
        });
      }
      if (res.StyleVideoLink) {
        imgArr.push({
          thumbnail:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          original:
            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Video-Icon-Stock-Black.svg",
          embedUrl: res.StyleVideoLink,
          // description: "Render custom slides (such as videos)",
          renderItem: renderVideo.bind(this),
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
    // console.log("imgArr : ", imgArr);
    return imgArr;
    // this.setState({
    //   imgArr: imgArr,
    // });
  };
  const renderVideo = (item) => {
    return (
      <div className="video-wrapper">
        {/* <a
          className="close-video"
          onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
        ></a> */}
        <iframe
          // width="350"
          // height="300"
          src={`${item.embedUrl}?autoplay=1`}
          // src={`https://iframe.videodelivery.net/${item.embedUrl}`}
          style={{ border: "none" }}
          allowFullScreen="true"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        ></iframe>
        {/* <video autoPlay>
          <source src={item.embedUrl} type="video/mp4" />
        </video> */}
      </div>
    );
  };
  const onModalHide = () => {
    dispatch(toggleSingleView({ show: false, item: {} }));
  };
  const handleReports = (type) => {
    let { resultData } = this.state;
    if (type === "jpg") {
      if (resultData.ReportJpgUrls) {
        // console.log(
        //   "jpg",
        //   resultData.ReportJpgUrls.split("|").map((value) =>
        //     value.replace(" ", "")
        //   )
        // );
        return resultData.ReportJpgUrls.split("|").map((value) =>
          value.replace(" ", "")
        );
      }
      return [];
    }
    if (type === "pdf") {
      if (resultData.ReportPdfUrls) {
        // console.log(
        //   "pdf",
        //   resultData.ReportPdfUrls.split("|").map((value) =>
        //     value.replace(" ", "")
        //   )
        // );
        return resultData.ReportPdfUrls.split("|").map((value) =>
          value.replace(" ", "")
        );
      }
      return [];
    }

    // let fileIdNames = res.FileIdNames;
    // let fileData = fileIdNames.split("|");
    // // console.log("fileData: ", fileData);
    // if (fileData.length === 1) {
    //   let fileID = fileData[0].slice(fileData[0].indexOf(":") + 1);
    //   // console.log("fileID: ", fileID);
    //   window
    //     .open(BaseURL + "/Frames/GetFile.ashx?fileID=" + fileID, "_blank")
    //     .focus();
    // } else {
    //   this.setState({ fileData, showFileModal: true });
    // }
  };

  // useEffect(() => {
  //   getItem();
  // }, [id]);

  return (
    // <label>{id}</label>
    <Modal
      animation={false}
      autoFocus={false}
      enforceFocus={false}
      className="single_item_modal"
      centered="true"
      size="lg"
      show={show}
      onHide={() => onModalHide()}
      {...handlers}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="single_item_container">
          <div className="item_short_detail">
            <div className="image_container">
              <ImageGallery
                items={handleImageGallery(item)}
                showFullscreenButton={false}
                showPlayButton={false}
                showNav={false}
                onErrorImageURL="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg"
                showThumbnails={false}
                showBullets={true}
              />
            </div>
            <h6>
              {item.SerialNumber && item.StyleNumber
                ? `${item.SerialNumber} | ${item.StyleNumber}`
                : item.SerialNumber
                ? item.SerialNumber
                : item.StyleNumber
                ? item.StyleNumber
                : ``}
            </h6>
            <div className="single_item_description">{item.Description}</div>
            {item.RetailPrice && (
              <div className="single_item_price">
                <label>
                  {currencyFormatter.format(`${item.RetailPrice}`, {
                    code: "USD",
                    precision: 0,
                  }) || ""}
                </label>{" "}
                (Retail Price)
              </div>
            )}
            {item.WholesalePrice && showWholesale && (
              <div className="single_item_price">
                <label>{isMultipleValueEmpty(item, "WholesalePrice")}</label>{" "}
                (Wholesale Price)
              </div>
            )}
          </div>

          <div className="single_item_details">
            <Accordion defaultActiveKey="0">
              <AccordionItem eventKey="0">
                {/* <h6> */}
                <AccordionHeader>Details:</AccordionHeader>
                {/* </h6> */}
                <AccordionBody>
                  <Table>
                    <tbody>
                      {item.Brand && (
                        <tr>
                          <td>
                            <li>Brand</li>
                          </td>
                          <td>{item.Brand}</td>
                        </tr>
                      )}
                      {item.ItemType && (
                        <tr>
                          <td>
                            <li>Item Type</li>
                          </td>
                          <td>{item.ItemType}</td>
                        </tr>
                      )}
                      {item.ItemSubtype && (
                        <tr>
                          <td>
                            <li>Item Subtype</li>
                          </td>
                          <td>{isMultipleValueEmpty(item, "ItemSubtype")}</td>
                        </tr>
                      )}
                      {item.Collection && (
                        <tr>
                          <td>
                            <li>Collection</li>
                          </td>
                          <td> {isValueEmpty(item.Collection)}</td>
                        </tr>
                      )}
                      {item.SubCollection && (
                        <tr>
                          <td>
                            <li>Sub Collection</li>
                          </td>
                          <td>{item.SubCollection}</td>
                        </tr>
                      )}
                      {item.Metal && (
                        <tr>
                          <td>
                            <li>Maker</li>
                          </td>
                          <td>{isValueEmpty(item.Metal)}</td>
                        </tr>
                      )}
                      {item.Maker && (
                        <tr>
                          <td>
                            <li>Metal</li>
                          </td>
                          <td> {isValueEmpty(item.Maker)}</td>
                        </tr>
                      )}
                      {isValueEmpty(item.DiamondCarats) && (
                        <tr>
                          <td>
                            <li>Diamond Carats</li>
                          </td>
                          <td>
                            {isValueEmpty(item.DiamondCarats)}{" "}
                            {isValueEmpty(item.DiamondCarats)
                              ? " cts dia "
                              : ""}
                          </td>
                        </tr>
                      )}
                      {isValueEmpty(item.ColorCarats) && (
                        <tr>
                          <td>
                            <li>Color Carats</li>
                          </td>
                          <td>
                            {isValueEmpty(item.ColorCarats)}{" "}
                            {isValueEmpty(item.ColorCarats)
                              ? " cts color "
                              : ""}
                          </td>
                        </tr>
                      )}
                      {item.RingSize && (
                        <tr>
                          <td>
                            <li>Ring Size</li>
                          </td>
                          <td>{isValueEmpty(item.RingSize)}</td>
                        </tr>
                      )}
                      {item.Color && (
                        <tr>
                          <td>
                            <li>Color</li>
                          </td>
                          <td>
                            {isMultipleValueEmpty(item, "ColorClarity").replace(
                              /\s+/g,
                              " "
                            )}
                          </td>
                        </tr>
                      )}
                      {item.Period && (
                        <tr>
                          <td>
                            <li>Period</li>
                          </td>
                          <td> {isValueEmpty(item.Period)}</td>
                        </tr>
                      )}
                      {item.Length && (
                        <tr>
                          <td>
                            <li>Length</li>
                          </td>
                          <td> {isValueEmpty(item.Length)}</td>
                        </tr>
                      )}
                      {item.BangleSize && (
                        <tr>
                          <td>
                            <li>Bangle Size</li>
                          </td>
                          <td>{isValueEmpty(item.BangleSize)}</td>
                        </tr>
                      )}
                      {item.Diameter && (
                        <tr>
                          <td>
                            <li>Diameter</li>
                          </td>
                          <td>{isValueEmpty(item.Diameter)}</td>
                        </tr>
                      )}

                      {item.HoopDiameter && (
                        <tr>
                          <td>
                            <li>Hoop Diameter</li>
                          </td>
                          <td>{isValueEmpty(item.HoopDiameter)}</td>
                        </tr>
                      )}
                      {item.ColorComment && (
                        <tr>
                          <td>
                            <li>Diamond Details</li>
                          </td>
                          <td>
                            {isMultipleValueEmpty(
                              item,
                              "DiamondDetails"
                            ).replace(/\s+/g, " ")}
                          </td>
                        </tr>
                      )}
                      {item.CircaDate && (
                        <tr>
                          <td>
                            <li>Circa Date</li>
                          </td>
                          <td>{isValueEmpty(item.CircaDate)}</td>
                        </tr>
                      )}
                      {item.WidthOD && (
                        <tr>
                          <td>
                            <li>Width OD</li>
                          </td>
                          <td>{isValueEmpty(item.WidthOD)}</td>
                        </tr>
                      )}
                      {isMultipleValueEmpty(item, "CenterDetails") && (
                        <tr>
                          <td>
                            <li>Center Details</li>
                          </td>
                          <td>{isMultipleValueEmpty(item, "CenterDetails")}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="1">
                {/* <h6> */}
                <AccordionHeader>Pricing Details:</AccordionHeader>
                {/* </h6> */}
                <AccordionBody>
                  <Table>
                    <tbody>
                      {item.RetailPrice && (
                        <tr>
                          <td>
                            <li>Retail Price</li>
                          </td>
                          <td>
                            {isMultipleValueEmpty(
                              item.RetailPrice,
                              "RetailPrice"
                            )}
                          </td>
                        </tr>
                      )}
                      {item.WholesalePrice && (
                        <tr>
                          <td>
                            <li>Wholesale Price</li>
                          </td>
                          <td>
                            {isMultipleValueEmpty(item, "WholesalePrice")}
                          </td>
                        </tr>
                      )}
                      {item.PricingDate && (
                        <tr>
                          <td>
                            <li>Pricing Date</li>
                          </td>
                          <td>
                            {isValueEmpty(item.PricingDate)
                              ? moment(new Date(`${item.PricingDate}`)).format(
                                  "MM/DD/YYYY"
                                )
                              : ""}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="2">
                {/* <h6> */}
                <AccordionHeader>Status Details:</AccordionHeader>
                {/* </h6> */}
                <AccordionBody>
                  <Table>
                    <tbody>
                      {(item.SerialStatus || item.Warehouse) && (
                        <tr>
                          <td>
                            <li>Status</li>
                          </td>
                          <td>
                            {isValueEmpty(item.Warehouse)}
                            {item.Warehouse !== item.SerialStatus &&
                            isValueEmpty(item.Warehouse) &&
                            isValueEmpty(item.SerialStatus)
                              ? "/"
                              : ""}
                            {item.IsVirtual === "1" ? "Virtual - " : ""}
                            {item.IsPhantom === "1" ? "Phantom - " : ""}
                            {item.Warehouse !== item.SerialStatus &&
                              isValueEmpty(item.SerialStatus)}
                          </td>
                        </tr>
                      )}
                      {(item.StatusCustomer || item.MemoOutCustomer) && (
                        <tr>
                          <td>
                            <li>Customer Status</li>
                          </td>
                          <td>
                            {item.MemoOutCustomer
                              ? isValueEmpty(item.MemoOutCustomer)
                              : item.StatusCustomer
                              ? isValueEmpty(item.StatusCustomer)
                              : ""}
                          </td>
                        </tr>
                      )}
                      {isValueEmpty(item.StatusRefNbr) &&
                        isValueEmpty(item.StatusDate) && (
                          <tr>
                            <td>
                              <li>Date/Ref #</li>
                            </td>
                            <td>
                              {isValueEmpty(item.StatusDate)
                                ? moment(new Date(`${item.StatusDate}`)).format(
                                    "MM/DD/YYYY"
                                  )
                                : ""}
                              &nbsp;-&nbsp;{item.StatusRefNbr}
                            </td>
                          </tr>
                        )}
                      {isValueEmpty(item.StatusDate) && !item.StatusRefNbr && (
                        <tr>
                          <td>
                            <li>Date/Ref #</li>
                          </td>
                          <td>
                            moment(new Date(`${item.StatusDate}
                            `)).format("MM/DD/YYYY")
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>

              {item.HoldText && (
                <AccordionItem eventKey="3">
                  {/* <h6> */}
                  <AccordionHeader>Hold Notes Details:</AccordionHeader>
                  {/* </h6> */}
                  <AccordionBody>
                    <Table>
                      <tbody>
                        {item.HoldBy && (
                          <tr>
                            <td>
                              <li>Hold By</li>
                            </td>
                            <td>{isValueEmpty(item.HoldBy)}</td>
                          </tr>
                        )}
                        {item.HoldCustomerName && (
                          <tr>
                            <td>
                              <li>Hold Customer Name</li>
                            </td>
                            <td>{isValueEmpty(item.HoldCustomerName)}</td>
                          </tr>
                        )}
                        {item.HoldDate && (
                          <tr>
                            <td>
                              <li>Hold Date</li>
                            </td>
                            <td>
                              {isValueEmpty(item.HoldDate)
                                ? moment(new Date(`${item.HoldDate}`)).format(
                                    "MM/DD/YYYY"
                                  )
                                : ""}
                            </td>
                          </tr>
                        )}
                        {item.ReleaseDate && (
                          <tr>
                            <td>
                              <li>Release Date</li>
                            </td>
                            <td>
                              {isValueEmpty(item.ReleaseDate)
                                ? moment(
                                    new Date(`${item.ReleaseDate}`)
                                  ).format("MM/DD/YYYY")
                                : ""}
                            </td>
                          </tr>
                        )}

                        {item.HoldText && (
                          <tr>
                            <td>
                              <li>Hold Text</li>
                            </td>
                            <td>{isValueEmpty(item.HoldText)}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </AccordionBody>
                </AccordionItem>
              )}
              {Object.keys(FieldData.CertifiedDiamondReports)
                .map((key, Index) => item[key])
                .filter((value) => ![undefined, null, ""].includes(value))
                .length !== 0 ? (
                <Accordion.Item eventKey="4">
                  <Accordion.Button id="Certificate">
                    CERTIFIED DIAMOND REPORT
                  </Accordion.Button>
                  <Accordion.Body>
                    {/* {Object.keys(FieldData.CertifiedDiamondReports).map(
                        (key, Index) => {
                          if (resultData[key]) {
                            return (
                              <div className="field_data" key={key}>
                                <label>
                                  {FieldData.CertifiedDiamondReports[key].label}{" "}
                                  :
                                </label>
                                <label>{resultData[key]}</label>
                              </div>
                            );
                          } else return <></>;
                        }
                      )} */}
                    {this.handleReports("jpg").map((jpg, index) => (
                      <img
                        className="report_img"
                        src={jpg}
                        onClick={() =>
                          window.open(
                            this.handleReports("pdf")[index],
                            "_blank"
                          )
                        }
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ) : (
                <></>
              )}
            </Accordion>
          </div>
          <div className="add_to_basket">
            <button onClick={() => dispatch(addToCart({ product: item }))}>
              Add to Cart
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
