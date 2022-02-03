import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import currencyFormatter from "currency-formatter";
import Grid2 from "../../assets/icons/grid-two-up-16.png";
import Grid3 from "../../assets/icons/grid-three-up-16.png";
import Grid1 from "../../assets/icons/square-16.png";
import ListView from "../../assets/icons/list-2-16.png";
import $ from "jquery";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // viewType: "List",
    };
    this.handleImage = this.handleImage.bind(this);
    // this.handleView = this.handleView.bind(this);
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
      <div className="es_results">
        {/* <button onClick={(e) => this.handleView(e)}>Grid</button> */}
        <div className="result_view_options">
          <img
            className="active"
            src={ListView}
            onClick={(e) => this.handleView(e, "List")}
          />
          <img src={Grid1} onClick={(e) => this.handleView(e, "Grid1")} />
          <img src={Grid2} onClick={(e) => this.handleView(e, "Grid2")} />
          <img src={Grid3} onClick={(e) => this.handleView(e, "Grid3")} />
        </div>
        {/* <select onChange={(e) => this.handleView(e)}>
          <option value="List">List</option>
          <option value="Grid2">Grid of 2</option>
          <option value="Grid3">Grid of 3</option>
        </select> */}
        <div
          id="ES_Results"
          className="List_result_container"
          // className="compact_result_container"
        >
          {items.map((item, index) => (
            // <div className="item_container" key={index}>
            //   <div className="item_image">
            //     <img src={this.handleImage(item)} />
            //   </div>
            //   <div className="item_details">
            //     <div className="item_serial_style">
            //       <h6>
            //         {item.SerialNumber && item.StyleNumber
            //           ? `${item.SerialNumber} | ${item.StyleNumber}`
            //           : item.SerialNumber
            //           ? item.SerialNumber
            //           : item.StyleNumber
            //           ? item.StyleNumber
            //           : ``}
            //       </h6>
            //     </div>
            //     <div className="item_description">{item.Description}</div>
            //     <div className="item_type_subtype">
            //       {item.ItemType && item.ItemSubtype
            //         ? item.ItemSubtype
            //         : item.ItemSubtype
            //         ? item.ItemSubtype
            //         : item.ItemType
            //         ? item.ItemType
            //         : ""}
            //     </div>
            //     <div className="item_metal">{item.Metal}</div>
            //     <div className="item_price">{item.RetailPrice}</div>
            //   </div>
            // </div>
            <Card
              key={index}
              onClick={(e) => {
                // if (e.target !== this) {
                //   return;
                // }
                handleItemToView(item);
                toggleSingleItem(true);
              }}
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
                <Card.Title>
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
                  <div className="item_description">{item.Description}</div>
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
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

export default Results;
