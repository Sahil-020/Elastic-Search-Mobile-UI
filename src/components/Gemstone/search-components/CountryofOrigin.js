import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
class CountryofOrigin extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Origin"
        componentId="CountryofOrigin"
        dataField={"CountryofOrigin.keyword"}
        size={100}
        showCount={false}
        sortBy="asc"
        renderListItem={(label, count) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
      />
    );
  }
}
export default CountryofOrigin;
