import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";
import RangeFilterWithSelect from "../HOC_Components/RangeFilterWithSelect";

class WholesalePriceRange extends Component {
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
          title="Wholesale"
          componentId="WholeSalePriceRange"
          dataField={"WholesalePrice"}
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
                aggs: {
                  WholesalePrice: {
                    histogram: {
                      field: "WholesalePrice",
                      interval: 100000,
                      offset: 0,
                    },
                  },
                },
              };
            } else {
              // console.log("range query")
              return {
                query: {
                  range: {
                    WholesalePrice: { gte: value[0], lte: value[1], boost: 2 },
                  },
                },
              };
            }
          }}
          rangeLabels={{
            start: "$",
            end: "$",
          }}
          // onValueChange={(value) => {
          //   // if (value) {
          //   this.props.handleShowResults(true);
          //   // }
          // }}
        />
      </div>
    );
  }
}
export default RangeFilterWithSelect(WholesalePriceRange);
