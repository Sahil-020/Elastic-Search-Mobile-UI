import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

class SubCollection extends Component {
  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="SubCollection"
        componentId="SubCollection"
        dataField={"SubCollection.keyword"}
        react={{ and: ["Collection"] }}
        size={100}
        showCount={false}
        showSearch={true}
        sortBy="asc"
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
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default SubCollection;
