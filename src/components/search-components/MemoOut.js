import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class MemoOut extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Memo Cust"
        componentId="MemoOut"
        dataField={"MemoOutCustomer.keyword"}
        size={1000}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
      />
    );
  }
}

export default MemoOut;
