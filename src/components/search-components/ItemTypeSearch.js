import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class ItemTypeSearch extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        componentId="ItemType"
        dataField={"ItemType.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        placeholder="Select Types"
      />
    );
  }
}

export default ItemTypeSearch;
