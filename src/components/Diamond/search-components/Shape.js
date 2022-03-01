import React, { Component } from "react";
import { MultiDropdownList } from "@appbaseio/reactivesearch";
// import MultiDropdownListWithFocus from '../../components/MultiDropdownListWithFocus';

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

class Shape extends Component {
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
        componentId="Shape"
        dataField={"Shape.keyword"}
        size={100}
        showCount={false}
        showSearch={true}
        // sortBy="asc"
        transformData={(list) => {
          var ordered_array;
          ordered_array = this.mapOrder(list, item_order, "key");
          return ordered_array;
        }}
        renderListItem={(label) => (
          <div>{label !== "NULL" ? label : "None"}</div>
        )}
      />
    );
  }
}
export default Shape;
