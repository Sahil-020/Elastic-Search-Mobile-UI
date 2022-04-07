import React, { Component } from "react";
import { RangeInput } from "@appbaseio/reactivesearch";
import RangeFilterWithSelect from "../../HOC_Components/RangeFilterWithSelect";
import { StoneRatioField } from "../../../utils/constants";
class StoneRatio extends Component {
  constructor(props) {
    super(props);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleSelected(value) {
    // console.log("value : ", value);
    if (value.start === 1 && value.end === 3) {
      // console.log("firsttime load");
      return;
    } else {
      // console.log("Inside Handle Selected");
      this.props.showSelectedResults(true);
    }
  }

  render() {
    return (
      <div className="diamond-range form-field-wrap">
        <RangeInput
          className="diamond-con-range-input"
          innerClass={{
            "slider-container": "diamond-slider-container",
            "input-container": "diamond-input-container",
          }}
          title="Stone Ratio"
          componentId="StoneRatio"
          showSlider={false}
          dataField={StoneRatioField}
          range={{
            start: 1,
            end: 3,
          }}
          customQuery={function (value, props) {
            if (value[0] === 1 && value[1] === 3) {
              return {
                query: {
                  match_all: {},
                },
                aggs: {
                  StoneRatio: {
                    histogram: {
                      field: "StoneRatio",
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
                    StoneRatio: {
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
export default RangeFilterWithSelect(StoneRatio);
