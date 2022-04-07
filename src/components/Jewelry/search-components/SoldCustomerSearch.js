import React, { Component } from "react";
import { DataSearch, SingleList } from "@appbaseio/reactivesearch";
import { SoldCustomer } from "../../../utils/constants";

class SoldCustomerSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCustomQuery = this.handleCustomQuery.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }
  componentDidMount() {
    let urlString = window.location.href;
    let paramString = urlString.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    // console.log({ queryString });
    for (let pair of queryString.entries()) {
      // console.log("Key is: " + pair[0]);
      // console.log("Value is: " + pair[1]);
      if (pair[0] === "SoldCust") {
        this.setState({ value: pair[1] });
        // document.location.reload(true);
      }
    }
  }
  handleCustomQuery(value) {
    // console.log("Value :", value);
    if (value) {
      return {
        query: {
          // bool: {
          //   should: [
          //     {
          //       match_phrase: {
          //         SoldCustomer: value,
          //       },
          //     },
          //     {
          //       match_phrase: {
          //         RetailSoldCustomer: value,
          //       },
          //     },
          //   ],
          //   minimum_should_match: 1,
          // },

          multi_match: {
            query: value,
            fields: ["SoldCustomer", "RetailSoldCustomer"],
            type: "phrase",
            operator: "and",
          },
        },
      };
    }
  }

  handleChange(value) {
    if (!value) {
      this.props.soldCustSearchChanged("NOT_ACTIVE");
      return;
    }
    this.props.soldCustSearchChanged("ACTIVE");
  }
  handleSelected(value) {
    if (value) {
      this.props.handleSoldCustSignal(true);
      this.props.handleShowResults(true);
      return;
    }
    this.props.handleSoldCustSignal(false);
  }

  render() {
    let { appType, data } = this.props;
    return (
      <DataSearch
        title="Sold Cust"
        className="form_field"
        dataField={SoldCustomer}
        componentId="SoldCust"
        showClear
        debounce={250}
        placeholder={
          appType && appType === "customer"
            ? "Start Search..."
            : "Enter Customer"
        }
        queryFormat="and"
        iconPosition="right"
        // customQuery={this.handleCustomQuery}
        // onValueChange={(value) => this.handleChange(value)}
        // onValueSelected={(value) => {
        //   this.props.handleSoldCustSignal(true);
        //   this.props.handleShowResults(true);
        // }}
        // customQuery={this.handleCustomQuery}
        // onValueChange={(value) => this.handleChange(value)}
        onChange={(value, triggerQuery, event) => {
          // console.log("Inside On change");
          // this.handleChange(value);
          // this.handleSelected(value);
          this.setState(
            {
              value,
            },
            () => triggerQuery()
          );
        }}
        onValueChange={(value) => {
          // this.handleChange(value);
          if (value) {
            this.handleSelected(value);
          }
        }}
        // onValueSelected={(value) => this.handleSelected(value)}
        // URLParams={true}
        value={this.state.value}
      />
    );
  }
}
export default SoldCustomerSearch;
