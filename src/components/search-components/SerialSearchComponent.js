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
          title="Serial"
          showClear
          debounce={250}
          placeholder="Enter Serial"
          dataField={SerialDataField}
          componentId="SerialSearch"
          icon={false}
          iconPosition={"right"}
        />
      </div>
    );
  }
}

export default SerialSearchComponent;