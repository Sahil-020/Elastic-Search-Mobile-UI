import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class ItemTypeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionsSelected: [],
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(key) {
    let { optionsSelected } = this.state;
    if (optionsSelected.includes(key)) {
      this.setState((prevState) => ({
        optionsSelected: prevState.optionsSelected.filter(
          (value) => value !== key
        ),
      }));
    } else {
      this.setState((prevState) => ({
        optionsSelected: [...prevState.optionsSelected, key],
      }));
    }
  }

  render() {
    let { optionsSelected } = this.state;
    console.log("optionsSelected: ", this.state.optionsSelected);
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
        render={({ loading, error, data, handleChange }) => {
          // console.log("data : ", data);
          return (
            <div className="filter_options_container">
              {data.map((item) => (
                <div
                  className={
                    optionsSelected.includes(item.key)
                      ? "filter_options_active"
                      : "filter_options"
                  }
                  onClick={(e) => {
                    handleChange(item.key);
                    this.handleSelection(item.key);
                    // console.log("item : ", item);
                    e.currentTarget.classList.toggle("filter_options_active");
                  }}
                  key={item.key}
                >
                  <span
                    onClick={(e) => {
                      // e.stopPropagation();
                      // if(e.target.clas)
                      // e.target.parentNode.classList.toggle(
                      //   "filter_options_active"
                      // );
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
