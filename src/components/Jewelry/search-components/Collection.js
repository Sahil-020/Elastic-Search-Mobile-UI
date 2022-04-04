import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class Collection extends Component {
  render() {
    let { appType } = this.props;
    return (
      <MultiDropdownList
        className="form_field"
        title="Collection"
        componentId="Collection"
        dataField={"Collection.keyword"}
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        // render={({ loading, error, data, handleChange }) => {
        //   // console.log("data : ", data);
        //   return (
        //     <ul>
        //       {data.map((item) => (
        //         <li
        //           onClick={(e) => {
        //             handleChange(item.key);
        //             this.handleSelection(item.key);
        //             // console.log("item : ", item);
        //             e.currentTarget.classList.toggle("filter_options_active");
        //           }}
        //           key={item.key}
        //         >
        //           {item.key}
        //         </li>
        //       ))}
        //     </ul>
        //   );
        // }}
        size={1000}
        showCount={false}
        showSearch={true}
        sortBy="asc"
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default Collection;
