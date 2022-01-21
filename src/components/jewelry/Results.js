import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleImage = this.handleImage.bind(this);
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
    let { items } = this.props;
    console.log("items : ", items);
    return (
      <div className="result_container">
        {items.map((item, index) => (
          <div className="item_container" key={index}>
            <div className="item_image">
              <img src={this.handleImage(item)} />
            </div>
            <div className="item_details">
              <div className="item_serial_style">
                <h6>
                  {item.SerialNumber && item.StyleNumber
                    ? `${item.SerialNumber} | ${item.StyleNumber}`
                    : item.SerialNumber
                    ? item.SerialNumber
                    : item.StyleNumber
                    ? item.StyleNumber
                    : ``}
                </h6>
              </div>
              <div className="item_description">{item.Description}</div>
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
              <div className="item_price">{item.RetailPrice}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
