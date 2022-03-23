import React from "react";
import ReactImageFallback from "react-image-fallback";
import currencyFormatter from "currency-formatter";
import "./MinDetailLayout.scss";

export default function MinDetailLayout(props) {
  const {
    basketDetails,
    cartDetails,
    showDiaImage,
    showZoomImage,
    diaIcon,
    thumbnailImage,
  } = props;
  return (
    <div className="min-detail">
      <div className="basket_preview_form_details">
        <table>
          <tbody>
            <tr>
              <td>Basket Type: </td>
              <td>{basketDetails.basketType}.</td>
            </tr>
            <tr>
              <td>Description: </td>
              <td>{basketDetails.desc}.</td>
            </tr>
            <tr>
              <td>Internal Notes: </td>
              <td>{basketDetails.internalNotes}.</td>
            </tr>
            <tr>
              <td>Customer: </td>
              <td>{basketDetails.customer.Customer}.</td>
            </tr>

            <tr>
              <td>Contact: </td>
              <td>{basketDetails.contact.DisplayName}.</td>
            </tr>
            <tr>
              <td>Total Items: </td>
              <td>{cartDetails.length}.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4>Items in Basket: </h4>
      <div className="basket_preview_items">
        {cartDetails.map((el, i) => (
          <div className={i / 4 === 0 ? "items page-break" : "items"} key={i}>
            <div className="item_image">
              {el.productType === "J" || el.productType === "G" ? (
                thumbnailImage(el) ? (
                  <img
                    className="product-thumbnail"
                    src={thumbnailImage(el)}
                    onClick={() => showZoomImage(el, "onImage")}
                    alt="product"
                  />
                ) : (
                  <ReactImageFallback
                    fallbackImage="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg"
                    alt=""
                    className="product-thumbnail"
                  />
                )
              ) : el.IconImageFileID ? (
                <img
                  className="product-image-icon"
                  src={showDiaImage(el.IconImageFileID)}
                  alt="product"
                />
              ) : (
                <img
                  className="dia-image-icon"
                  src={diaIcon(el.Shape)}
                  alt="product"
                />
              )}
            </div>
            <table className="item_header">
              <tbody>
                <tr>
                  <td>
                    <pre>
                      {el.SerialNumber
                        ? `${el.SerialNumber}  |  ${el.StyleNumber}`
                        : el.StyleNumber}
                    </pre>
                  </td>
                </tr>
                <tr>
                  <td>
                    <pre>Internal Notes: {el.InternalNote}</pre>
                  </td>
                </tr>
                <tr>
                  <td>
                    <pre>Quantity: {el.quantity}</pre>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <div className="item_details">
                <table>
                  <tbody>
                    {el.productType === "J" ? (
                      <tr>
                        <td colSpan="4">{el.Description}</td>
                      </tr>
                    ) : (
                      <tr>
                        <td>
                          {el.Shape}
                          {el.productType === "G" && ` - ${el.GemstoneType}`}
                        </td>
                        <td>
                          {el.productType === "D" &&
                            el.Polish &&
                            el.Symmetry &&
                            `${el.Polish}/${el.Symmetry}`}
                        </td>
                        {/* <td>
                                      <span>
                                        {el.productType === "D"
                                          ? `${
                                              el.GradingLab
                                                ? el.GradingLab + " - "
                                                : ""
                                            } ${
                                              el.LabReportNbr ? el.LabReportNbr : ""
                                            }`
                                          : el.GradingLab}
                                      </span>
                                      {el.Giapdfurl ? (
                                        <img
                                          src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/pdf.svg"
                                          alt="icon"
                                          className="pdf-icon cursor-pointer"
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </td> 
                      </tr>
                    )}
                    <tr>
                      <td>
                        {el.productType === "J"
                          ? el.ItemSubtype
                          : el.productType === "D" && el.DiamondCaratWeight
                          ? `${Number(el.DiamondCaratWeight).toFixed(2)}cts`
                          : `${Number(el.CaratWeight).toFixed(2)}cts`}
                      </td>
                      <td>
                        {el.productType === "J"
                          ? `${el.DiamondCarats}
                                            cts dia`
                          : el.productType === "D" &&
                            el.StoneFluoresence &&
                            el.StoneFluoresenceColor
                          ? `${el.StoneFluoresence || ""}
                                            ${el.StoneFluoresenceColor || ""}`
                          : ""}
                      </td>
                     <td>
                                    {el.productType === "J"
                                      ? el.Maker
                                      : el.productType === "G" && (
                                          <span
                                            className={
                                              el.Giapdfurl
                                                ? "lab__report--container iframe-link"
                                                : "lab__report--container"
                                            }
                                            onClick={() =>
                                              this.props.toggleIframeModal({
                                                show: true,
                                                url: el.Giapdfurl,
                                              })
                                            }
                                          >
                                            {el.LabReportNbr}
                                            {el.Giapdfurl ? (
                                              <img
                                                src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/pdf.svg"
                                                alt="icon"
                                                className="pdf-icon cursor-pointer"
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </span>
                                        )}
                                  </td> 
                       <td>{el.RingSize}</td> 
                    </tr>
                    <tr>
                      <td>
                        {el.productType === "J"
                          ? el.Collection
                          : el.productType === "D"
                          ? `${
                              el.DiamondColorRange
                                ? el.DiamondColorRange + "/"
                                : el.FancyColorGIA || ""
                            }${el.DiamondClarityRange || ""}
                                            `
                          : el.CountryofOrigin}
                      </td>
                      <td>
                        {el.Color ? el.Color + " / " : ""}
                        {el.Clarity}
                      </td>
                      <td>{el.Period}</td> 
                      <td>
                                    {el.Length}
                                    {el.BangleSize}
                                    {el.Diameter}
                                    {el.HoopDiameter}
                                  </td>
                    </tr>
                    <tr>
                      <td>
                        {el.productType === "J"
                          ? el.Metal
                          : el.productType === "D"
                          ? el.DiamondCut
                          : ""}
                      </td>
                      <td>
                        {el.DiamondDetails || ""}
                        {el.DiamondDetails && el.ColorComment ? " & " : ""}
                        {el.ColorComment || ""}
                      </td>

                       <td>{el.WidthOD}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="item_price">
                <table>
                  <tbody>
                    {basketDetails.includeRetail &&
                    (el.priceVisibility === "Default" ||
                      el.priceVisibility === "Hide Wholesale Price") ? (
                      <tr>
                        <td className="">Retail: </td>

                        <td className="">
                          {currencyFormatter.format(`${el.RetailPrice}`, {
                            code: "USD",
                            precision: 0,
                          })}
                        </td>
                      </tr>
                    ) : (
                      <tr />
                    )}
                    {basketDetails.includeWholesale &&
                    (el.priceVisibility === "Default" ||
                      el.priceVisibility === "Hide Retail Price") ? (
                      <tr>
                        <td className="">Wholesale: </td>
                        <td className="">
                          {(el.WholesalePrice &&
                            currencyFormatter.format(`${el.WholesalePrice}`, {
                              code: "USD",
                              precision: 0,
                            })) ||
                            "$0"}
                        </td>
                      </tr>
                    ) : (
                      <tr />
                    )}
                  </tbody>
                </table>
              </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
