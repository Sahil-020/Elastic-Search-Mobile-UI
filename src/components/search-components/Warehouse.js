import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class Warehouse extends Component {
  render() {
    return (
      <MultiDropdownList
        title="Warehouse"
        className="form_field"
        componentId="Warehouse"
        dataField={"Warehouse.keyword"}
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default Warehouse;
