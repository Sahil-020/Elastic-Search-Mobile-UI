import React, { Component } from 'react';
import { MultiDropdownList } from '@appbaseio/reactivesearch';
class CountryofOrigin extends Component {
  render() {
    return (
      <div className="item-type form-field-wrap">
        <MultiDropdownList
          className="form-field unknown"
          title="Origin"
          componentId="CountryofOrigin"
          dataField={this.props.data}
          size={100}
          showCount={false}
          sortBy="asc"
          renderListItem={(label, count) => (
            <div>{label !== 'NULL' ? label : 'None'}</div>
          )}
        />
      </div>
    );
  }
}
export default CountryofOrigin;
