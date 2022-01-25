import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";

class DiamondCarats extends Component {
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
        title="Dia Cts"
        componentId="DiamondCarats"
        showSlider={false}
        dataField="DiamondCarats"
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
            };
          } else {
            return {
              query: {
                range: {
                  DiamondCarats: {
                    gte: value[0],
                    lte: value[1],
                    boost: 2,
                  },
                },
              },
            };
          }
        }}
        onValueChange={(value) => this.handleSelected(value)}
      />
    );
  }
}
export default DiamondCarats;
