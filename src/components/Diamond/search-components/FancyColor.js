import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import MultiDropdownListWithFocus from "../../HOC_Components/MultiDropdownListWithFocus";

class FancyColor extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Fancy Color"
        componentId="FancyColor"
        dataField={"FancyColor.keyword"}
        size={100}
        sortBy="asc"
        showCount={false}
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
export default MultiDropdownListWithFocus(FancyColor);
