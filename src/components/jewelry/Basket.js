import React, { Component } from "react";
import currencyFormatter from "currency-formatter";

class Basket extends Component {
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
  render() {
    let { toggleBasket, basketItems, removeItemFromBasket } = this.props;
    return (
      <div className="basket_container">
        <div className="basket_header">
          <h5>Basket Details :</h5>
          <button onClick={() => toggleBasket(false)}>X</button>
        </div>
        {basketItems ? (
          <div className="basket_items_container">
            {basketItems.map((item) => (
              <div className="item_container">
                <div className="item_image">
                  <img src={this.handleImage(item)} />
                </div>
                <div className="item_description">
                  <div className="item_header">
                    {item.SerialNumber && item.StyleNumber
                      ? `${item.SerialNumber} | ${item.StyleNumber}`
                      : item.SerialNumber
                      ? item.SerialNumber
                      : item.StyleNumber
                      ? item.StyleNumber
                      : ``}
                  </div>
                  <div className="item_details">
                    <label>{item.Description}</label>
                    <label>
                      {" "}
                      {(item.RetailPrice &&
                        currencyFormatter.format(`${item.RetailPrice}`, {
                          code: "USD",
                          precision: 0,
                        })) ||
                        ""}
                    </label>
                    <div className="item_action_group">
                      <button onClick={() => removeItemFromBasket(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No Items"
        )}
      </div>
    );
  }
}

export default Basket;
