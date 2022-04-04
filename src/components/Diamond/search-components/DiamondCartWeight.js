import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";
import RangeFilterWithSelect from "../../HOC_Components/RangeFilterWithSelect";
import { DiamondCaratWeight } from "../../../utils/constants";

class DiamondCaratWeightComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <RangeInput
        className="carat-range-input"
        innerClass={{
          "slider-container": "carat-range-input__carat-slider",
          "input-container": "carat-range-input__carat-input",
        }}
        title="Dia Weight"
        componentId="DiamondCaratWeight"
        showSlider={false}
        dataField={this.props.data}
        range={{
          start: 0,
          end: 100,
        }}
        customQuery={function (value, props) {
          if (value[0] === 0 && value[1] === 100) {
            return {
              query: {
                match_all: {},
              },
              aggs: {
                DiamondCaratWeight: {
                  histogram: {
                    field: "DiamondCaratWeight",
                    interval: 1,
                    offset: 1,
                  },
                },
              },
            };
          } else {
            return {
              query: {
                range: {
                  DiamondCaratWeight: {
                    gte: value[0],
                    lte: value[1],
                    boost: 2,
                  },
                },
              },
            };
          }
        }}
        rangeLabels={{
          start: "$",
          end: "$",
        }}
        // // // onValueChange={(value) => this.handleSelected(value)}
        // // onValueChange={(value) => {
        // //   // if (value) {
        // //   this.props.handleShowResults(true);
        // //   // }
        // }}
      />
    );
  }
}
export default RangeFilterWithSelect(DiamondCaratWeightComponent);
