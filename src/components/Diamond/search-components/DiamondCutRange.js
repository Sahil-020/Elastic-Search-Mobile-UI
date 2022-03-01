import React, { Component } from "react";
import { SingleDropdownList, MultiList } from "@appbaseio/reactivesearch";
const item_order = [
  "Excellent",
  "F",
  "Fair",
  "G",
  "Good",
  "Very Good",
];

class DiamondCutRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: "",
      endValue: ""
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.mapOrder = this.mapOrder.bind(this);
  }
  handleStartChange(value) {
    this.setState({
      startValue: value
    });
  }
  handleEndChange(value) {
    this.setState({
      endValue: value
    });
  }
  mapOrder(array, order, key) {
    array.sort(function(a, b) {
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
    let { startValue, endValue } = this.state;
    let value;
    if (!startValue && !endValue) {
      value = null;
    } else if (startValue && !endValue) {
      value = item_order.slice(item_order.indexOf(startValue));
    } else if (!startValue && endValue) {
      value = item_order.slice(0, item_order.indexOf(endValue) + 1);
    } else {
      value = item_order.slice(
        item_order.indexOf(startValue),
        item_order.indexOf(endValue) + 1
      );
    }
    return (
      <div className="diamond-range form-field-wrap">
        <div className="color-input-dropdowns">
          <h2>Dia Cut</h2>
          <SingleDropdownList
            componentId="DiamondStartCut"
            className="start-range"
            dataField="DiamondCut.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaStartCut"
            onValueChange={value => this.handleStartChange(value)}
            transformData={list => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <span>-</span>
          <SingleDropdownList
            componentId="DiamondEndCut"
            className="end-range"
            dataField="DiamondCut.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaEndCut"
            onValueChange={value => this.handleEndChange(value)}
            transformData={list => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <MultiList
            componentId="DiamondCutRange"
            className="hide__multilist"
            dataField="DiamondCut.keyword"
            value={value}
            size={100}
            sortBy="asc"
            queryFormat="or"
            showSearch={false}
            showFilter={false}
            react={{
              or: ["DiamondStartCut", "DiamondEndCut"]
            }}
          />
        </div>
      </div>
    );
  }
}

export default DiamondCutRange;
