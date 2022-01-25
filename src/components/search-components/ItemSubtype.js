import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class ItemSubtype extends Component {
  render() {
    let { appType } = this.props;
    return (
      <MultiDropdownList
        className="form_field"
        title="Item Subtype"
        componentId="SubType"
        dataField={"ItemSubtype.keyword"}
        react={{ and: ["ItemType"] }}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
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
      />
    );
  }
}

export default ItemSubtype;
