import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <DataSearch
        className="form_field"
        componentId="Report"
        title="Report #"
        placeholder="Search keywords..."
        dataField={this.props.data}
        autosuggest={false}
        iconPosition="right"
        queryFormat="and"
      />
    );
  }
}

export default Report;
