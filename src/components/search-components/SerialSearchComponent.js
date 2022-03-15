import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { SerialDataField } from "../../utils/constants";

class SerialSearchComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <DataSearch
        className="form_field"
        title="Serial"
        showClear
        debounce={250}
        placeholder="Enter Serial Number..."
        dataField={SerialDataField}
        componentId="SerialSearch"
        icon={false}
        iconPosition={"right"}
        onValueSelected={(value) => this.props.handleSerialSearchSignal(true)}
      />
    );
  }
}

export default SerialSearchComponent;
