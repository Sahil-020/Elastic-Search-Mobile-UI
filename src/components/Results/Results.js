import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import currencyFormatter from "currency-formatter";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSingleView, addToCart, removeFromCart } from "../actions";

export default function Results(props) {
  let {
    items,
    viewType,
    handleBackButton,
    isValueEmpty,
    isMultipleValueEmpty,
  } = props;
  const basket = useSelector((state) => state.basket);
  console.log("items : ", items);
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
        {items &&
          items.map((item, index) => (
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
                  {item.transformType === "JewelrySerial" ||
                  !item.transformType ? (
                    <>
                      {" "}
                      {item.SerialNumber && item.StyleNumber ? (
                        <>
                          <span>{item.SerialNumber}</span>
                          {viewType === "Grid1" ? "|" : ""}
                          <span> {item.StyleNumber}</span>
                        </>
                      ) : item.SerialNumber ? (
                        item.SerialNumber
                      ) : item.StyleNumber ? (
                        item.StyleNumber
                      ) : (
                        ``
                      )}
                    </>
                  ) : (
                    <>{item.SerialNumber}</>
                  )}
                </Card.Title>
              )}
              {viewType === "List" && (
                <div className="item_no">
                  <span>{index + 1}.</span>
                </div>
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
                {/* <span>
                  {item.IsSold === "1" ? "Sold" : ""}
                  {item.IsRtv === "1" ? "RTV" : ""}
                  {item.SerialStatus === "In Production" ? "In Production" : ""}
                  {item.IsSemimount === "1" ? "Semimount" : ""}
                  {item.SerialStatus === "Adjusted Out" ? "Adjusted Out" : ""}
                  {item.IsMounted === "1" && item.IsSold !== "1"
                    ? "mounted"
                    : ""}
                  {item.isOpenJob === "1" && item.PONumber !== null
                    ? `ON ORDER`
                    : ""}
                  {item.isOpenJob === "1" && item.PONumber === null
                    ? `STOCK CREATE`
                    : ""}
                </span> */}
              </div>
              <Card.Body>
                {viewType === "List" && (
                  <Card.Title>
                    {item.transformType === "JewelrySerial" ||
                    !item.transformType ? (
                      <>
                        {" "}
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
                      </>
                    ) : (
                      <>{item.SerialNumber}</>
                    )}
                  </Card.Title>
                )}

                <div className="card-text">
                  {viewType !== "Grid3" ? (
                    item.transformType === "JewelrySerial" ||
                    !item.transformType ? (
                      <div className="item_description">{item.Description}</div>
                    ) : item.transformType === "DiamondSerial" ? (
                      <div className="item_description">
                        <span>
                          {" "}
                          {isValueEmpty(item.DiamondCaratWeight) &&
                          isMultipleValueEmpty(item, "DiamondColorRange") &&
                          item.Shape &&
                          item.Shape !== null
                            ? ` ${item.Shape} ${
                                item.GemstoneType || ""
                              } | ${Number(item.DiamondCaratWeight).toFixed(
                                2
                              )}cts | ${isMultipleValueEmpty(
                                item,
                                "DiamondColorRange"
                              )} `
                            : isValueEmpty(item.DiamondCaratWeight)
                            ? `${Number(item.DiamondCaratWeight).toFixed(2)}cts`
                            : isMultipleValueEmpty(item, "DiamondColorRange")
                            ? isMultipleValueEmpty(item, "DiamondColorRange")
                            : item.Shape && item.Shape !== null
                            ? `${item.Shape} ${item.GemstoneType || ""}`
                            : ""}
                        </span>
                      </div>
                    ) : item.transformType == "GemstoneSerial" ? (
                      <div className="item_description">Gemstone</div>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                  <div className="item_price">
                    {item.RetailPrice ? (
                      <span>
                        {currencyFormatter.format(`${item.RetailPrice}`, {
                          code: "USD",
                          precision: 0,
                        }) || ""}
                        <sup>(R)</sup>
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    {item.WholesalePrice ? (
                      <span>
                        {currencyFormatter.format(`${item.WholesalePrice}`, {
                          code: "USD",
                          precision: 0,
                        }) || ""}
                        <sup>(W)</sup>
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </div>
                </div>
              </Card.Body>
              {/* {viewType === "List" && ( */}
              <div className="result_action_group">
                <button>
                  {!basket.show ? (
                    <img
                      src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"
                      onClick={(e) => {
                        // if (e.target === this) {
                        e.stopPropagation();
                        dispatch(addToCart({ product: item }));
                        // addItemToBasket(item);
                        // }
                      }}
                    ></img>
                  ) : (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(removeFromCart(item));
                      }}
                    >
                      -
                    </span>
                  )}
                </button>
              </div>
              {/* )} */}
            </Card>
          ))}
      </div>
    </div>
  );
}
