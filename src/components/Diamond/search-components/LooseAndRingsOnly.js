import React, { Component } from "react";
import { MultiList } from "@appbaseio/reactivesearch";

class LooseAndRingsOnly extends Component {
  constructor(props) {
    super(props);

    this.handleCustomQuery = this.handleCustomQuery.bind(this);
  }

  handleCustomQuery(value) {
    // console.log("value losseRings :", value);
    if (value && value.length) {
      if (value.length === 1) {
        return {
          query: {
            bool: {
              should: [
                {
                  match: { MountedItemType: "Ring" },
                },
                {
                  terms: { "IsMounted.keyword": ["0"] },
                },
              ],
            },
          },
        };
      } else {
        return {
          query: {
            bool: {
              should: [
                {
                  terms: {
                    IsMounted: ["0", "1"],
                  },
                },
              ],
            },
          },
        };
      }
    }
  }

  render() {
    return (
      <MultiList
        componentId="LooseAndRingsOnly"
        className="form_field"
        dataField="IsMounted.keyword"
        defaultValue={["0", "1"]}
        queryFormat="or"
        showFilter={true}
        showSearch={false}
        sortBy="asc"
        customQuery={this.handleCustomQuery}
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
                <li />
                <li>
                  <input
                    type="checkbox"
                    value={1}
                    onChange={handleChange}
                    checked={checkedFlag}
                  />
                  <span className="toggle--label">Loose & Rings</span>
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
                    <span className="toggle--label">Loose & Rings</span>
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

export default LooseAndRingsOnly;
