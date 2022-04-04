import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import { WRShapeSerial } from "../../../utils/constants";

class WRShape extends Component {
  render() {
    return (
      <MultiDropdownList
        title="WR - Shape"
        className="form_field"
        componentId="WRShape"
        dataField={WRShapeSerial}
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
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

export default WRShape;
