import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";

const item_order = [
  "Round Brilliant",
  "Emerald Cut",
  "Oval",
  "Cushion",
  "Cushion Brilliant",
  "Radiant",
  "Ashoka",
  "Pear Shape",
  "Marquise",
  "Heart",
  "Asscher",
  "Old European",
  "Rose Cut",
  "Old Mine",
  "Briolette",
  "Princess",
  "Tapered Baguette",
  "Lozenge",
  "Hexagon",
  "Baguette",
  "Trapezoid",
  "Rough",
  "Kite",
  "Trilliant",
  "Shield",
];

class CenterShape extends Component {
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
        title="Center Shape"
        componentId="CenterShape"
        dataField={"CenterShape.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        transformData={(list) => {
          var ordered_array;
          ordered_array = this.mapOrder(list, item_order, "key");
          return ordered_array;
        }}
        placeholder="Select values"
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}

export default CenterShape;
