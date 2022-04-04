import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import MultiDropdownListWithFocus from "../../HOC_Components/MultiDropdownListWithFocus";

class FancyColorIntensity extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Fancy Color Int"
        componentId="FancyColorIntensity"
        dataField={"FancyColorIntensity.keyword"}
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
export default MultiDropdownListWithFocus(FancyColorIntensity);
