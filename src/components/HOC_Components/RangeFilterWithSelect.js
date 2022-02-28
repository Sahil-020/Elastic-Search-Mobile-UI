import React from 'react';
import toLower from 'lodash/toLower';

const RangeFilterWithSelect = (WrappedComponent) => {
  class HOC extends React.Component {
    eventHandler =(e) => {
      if (toLower(e.target.nodeName) !== 'input') {
        return;
      }
      e.target.select()
    };

    render() {
      return (
        <div className="range-input-component" onClick={this.eventHandler}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
  return HOC;
}

export default RangeFilterWithSelect;