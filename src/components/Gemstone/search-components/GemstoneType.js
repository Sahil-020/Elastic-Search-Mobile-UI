import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import MultiDropdownListWithFocus from "../../HOC_Components/MultiDropdownListWithFocus";

class GemstoneType extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Gem Type"
        componentId="GemstoneType"
        dataField={"GemstoneType.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
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
export default MultiDropdownListWithFocus(GemstoneType);
