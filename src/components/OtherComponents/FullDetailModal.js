import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import ShowMore from "react-show-more";
import moment from "moment";
import currencyFormatter from "currency-formatter";
import LoadingOverlay from "react-loading-overlay";

class FullDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.show || false,
      isLoading: true,
    };
    this.onModalHide = this.onModalHide.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }
  onLoad() {
    this.setState({
      isLoading: false,
    });
  }
  onModalHide() {
    let { callback } = this.props;
    // console.log("full modal callback", callback);

    this.setState(
      {
        showModal: false,
      },
      () => {
        callback && callback();
      }
    );
  }

  render() {
    // console.log('result is ',this.props.result);

    let { result, show } = this.props;
    let largeImage = result.LargeImageFileID;
    let { isLoading } = this.state;
    let image =
      largeImage && largeImage !== null
        ? largeImage
        : "https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Missing-Images-Final-100x75px-01.svg";

    return (
      <Modal
        // {...this.props}
        show={show}
        onHide={() => this.onModalHide()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered="true"
        className="full-popup-modal product"
      >
        <Modal.Header closeButton className="modal-header-con">
          <Modal.Title>
            {result._id}
            <Button className="edit-btn">Edit</Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section>
            <div className="product-img">
              <LoadingOverlay
                active={isLoading}
                spinner
                text="Loading image..."
              >
                <img
                  src={image}
                  alt="Product"
                  className="img-responsive"
                  onLoad={this.onLoad}
                />
              </LoadingOverlay>
              <h3 className="detail-img">
                <span>
                  {result.IsSold && result.IsSold !== "0" ? "In Sold" : ""}
                </span>
              </h3>
            </div>
          </section>

          <div className="product-details pos-relative">
            <div className="product-info_box">
              <h5 className="product-info_box_heading product-dark_title_color">
                <span>
                  {result.StyleNumber && result.StyleNumber !== null
                    ? `${result.StyleNumber}`
                    : ""}
                </span>
              </h5>

              <div className="product-info_background">
                <div className="product-description">
                  <ShowMore
                    lines={1}
                    more="&#43;"
                    less="&#8722;"
                    anchorClass="product-description_accordion"
                  >
                    <span className="product-description-con">
                      {result.ShortDescription &&
                      result.ShortDescription !== null
                        ? `${result.ShortDescription}`
                        : `${result.Description}`}
                    </span>
                  </ShowMore>
                </div>
                <section>
                  <div className="product-details_lcol">
                    <div
                      className={
                        result.ItemSubtype && result.ItemSubtype !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.ItemSubtype && result.ItemSubtype !== null
                            ? `${result.ItemSubtype}`
                            : result.ItemType && result.ItemType !== null
                            ? `${result.ItemType}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_mcol">
                    <div
                      className={
                        result.RetailPrice && result.RetailPrice != null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <span className="retail-price-con">
                        {result.RetailPrice && result.RetailPrice != null
                          ? currencyFormatter.format(`${result.RetailPrice}`, {
                              code: "USD",
                              precision: 0,
                            })
                          : ""}
                      </span>
                      <span className="product-details-view-label">
                        {result.RetailPrice && result.RetailPrice != null
                          ? " Retail"
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="product-details_m-lcol">
                    <div
                      className={
                        result.ItemSubtype && result.ItemSubtype !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.ItemSubtype && result.ItemSubtype !== null
                            ? `${result.ItemSubtype}`
                            : result.ItemType && result.ItemType !== null
                            ? `${result.ItemType}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_m-rcol">
                    <div
                      className={
                        result.RetailPrice && result.RetailPrice != null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <span className="retail-price-con">
                        {result.RetailPrice && result.RetailPrice != null
                          ? currencyFormatter.format(`${result.RetailPrice}`, {
                              code: "USD",
                              precision: 0,
                            })
                          : ""}
                      </span>
                      <span className="product-details-view-label">
                        {result.RetailPrice && result.RetailPrice != null
                          ? " Retail"
                          : ""}
                      </span>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="product-details_lcol">
                    <div
                      className={
                        result.Collection && result.Collection !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.Collection && result.Collection !== null
                            ? `${result.Collection}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_mcol">
                    <div
                      className={
                        result.WholesalePrice && result.WholesalePrice != null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <span className="retail-price-con">
                        {result.WholesalePrice && result.WholesalePrice != null
                          ? currencyFormatter.format(
                              `${result.WholesalePrice}`,
                              {
                                code: "USD",
                                precision: 0,
                              }
                            )
                          : ""}
                      </span>
                      <span className="product-details-view-label">
                        {result.WholesalePrice && result.WholesalePrice != null
                          ? "Wholesale"
                          : ""}
                      </span>
                    </div>
                  </div>
                  <div className="product-details_m-lcol">
                    <div
                      className={
                        result.Collection && result.Collection !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.Collection && result.Collection !== null
                            ? `${result.Collection}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_m-rcol">
                    <div
                      className={
                        result.WholesalePrice && result.WholesalePrice != null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <span className="retail-price-con">
                        {result.WholesalePrice && result.WholesalePrice != null
                          ? currencyFormatter.format(
                              `${result.WholesalePrice}`,
                              {
                                code: "USD",
                                precision: 0,
                              }
                            )
                          : ""}
                      </span>
                      <span className="product-details-view-label">
                        {result.WholesalePrice && result.WholesalePrice != null
                          ? "Wholesale"
                          : ""}
                      </span>
                    </div>
                  </div>
                </section>
                <section>
                  <div className="product-details_lcol">
                    <div
                      className={
                        result.Metal && result.Metal !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.Metal && result.Metal !== null
                            ? `${result.Metal}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_mcol">
                    <div className="unknown customer-name product-details-label">
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span>Customer John Doe</span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_m-lcol">
                    <div
                      className={
                        result.Metal && result.Metal !== null
                          ? "known product-details-label"
                          : "unknown product-details-label"
                      }
                    >
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span className="prouct-description_info">
                          {result.Metal && result.Metal !== null
                            ? `${result.Metal}`
                            : ""}
                        </span>
                      </ShowMore>
                    </div>
                  </div>
                  <div className="product-details_m-rcol">
                    <div className="unknown customer-name product-details-label">
                      <ShowMore
                        lines={1}
                        more="&#43;"
                        less="&#8722;"
                        anchorClass=""
                      >
                        <span>Customer John Doe</span>
                      </ShowMore>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
          <section className="product-d-flex-container">
            <div className="product-stock_details pos-relative">
              <div className="product-info_box">
                <h5 className="product-info_box_heading product-light_title_color">
                  <span>Stock Details</span>
                </h5>

                <div className="product-info_background">
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label">
                        <span className="hold-date product-details_line-break">
                          {result.InStockDate && result.InStockDate != null
                            ? moment(new Date(`${result.InStockDate}`)).format(
                                "MM/DD/YYYY"
                              )
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.InStockDate && result.InStockDate != null
                            ? "In Stock Date"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label">
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="customer-name  product-details_line-break">
                            {result.StyleStatus && result.StyleStatus != null
                              ? `${result.StyleStatus}`
                              : ""}
                          </span>
                          <span className="product-details-view-label">
                            {result.StyleStatus && result.StyleStatus != null
                              ? "Style Status"
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label">
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="entered-by product-details_line-break">
                            {result.InStockCost && result.InStockCost != null
                              ? currencyFormatter.format(
                                  `${result.InStockCost}`,
                                  {
                                    code: "USD",
                                    precision: 0,
                                  }
                                )
                              : ""}
                          </span>
                        </ShowMore>
                        <span className="product-details-view-label">
                          {result.InStockCost && result.InStockCost != null
                            ? "In Stock Cost"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label ">
                        <span className="release-date product-details_line-break">
                          {result.Vendor && result.Vendor != null
                            ? `${result.Vendor}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.Vendor && result.Vendor != null
                            ? "Vendor"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div className="known product-details-label">
                        <span className="hold-date  product-details_line-break">
                          {result.InventoryCategory &&
                          result.InventoryCategory != null
                            ? `${result.InventoryCategory}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.InventoryCategory &&
                          result.InventoryCategory != null
                            ? "InventoryCategory"
                            : "Inventory Category"}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label">
                        <span className="release-date  product-details_line-break">
                          {result.PurchaseRefNumber &&
                          result.PurchaseRefNumber != null
                            ? `${result.PurchaseRefNumber}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.PurchaseRefNumber &&
                          result.PurchaseRefNumber != null
                            ? "PR Ref #"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            {/* 2nd box */}
            <div className="product-stock_details pos-relative">
              <div className="product-info_box">
                <h5 className="product-info_box_heading product-light_title_color">
                  <span>Stock Details</span>
                </h5>

                <div className="product-info_background">
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label">
                        <span className="hold-date product-details_line-break">
                          {result.InStockDate && result.InStockDate != null
                            ? moment(new Date(`${result.InStockDate}`)).format(
                                "MM/DD/YYYY"
                              )
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.InStockDate && result.InStockDate != null
                            ? "In Stock Date"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="known product-details-label">
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="customer-name  product-details_line-break">
                            {result.StyleStatus && result.StyleStatus != null
                              ? `${result.StyleStatus}`
                              : ""}
                          </span>
                          <span className="product-details-view-label">
                            {result.StyleStatus && result.StyleStatus != null
                              ? "Style Status"
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div
                        className={
                          result.InStockCost && result.InStockCost != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="entered-by product-details_line-break">
                            {result.InStockCost && result.InStockCost != null
                              ? currencyFormatter.format(
                                  `${result.InStockCost}`,
                                  {
                                    code: "USD",
                                    precision: 0,
                                  }
                                )
                              : ""}
                          </span>
                        </ShowMore>
                        <span className="product-details-view-label">
                          {result.InStockCost && result.InStockCost != null
                            ? "In Stock Cost"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label ">
                        <span className="release-date product-details_line-break">
                          {result.Vendor && result.Vendor != null
                            ? `${result.Vendor}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.Vendor && result.Vendor != null
                            ? "Vendor"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label">
                        <span className="hold-date  product-details_line-break">
                          {result.InventoryCategory &&
                          result.InventoryCategory != null
                            ? `${result.InventoryCategory}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.InventoryCategory &&
                          result.InventoryCategory != null
                            ? "InventoryCategory"
                            : "Inventory Category"}
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label">
                        <span className="release-date  product-details_line-break">
                          {result.PurchaseRefNumber &&
                          result.PurchaseRefNumber != null
                            ? `${result.PurchaseRefNumber}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.PurchaseRefNumber &&
                          result.PurchaseRefNumber != null
                            ? "PR Ref #"
                            : ""}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>

          {/* 2nd d-flex-container */}
          <section className="product-d-flex-container">
            <div className="product-ring-detail pos-relative">
              <div className="product-info_box">
                <h5 className="product-info_box_heading product-light_title_color">
                  <span>Ring Details</span>
                </h5>

                <div className="product-info_background">
                  <section>
                    <div className="product-details_lcol">
                      <div
                        className={
                          result.Metal && result.Metal !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="prouct-description_info">
                            {result.Metal && result.Metal !== null
                              ? `${result.Metal}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <p
                        className={
                          result.ColorCarats && result.ColorCarats != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="color-carats-con">
                          {result.ColorCarats && result.ColorCarats !== null
                            ? `${result.ColorCarats}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.ColorCarats && result.ColorCarats !== null
                            ? " cts color "
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div className="product-details_m-lcol">
                      <div
                        className={
                          result.Length && result.Length !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="prouct-description_info">
                            {result.Length && result.Length !== null
                              ? `${result.Length}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <p
                        className={
                          result.DiamondCarats && result.DiamondCarats != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="color-carats-con">
                          {result.DiamondCarats && result.DiamondCarats !== null
                            ? `${result.DiamondCarats}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.DiamondCarats && result.DiamondCarats !== null
                            ? " cts dia "
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div className="product-details_mcol">
                      <div
                        className={
                          result.ColorComment && result.ColorComment !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="product-description_info">
                            {result.ColorComment && result.ColorComment != null
                              ? `${result.ColorComment}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                    <div className="product-details_m-lcol">
                      <div
                        className={
                          result.PartwayEternity &&
                          result.PartwayEternity != null
                            ? "known product-details-label "
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="prouct-description_info">
                            {result.PartwayEternity &&
                            result.PartwayEternity !== null
                              ? `${result.PartwayEternity}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div
                        className={
                          result.Color && result.Color != null
                            ? "known product-details-label "
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="prouct-description_info">
                            {result.Color && result.Color != null
                              ? `${result.Color}`
                              : ""}
                            {result.Color &&
                            result.Color != null &&
                            result.Clarity &&
                            result.Clarity != null
                              ? "/"
                              : ""}
                            {result.Clarity && result.Clarity != null
                              ? `${result.Clarity}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <p
                        className={
                          result.RingSize && result.RingSize != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="color-carats-con">
                          {result.RingSize && result.RingSize !== null
                            ? `${result.RingSize}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          {result.RingSize && result.RingSize !== null
                            ? "Ring Size"
                            : ""}
                        </span>
                      </p>
                    </div>
                    <div className="product-details_m-lcol">
                      <div
                        className={
                          result.SettingType && result.SettingType !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <ShowMore
                          lines={1}
                          more="&#43;"
                          less="&#8722;"
                          anchorClass=""
                        >
                          <span className="prouct-description_info">
                            {result.SettingType && result.SettingType !== null
                              ? `${result.SettingType}`
                              : ""}
                          </span>
                        </ShowMore>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            {/* 2nd box */}

            <div className="product-sold_details pos-relative">
              <div className="product-info_box">
                <h5 className="product-info_box_heading product-light_title_color">
                  <span className="pricing-title">Sold Details</span>
                </h5>
                <div className="product-info_background">
                  <div className="sold-details">
                    <div className="sold-details-con">
                      <p
                        className={
                          result.SoldDate && result.SoldDate !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="product-details_line-break">
                          {result.SoldDate && result.SoldDate != null
                            ? moment(new Date(`${result.SoldDate}`)).format(
                                "MM/DD/YYYY"
                              )
                            : ""}
                        </span>
                      </p>
                      <p
                        className={
                          result.SoldPrice && result.SoldPrice !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="product-details_line-break">
                          {result.SoldPrice && result.SoldPrice != null
                            ? currencyFormatter.format(`${result.SoldPrice}`, {
                                code: "USD",
                                precision: 0,
                              })
                            : ""}
                        </span>
                      </p>
                      <p
                        className={
                          result.SoldCustomer && result.SoldCustomer !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="product-details_line-break">
                          {result.SoldCustomer && result.SoldCustomer != null
                            ? `${result.SoldCustomer}`
                            : ""}
                        </span>
                      </p>
                      <p
                        className={
                          result.SoldCustomerID &&
                          result.SoldCustomerID !== null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="product-details_line-break">
                          {result.SoldCustomerID &&
                          result.SoldCustomerID != null
                            ? `${result.SoldCustomerID}`
                            : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>
    );
  }
}
export default FullDetailModal;
