import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class WRSetting extends Component {
  render() {
    return (
      <MultiDropdownList
        title="WR - Setting"
        className="form_field"
        componentId="WRSetting"
        dataField="SettingType.keyword"
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        placeholder="Select values"
      />
    );
  }
}

export default WRSetting;
