import React, { Component } from "react";
import { Carousel } from "bootstrap";
import ImageGallery from "react-image-gallery";
import currencyFormatter from "currency-formatter";
import { Table } from "react-bootstrap";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

class SingleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImageGallery = this.handleImageGallery.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.isValueEmpty = this.isValueEmpty.bind(this);
    this.isMultipleValueEmpty = this.isMultipleValueEmpty.bind(this);
  }

  isValueEmpty(res) {
    // console.log("res & name :", res, name);
    let result = "";
    if (!isEmpty(res) && res !== "0.00") {
      // result = `${name} : ${res}`;
      result = res;
    }
    // else {
    //   result = `${name} : null`;
    // }
    // console.log("result : ", result);
    return result;
  }
  isMultipleValueEmpty(res, expr) {
    let result = "";
    switch (expr) {
      case "CenterDetails":
        if (!isEmpty(res.CenterShape)) {
          result = `Center Details:
          ${(res.CenterCaratWeight && res.CenterCaratWeight + " cts") || ""}
          ${res.CenterShape || ""} ${
            (res.CenterColor && res.CenterColor + " /") || ""
          }
          ${(res.CenterClarity && res.CenterClarity + " /") || ""} ${
            res.CenterCut || ""
          } ${res.CenterEnhancement || ""} ${
            (res.CenterOrigin && res.CenterOrigin + " - #") || ""
          }  ${res.CenterStoneNbr || ""}`;
        }
        break;

      case "WholesalePrice":
        result =
          (res.WholesalePrice &&
            currencyFormatter.format(`${res.WholesalePrice}`, {
              code: "USD",
              precision: 0,
            })) ||
          "";

        break;

      case "ItemSubtype":
        if (!isEmpty(res.ItemSubtype)) {
          result = res.ItemSubtype;
        } else {
          result = res.ItemType || "";
        }
        break;
      case "RetailPrice":
        if (!isEmpty(res)) {
          result = currencyFormatter.format(`${res}`, {
            code: "USD",
            precision: 0,
          });
        }
        break;
      case "ColorClarity":
        result = `${res.Color || ""}
          ${res.Color && res.Clarity ? "/" : ""}
          ${res.Clarity || ""}
        `;
        break;
      case "DiamondDetails":
        result = `${res.DiamondDetails || ""}
          ${res.DiamondDetails && res.ColorComment ? " & " : ""}
          ${res.ColorComment || ""}
        `;
        break;
      default:
        return result.trim();
    }
    return result.trim();
  }

  handleImageGallery(res) {
    console.log("inside handleImageGallery");
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
          renderItem: this.renderVideo.bind(this),
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
          renderItem: this.renderVideo.bind(this),
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
          renderItem: this.renderVideo.bind(this),
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
  }
  renderVideo(item) {
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
  }

  render() {
    let { item, handleItemToView, toggleSingleItem, addItemToBasket } =
      this.props;
    return (
      <div className="single_item_container">
        <div className="item_header_options">
          <h6>
            {item.SerialNumber && item.StyleNumber
              ? `${item.SerialNumber} | ${item.StyleNumber}`
              : item.SerialNumber
              ? item.SerialNumber
              : item.StyleNumber
              ? item.StyleNumber
              : ``}
          </h6>
          <img
            src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"
            onClick={() => addItemToBasket(item)}
          ></img>
          <button
            onClick={() => {
              handleItemToView({});
              toggleSingleItem(false);
            }}
          >
            X
          </button>
        </div>
        <div className="single_item_description">{item.Description}</div>
        <div className="image_container">
          <ImageGallery
            items={this.handleImageGallery(item)}
            showFullscreenButton={false}
            showPlayButton={false}
            showNav={false}
            onErrorImageURL="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg"
            showThumbnails={false}
            showBullets={true}
          />
        </div>
        <div className="single_item_price">
          <label>
            {(item.RetailPrice &&
              currencyFormatter.format(`${item.RetailPrice}`, {
                code: "USD",
                precision: 0,
              })) ||
              ""}
          </label>
          USD
        </div>
        <div className="single_item_details">
          <h6>Details:</h6>
          <Table>
            <tbody>
              {item.Brand && (
                <tr>
                  <td>Brand</td>
                  <td>{item.Brand}</td>
                </tr>
              )}
              {item.ItemType && (
                <tr>
                  <td>Item Type</td>
                  <td>{item.ItemType}</td>
                </tr>
              )}
              {item.ItemSubtype && (
                <tr>
                  <td>Item Subtype</td>
                  <td> {this.isMultipleValueEmpty(item, "ItemSubtype")}</td>
                </tr>
              )}
              {item.Collection && (
                <tr>
                  <td>Collection</td>
                  <td> {this.isValueEmpty(item.Collection)}</td>
                </tr>
              )}
              {item.SubCollection && (
                <tr>
                  <td>Sub Collection</td>
                  <td>{item.SubCollection}</td>
                </tr>
              )}
              {item.Metal && (
                <tr>
                  <td>Maker</td>
                  <td>{this.isValueEmpty(item.Metal)}</td>
                </tr>
              )}
              {item.Maker && (
                <tr>
                  <td>Metal</td>
                  <td> {this.isValueEmpty(item.Maker)}</td>
                </tr>
              )}
              {this.isValueEmpty(item.DiamondCarats) && (
                <tr>
                  <td>Diamond Carats</td>
                  <td>
                    {this.isValueEmpty(item.DiamondCarats)}{" "}
                    {this.isValueEmpty(item.DiamondCarats) ? " cts dia " : ""}
                  </td>
                </tr>
              )}
              {this.isValueEmpty(item.ColorCarats) && (
                <tr>
                  <td>Color Carats</td>
                  <td>
                    {this.isValueEmpty(item.ColorCarats)}{" "}
                    {this.isValueEmpty(item.ColorCarats) ? " cts color " : ""}
                  </td>
                </tr>
              )}
              {item.RingSize && (
                <tr>
                  <td>Ring Size</td>
                  <td>{this.isValueEmpty(item.RingSize)}</td>
                </tr>
              )}
              {item.Color && (
                <tr>
                  <td>Color</td>
                  <td>
                    {this.isMultipleValueEmpty(item, "ColorClarity").replace(
                      /\s+/g,
                      " "
                    )}
                  </td>
                </tr>
              )}
              {item.Period && (
                <tr>
                  <td>Period</td>
                  <td> {this.isValueEmpty(item.Period)}</td>
                </tr>
              )}
              {item.Length && (
                <tr>
                  <td>Length</td>
                  <td> {this.isValueEmpty(item.Length)}</td>
                </tr>
              )}
              {item.BangleSize && (
                <tr>
                  <td>Bangle Size</td>
                  <td>{this.isValueEmpty(item.BangleSize)}</td>
                </tr>
              )}
              {item.Diameter && (
                <tr>
                  <td>Diameter</td>
                  <td>{this.isValueEmpty(item.Diameter)}</td>
                </tr>
              )}

              {item.HoopDiameter && (
                <tr>
                  <td>Hoop Diameter</td>
                  <td>{this.isValueEmpty(item.HoopDiameter)}</td>
                </tr>
              )}
              {item.ColorComment && (
                <tr>
                  <td>Diamond Details</td>
                  <td>
                    {" "}
                    {this.isMultipleValueEmpty(item, "DiamondDetails").replace(
                      /\s+/g,
                      " "
                    )}
                  </td>
                </tr>
              )}
              {item.CircaDate && (
                <tr>
                  <td>Circa Date</td>
                  <td>{this.isValueEmpty(item.CircaDate)}</td>
                </tr>
              )}
              {item.WidthOD && (
                <tr>
                  <td>Width OD</td>
                  <td>{this.isValueEmpty(item.WidthOD)}</td>
                </tr>
              )}
              {this.isMultipleValueEmpty(item, "CenterDetails") && (
                <tr>
                  <td>Center Details</td>
                  <td>{this.isMultipleValueEmpty(item, "CenterDetails")}</td>
                </tr>
              )}
            </tbody>
          </Table>
          <h6>Pricing Details:</h6>
          <Table>
            <tbody>
              {item.RetailPrice && (
                <tr>
                  <td>Retail Price</td>
                  <td>
                    {" "}
                    {this.isMultipleValueEmpty(item.RetailPrice, "RetailPrice")}
                  </td>
                </tr>
              )}
              {item.WholesalePrice && (
                <tr>
                  <td>Wholesale Price</td>
                  <td> {this.isMultipleValueEmpty(item, "WholesalePrice")}</td>
                </tr>
              )}
              {item.PricingDate && (
                <tr>
                  <td>Pricing Date</td>
                  <td>
                    {this.isValueEmpty(item.PricingDate)
                      ? moment(new Date(`${item.PricingDate}`)).format(
                          "MM/DD/YYYY"
                        )
                      : ""}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <h6>Status Details:</h6>
          <Table>
            <tbody>
              {(item.SerialStatus || item.Warehouse) && (
                <tr>
                  <td>Status</td>
                  <td>
                    {" "}
                    {this.isValueEmpty(item.Warehouse)}
                    {item.Warehouse !== item.SerialStatus &&
                    this.isValueEmpty(item.Warehouse) &&
                    this.isValueEmpty(item.SerialStatus)
                      ? "/"
                      : ""}
                    {item.IsVirtual === "1" ? "Virtual - " : ""}
                    {item.IsPhantom === "1" ? "Phantom - " : ""}
                    {item.Warehouse !== item.SerialStatus &&
                      this.isValueEmpty(item.SerialStatus)}
                  </td>
                </tr>
              )}
              {(item.StatusCustomer || item.MemoOutCustomer) && (
                <tr>
                  <td>Customer Status</td>
                  <td>
                    {" "}
                    {item.MemoOutCustomer
                      ? this.isValueEmpty(item.MemoOutCustomer)
                      : item.StatusCustomer
                      ? this.isValueEmpty(item.StatusCustomer)
                      : ""}
                  </td>
                </tr>
              )}
              {this.isValueEmpty(item.StatusRefNbr) &&
                this.isValueEmpty(item.StatusDate) && (
                  <tr>
                    <td>Date/Ref #</td>
                    <td>
                      {this.isValueEmpty(item.StatusDate)
                        ? moment(new Date(`${item.StatusDate}`)).format(
                            "MM/DD/YYYY"
                          )
                        : ""}
                      &nbsp;-&nbsp;{item.StatusRefNbr}
                    </td>
                  </tr>
                )}
              {this.isValueEmpty(item.StatusDate) && !item.StatusRefNbr && (
                <tr>
                  <td>Date/Ref #</td>
                  <td>
                    moment(new Date(`${item.StatusDate}`)).format("MM/DD/YYYY")
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <h6>Hold Notes Details:</h6>
          <Table>
            <tbody>
              {item.HoldBy && (
                <tr>
                  <td>Hold By</td>
                  <td>{this.isValueEmpty(item.HoldBy)}</td>
                </tr>
              )}
              {item.HoldCustomerName && (
                <tr>
                  <td>Hold Customer Name</td>
                  <td>{this.isValueEmpty(item.HoldCustomerName)}</td>
                </tr>
              )}
              {item.HoldDate && (
                <tr>
                  <td>Hold Date</td>
                  <td>
                    {this.isValueEmpty(item.HoldDate)
                      ? moment(new Date(`${item.HoldDate}`)).format(
                          "MM/DD/YYYY"
                        )
                      : ""}
                  </td>
                </tr>
              )}
              {item.ReleaseDate && (
                <tr>
                  <td>Release Date</td>
                  <td>
                    {" "}
                    {this.isValueEmpty(item.ReleaseDate)
                      ? moment(new Date(`${item.ReleaseDate}`)).format(
                          "MM/DD/YYYY"
                        )
                      : ""}
                  </td>
                </tr>
              )}

              {item.HoldText && (
                <tr>
                  <td>Hold Text</td>
                  <td>{this.isValueEmpty(item.HoldText)}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default SingleItem;
