import React, { Component } from "react";

class Results extends Component {
  constructor(props) {
    super(props);
  }
  //   state = { items: this.props.items };
  render() {
    let { items } = this.props;
    console.log("items : ", items);
    return (
      <div className="result_container">
        {items.map((item, index) => (
          <div className="item_container" key={index}>
            {item.SerialNumber}
          </div>
        ))}
      </div>
    );
  }
}

export default Results;
