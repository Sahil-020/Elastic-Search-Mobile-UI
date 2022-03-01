import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class Period extends Component {
  render() {
    return (
      <MultiDropdownList
        title="Period"
        className="form_field"
        componentId="Period"
        dataField={"Period.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        placeholder="Select values"
      />
    );
  }
}

export default Period;
