import React, { Component } from "react";
import { MultiList } from "@appbaseio/reactivesearch";

class IsSold extends Component {
  render() {
    return (
      <div className="toggle__filters">
        <MultiList
          componentId="IncludeSold"
          dataField="IsSold.keyword"
          defaultValue={["0"]}
          queryFormat="or"
          showFilter={true}
          showSearch={false}
          sortBy="asc"
          render={({ data, value, handleChange }) => {
            var checkedFlag;
            value.hasOwnProperty("1")
              ? (checkedFlag = true)
              : (checkedFlag = false);
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
                    <span className="toggle--label"> + Sold</span>
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
                      <span className="toggle--label"> + Sold</span>
                    </li>
                  ))}
                </ul>
              );
            }
          }}
          beforeValueChange={function(value) {
            return new Promise((resolve, reject) => {
              if (!value) {
                reject();
              }
              resolve();
            });
          }}
          onValueChange={(value) => {
            if (value.includes("1")) {
              this.props.handleSoldSignal(true);
            } else {
              this.props.handleSoldSignal(false);
            }
          }}
        />
      </div>
    );
  }
}

export default IsSold;
