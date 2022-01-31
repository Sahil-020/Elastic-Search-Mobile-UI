import React, { Component } from "react";
import { SelectedFilters } from "@appbaseio/reactivesearch";

class SearchCriteria extends Component {
  render() {
    return (
      <div className="selected--filters--container">
        <SelectedFilters
          className="selectedFilters"
          resetToDefault={true}
          render={(props) => {
            const { selectedValues, setValue, clearValues } = props;
            const clearFilter = (component) => {
              if (component.substring(0, 7) === "Include") {
                setValue(component, ["0"]);
              } else if (component === "clearAll") {
                clearValues();
                setValue("IncludeSold", ["0"]);
                setValue("IncludeMounted", ["0"]);
                setValue("IncludeSemimount", ["0"]);
                setValue("IncludeRTV", ["0"]);
                setValue("ExcludeVirtual", ["0", "1"]);
                setValue("IncludeCom", ["0"]);
                setValue("LooseOnly", ["0", "1"]);
                setValue("IncludeOpenJob", ["0"]);
                // this.props.callback();
              } else if (
                component === "LooseOnly" ||
                component === "LooseAndRingsOnly"
              ) {
                setValue(component, ["0", "1"]);
              } else if (component.substring(0, 7) === "Exclude") {
                setValue(component, ["0", "1"]);
              } else {
                setValue(component, null);
              }
            };
            const filters = Object.keys(selectedValues).map((component) => {
              var filterValue = selectedValues[component];
              const checkFlag = (label) => {
                var flag;
                if (label === "CaratWeight") {
                  flag =
                    filterValue.label === label &&
                    JSON.stringify(filterValue.value) ===
                      JSON.stringify([0, 100000]);
                } else if (
                  label === "DiamondCaratWeight" ||
                  label === "ColorCarats" ||
                  label === "DiamondCarats" ||
                  label === "RingSizeRange"
                ) {
                  flag =
                    (filterValue.label === label &&
                      JSON.stringify(filterValue.value) ===
                        JSON.stringify([0, 100])) ||
                    JSON.stringify(filterValue.value) ===
                      JSON.stringify([0, 15]);
                } else if (label === "StoneRatio") {
                  flag =
                    filterValue.label === label &&
                    JSON.stringify(filterValue.value) ===
                      JSON.stringify([1, 3]);
                } else {
                  flag =
                    filterValue.label === label &&
                    JSON.stringify(filterValue.value) ===
                      JSON.stringify([0, 10000000]);
                }
                return flag;
              };
              if (
                !filterValue.value ||
                !filterValue.value.length ||
                (filterValue.label.substring(0, 7) === "Exclude" &&
                  filterValue.value.length === 2) ||
                (filterValue.label.substring(0, 7) === "Include" &&
                  filterValue.value.includes("0") &&
                  !filterValue.value.includes("1")) ||
                checkFlag("CaratWeight") ||
                checkFlag("RetailPriceRange") ||
                checkFlag("WholeSalePriceRange") ||
                checkFlag("DiamondCaratWeight") ||
                checkFlag("StoneRatio") ||
                checkFlag("ColorCarats") ||
                checkFlag("DiamondCarats") ||
                filterValue.label === "DiamondClarityRange" ||
                filterValue.label === "DiamondColorRange" ||
                filterValue.label === "DiamondCutRange" ||
                filterValue.label === "CenterSize" ||
                filterValue.label === "CenterClarity" ||
                filterValue.label === "CenterColor" ||
                ((filterValue.label === "LooseOnly" ||
                  filterValue.label === "LooseAndRingsOnly") &&
                  filterValue.value.length === 2)
              ) {
                return null;
              }

              const checkIncludeLabel = (label, value) => {
                if (
                  label.substring(0, 7) === "Include" ||
                  label.substring(0, 7) === "Exclude" ||
                  label.endsWith("Only")
                ) {
                  return label;
                } else {
                  return `${label}: ${value}`;
                }
              };
              return (
                <button
                  key={component}
                  className="clear-filter-btn"
                  onClick={() => clearFilter(component)}
                >
                  {checkIncludeLabel(filterValue.label, filterValue.value)}
                  <span className="clear--icon">x</span>
                </button>
              );
            });
            if (filters.every((item) => item === null)) {
              return filters;
            }
            filters.push(
              Object.assign(
                <button
                  key={"clear"}
                  className="clear-all-btn"
                  onClick={() => clearFilter("clearAll")}
                >
                  Clear All
                </button>
              )
            );
            return filters;
          }}
        />
      </div>
    );
  }
}
export default SearchCriteria;
