import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class EternPart extends Component {
  render() {
    return (
      <MultiDropdownList
        title="Eternity / Partway"
        className="form_field"
        componentId="EternPart"
        dataField="PartwayEternity.keyword"
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

export default EternPart;
