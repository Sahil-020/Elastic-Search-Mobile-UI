import React from 'react';
import debounce from 'lodash/debounce'

const MultiDropdownListWithFocus = (WrappedComponent) => {
  class HOC extends React.Component {
    evntHandler = debounce((e) => {
      let parentEl = e.target.closest('.form-field')
      let inputEl = parentEl.querySelector('input')
      inputEl && inputEl.focus()
    }, 200);

    render() {
      return (
        <div className="form-field-wrap"
        onClick={e => {
          e.persist()
          this.evntHandler(e)
        }}>
          <WrappedComponent {...this.props} />
        </div>
      )
    }
  }
  return HOC;
}

export default MultiDropdownListWithFocus;