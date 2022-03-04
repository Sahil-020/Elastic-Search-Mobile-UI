import React, { Component } from 'react';

class ShowCode extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  onChange = e => {
    var chk = e.target.checked;
    this.props.onCheck(chk);
  };
  render() {
    return (
      <div className="show-code">
        <input type="checkbox" id="show-code" onClick={e => this.onChange(e)} />
        <label htmlFor="show-code">Show in Code</label>
      </div>
    );
  }
}
export default ShowCode;
