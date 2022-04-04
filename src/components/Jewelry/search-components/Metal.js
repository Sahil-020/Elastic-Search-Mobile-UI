import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class Metal extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Metal"
        componentId="Metal"
        dataField={"Metal.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        placeholder="Select values"
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default Metal;
