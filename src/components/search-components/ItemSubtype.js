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
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        // render={({ loading, error, data, handleChange }) => {
        //   // console.log("data : ", data);
        //   return (
        //     // <ul>
        //     //   {data.map((item) => (
        //     //     <li
        //     //       onClick={(e) => {
        //     //         handleChange(item.key);
        //     //         this.handleSelection(item.key);
        //     //         // console.log("item : ", item);
        //     //         e.currentTarget.classList.toggle("filter_options_active");
        //     //       }}
        //     //       key={item.key}
        //     //     >
        //     //       {item.key}
        //     //     </li>
        //     //   ))}
        //     // </ul>
        //     <div className="filter_options_container">
        //       {data.map((item) => (
        //         <div
        //           className={"filter_options"}
        //           onClick={(e) => {
        //             handleChange(item.key);
        //             // this.handleSelection(item.key);
        //             // console.log("item : ", item);
        //             e.currentTarget.classList.toggle("filter_options_active");
        //           }}
        //           key={item.key}
        //         >
        //           <span
        //             onClick={(e) => {
        //               // e.stopPropagation();
        //               // if(e.target.clas)
        //               // e.target.parentNode.classList.toggle(
        //               //   "filter_options_active"
        //               // );
        //             }}
        //           >
        //             {item.key}
        //           </span>
        //           {/* <span>{item.doc_count}</span> */}
        //         </div>
        //       ))}
        //     </div>
        //   );
        // }}
      />
    );
  }
}

export default ItemSubtype;
