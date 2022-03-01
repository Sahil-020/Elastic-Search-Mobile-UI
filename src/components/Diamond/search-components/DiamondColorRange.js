import React, { Component } from "react";
import {
  SingleDropdownList,
  MultiList
} from "@appbaseio/reactivesearch";

const item_order = [
  "D",
  "E",
  "E*",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "OP",
  "Q-R",
  "S-T",
  "ST",
  "U-V",
  "W-X",
  "WX",
  "YZ",
  "*"
];

class DiamondColorRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: '',
      endValue: ''
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
    } else if(!startValue && endValue) {
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
          <h2>Dia Color</h2>
          <SingleDropdownList
            componentId="DiamondStartColor"
            className="start-range"
            dataField="DiamondColorRange.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaStartColor"
            onValueChange={value => this.handleStartChange(value)}
            transformData={list => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <span>-</span>
          <SingleDropdownList
            componentId="DiamondEndColor"
            className="end-range"
            dataField="DiamondColorRange.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaEndColor"
            onValueChange={value => this.handleEndChange(value)}
            transformData={list => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <MultiList
            componentId="DiamondColorRange"
            className="hide__multilist"
            dataField="DiamondColorRange.keyword"
            title="Color"
            value={value}
            size={100}
            sortBy="asc"
            queryFormat="or"
            showSearch={false}
            showFilter={false}
            react={{
              or: ["DiamondStartColor", "DiamondEndColor"]
            }}
          />
        </div>
      </div>
    );
  }
}

export default DiamondColorRange;
