import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { StyleDataField } from "../../utils/constants";
class StyleNumber extends Component {
  render() {
    return (
      <DataSearch
        title={"Style Number"}
        className="form_field"
        placeholder={"Enter Style..."}
        dataField={StyleDataField}
        autosuggest={true}
        queryFormat="and"
        componentId="StyleNumber"
        iconPosition={"right"}
        // onValueSelected={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default StyleNumber;
