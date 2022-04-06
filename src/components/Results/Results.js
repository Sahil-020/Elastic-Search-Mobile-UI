import React, { Component, useState } from "react";
import Card from "react-bootstrap/Card";
import currencyFormatter from "currency-formatter";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSingleView, addToCart, removeFromCart } from "../actions";
import SingleItem from "../SingleItemView/SingleItem";
import PreviewEmailModal from "../Basket/PDF/PreviewEmailModal";
import PDFModal from "../Basket/PDF/PDFModal";
import ChooseLayoutModal from "../Basket/ChooseLayoutModal";

export default function Results(props) {
  let {
    items,
    viewType,
    handleBackButton,
    isValueEmpty,
    isMultipleValueEmpty,
  } = props;
  const [data, setData] = useState({
    currentRes: [],
    showPreviewModal: false,
    showPDFModal: false,
    // showChooseLayout: false,
    // layoutType: "",
    coverType: "NoCover",
    // goto: "",
    includeGIA: "No",
  });
  const [showChooseLayout, setShowChooseLayout] = useState(false);
  const [goto, setGoto] = useState("");
  const [layoutType, setLayoutType] = useState("");
  const basket = useSelector((state) => state.basket);
  const showWholesale = useSelector(
    (state) => state.basketInputChange.showWholesale
  );
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

  const handleIncludeGIA = (value) => {
    setData({ ...data, includeGIA: value });
  };
  const handleEmail = async (res) => {
    console.log("Inside handle email");
    // if (
    //   this.props.basketInputObj.orderNbr &&
    //   this.props.basketInputObj.orderNbr !== "New"
    // ) {
    // this.props.toggleLoader({
    //   isLoading: true,
    // });
    // await getUserEmail();
    // await this.getContactEmail();
    // this.handleBasketChange("Email");
    // this.props.toggleLoader({
    //   isLoading: false,
    // });
    handleShowChooseLayout("Email", res);

    // } else {
    //   window.alert("Please select a basket first");
    // }
  };

  const handleCurrentRes = (res) => {
    setData({ ...data, currentRes: [res] });
  };

  const handleSetCover = (cover) => {
    // console.log("layout: ", layout);
    setData({ ...data, coverType: cover });
  };

  const handleSetLayout = (layout) => {
    // console.log("layout: ", layout);
    setLayoutType(layout);
    // setData({ ...data, layoutType: layout });
  };

  const handleShowChooseLayout = (value, res) => {
    console.log("Inside ChooseLayout");
    console.log({ res, value });
    // setData({
    //   ...data,
    //   showChooseLayout: true,
    //   goto: value,
    // });
    setShowChooseLayout(true);
    setGoto(value);
    handleCurrentRes(res);
    console.log({ data });
  };
  const hideChooseLayout = () => {
    // setData({ ...data, showChooseLayout: false });
    setShowChooseLayout(false);
  };

  const showPDFModal = () => {
    setData({ ...data, showPDFModal: true });
  };
  const hidePDFModal = () => {
    setData({ ...data, showPDFModal: false });
  };

  const showPreviewModal = () => {
    setData({ ...data, showPreviewModal: true });
  };
  const hidePreviewModal = () => {
    setData({ ...data, showPreviewModal: false });
  };

  return (
    // <div className="es_results">
    //   <div
    //     id="ES_Results"
    //     className="List_result_container"
    //     // className="compact_result_container"
    //   >
    <>
      {items &&
        items.map((item, index) => (
          <Card
            key={item.SerialNumber}
            onClick={(e) => {
              // if (e.target !== this) {
              //   return;
              // }
              // handleItemToView(item);
              // toggleSingleItem(true);
              // showItem(item._id);
              if (!basket.show) {
                dispatch(toggleSingleView({ show: true, item: item }));
              }
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
                <span>{index + 1}</span>
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
              <span>
                {item.IsSold === "1" ? "Sold" : ""}
                {item.IsRtv === "1" ? "RTV" : ""}
                {item.SerialStatus === "In Production" ? "In Production" : ""}
                {item.IsSemimount === "1" ? "Semimount" : ""}
                {item.SerialStatus === "Adjusted Out" ? "Adjusted Out" : ""}
                {item.IsMounted === "1" && item.IsSold !== "1" ? "mounted" : ""}
                {item.isOpenJob === "1" && item.PONumber !== null
                  ? `ON ORDER`
                  : ""}
                {item.isOpenJob === "1" && item.PONumber === null
                  ? `STOCK CREATE`
                  : ""}
              </span>
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
                        {item.Shape && item.Shape !== null
                          ? `${item.Shape} ${item.GemstoneType || ""}`
                          : ""}
                      </span>
                      <span>
                        {" "}
                        {isValueEmpty(item.DiamondCaratWeight) &&
                        isMultipleValueEmpty(item, "DiamondColorRange")
                          ? `${Number(item.DiamondCaratWeight).toFixed(
                              2
                            )}cts | ${isMultipleValueEmpty(
                              item,
                              "DiamondColorRange"
                            )} `
                          : isValueEmpty(item.DiamondCaratWeight)
                          ? `${Number(item.DiamondCaratWeight).toFixed(2)}cts`
                          : isMultipleValueEmpty(item, "DiamondColorRange")
                          ? isMultipleValueEmpty(item, "DiamondColorRange")
                          : ""}
                      </span>
                    </div>
                  ) : item.transformType === "GemstoneSerial" ? (
                    <div className="item_description">
                      <span>
                        {isValueEmpty(item.Shape)
                          ? `${item.Shape} ${item.GemstoneType}`
                          : ""}
                      </span>
                      <span>
                        {" "}
                        {isValueEmpty(item.CountryofOrigin) &&
                        isValueEmpty(item.GemEnhancement)
                          ? ` ${isValueEmpty(
                              item.CountryofOrigin
                            )} | ${isValueEmpty(item.GemEnhancement)} `
                          : isValueEmpty(item.CountryofOrigin)
                          ? `${isValueEmpty(item.CountryofOrigin)}`
                          : isValueEmpty(item.GemEnhancement)
                          ? isValueEmpty(item.GemEnhancement)
                          : ""}
                      </span>
                    </div>
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
                  {item.WholesalePrice && showWholesale ? (
                    <span>
                      {isMultipleValueEmpty(item, "WholesalePrice")}
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
              {!basket.show ? (
                <button
                  onClick={(e) => {
                    // if (e.target === this) {
                    e.stopPropagation();
                    dispatch(addToCart({ product: item }));
                    // addItemToBasket(item);
                    // }
                  }}
                >
                  <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/add-to-basket.png"></img>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm("Confirm Delete?")) {
                      dispatch(removeFromCart(item));
                    }
                  }}
                >
                  <span>-</span>
                </button>
              )}
            </div>
            {/* )} */}
          </Card>
        ))}
      <SingleItem
        isValueEmpty={isValueEmpty}
        isMultipleValueEmpty={isMultipleValueEmpty}
        handleSetCover={handleSetCover}
        handleIncludeGIA={handleIncludeGIA}
        showChooseLayout={handleShowChooseLayout}
        handleEmail={handleEmail}
      />
      <PreviewEmailModal
        show={data.showPreviewModal}
        hide={hidePreviewModal}
        layoutType={layoutType}
        coverType={data.coverType}
        showChooseLayout={handleShowChooseLayout}
        item={
          data.currentRes.length && data.currentRes[0] ? data.currentRes : []
        }
        handleCurrentRes={handleCurrentRes}
        filename={"Kwiat-Fred-Leighton"}
        includeGIA={data.includeGIA}
        // user={this.stat}
      />
      <PDFModal
        show={data.showPDFModal}
        hide={hidePDFModal}
        layoutType={layoutType}
        coverType={data.coverType}
        showChooseLayout={handleShowChooseLayout}
        item={
          data.currentRes.length && data.currentRes[0] ? data.currentRes : []
        }
        handleCurrentRes={handleCurrentRes}
        filename={"KWFL"}
        includeGIA={data.includeGIA}
      />
      <ChooseLayoutModal
        show={showChooseLayout}
        hide={hideChooseLayout}
        setLayout={handleSetLayout}
        setCover={handleSetCover}
        showPreviewModal={showPreviewModal}
        showPDFModal={showPDFModal}
        goto={goto}
        showChooseLayout={handleShowChooseLayout}
        coverType={data.coverType}
        includeGIA={data.includeGIA}
        handleIncludeGIA={handleIncludeGIA}
        item={
          data.currentRes.length && data.currentRes[0] ? data.currentRes : []
        }
      />
    </>
    //   </div>
    // </div>
  );
}
