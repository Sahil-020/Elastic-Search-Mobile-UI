import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
import MultiDropdownListWithFocus from "../../HOC_Components/MultiDropdownListWithFocus";

const item_order = [
  "Oval",
  "Cushion",
  "Cushion Brilliant",
  "Emerald Cut",
  "Pear Shape",
  "Heart",
  "Round Brilliant",
];

class GemstoneShape extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  mapOrder(array, order, key) {
    array.sort(function (a, b) {
      var A = a[key],
        B = b[key];
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1;
      } else {
        return -1;
      }
    });
    return array;
  }

  render() {
    return (
      <MultiDropdownList
        className="form_field"
        title="Shape"
        componentId="GemstoneShape"
        dataField={"Shape.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        transformData={(list) => {
          var ordered_array;
          ordered_array = this.mapOrder(list, item_order, "key");
          return ordered_array;
        }}
        renderListItem={(label, count) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}
export default MultiDropdownListWithFocus(GemstoneShape);
