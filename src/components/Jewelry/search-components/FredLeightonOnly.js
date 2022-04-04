import React, { Component } from "react";
import { SingleList } from "@appbaseio/reactivesearch";

class FredLeightonOnly extends Component {
  render() {
    return (
      <SingleList
        className="form_field"
        componentId="FredLeightonOnly"
        dataField="IsKwiat.keyword"
        showSearch={false}
        sortBy="desc"
        render={({ data, value, handleChange }) => {
          var checkedFlag;
          if (value === "0") {
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
                    value={0}
                    onChange={handleChange}
                    checked={checkedFlag}
                  />
                  <span className="toggle--label">
                    {this.props.appType === "original"
                      ? "FL Only"
                      : "FredLeighton Only"}
                  </span>
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
                    <span className="toggle--label">
                      {this.props.appType === "original"
                        ? "FL Only"
                        : "FredLeighton Only"}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }
        }}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default FredLeightonOnly;
