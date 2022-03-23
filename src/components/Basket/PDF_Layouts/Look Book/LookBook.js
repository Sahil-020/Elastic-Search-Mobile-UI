import React from "react";
import ReactImageFallback from "react-image-fallback";
import currencyFormatter from "currency-formatter";
import "./LookBook.scss";

export default function LookBook(props) {
  const {
    basketDetails,
    cartDetails,
    showDiaImage,
    showZoomImage,
    diaIcon,
    thumbnailImage,
    includeGIA,
    items,
    includeStoneValues,
    includeLocation,
    priceLabel,
    handleImage,
  } = props;
  // console.log("cartDetails: ", cartDetails);
  // console.log("includeStone: ", includeStoneValues);

  const PageTemplate = (
    <div
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
      }}
    >
      {basketDetails.desc}
    </div>
  );

  // const handleImage = (item) => {
  //   if (item.WebImage1) {
  //     //   console.log(item);
  //     let str = item.WebImage1.replace(".jpg", "-product@2x.jpg");
  //     let imageurl = "https://cdn.kwiat.com/source-images/web/product/" + str;
  //     return imageurl;
  //   } else if (item.LargeImageName) {
  //     let searchimage;
  //     searchimage = item.LargeImageName;
  //     let str = searchimage.split("\\");
  //     searchimage = str[str.length - 1];
  //     let imageurl = "https://cdn.kwiat.com/source-images/large/" + searchimage;
  //     return imageurl;
  //   } else if (
  //     (item.productType === "D" || item.productType === "J") &&
  //     item.Shape
  //   ) {
  //     let imageurl =
  //       "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
  //       item.Shape +
  //       ".svg";
  //     return imageurl;
  //   } else {
  //     let imageurl =
  //       "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
  //     return imageurl;
  //   }
  // };

  return (
    <div className="layout_second">
      {/* <div className="header_description">{basketDetails.desc}</div> */}
      <div
        className="item_container"
        style={
          cartDetails.length <= 3 && items === "6"
            ? { height: "600px", columnGap: "9px" }
            : cartDetails.length <= 3
            ? { height: "600px" }
            : items === "6"
            ? { columnGap: "9px" }
            : {}
        }
      >
        {cartDetails &&
          cartDetails.map((item, index) => {
            let url;
            if (includeGIA === "Yes" && item.ReportJpgUrls) {
              if (item.ReportJpgUrls.includes("|")) {
                if (item.ReportJpgUrls.charAt(0) === " ") {
                  url = item.ReportJpgUrls.replace(/ /, "").split("|");
                } else {
                  url = item.ReportJpgUrls.split("|");
                }
              } else {
                url = [item.ReportJpgUrls];
              }
            }
            return (
              <div
                className="item"
                key={index}
                style={items === "6" ? { width: "240px", height: "210px" } : {}}
              >
                <div
                  className="item_icon"
                  style={items === "6" ? { height: "70%" } : {}}
                >
                  {basketDetails.includeLinks === "Web or Internal Imagery" &&
                  item.webProductURL &&
                  item.webProductURL !== "" &&
                  item.webProductURL !== null &&
                  ((item.linkVisibility && item.linkVisibility === "Default") ||
                    !item.linkVisibility) ? (
                    <a href={item.webProductURL} target="_blank">
                      <img
                        src={handleImage(item)}
                        onError={(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>
                  ) : basketDetails.includeLinks === "ONLY Web Imagery" &&
                    item.hasWebImage &&
                    item.hasWebImage === "1" &&
                    item.webProductURL &&
                    item.webProductURL !== "" &&
                    item.webProductURL !== null &&
                    ((item.linkVisibility &&
                      item.linkVisibility === "Default") ||
                      !item.linkVisibility) ? (
                    <a href={item.webProductURL} target="_blank">
                      <img
                        src={handleImage(item)}
                        onError={(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>
                  ) : (
                    <a href={handleImage(item)} target="_blank">
                      <img
                        src={handleImage(item)}
                        onError={(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>
                  )}
                </div>
                {(!item.transformType ||
                  item.transformType === "JewelrySerial") &&
                item.Description ? (
                  <div className="item_serial_description">
                    {item.Description}
                  </div>
                ) : (
                  ``
                )}
                {item.SerialNumber || item.StyleNumber ? (
                  <div
                    className={
                      item.transformType === "DiamondSerial" ||
                      item.transformType === "GemstoneSerial"
                        ? "item_daimond_description"
                        : "item_serial_style_no"
                    }
                  >
                    {item.transformType === "DiamondSerial" ||
                    item.transformType === "JewelrySerial" ||
                    !item.transformType
                      ? item.StyleNumber && item.SerialNumber
                        ? item.StyleNumber + " | " + item.SerialNumber
                        : item.StyleNumber
                        ? item.StyleNumber
                        : item.SerialNumber
                        ? item.SerialNumber
                        : ``
                      : item.transformType === "GemstoneSerial"
                      ? item.GemstoneType && item.Shape && item.SerialNumber
                        ? item.GemstoneType +
                          " " +
                          item.Shape +
                          " | " +
                          item.SerialNumber
                        : item.GemstoneType && item.Shape
                        ? item.GemstoneType + " " + item.Shape
                        : item.Shape && item.SerialNumber
                        ? item.Shape + " | " + item.SerialNumber
                        : item.GemstoneType && item.SerialNumber
                        ? item.GemstoneType + " | " + item.SerialNumber
                        : ``
                      : ``}
                  </div>
                ) : (
                  ``
                )}

                {item.transformType === "DiamondSerial" ? (
                  item.DiamondCaratWeight &&
                  item.DiamondColorRange &&
                  item.DiamondClarityRange ? (
                    <div>
                      {Number(item.DiamondCaratWeight).toFixed(2)}cts
                      {item.DiamondColorRange} Color/
                      {item.DiamondClarityRange} Clarity{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondCaratWeight && item.DiamondColorRange ? (
                    <div>
                      {Number(item.DiamondCaratWeight).toFixed(2)} cts
                      {item.DiamondColorRange} Color{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondColorRange && item.DiamondClarityRange ? (
                    <div>
                      {item.DiamondColorRange} Color/
                      {item.DiamondClarityRange} Clarity{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondCaratWeight && item.DiamondClarityRange ? (
                    <div>
                      {Number(item.DiamondCaratWeight).toFixed(2)} cts/
                      {item.DiamondClarityRange} Clarity{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondCaratWeight ? (
                    <div>
                      {Number(item.DiamondCaratWeight).toFixed(2)} cts{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondColorRange ? (
                    <div>
                      {item.DiamondColorRange} Color{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : item.DiamondClarityRange ? (
                    <div>
                      {item.DiamondClarityRange} Clarity{" "}
                      {includeGIA === "Yes" && (
                        <a href={url} target="_blank">
                          (view report)
                        </a>
                      )}
                    </div>
                  ) : (
                    ``
                  )
                ) : (
                  ``
                )}
                {item.transformType === "GemstoneSerial" ? (
                  item.CaratWeight &&
                  item.CountryofOrigin &&
                  item.GemEnhancement ? (
                    <div>
                      {Number(item.CaratWeight).toFixed(2)} cts -{" "}
                      {item.CountryofOrigin} - {item.GemEnhancement}
                    </div>
                  ) : item.CaratWeight && item.CountryofOrigin ? (
                    <div>
                      {Number(item.CaratWeight).toFixed(2)} cts -{" "}
                      {item.CountryofOrigin} Color{" "}
                    </div>
                  ) : item.CountryofOrigin && item.GemEnhancement ? (
                    <div>
                      {item.CountryofOrigin} - {item.GemEnhancement}
                    </div>
                  ) : item.CaratWeight && item.GemEnhancement ? (
                    <div>
                      {Number(item.CaratWeight).toFixed(2)} cts -{" "}
                      {item.GemEnhancement}
                    </div>
                  ) : item.CaratWeight ? (
                    <div>{Number(item.CaratWeight).toFixed(2)} cts</div>
                  ) : item.CountryofOrigin ? (
                    <div>{item.CountryofOrigin}</div>
                  ) : item.GemEnhancement ? (
                    <div>{item.GemEnhancement}</div>
                  ) : (
                    ``
                  )
                ) : (
                  ``
                )}
                {(item.transformType === "JewelrySerial" ||
                  !item.transformType) &&
                item.Metal ? (
                  <div className="item_metal">{item.Metal}</div>
                ) : (
                  ``
                )}
                {item.InternalNote || includeLocation ? (
                  <div className="item_internal_note">
                    {item.InternalNote &&
                    item.InternalNote !== "" &&
                    includeLocation
                      ? `Notes: ${item.InternalNote} - ${
                          item.SerialNumber
                            ? item.Warehouse && item.Warehouse === "MEMO"
                              ? `${item.Warehouse} - ${item.StatusCustomer}`
                              : item.Warehouse
                            : ""
                        }
                      ${
                        item.SerialNumber
                          ? item.Warehouse !== item.SerialStatus &&
                            item.Warehouse &&
                            item.SerialStatus
                            ? "/"
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.IsVirtual === "1"
                            ? "Virtual - "
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.IsPhantom === "1"
                            ? "Phantom - "
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.Warehouse !== item.SerialStatus
                            ? item.SerialStatus
                            : ""
                          : ""
                      }`
                      : item.InternalNote && item.InternalNote !== ""
                      ? `Notes: ${item.InternalNote}`
                      : includeLocation
                      ? `${
                          item.SerialNumber
                            ? item.Warehouse && item.Warehouse === "MEMO"
                              ? `${item.Warehouse} - ${item.StatusCustomer}`
                              : `${item.Warehouse ? `${item.Warehouse}` : ``}`
                            : ""
                        }
                      ${
                        item.SerialNumber
                          ? item.Warehouse !== item.SerialStatus &&
                            item.Warehouse &&
                            item.SerialStatus
                            ? "/"
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.IsVirtual === "1"
                            ? "Virtual - "
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.IsPhantom === "1"
                            ? "Phantom - "
                            : ""
                          : ""
                      }
                      ${
                        item.SerialNumber
                          ? item.Warehouse !== item.SerialStatus
                            ? `${
                                item.SerialStatus ? `${item.SerialStatus}` : ``
                              }`
                            : ""
                          : ""
                      }`
                      : ``}
                  </div>
                ) : (
                  ``
                )}
                {(item.transformType === "JewelrySerial" ||
                  !item.transformType) &&
                includeStoneValues ? (
                  <div className="stone_details">
                    {item.DiamondCarats ||
                    item.Color ||
                    item.Clarity ||
                    item.ColorCarats
                      ? `${
                          item.DiamondCarats
                            ? ` ${item.DiamondCarats} carats,`
                            : ""
                        }
                      ${item.Color ? ` ${item.Color} color,` : ""}
                      ${item.Clarity ? ` ${item.Clarity} clarity.` : ""} 
                      ${item.ColorCarats ? `${item.ColorCarats} carats.` : ""}`
                      : ``}
                  </div>
                ) : (
                  ``
                )}

                <div className="item_price">
                  {basketDetails.includeRetail &&
                  (item.priceVisibility === "Default" ||
                    item.priceVisibility === "Hide Wholesale Price" ||
                    !item.priceVisibility) &&
                  (basketDetails.includeWholesale &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Retail Price" ||
                      !item.priceVisibility)) &&
                  (item.RetailPrice && parseInt(item.RetailPrice) > 0) &&
                  (item.WholesalePrice && parseInt(item.WholesalePrice) > 0)
                    ? `${
                        priceLabel === "Price" ? "Price" : "MSRP"
                      } : ${currencyFormatter.format(`${item.RetailPrice}`, {
                        code: "USD",
                        precision: 0,
                      })} | Wholesale : ${(item.WholesalePrice &&
                        currencyFormatter.format(`${item.WholesalePrice}`, {
                          code: "USD",
                          precision: 0,
                        })) ||
                        "$0"}`
                    : basketDetails.includeWholesale &&
                      (item.priceVisibility === "Default" ||
                        item.priceVisibility === "Hide Retail Price" ||
                        !item.priceVisibility) &&
                      (item.WholesalePrice && parseInt(item.WholesalePrice) > 0)
                    ? `Wholesale : ${(item.WholesalePrice &&
                        currencyFormatter.format(`${item.WholesalePrice}`, {
                          code: "USD",
                          precision: 0,
                        })) ||
                        "$0"} `
                    : basketDetails.includeRetail &&
                      (item.priceVisibility === "Default" ||
                        item.priceVisibility === "Hide Wholesale Price" ||
                        !item.priceVisibility) &&
                      (item.RetailPrice && parseInt(item.RetailPrice) > 0)
                    ? `${
                        priceLabel === "Price" ? "Price" : "MSRP"
                      } : ${(item.RetailPrice &&
                        currencyFormatter.format(`${item.RetailPrice}`, {
                          code: "USD",
                          precision: 0,
                        })) ||
                        "$0"}`
                    : ``}{" "}
                  {item.DiaVideoLink ||
                  (item.SerialVideoLink &&
                    item.transformType === "GemstoneSerial") ? (
                    <a
                      href={
                        item.DiaVideoLink
                          ? item.DiaVideoLink
                          : item.SerialVideoLink
                      }
                      target="_blank"
                    >
                      (view video)
                    </a>
                  ) : (
                    ``
                  )}{" "}
                  {basketDetails.includeLinks === "Web or Internal Imagery" &&
                  item.webProductURL &&
                  item.webProductURL !== "" &&
                  item.webProductURL !== null &&
                  ((item.linkVisibility && item.linkVisibility === "Default") ||
                    !item.linkVisibility) ? (
                    <a href={item.webProductURL}>view online</a>
                  ) : basketDetails.includeLinks === "ONLY Web Imagery" &&
                    item.hasWebImage &&
                    item.hasWebImage === "1" &&
                    item.webProductURL &&
                    item.webProductURL !== "" &&
                    item.webProductURL !== null &&
                    ((item.linkVisibility &&
                      item.linkVisibility === "Default") ||
                      !item.linkVisibility) ? (
                    <a href={item.webProductURL}>view online</a>
                  ) : (
                    ``
                  )}
                </div>
              </div>
            );
          })}
      </div>
      {cartDetails.map((item, index) => {
        if (includeGIA === "Yes" && item.ReportJpgUrls) {
          let url;
          if (item.ReportJpgUrls.includes("|")) {
            if (item.ReportJpgUrls.charAt(0) === " ") {
              url = item.ReportJpgUrls.replace(/ /, "").split("|");
            } else {
              url = item.ReportJpgUrls.split("|");
            }
          } else {
            url = [item.ReportJpgUrls];
          }
          return url.map((src, i) => (
            <div key={i} style={{ height: "11in" }}>
              <img
                src={src}
                width="100%"
                onError={(event) => {
                  // console.log("event :", event.target.parentNode);
                  event.target.parentNode.style.display = "none";
                }}
              />
            </div>
          ));
        }
      })}
    </div>
  );
}
