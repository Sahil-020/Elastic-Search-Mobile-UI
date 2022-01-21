import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { SerialDataField } from "../../utils/constants";

class SerialSearchComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        <DataSearch
          className="form_field"
          // title="Serial"
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
          icon={false}
          // onValueChange={(value) => this.handleChange(value)}
          // onValueSelected={(value) => this.handleSelected(value)}
          iconPosition={"right"}
        />
      </div>
    );
  }
}

export default SerialSearchComponent;
