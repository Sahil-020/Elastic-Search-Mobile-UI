import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";

class RetailPriceRange extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="price-range">
        <RangeInput
          className="price-range__input"
          innerClass={{
            "slider-container": "price-slider-container",
            "input-container": "price-range__input--price-input",
          }}
          title="Retail Price"
          componentId="RetailPriceRange"
          dataField={"RetailPrice"}
          showSlider={false}
          range={{
            start: 0,
            end: 10000000,
          }}
          customQuery={function (value, props) {
            if (value[0] === 0 && value[1] === 10000000) {
              // console.log("all query")
              return {
                query: {
                  match_all: {},
                },
              };
            } else {
              // console.log("range query")
              return {
                query: {
                  range: {
                    RetailPrice: { gte: value[0], lte: value[1], boost: 2 },
                  },
                },
              };
            }
          }}
          rangeLabels={{
            start: "$",
            end: "$",
          }}
        />
      </div>
    );
  }
}
export default RetailPriceRange;
