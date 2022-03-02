import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import currencyFormatter from "currency-formatter";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSingleView } from "../actions";

export default function Results(props) {
  let { items, viewType, handleBackButton } = props;
  // console.log("items : ", items);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleImage = (item) => {
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
  };
  const showItem = (id) => {
    // console.log("location : ", location, "\n id : ", id);
    id && history.push(`${location.pathname}/${id}`, { id });
  };

  return (
    <div className="es_results">
      <div
        id="ES_Results"
        className="List_result_container"
        // className="compact_result_container"
      >
        {items.map((item, index) => (
          <Card
            key={index}
            onClick={(e) => {
              // if (e.target !== this) {
              //   return;
              // }
              // handleItemToView(item);
              // toggleSingleItem(true);
              // showItem(item._id);
              dispatch(toggleSingleView({ show: true, item: item }));
              // handleBackButton(true);
            }}
          >
            {["Grid1", "Grid2", "Grid3"].includes(viewType) && (
              <Card.Title>
                {item.SerialNumber && item.StyleNumber ? (
                  <>
                    <span>{item.SerialNumber}</span>|
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
            )}
            <div className="image_container">
              <Card.Img
                variant="top"
                src={handleImage(item)}
                onError={(event) => {
                  event.target.src =
                    "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                }}
              />
            </div>
            <Card.Body>
              {viewType === "List" && (
                <Card.Title>
                  {item.SerialNumber && item.StyleNumber ? (
                    <>
                      <span>{item.SerialNumber}</span>|
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
              )}

              <div className="card-text">
                {viewType !== "Grid3" && (
                  <div className="item_description">{item.Description}</div>
                )}
                <div className="item_price">
                  {" "}
                  {(item.RetailPrice &&
                    currencyFormatter.format(`${item.RetailPrice}`, {
                      code: "USD",
                      precision: 0,
                    })) ||
                    ""}{" "}
                </div>
              </div>
            </Card.Body>
            {/* {viewType === "List" && ( */}
            <div className="result_action_group">
              <img
                src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"
                onClick={(e) => {
                  // if (e.target === this) {
                  e.stopPropagation();
                  // addItemToBasket(item);
                  // }
                }}
              ></img>
            </div>
            {/* )} */}
          </Card>
        ))}
      </div>
    </div>
  );
}
