import { React, useEffect } from "react";
import ReactImageFallback from "react-image-fallback";
import currencyFormatter from "currency-formatter";
import "./ProductBrochure.scss";

export default function ProductBrochure(props) {
  const {
    basketDetails,
    cartDetails,
    showDiaImage,
    showZoomImage,
    diaIcon,
    thumbnailImage,
    includeGIA,
  } = props;
  // console.log("cartDetails: ", cartDetails);

  const handleImage = (item) => {
    // console.log(item);
    // console.log(item);
    if (
      (item.transformType === "JewelrySerial" || !item.transformType) &&
      item.WebImage1
    ) {
      let str = item.WebImage1.replace(".jpg", "-product@2x.jpg");
      let imageurl = "https://cdn.kwiat.com/source-images/web/product/" + str;
      return imageurl;
    } else if (
      item.transformType === "DiamondSerial" ||
      item.transformType === "GemstoneSerial" ||
      ((item.transformType === "JewelrySerial" || !item.transformType) &&
        item.Shape &&
        item.Shape !== null)
    ) {
      // console.log("In shape");
      let imageurl =
        "https://cdn.kwiat.com/apps/kwiat-elastic-search/dia-shapes/" +
        item.Shape +
        ".jpg";
      // console.log("imageurl: ", imageurl);
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

  // useEffect(() => {
  //   // $("img").error(function() {
  //   //   $(this).hide();
  //   //   // or $(this).css({visibility:"hidden"});
  //   // });
  //   let img = document.getElementsByTagName("img");
  //   img.onerror = function() {
  //     this.style.display = "none";
  //   };
  // }, []);
  // console.log("cartdetails: ",cartDetails)
  return (
    <div className="layout_first">
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
          console.log("item: ", item);
          return (
            <div key={index}>
              <div className="Item">
                <div className="logo">
                  <img
                    className={
                      item.Brand === "Fred Leighton"
                        ? "fred_logo"
                        : "kwiat_logo"
                    }
                    src={
                      item.Brand === "Fred Leighton"
                        ? "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg"
                        : "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg"
                    }
                  />
                </div>
                <div className="product_image">
                  {basketDetails.includeLinks === "Web or Internal Imagery" &&
                  item.webProductURL &&
                  item.webProductURL !== "" &&
                  item.webProductURL !== null &&
                  ((item.linkVisibility && item.linkVisibility === "Default") ||
                    !item.linkVisibility) ? (
                    <a href={item.webProductURL}>
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
                    <a href={item.webProductURL}>
                      <img
                        src={handleImage(item)}
                        onError={(event) => {
                          event.target.src =
                            "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                        }}
                      />
                    </a>
                  ) : (
                    <img
                      src={handleImage(item)}
                      onError={(event) => {
                        event.target.src =
                          "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                      }}
                    />
                  )}
                </div>
                <div className="product_details">
                  <table>
                    <tbody>
                      <tr>
                        <td>Inventory Number: </td>
                        <td>
                          {item.SerialNumber
                            ? item.SerialNumber
                            : item.StyleNumber}
                        </td>
                      </tr>

                      {(item.transformType === "JewelrySerial" ||
                        !item.transformType) &&
                      item.SerialNumber &&
                      item.LongDescription ? (
                        <>
                          {item.Period ? (
                            <tr>
                              <td>Period: </td>
                              <td>{item.Period}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.Maker ? (
                            <tr>
                              <td>Maker: </td>
                              <td>{item.Maker}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.LongDescription ? (
                            <tr>
                              <td>Long Description: </td>
                              <td>{item.LongDescription}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}

                      {(item.transformType === "JewelrySerial" &&
                        item.SerialNumber &&
                        !item.LongDescription) ||
                      (item.transformType === "JewelrySerial" &&
                        !item.SerialNumber) ? (
                        <>
                          {item.Collection ? (
                            <tr>
                              <td>Collection: </td>
                              <td>{item.Collection}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.Metal ? (
                            <tr>
                              <td>Metal: </td>
                              <td>{item.Metal}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.DiamondCarats || item.Color || item.Clarity ? (
                            <tr>
                              <td>Diamonds: </td>
                              <td>
                                {item.DiamondCarats
                                  ? ` ${item.DiamondCarats} carats,`
                                  : ""}
                                {item.Color ? ` ${item.Color} color,` : ""}
                                {item.Clarity
                                  ? ` ${item.Clarity} clarity,`
                                  : ""}
                                {/* {item.DiamondDetails
                                  ? ` ${item.DiamondDetails}`
                                  : ""} */}
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.ColorCarats ? (
                            <tr>
                              <td>Color</td>
                              <td>
                                {item.ColorCarats
                                  ? ` ${item.ColorCarats} carats,`
                                  : ""}
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.CenterStoneNbr &&
                          (item.CenterStoneNbr.startsWith("G") ||
                            item.CenterStoneNbr.startsWith("D")) ? (
                            item.CenterShape ||
                            item.GemstoneType ||
                            item.CenterCaratWeight ||
                            item.CenterColor ||
                            item.CenterClarity ||
                            item.CenterCut ||
                            item.CenterOrigin ||
                            item.CenterEnhancement ? (
                              <tr>
                                <td>Center Stone</td>
                                <td>
                                  {item.CenterStoneNbr.startsWith("D")
                                    ? `${
                                        item.CenterShape
                                          ? ` ${item.CenterShape},`
                                          : ""
                                      }${
                                        item.GemstoneType
                                          ? ` ${item.GemstoneType},`
                                          : ""
                                      }${
                                        item.CenterCaratWeight
                                          ? ` ${item.CenterCaratWeight},`
                                          : ""
                                      }${
                                        item.CenterColor
                                          ? ` ${item.CenterColor},`
                                          : ""
                                      }${
                                        item.CenterClarity
                                          ? ` ${item.CenterClarity},`
                                          : ""
                                      }${
                                        item.CenterCut
                                          ? ` ${item.CenterCut}`
                                          : ""
                                      }`
                                    : item.CenterStoneNbr.startsWith("G")
                                    ? `${
                                        item.CenterShape
                                          ? ` ${item.CenterShape},`
                                          : ""
                                      }${
                                        item.GemstoneType
                                          ? ` ${item.GemstoneType},`
                                          : ""
                                      }${
                                        item.CenterCaratWeight
                                          ? ` ${item.CenterCaratWeight},`
                                          : ""
                                      }${
                                        item.CenterOrigin
                                          ? ` ${item.CenterOrigin},`
                                          : ""
                                      }${
                                        item.CenterEnhancement
                                          ? ` ${item.CenterEnhancement},`
                                          : ""
                                      }`
                                    : ""}
                                </td>
                              </tr>
                            ) : (
                              <></>
                            )
                          ) : (
                            <></>
                          )}
                          {item.SideStoneCaratWeight ? (
                            <tr>
                              <td>Side Stones: </td>
                              <td>{item.SideStoneCaratWeight}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                      {item.transformType === "DiamondSerial" ? (
                        <>
                          {item.Shape ? (
                            <tr>
                              <td>Shape:</td>
                              <td>{item.Shape}</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.DiamondCaratWeight ? (
                            <tr>
                              <td>Carat Weight:</td>
                              <td>
                                {Number(item.DiamondCaratWeight).toFixed(2)} cts
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.DiamondColorRange ? (
                            <tr>
                              <td>Diamond Color:</td>
                              <td>{item.DiamondColorRange} Color</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.DiamondClarityRange ? (
                            <tr>
                              <td>Diamond Clarity:</td>
                              <td>{item.DiamondClarityRange} Clarity</td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.LabReportNbr ? (
                            <tr>
                              <td>GIA Report # :</td>
                              <td>
                                {item.LabReportNbr}{" "}
                                <a href={url} target="_blank">
                                  (view report)
                                </a>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                          {item.DiaVideoLink ? (
                            <tr>
                              <td>Video :</td>
                              <td>
                                <a href={item.DiaVideoLink} target="_blank">
                                  view video
                                </a>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                      {basketDetails.includeRetail &&
                      (item.priceVisibility === "Default" ||
                        item.priceVisibility === "Hide Wholesale Price" ||
                        !item.priceVisibility) ? (
                        item.RetailPrice && parseInt(item.RetailPrice) > 0 ? (
                          <tr>
                            <td className="">Price: </td>

                            <td className="">
                              {currencyFormatter.format(`${item.RetailPrice}`, {
                                code: "USD",
                                precision: 0,
                              })}
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}

                      {basketDetails.includeWholesale &&
                      (item.priceVisibility === "Default" ||
                        item.priceVisibility === "Hide Retail Price" ||
                        !item.priceVisibility) ? (
                        item.WholesalePrice &&
                        parseInt(item.WholesalePrice) > 0 ? (
                          <tr>
                            <td className="">Wholesale: </td>
                            <td className="">
                              {(item.WholesalePrice &&
                                currencyFormatter.format(
                                  `${item.WholesalePrice}`,
                                  {
                                    code: "USD",
                                    precision: 0,
                                  }
                                )) ||
                                "$0"}
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                      {item.InternalNote && item.InternalNote !== "" ? (
                        <tr>
                          <td>Notes: </td>
                          <td>{item.InternalNote}</td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                  <div className="links">
                    {basketDetails.includeLinks === "Web or Internal Imagery" &&
                    item.webProductURL &&
                    item.webProductURL !== "" &&
                    item.webProductURL !== null &&
                    ((item.linkVisibility &&
                      item.linkVisibility === "Default") ||
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
                <div className="footer">
                  <div>
                    <span>
                      {new Date().toLocaleString("default", { month: "short" })}{" "}
                      {new Date().getFullYear()} - #{basketDetails.orderNbr}
                    </span>
                  </div>
                  <div>
                    <span>
                      Copyright {new Date().getFullYear()} All Rights Reserved
                    </span>
                  </div>

                  <a
                    href={
                      item.Brand === "Kwiat"
                        ? "Kwiat.com"
                        : "www.FredLeighton.com"
                    }
                  >
                    {item.Brand === "Kwiat"
                      ? "Kwiat.com"
                      : "www.FredLeighton.com"}
                  </a>
                </div>
              </div>
              {url.map((src, i) => {
                let flag = 0;
                // let img = <img src={src} onError={(flag = 1)} />;
                // console.log("flag :", flag);
                if (flag === 0) {
                  return (
                    <div className="Item" key={i}>
                      <div className="logo">
                        <img
                          className={
                            item.Brand === "Fred Leighton"
                              ? "fred_logo"
                              : "kwiat_logo"
                          }
                          src={
                            item.Brand === "Fred Leighton"
                              ? "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg"
                              : "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg"
                          }
                          // onError={(e) => console.log(e)}
                        />
                      </div>
                      <img
                        src={src}
                        // width="100%"
                        style={{ maxWidth: "90%" }}
                        onError={(event) => {
                          // console.log("event :", event.target.parentNode);
                          event.target.parentNode.style.display = "none";
                        }}
                      />
                      <div className="footer">
                        <div>
                          <span>
                            {new Date().toLocaleString("default", {
                              month: "short",
                            })}{" "}
                            {new Date().getFullYear()} - #
                            {basketDetails.orderNbr}
                          </span>
                        </div>
                        <div>
                          <span>
                            Copyright {new Date().getFullYear()} All Rights
                            Reserved
                          </span>
                        </div>

                        <a
                          href={
                            item.Brand === "Kwiat"
                              ? "Kwiat.com"
                              : "www.FredLeighton.com"
                          }
                        >
                          {item.Brand === "Kwiat"
                            ? "Kwiat.com"
                            : "www.FredLeighton.com"}
                        </a>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        } else {
          return (
            <div className="Item" key={index}>
              <div className="logo">
                <img
                  className={
                    item.Brand === "Fred Leighton" ? "fred_logo" : "kwiat_logo"
                  }
                  src={
                    item.Brand === "Fred Leighton"
                      ? "https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg"
                      : "https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg"
                  }
                />
              </div>
              <div className="product_image">
                {basketDetails.includeLinks === "Web or Internal Imagery" &&
                item.webProductURL &&
                item.webProductURL !== "" &&
                item.webProductURL !== null &&
                ((item.linkVisibility && item.linkVisibility === "Default") ||
                  !item.linkVisibility) ? (
                  <a href={item.webProductURL}>
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
                  ((item.linkVisibility && item.linkVisibility === "Default") ||
                    !item.linkVisibility) ? (
                  <a href={item.webProductURL}>
                    <img
                      src={handleImage(item)}
                      onError={(event) => {
                        event.target.src =
                          "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                      }}
                    />
                  </a>
                ) : (
                  <img
                    src={handleImage(item)}
                    onError={(event) => {
                      event.target.src =
                        "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";
                    }}
                  />
                )}
              </div>
              <div className="product_details">
                <table>
                  <tbody>
                    <tr>
                      <td>Inventory Number: </td>
                      <td>
                        {item.SerialNumber
                          ? item.SerialNumber
                          : item.StyleNumber}
                      </td>
                    </tr>

                    {item.transformType === "JewelrySerial" &&
                    item.SerialNumber &&
                    item.LongDescription ? (
                      <>
                        {item.Period ? (
                          <tr>
                            <td>Period: </td>
                            <td>{item.Period}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.Maker ? (
                          <tr>
                            <td>Maker: </td>
                            <td>{item.Maker}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.LongDescription ? (
                          <tr>
                            <td>Long Description: </td>
                            <td>{item.LongDescription}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    {(item.transformType === "JewelrySerial" &&
                      item.SerialNumber &&
                      !item.LongDescription) ||
                    (item.transformType === "JewelrySerial" &&
                      !item.SerialNumber) ? (
                      <>
                        {item.Collection ? (
                          <tr>
                            <td>Collection: </td>
                            <td>{item.Collection}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.Metal ? (
                          <tr>
                            <td>Metal: </td>
                            <td>{item.Metal}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.DiamondCarats || item.Color || item.Clarity ? (
                          <tr>
                            <td>Diamonds: </td>
                            <td>
                              {item.DiamondCarats
                                ? ` ${item.DiamondCarats} carats,`
                                : ""}
                              {item.Color ? ` ${item.Color} color,` : ""}
                              {item.Clarity ? ` ${item.Clarity} clarity,` : ""}
                              {/* {item.DiamondDetails
                                ? ` ${item.DiamondDetails} BR 2PS`
                                : ""} */}
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.ColorCarats ? (
                          <tr>
                            <td>Color</td>
                            <td>
                              {item.ColorCarats
                                ? ` ${item.ColorCarats} carats,`
                                : ""}
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.CenterStoneNbr &&
                        (item.CenterStoneNbr.startsWith("G") ||
                          item.CenterStoneNbr.startsWith("D")) ? (
                          item.CenterShape ||
                          item.GemstoneType ||
                          item.CenterCaratWeight ||
                          item.CenterColor ||
                          item.CenterClarity ||
                          item.CenterCut ||
                          item.CenterOrigin ||
                          item.CenterEnhancement ? (
                            <tr>
                              <td>Center Stone</td>
                              <td>
                                {item.CenterStoneNbr.startsWith("D")
                                  ? `${
                                      item.CenterShape
                                        ? ` ${item.CenterShape},`
                                        : ""
                                    }${
                                      item.GemstoneType
                                        ? ` ${item.GemstoneType},`
                                        : ""
                                    }${
                                      item.CenterCaratWeight
                                        ? ` ${item.CenterCaratWeight},`
                                        : ""
                                    }${
                                      item.CenterColor
                                        ? ` ${item.CenterColor},`
                                        : ""
                                    }${
                                      item.CenterClarity
                                        ? ` ${item.CenterClarity},`
                                        : ""
                                    }${
                                      item.CenterCut ? ` ${item.CenterCut}` : ""
                                    }`
                                  : item.CenterStoneNbr.startsWith("G")
                                  ? `${
                                      item.CenterShape
                                        ? ` ${item.CenterShape},`
                                        : ""
                                    }${
                                      item.GemstoneType
                                        ? ` ${item.GemstoneType},`
                                        : ""
                                    }${
                                      item.CenterCaratWeight
                                        ? ` ${item.CenterCaratWeight},`
                                        : ""
                                    }${
                                      item.CenterOrigin
                                        ? ` ${item.CenterOrigin},`
                                        : ""
                                    }${
                                      item.CenterEnhancement
                                        ? ` ${item.CenterEnhancement},`
                                        : ""
                                    }`
                                  : ""}
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )
                        ) : (
                          <></>
                        )}
                        {item.SideStoneCaratWeight ? (
                          <tr>
                            <td>Side Stones: </td>
                            <td>{item.SideStoneCaratWeight}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {item.transformType === "DiamondSerial" ? (
                      <>
                        {item.Shape ? (
                          <tr>
                            <td>Shape:</td>
                            <td>{item.Shape}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.DiamondCaratWeight ? (
                          <tr>
                            <td>Diamond Carat Weight:</td>
                            <td>
                              {Number(item.DiamondCaratWeight).toFixed(2)} cts
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.DiamondColorRange ? (
                          <tr>
                            <td>Diamond Color:</td>
                            <td>{item.DiamondColorRange} Color</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.DiamondClarityRange ? (
                          <tr>
                            <td>Diamond Clarity:</td>
                            <td>{item.DiamondClarityRange} Clarity</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {/* {item.LabReportNbr ? (
                            <tr>
                              <td>GIA Report # :</td>
                              <td>
                                {item.LabReportNbr}{" "}
                                <a href={url} target="_blank">
                                  (view report)
                                </a>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          )} */}
                        {item.DiaVideoLink ? (
                          <tr>
                            <td>Video :</td>
                            <td>
                              <a href={item.DiaVideoLink} target="_blank">
                                view video
                              </a>
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {item.transformType === "GemstoneSerial" ? (
                      <>
                        {item.GemstoneType ? (
                          <tr>
                            <td>Gemstone Type:</td>
                            <td>{item.GemstoneType}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.Shape ? (
                          <tr>
                            <td>Shape:</td>
                            <td>{item.Shape}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.CaratWeight ? (
                          <tr>
                            <td>Carat Weight:</td>
                            <td>{Number(item.CaratWeight).toFixed(2)} cts</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.CountryofOrigin ? (
                          <tr>
                            <td>Origin:</td>
                            <td>{item.CountryofOrigin}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.GemEnhancement ? (
                          <tr>
                            <td>Enhancement:</td>
                            <td>{item.GemEnhancement}</td>
                          </tr>
                        ) : (
                          <></>
                        )}
                        {item.SerialVideoLink ? (
                          <tr>
                            <td>Video :</td>
                            <td>
                              <a href={item.SerialVideoLink} target="_blank">
                                view video
                              </a>
                            </td>
                          </tr>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                    {basketDetails.includeRetail &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Wholesale Price" ||
                      !item.priceVisibility) ? (
                      item.RetailPrice && parseInt(item.RetailPrice) > 0 ? (
                        <tr>
                          <td className="">Price: </td>

                          <td className="">
                            {currencyFormatter.format(`${item.RetailPrice}`, {
                              code: "USD",
                              precision: 0,
                            })}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {basketDetails.includeWholesale &&
                    (item.priceVisibility === "Default" ||
                      item.priceVisibility === "Hide Retail Price" ||
                      !item.priceVisibility) ? (
                      item.WholesalePrice &&
                      parseInt(item.WholesalePrice) > 0 ? (
                        <tr>
                          <td className="">Wholesale: </td>
                          <td className="">
                            {(item.WholesalePrice &&
                              currencyFormatter.format(
                                `${item.WholesalePrice}`,
                                {
                                  code: "USD",
                                  precision: 0,
                                }
                              )) ||
                              "$0"}
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )
                    ) : (
                      <></>
                    )}
                    {item.InternalNote && item.InternalNote !== "" ? (
                      <tr>
                        <td>Notes: </td>
                        <td>{item.InternalNote}</td>
                      </tr>
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                <div className="links">
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
              <div className="footer">
                <div>
                  <span>
                    {new Date().toLocaleString("default", { month: "short" })}{" "}
                    {new Date().getFullYear()} - #{basketDetails.orderNbr}
                  </span>
                </div>
                <div>
                  <span>
                    Copyright {new Date().getFullYear()} All Rights Reserved
                  </span>
                </div>

                <a
                  href={
                    item.Brand === "Kwiat"
                      ? "Kwiat.com"
                      : "www.FredLeighton.com"
                  }
                >
                  {item.Brand === "Kwiat"
                    ? "Kwiat.com"
                    : "www.FredLeighton.com"}
                </a>
              </div>
            </div>
          );
        }
      })}
      {/* {cartDetails.map((item, index) => {
        if (includeGIA === "Yes" && item.ReportJpgUrls) {
          let url;
          if (item.ReportJpgUrls.charAt(0) === " ") {
            url = item.ReportJpgUrls.replace(/ /, "").split("|");
          } else {
            url = item.ReportJpgUrls.split("|");
          }
          return url.map((src, i) => (
            <div className="Item" key={i}>
              <img src={src} width="100%" height="40%" />
            </div>
          ));
        }

        // ? (

        //   <div className="Item" key={index}>
        //     <img src={item.ReportJpgUrls}  />
        //   </div>
        // ) : (
        //   ``
        // )
      })} */}
    </div>
  );
}
