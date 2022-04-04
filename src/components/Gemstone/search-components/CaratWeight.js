import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";
import RangeFilterWithSelect from "../../HOC_Components/RangeFilterWithSelect";

class CaratWeight extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(value) {
    // console.log("value : ", value);
    if (value.start === 0 && value.end === 100000) {
      // console.log("firsttime load");
      return;
    } else {
      // console.log("Inside Handle Selected");
      this.props.showSelectedResults(true);
    }
  }
  render() {
    return (
      <RangeInput
        className="carat-range-input"
        innerClass={{
          "slider-container": "carat-range-input__carat-slider",
          "input-container": "carat-range-input__carat-input",
        }}
        title="Carat Weight"
        componentId="CaratWeight"
        dataField={"CaratWeight"}
        showSlider={false}
        range={{
          start: 0,
          end: 100000,
        }}
        customQuery={function (value, props) {
          if (value[0] === 0 && value[1] === 100000) {
            return {
              query: {
                match_all: {},
              },
              aggs: {
                CaratWeight: {
                  histogram: {
                    field: "CaratWeight",
                    interval: 1000,
                    offset: 0,
                  },
                },
              },
            };
          } else {
            return {
              query: {
                range: {
                  CaratWeight: { gte: value[0], lte: value[1], boost: 2 },
                },
              },
            };
          }
        }}
        // onValueChange={(value) => this.handleSelected(value)}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}
export default RangeFilterWithSelect(CaratWeight);
