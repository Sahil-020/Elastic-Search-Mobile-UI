import React, { Component } from "react";
import { DataSearch, SingleList } from "@appbaseio/reactivesearch";
import { SoldCustomer } from "../../utils/constants";

class SoldCustomerSearch extends Component {
  constructor(props) {
    super(props);
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
        onValueSelected={(value) => this.props.handleSoldCustSignal(true)}
      />
    );
  }
}
export default SoldCustomerSearch;
