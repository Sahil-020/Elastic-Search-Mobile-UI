import React, { Component } from "react";
import { Modal } from "react-bootstrap";
// import ShowMore from "react-show-more";
import moment from "moment";
import currencyFormatter from "currency-formatter";
import FullDetailModal from "./FullDetailModal";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggleIframeModal } from "../actions/index";
import { BaseURL } from "../../utils/constants";

class StockModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.show || false,
      show: false,
    };
    this.onModalHide = this.onModalHide.bind(this);
    this.showFullModal = this.showFullModal.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  onModalHide() {
    let { callback } = this.props;
    this.setState(
      {
        showModal: false,
      },
      () => {
        callback && callback(false, []);
      }
    );
  }

  showFullModal() {
    this.setState({ show: true });
  }

  modalClose() {
    this.setState({ show: false });
  }

  render() {
    let { showModal } = this.state;
    let { result, checked } = this.props;

    return (
      <div className="modal-container">
        <Modal
          animation={false}
          autoFocus={false}
          enforceFocus={false}
          className="stock-popup-modal product"
          centered="true"
          size="sm"
          show={showModal}
          onHide={() => this.onModalHide()}
        >
          <Modal.Header closeButton className="modal-header-con">
            <Modal.Title>Serial # {result.SerialNumber}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-stock_details pos-relative">
              <div className="product-info_box">
                <h5 className="product-info_box_heading product-light_title_color stock-modal-info_box_heading">
                  <span>Stock Details</span>
                </h5>

                <div className="product-info_background">
                  <section>
                    <div className="product-details_lcol bottom-border">
                      <div className="unknown product-details-label ">
                        <span className="in-stock-cost product-details_line-break">
                          {checked === true
                            ? result.InStockCostCode
                            : result.InStockCost && result.InStockCost != null
                            ? currencyFormatter.format(
                                `${result.InStockCost}`,
                                {
                                  code: "USD",
                                  precision: 0,
                                }
                              )
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          In Stock Cost
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div
                        className={
                          result.ConsignmentItem &&
                          result.ConsignmentItem != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="in-stock-date product-details_line-break ">
                          {result.ConsignmentItem &&
                          result.ConsignmentItem === "1"
                            ? "Memo In Item"
                            : "Owned"}
                        </span>

                        <span className="product-details-view-label">
                          Consignment Flag
                        </span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break highlight-text">
                          {checked === true
                            ? result.WholesalePriceCode
                            : result.WholesalePrice &&
                              result.WholesalePrice != null
                            ? currencyFormatter.format(
                                `${result.WholesalePrice} `,
                                {
                                  code: "USD",
                                  precision: 0,
                                }
                              )
                            : ""}
                          {result.WholesaleMarkup &&
                          result.WholesaleMarkup != null
                            ? ` / ${result.WholesaleMarkup} `
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Wholesale Price / Markup
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div
                        className={
                          result.InStockDate && result.InStockDate != null
                            ? "known product-details-label"
                            : "unknown product-details-label"
                        }
                      >
                        <span className="in-stock-date product-details_line-break ">
                          {result.InStockDate && result.InStockDate != null
                            ? moment(new Date(`${result.InStockDate}`)).format(
                                "MM/DD/YYYY"
                              )
                            : ""}
                        </span>

                        <span className="product-details-view-label">
                          In Stock Date
                        </span>
                      </div>
                    </div>
                  </section>
                  {/* 3rd section */}
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break highlight-text">
                          {result.RetailPrice && result.RetailPrice != null
                            ? currencyFormatter.format(
                                `${result.RetailPrice} `,
                                {
                                  code: "USD",
                                  precision: 0,
                                }
                              )
                            : ""}
                          {result.RetailMarkup && result.RetailMarkup != null
                            ? ` / ${result.RetailMarkup} `
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Retail Price / Markup
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label ">
                        <span
                          className="in-stock-cost product-details_line-break iframe-link"
                          onClick={() =>
                            this.props.toggleIframeModal({
                              show: true,
                              url: `${BaseURL}/pages/kw/kw501003.aspx?PopupPanel=On&AcctCD=${result.VendorID}`,
                            })
                          }
                        >
                          {result.Vendor && result.Vendor != null
                            ? `${result.Vendor}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Vendor
                        </span>
                      </div>
                    </div>
                  </section>
                  {/* 4th row  */}
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break">
                          {result.TotalMarkup && result.TotalMarkup != null
                            ? `${result.TotalMarkup} `
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Total Markup
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label ">
                        <span className="vdr-ref product-details_line-break">
                          {result.VendorRefNbr && result.VendorRefNbr != null
                            ? `${result.VendorRefNbr}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Vendor Ref #
                        </span>
                      </div>
                    </div>
                  </section>
                  {/* 5th row */}
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break">
                          {result.OwnCost && result.OwnCost != null
                            ? currencyFormatter.format(`${result.OwnCost} `, {
                                code: "USD",
                                precision: 0,
                              })
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Owned Cost
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label ">
                        <span
                          className="pr-ref product-details_line-break iframe-link"
                          onClick={() =>
                            this.props.toggleIframeModal({
                              show: true,
                              url: `${BaseURL}/pages/po/po302000.aspx?PopupPanel=On&ReceiptNbr=${result.PurchaseRefNumber}`,
                            })
                          }
                        >
                          {result.PurchaseRefNumber &&
                          result.PurchaseRefNumber != null
                            ? `${result.PurchaseRefNumber}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Purchase Ref #
                        </span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break">
                          {result.ConsignmentCost &&
                          result.ConsignmentCost != null
                            ? currencyFormatter.format(
                                `${result.ConsignmentCost} `,
                                {
                                  code: "USD",
                                  precision: 0,
                                }
                              )
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Consigned Cost
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label">
                        <span className="pricing-method product-details_line-break">
                          {result.PricingMode && result.PricingMode === 0
                            ? "Manual"
                            : "Auto"}
                        </span>
                        <span className="product-details-view-label">
                          Pricing Method
                        </span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="product-details_lcol">
                      <div className="unknown product-details-label ">
                        <span className="product-details_line-break">
                          {result.StyleStatus && result.StyleStatus != null
                            ? `${result.StyleStatus}`
                            : ""}
                          {result.StyleStatusDate &&
                          result.StyleStatusDate != null
                            ? ` as of ${result.StyleStatusDate}`
                            : ""}
                        </span>
                        <span className="product-details-view-label">
                          Style Status / Date
                        </span>
                      </div>
                    </div>
                    <div className="product-details_mcol">
                      <div className="unknown product-details-label">
                        <span className="inventory-category product-details_line-break">
                          {result.InventoryCategory &&
                          result.InventoryCategory != null
                            ? `${result.InventoryCategory}`
                            : ``}
                        </span>
                        <span className="product-details-view-label">
                          Inventory Category
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="see-more">
                {/*
                <Button className="see-more-btn" onClick={this.showFullModal}>View All Details</Button>
   */}
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <FullDetailModal
          show={this.state.show}
          callback={this.modalClose}
          result={this.props.result}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      toggleIframeModal,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(StockModal);
