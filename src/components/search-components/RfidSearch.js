import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { RFID } from "../../utils/constants";

class RfidSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <DataSearch
        title={"RFID"}
        className="form_field"
        showClear
        debounce={250}
        placeholder={"Enter RFID"}
        dataField={RFID}
        componentId="RFID_Search"
        // value={this.state.value}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //     e.target.select();
        //   }
        // }}
        iconPosition="right"
        // onChange={(value) => this.setState({ value: value })}
        // onValueChange={(value) => this.handleChange(value)}
        // onValueSelected={(value) => this.props.handleRfidSearchSignal(value)}
        // onValueSelected={(value) => {
        //   // if (value) {
        //   this.props.handleRfidSearchSignal(value);
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default RfidSearch;
