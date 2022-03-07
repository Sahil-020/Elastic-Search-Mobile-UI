import React, { Component } from "react";
import currencyFormatter from "currency-formatter";
import { Accordion } from "react-bootstrap";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { toast } from "react-toastify";
import Results from "../Results/Results";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { removeFromCart } from "./../actions/index";
import HandleView from "../OtherComponents/HandleView";
import $ from "jquery";
import isEmpty from "lodash/isEmpty";

const mapStateToProps = (state) => {
  return {
    items: state.cartActions.items,
  };
};

class Basket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.basketItems,
      basketDetails: {
        basketNo: "New",
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
    this.handleView = this.handleView.bind(this);
    // this.isValueEmpty = this.isValueEmpty.bind(this);
  }
  // isValueEmpty(res) {
  //   let result = "";
  //   if (!isEmpty(res) && res !== "NaN") {
  //     result = res;
  //   }
  //   // console.log("result :", result);
  //   return result;
  // }
  handleView(e, value) {
    console.log(
      "result element : ",
      document.getElementById("ES_Results").className,
      "\n Type : ",
      typeof document.getElementById("ES_Results").className
    );

    $(".result_view_options").children().removeClass("active");
    // console.log("Selected value: ", value);
    this.setState({ viewType: value });
    e.target.className = "active";
    if (value === "Grid1") {
      document.getElementById("ES_Results_Baskets").className =
        "Grid_result_container";
    } else if (value === "Grid2") {
      document.getElementById("ES_Results_Baskets").className =
        "Grid2_result_container";
    } else if (value === "Grid3") {
      document.getElementById("ES_Results_Baskets").className =
        "Grid3_result_container";
    } else if (value === "List") {
      document.getElementById("ES_Results_Baskets").className =
        "List_result_container";
    }
  }

  render() {
    let { items, isValueEmpty, isMultipleValueEmpty } = this.props;
    // let { allBaskets, items } = this.state;
    return (
      <div className="basket_container" id="basket">
        <HandleView handleView={this.handleView} items={items} />
        <div className="es_basket_results">
          <div
            id="ES_Results_Baskets"
            className="List_result_container"
            // className="compact_result_container"
          >
            <Results
              items={items}
              isValueEmpty={isValueEmpty}
              isMultipleValueEmpty={isMultipleValueEmpty}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ removeFromCart }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
