import React, { Component } from "react";
import { DataSearch } from "@appbaseio/reactivesearch";
import { KeywordsSearch } from "../../../utils/constants";

class Keyword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <DataSearch
        className="form_field"
        componentId="SearchKeyword"
        title={"Keywords"}
        debounce={250}
        placeholder="Start Search..."
        dataField={KeywordsSearch}
        autosuggest={false}
        queryFormat="and"
        searchOperators={true}
        iconPosition="right"
      />
    );
  }
}

export default Keyword;
