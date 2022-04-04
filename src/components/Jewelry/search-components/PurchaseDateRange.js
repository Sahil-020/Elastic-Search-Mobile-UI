import React, { Component } from "react";
import { DateRange } from "@appbaseio/reactivesearch";
class PurchasDateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <DateRange
        className="date-range-input"
        componentId="PurchaseDate"
        dataField="NewInStockDate"
        title="InStock Date"
        //   defaultValue={{
        //     start: new Date("2017-04-01"),
        //     end: new Date("2017-04-07"),
        //   }}
        placeholder={{
          start: "Start Date",
          end: "End Date",
        }}
        focused={false}
        numberOfMonths={2}
        queryFormat="date"
        autoFocusEnd={true}
        showClear={true}
        showFilter={true}
        filterLabel="Date"
        URLParams={false}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default PurchasDateRange;
