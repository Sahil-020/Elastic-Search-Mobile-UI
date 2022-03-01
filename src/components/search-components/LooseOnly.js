import React, { Component } from "react";
import { MultiList } from "@appbaseio/reactivesearch";

class LooseOnly extends Component {
  render() {
    return (
      <MultiList
        className="form_field"
        componentId="LooseOnly"
        dataField="IsMounted.keyword"
        defaultValue={["0", "1"]}
        queryFormat="or"
        showFilter={true}
        showSearch={false}
        sortBy="asc"
        render={({ data, value, handleChange }) => {
          var checkedFlag;
          if (Object.keys(value).length !== 1) {
            checkedFlag = false;
          } else {
            checkedFlag = true;
          }
          if (data.length === 1) {
            return (
              <ul>
                <li></li>
                <li>
                  <input
                    type="checkbox"
                    value={1}
                    onChange={handleChange}
                    checked={checkedFlag}
                  />
                  <span className="toggle--label">Loose Only</span>
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
                    <span className="toggle--label">Loose Only</span>
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

export default LooseOnly;
