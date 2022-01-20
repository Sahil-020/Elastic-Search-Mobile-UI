import React, { Component } from "react";
import { ReactiveList, ReactiveBase } from "@appbaseio/reactivesearch";
import Results from "./Results";
import SerialSearchComponent from "./search-components/SerialSearchComponent";

class jewelrySearch extends Component {
  constructor(props) {
    super(props);
  }
  state = {};
  render() {
    return (
      <ReactiveBase
        app={JewelrySerialApp}
        url={AppbaseAppUrl}
        credentials={AppbaseCredentials}
      >
        <SerialSearchComponent />
        <ReactiveList
          componentId="results"
          dataField="RetailPrice"
          react={{
            and: ["SerialSearch"],
            // or: andQuery,
          }}
          renderResultStats={({ numberOfResults, time }) => (
            <label>
              {numberOfResults} results found in {time}ms
            </label>
          )}
          render={({ data }) => <Results items={data} />}
        />
      </ReactiveBase>
    );
  }
}

export default jewelrySearch;
