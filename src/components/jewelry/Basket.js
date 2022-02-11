import React, { Component } from "react";
import currencyFormatter from "currency-formatter";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { toast } from "react-toastify";

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.basketItems,
      basketDetails: {
        basketNo: 1001,
        description: "",
        internalNotes: "",
        customer: "",
        contact: "",
        occassion: "",
      },
      allBaskets: [],
      basketToOpen: "",
      allBasketDetails: [],
    };
    this.handleImage = this.handleImage.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleGetBaskets = this.handleGetBaskets.bind(this);
    this.handleOpenBasket = this.handleOpenBasket.bind(this);
  }

  handleOpenBasket() {
    let { basketToOpen, allBasketDetails } = this.state;
    console.log("basketToOpen: ", basketToOpen);
    console.log("allBasketDetails: ", allBasketDetails);
    let selectedBasketDetails = allBasketDetails.filter(
      (basket) => basket.basketNo.toString() === basketToOpen.toString()
    );
    console.log("selectedBasketDetails", selectedBasketDetails);

    this.setState((prevState) => ({
      basketDetails: {
        basketNo: selectedBasketDetails[0].basketNo,
        description: selectedBasketDetails[0].description,
        internalNotes: selectedBasketDetails[0].internalNotes,
        customer: selectedBasketDetails[0].customer,
        contact: selectedBasketDetails[0].contact,
        occassion: selectedBasketDetails[0].occassion,
      },
      items: selectedBasketDetails[0].items,
    }));
  }

  handleGetBaskets() {
    this.setState({ allBaskets: [] });
    let baskets = sessionStorage["baskets"];
    console.log("baskets", baskets);
    if (baskets) {
      let basketsDetails = JSON.parse(baskets);
      console.log("basketDetails: ", basketsDetails);
      this.setState({ allBasketDetails: basketsDetails });
      basketsDetails.map((basket) => {
        this.setState((prevState) => ({
          allBaskets: [
            ...prevState.allBaskets,
            { basketNo: basket.basketNo, description: basket.description },
          ],
        }));
      });
    }
  }

  handleSave() {
    let prevBaskets = sessionStorage["baskets"];
    let basketNo;
    if (prevBaskets) {
      let allBaskets = JSON.parse(prevBaskets);
      let lastBasketNo = allBaskets[allBaskets.length - 1].basketNo;
      basketNo = lastBasketNo + 1;
    } else {
      basketNo = 101;
    }
    let basketDetails = {
      basketNo: basketNo,
      description: this.state.basketDetails.description,
      internalNotes: this.state.basketDetails.internalNotes,
      customer: this.state.basketDetails.customer,
      contact: this.state.basketDetails.contact,
      occassion: this.state.basketDetails.occassion,
      items: this.state.items,
    };
    let baskets;

    if (prevBaskets) {
      baskets = [...JSON.parse(prevBaskets), basketDetails];
    } else {
      baskets = [{ ...basketDetails }];
    }
    sessionStorage.setItem("baskets", JSON.stringify(baskets));
    toast.success(" Basket Saved ! ", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
      pauseOnHover: false,
      theme: "colored",
    });
    // var obj = JSON.parse(sessionStorage[basketNo]);
    // console.log("obj : ", obj);
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
    let { allBaskets, items } = this.state;
    return (
      <div className="basket_container">
        <div className="basket_close_actions">
          <label>Basket Details:</label>{" "}
          <button onClick={() => toggleBasket(false)}>X</button>
        </div>
        <div className="basket_header">
          <div className="basket_orderNo">
            <label>Baske No</label>
            <span>{this.state.basketDetails.basketNo}</span>
          </div>
          <Accordion>
            <AccordionItem eventKey="1">
              <AccordionHeader>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    this.handleSave();
                  }}
                >
                  Save
                </button>
                <button onClick={this.handleGetBaskets}>Open</button>
                <button>Save To Existing</button>
                <Accordion>
                  <AccordionItem eventKey="01">
                    <AccordionHeader onClick={(e) => e.stopPropagation()}>
                      <button>Clone</button>
                      <button>New</button>
                    </AccordionHeader>
                    {/* <div className="accordian-collapse collapse"> */}
                    <AccordionBody>
                      <div className="basket_action_group">
                        <button>Print</button>
                        <button>Email</button>
                        <button>Export</button>
                      </div>
                    </AccordionBody>
                    {/* </div> */}
                  </AccordionItem>
                </Accordion>
              </AccordionHeader>
              <AccordionBody>
                <div className="open_save_existing_container">
                  <div className="search_basket_wrapper">
                    <label>Select basket:</label>
                    <select
                      onChange={(e) => {
                        this.setState({ basketToOpen: e.target.value });
                      }}
                    >
                      {allBaskets ? (
                        <>
                          <option>Select basket</option>
                          {allBaskets.map((basket, index) => (
                            <option
                              key={index}
                              value={basket.basketNo}
                            >{`${basket.basketNo} - ${basket.description}`}</option>
                          ))}
                        </>
                      ) : (
                        <option>Loading....</option>
                      )}
                    </select>
                  </div>
                  <button onClick={this.handleOpenBasket}>Open</button>
                </div>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="basket_form_details">
          <div className="basket_form_wrapper">
            <label>Description:</label>
            <input
              type="text"
              value={this.state.basketDetails.description}
              onChange={(e) => {
                this.setState((prevState) => ({
                  basketDetails: {
                    ...prevState.basketDetails,
                    description: e.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="basket_form_wrapper">
            <label>Internal Notes:</label>
            <input
              type="text"
              value={this.state.basketDetails.internalNotes}
              onChange={(e) => {
                this.setState((prevState) => ({
                  basketDetails: {
                    ...prevState.basketDetails,
                    internalNotes: e.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="basket_form_wrapper">
            <label>Customer:</label>
            <input
              type="text"
              value={this.state.basketDetails.customer}
              onChange={(e) => {
                this.setState((prevState) => ({
                  basketDetails: {
                    ...prevState.basketDetails,
                    customer: e.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="basket_form_wrapper">
            <label>Contact:</label>
            <input
              type="text"
              value={this.state.basketDetails.contact}
              onChange={(e) => {
                this.setState((prevState) => ({
                  basketDetails: {
                    ...prevState.basketDetails,
                    contact: e.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="basket_form_wrapper">
            <label>Occasion:</label>
            <select
              name="occasion"
              id="basket_occasion"
              value={this.state.basketDetails.occassion}
              onChange={(e) => {
                this.setState((prevState) => ({
                  basketDetails: {
                    ...prevState.basketDetails,
                    occassion: e.target.value,
                  },
                }));
              }}
              // value={occasion}
            >
              <option value="default" disabled>
                Select Occasion
              </option>
              <option value="ANNIV">Anniversary</option>
              <option value="BABY">Baby Celebration</option>
              <option value="BIRTHDAY">Birthday</option>
              <option value="ENGAGE">Engagement</option>
              <option value="HOLIDAY">Holiday</option>
              <option value="JUSTBEC">Just Because</option>
              <option value="MOTHDAY">Mothers Day</option>
              <option value="OTHER">Other Celebration</option>
              <option value="UNKNOWN">Unknown</option>
              <option value="VALDAY">Valentines Day</option>
              <option value="WEDDING">Wedding</option>
              <option value="GIFT4ANOTH">Gift for Friend</option>
              <option value="GRADUATION">Graduation</option>
              <option value="WHOLESALEPROPOSAL">Wholesale Proposal</option>
            </select>
          </div>
        </div>
        {items ? (
          <>
            <h5>Items: </h5>
            <div className="basket_items_container">
              {items.map((item, index) => (
                <div className="item_container" key={index}>
                  <div className="item_details">
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
                        {item.Description && <label>{item.Description}</label>}
                        {item.RetailPrice && (
                          <label>
                            {" "}
                            {(item.RetailPrice &&
                              currencyFormatter.format(`${item.RetailPrice}`, {
                                code: "USD",
                                precision: 0,
                              })) ||
                              ""}
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="item_action_group">
                    <button onClick={() => removeItemFromBasket(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          "No Items"
        )}
      </div>
    );
  }
}

export default Basket;
