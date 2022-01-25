import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class Maker extends Component {
  render() {
    return (
      <MultiDropdownList
        title="Maker"
        className="form_field"
        componentId="Maker"
        dataField={"Maker.keyword"}
        size={100}
        render={({ loading, error, data, handleChange }) => {
          // console.log("data : ", data);
          return (
            <ul>
              {data.map((item) => (
                <li
                  onClick={(e) => {
                    handleChange(item.key);
                    this.handleSelection(item.key);
                    // console.log("item : ", item);
                    e.currentTarget.classList.toggle("filter_options_active");
                  }}
                  key={item.key}
                >
                  {item.key}
                </li>
              ))}
            </ul>
          );
        }}
        showCount={false}
        showSearch={true}
        sortBy="asc"
      />
    );
  }
}

export default Maker;
