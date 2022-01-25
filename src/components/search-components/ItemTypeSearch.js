import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class ItemTypeSearch extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        componentId="ItemType"
        dataField={"ItemType.keyword"}
        title="Item - Type"
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        // renderListItem={(label) => (
        //   <div className="filter_items">
        //     {label !== "NULL" ? label : "None"}
        //   </div>
        // )}
        render={({ loading, error, data, handleChange }) => {
          if (loading) {
            return <div>Fetching Results.</div>;
          }
          if (error) {
            return (
              <div>
                Something went wrong! Error details {JSON.stringify(error)}
              </div>
            );
          }
          return (
            <div className="filter_options_container">
              {data.map((item) => (
                <div
                  className="filter_options"
                  onClick={(e) => {
                    handleChange(item.key);
                    e.target.classList.toggle("filter_options_active");
                  }}
                  key={item.key}
                >
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      // if(e.target.clas)
                      e.target.parentNode.classList.toggle(
                        "filter_options_active"
                      );
                    }}
                  >
                    {item.key}
                  </span>
                  {/* <span>{item.doc_count}</span> */}
                </div>
              ))}
            </div>
          );
        }}
        placeholder="Select Types"
      />
    );
  }
}

export default ItemTypeSearch;
