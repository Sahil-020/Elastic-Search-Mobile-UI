import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
class GemEnhancement extends Component {
  render() {
    return (
      <MultiDropdownList
        title="Enhancement"
        className=" form_field"
        componentId="GemEnhancement"
        dataField={"GemEnhancement.keyword"}
        size={100}
        sortBy="asc"
        showSearch={true}
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}
export default GemEnhancement;
