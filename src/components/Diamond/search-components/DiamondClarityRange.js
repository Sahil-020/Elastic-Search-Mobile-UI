import React, { Component } from "react";
import { SingleDropdownList, MultiList } from "@appbaseio/reactivesearch";

const item_order = [
  "FL",
  "IF",
  "VVS1",
  "VVS2",
  "VS1",
  "VS2",
  "SI1",
  "SI2",
  "SI3",
  "I1",
  "I2",
  "I3",
];

class DiamondClarityRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: "",
      endValue: "",
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.mapOrder = this.mapOrder.bind(this);
  }
  handleStartChange(value) {
    this.setState({
      startValue: value,
    });
  }
  handleEndChange(value) {
    this.setState({
      endValue: value,
    });
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
          <h2>Dia Clarity</h2>
          <SingleDropdownList
            componentId="DiamondStartCarat"
            className="start-range"
            dataField="DiamondClarityRange.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaStartColor"
            onValueChange={(value) => this.handleStartChange(value)}
            transformData={(list) => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <span>-</span>
          <SingleDropdownList
            componentId="DiamondEndCarat"
            className="end-range"
            dataField="DiamondClarityRange.keyword"
            size={100}
            placeholder=""
            sortBy="count"
            showCount={false}
            showFilter={true}
            filterLabel="DiaEndColor"
            onValueChange={(value) => this.handleEndChange(value)}
            transformData={(list) => {
              var ordered_array;
              ordered_array = this.mapOrder(list, item_order, "key");
              return ordered_array;
            }}
          />
          <MultiList
            componentId="DiamondClarityRange"
            className="hide__multilist"
            dataField="DiamondClarityRange.keyword"
            value={value}
            size={100}
            sortBy="asc"
            queryFormat="or"
            showSearch={false}
            showFilter={false}
            react={{
              or: ["DiamondStartCarat", "DiamondEndCarat"],
            }}
            // onChange={(value) => {
            //   // if (value) {
            //   this.props.handleShowResults(true);
            //   // }
            // }}
          />
        </div>
      </div>
    );
  }
}

export default DiamondClarityRange;
