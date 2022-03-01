import React, { Component } from 'react';
import { MultiDropdownList } from '@appbaseio/reactivesearch';
class GemEnhancement extends Component {
  render() {
    return (
      <div className="item-type form-field-wrap">
        <MultiDropdownList
          title="Enhancement"
          className=" form-field unknown"
          componentId="GemEnhancement"
          dataField={this.props.data}
          size={100}
          sortBy="asc"
          showSearch={true}
          renderListItem={label => (
            <div>{label !== 'NULL' ? label : 'None'}</div>
          )}
        />
      </div>
    );
  }
}
export default GemEnhancement;
