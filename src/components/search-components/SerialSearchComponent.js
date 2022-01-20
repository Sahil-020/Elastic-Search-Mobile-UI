import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { SerialDataField } from "../../utils/constants";

class SerialSearchComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <DataSearch
          title="Serial"
          //   {

          //     // appType && appType === "customer" ? "Serial Number" : "Serial #"
          //   }
          //   className="form-field"
          showClear
          debounce={250}
          placeholder="Enter Serial"
          //   {
          //     appType && appType === "customer"
          //       ? "Start Search..."
          //       : "Enter Serial"
          //   }
          dataField={SerialDataField}
          componentId="SerialSearch"
          // onValueChange={(value) => this.handleChange(value)}
          // onValueSelected={(value) => this.handleSelected(value)}
          // iconPosition={appType && appType === "customer" ? "right" : "left"}
        />
      </div>
    );
  }
}

export default SerialSearchComponent;
