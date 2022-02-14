import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import currencyFormatter from "currency-formatter";
import Grid2 from "../../assets/icons/grid-two-up-16.png";
import Grid3 from "../../assets/icons/grid-three-up-16.png";
import Grid1 from "../../assets/icons/square-16.png";
import ListView from "../../assets/icons/list-2-16.png";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Accordion from "react-bootstrap/Accordion";
import $ from "jquery";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import "../../style/demo.scss";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import isEmpty from "lodash/isEmpty";
import { Table } from "react-bootstrap";

function CustomAccordianToggle({ children, eventKey }) {
  const OnClick = useAccordionButton(eventKey, () => {
    console.log("totally custom!");
  });

  return (
    <span
      // type="button"
      onClick={(e) => {
        e.stopPropagation();
        OnClick();
      }}
    >
      {children}
    </span>
  );
}

class Results2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // viewType: "List",
    };
    this.handleImage = this.handleImage.bind(this);
    this.isValueEmpty = this.isValueEmpty.bind(this);
    this.isMultipleValueEmpty = this.isMultipleValueEmpty.bind(this);
    // this.customAccordianToggle = this.customAccordianToggle.bind(this);
    // this.handleView = this.handleView.bind(this);
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

  handleView(e, value) {
    // let value = e.target.value;
    // document
    //   .getElementById("ES_Results")
    //   .classList.toggle("compact_result_container");
    $(".result_view_options").children().removeClass("active");
    console.log("Selected value: ", value);
    e.target.className = "active";
    if (value === "Grid1") {
      document.getElementById("ES_Results").className = "Grid_result_container";
    } else if (value === "Grid2") {
      document.getElementById("ES_Results").className =
        "Grid2_result_container";
    } else if (value === "Grid3") {
      document.getElementById("ES_Results").className =
        "Grid3_result_container";
    } else if (value === "List") {
      document.getElementById("ES_Results").className = "List_result_container";
    }

    // if (e.target.innerHTML === "List") {
    //   e.target.innerHTML = "Grid";
    // } else {
    //   e.target.innerHTML = "List";
    // }
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
  //   state = { items: this.props.items };
  render() {
    let { items, handleItemToView, toggleSingleItem, addItemToBasket } =
      this.props;
    // console.log("items : ", items);
    return (
      <div className="es_results2">
        {/* <div className="result_view_options">
          <img
            className="active"
            src={ListView}
            onClick={(e) => this.handleView(e, "List")}
          />
          <img src={Grid1} onClick={(e) => this.handleView(e, "Grid1")} />
          <img src={Grid2} onClick={(e) => this.handleView(e, "Grid2")} />
          <img src={Grid3} onClick={(e) => this.handleView(e, "Grid3")} />
        </div> */}

        <Accordion>
          {items.map((item, index) => {
            console.log("index :", index);
            return (
              <AccordionItem
                key={item.SerialNumber}
                eventKey={item.SerialNumber}
              >
                <AccordionHeader>
                  <Card
                  //   key={index}
                  //   onClick={(e) => {
                  //     // if (e.target !== this) {
                  //     //   return;
                  //     // }
                  //     handleItemToView(item);
                  //     toggleSingleItem(true);
                  // //   }}
                  >
                    <div className="result_action_group">
                      <img
                        src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"
                        onClick={(e) => {
                          // if (e.target === this) {
                          e.stopPropagation();
                          addItemToBasket(item);
                          // }
                        }}
                      ></img>
                    </div>
                    <div className="image_container">
                      <Card.Img
                        variant="top"
                        src={this.handleImage(item)}
                        onError={(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title
                        onClick={() => {
                          handleItemToView(item);
                          toggleSingleItem(true);
                        }}
                      >
                        {item.SerialNumber && item.StyleNumber ? (
                          <>
                            <span>{item.SerialNumber}</span>{" "}
                            <span> {item.StyleNumber}</span>
                          </>
                        ) : item.SerialNumber ? (
                          item.SerialNumber
                        ) : item.StyleNumber ? (
                          item.StyleNumber
                        ) : (
                          ``
                        )}
                      </Card.Title>
                      <div className="card-text">
                        <div className="item_description">
                          {item.Description}
                        </div>
                        <div className="item_brand">{item.Brand}</div>
                        <div className="item_type_subtype">
                          {item.ItemType && item.ItemSubtype
                            ? item.ItemSubtype
                            : item.ItemSubtype
                            ? item.ItemSubtype
                            : item.ItemType
                            ? item.ItemType
                            : ""}
                        </div>
                        <div className="item_metal">{item.Metal}</div>
                        <div className="item_price">
                          {" "}
                          {(item.RetailPrice &&
                            currencyFormatter.format(`${item.RetailPrice}`, {
                              code: "USD",
                              precision: 0,
                            })) ||
                            ""}
                        </div>
                        {/* <Accordion>
                    <Card>
                      <Card.Header>
                        <CustomAccordianToggle eventKey="0">
                          {" "}
                          +{" "}
                        </CustomAccordianToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion> */}
                      </div>
                    </Card.Body>
                  </Card>
                </AccordionHeader>
                <AccordionBody>
                  <Table>
                    <tbody>
                      <tr>
                        {item.ItemSubtype && <td>{item.ItemSubtype}</td>}
                        {item.DiamondCarats ||
                          (item.ColorCarats && (
                            <td>
                              {item.DiamondCarats &&
                                `${item.DiamondCarats} cts dia`}{" "}
                              {item.Colorcarats &&
                                `${item.ColorCarats} cts color`}
                            </td>
                          ))}

                        {item.Maker && <td>{item.Maker}</td>}
                        {item.RingSize && <td> {item.RingSize}</td>}
                      </tr>
                      <tr>
                        {item.Collection && <td>{item.Collection}</td>}
                        {item.Color && (
                          <td>
                            {this.isMultipleValueEmpty(
                              item,
                              "ColorClarity"
                            ).replace(/\s+/g, " ")}
                          </td>
                        )}
                        {item.Period && (
                          <td>{this.isValueEmpty(item.Period)}</td>
                        )}
                        {item.Length ||
                          item.BangleSize ||
                          (item.Diameter && (
                            <td>
                              {this.isValueEmpty(item.Length)}
                              {this.isValueEmpty(item.BangleSize)}
                              {this.isValueEmpty(item.Diameter)}
                              {this.isValueEmpty(item.HoopDiameter)}
                            </td>
                          ))}
                      </tr>
                      <tr>
                        {item.Metal && <td>{this.isValueEmpty(item.Metal)}</td>}
                        <td>
                          {this.isMultipleValueEmpty(
                            item,
                            "DiamondDetails"
                          ).replace(/\s+/g, " ")}
                        </td>
                        {item.CircaDate && (
                          <td>{this.isValueEmpty(item.CircaDate)}</td>
                        )}
                        {item.WidthOD && (
                          <td>{this.isValueEmpty(item.WidthOD)}</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </AccordionBody>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }
}

export default Results2;
