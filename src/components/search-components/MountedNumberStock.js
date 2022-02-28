import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { MountedStock } from "../../utils/constants";
class MountedNumberStock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DataSearch
        className="form_field"
        componentId="MountedNumberStock"
        title="Mounted #"
        placeholder="Enter mounted #"
        dataField={MountedStock}
        iconPosition="right"
        showClear
        debounce={250}
        autosuggest={true}
        onValueChange={(value) => this.props.handleMountedSearchSignal(true)}
      />
    );
  }
}
export default MountedNumberStock;
