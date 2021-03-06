import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";
import RangeFilterWithSelect from "../../HOC_Components/RangeFilterWithSelect";
class RingSizeRange extends Component {
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
        title="Ring Size"
        componentId="RingSizeRange"
        showSlider={false}
        dataField="RingSizeValue"
        range={{
          start: 0,
          end: 15,
        }}
        customQuery={function (value, props) {
          if (value[0] === 0 && value[1] === 15) {
            return {
              query: {
                match_all: {},
              },
              aggs: {
                RingSizeValue: {
                  histogram: {
                    field: "RingSizeValue",
                    interval: 1,
                    offset: 0,
                  },
                },
              },
            };
          } else {
            return {
              query: {
                range: {
                  RingSizeValue: {
                    gte: value[0],
                    lte: value[1],
                    boost: 2,
                  },
                },
              },
            };
          }
        }}
        // onValueChange={(value) => {
        //   // if (value) {
        //   this.props.handleShowResults(true);
        //   // }
        // }}
      />
    );
  }
}
export default RangeFilterWithSelect(RingSizeRange);
