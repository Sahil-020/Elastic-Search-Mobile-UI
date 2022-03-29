import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";

class ColorCarat extends Component {
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
        title="Color Cts "
        componentId="ColorCarats"
        showSlider={false}
        dataField="ColorCarats"
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
                ColorCarats: {
                  histogram: {
                    field: "ColorCarats",
                    interval:1,
                    offset: 0,
                  },
                },
              },
            };
          } else {
            return {
              query: {
                range: {
                  ColorCarats: {
                    gte: value[0],
                    lte: value[1],
                    boost: 2,
                  },
                },
              },
            };
          }
        }}
      />
    );
  }
}
export default ColorCarat;
