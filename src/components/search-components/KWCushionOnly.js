import React, { Component } from "react";
import { SingleList } from "@appbaseio/reactivesearch";

class KWCushionOnly extends Component {
  render() {
    return (
      <SingleList
        className="form_field"
        componentId="KWCushionOnly"
        dataField="IsKWCushion.keyword"
        showSearch={false}
        sortBy="asc"
        render={({ data, value, handleChange }) => {
          var checkedFlag;
          if (value === "1") {
            checkedFlag = true;
          } else {
            checkedFlag = false;
          }
          if (data.length === 1) {
            return (
              <ul>
                <li />
                <li>
                  <input
                    type="checkbox"
                    value={1}
                    onChange={handleChange}
                    checked={checkedFlag}
                  />
                  <span className="toggle--label">KW Cushion Only</span>
                </li>
              </ul>
            );
          } else {
            return (
              <ul>
                {data.map((item) => (
                  <li key={item.key}>
                    <input
                      type="checkbox"
                      value={item.key}
                      onChange={handleChange}
                      checked={checkedFlag}
                    />
                    <span className="toggle--label">KW Cushion Only</span>
                  </li>
                ))}
              </ul>
            );
          }
        }}
      />
    );
  }
}
export default KWCushionOnly;
