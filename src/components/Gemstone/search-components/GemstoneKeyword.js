import React, { Component } from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';

class GemstoneKeyword extends Component {
  render() {
    return (
      <div className="serial-number form-field-wrap">
        <DataSearch
          title="Keyword"
          className="form-field"
          placeholder="Search keywords..."
          autosuggest={false}
          dataField={this.props.data}
          // categoryField={this.props.categoryField}
          componentId="GemstoneKeyword"
        />
      </div>
    );
  }
}

export default GemstoneKeyword;
