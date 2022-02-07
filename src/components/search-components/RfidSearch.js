import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { RFID } from "../../utils/constants";

class RfidSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSelected = this.handleSelected.bind(this);
    // this.handleCustomQuery = this.handleCustomQuery.bind(this);
  }
  // handleCustomQuery(value) {
  //   // console.log("Value :", value);
  //   if (value) {
  //     return {
  //       query: {
  //         multi_match: {
  //           query: value,
  //           fields: RFID,
  //           type: "phrase",
  //           operator: "and",
  //         },
  //       },
  //     };
  //   }
  // }

  // handleChange(value) {
  //   if (!value) {
  //     this.props.rfidSearchChanged("NOT_ACTIVE");
  //     return;
  //   }
  //   this.props.rfidSearchChanged("ACTIVE");
  // }
  // handleSelected(value) {
  //   if (value) {
  //     this.props.rfidSearchSelected(true);
  //     // this.setState({ value: "" });
  //   }
  // }

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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.target.select();
          }
        }}
        // onChange={(value) => this.setState({ value: value })}
        // onValueChange={(value) => this.handleChange(value)}
        // onValueSelected={(value) => this.handleSelected(value)}
      />
    );
  }
}

export default RfidSearch;
