import React, { Component } from "react";
import { MultiList } from "@appbaseio/reactivesearch";

class IsOpenJob extends Component {
  render() {
    return (
      <div className="toggle__filters">
        <MultiList
          componentId="IncludeOpenJob"
          dataField="isOpenJob.keyword"
          defaultValue={["0"]}
          queryFormat="or"
          showFilter={true}
          showSearch={false}
          sortBy="asc"
          beforeValueChange={function(value) {
            return new Promise((resolve, reject) => {
              if (!value) {
                reject();
              }
              resolve();
            });
          }}
          render={({ data, value, handleChange }) => {
            var checkedFlag;
            if (Object.keys(value).length === 1) {
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
                    <span className="toggle--label"> + On Order</span>
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
                      <span className="toggle--label"> + On Order</span>
                    </li>
                  ))}
                </ul>
              );
            }
          }}
        />
      </div>
    );
  }
}
export default IsOpenJob;