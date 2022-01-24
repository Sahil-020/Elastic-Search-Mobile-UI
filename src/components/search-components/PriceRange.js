import { RangeSlider, RangeInput } from "@appbaseio/reactivesearch";
import React, { Component } from "react";

class PriceRange extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <RangeInput
        componentId="PriceRange"
        dataField={"RetailPrice"}
        // className="form_field"
        title="Price"
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
    );
  }
}

export default PriceRange;
