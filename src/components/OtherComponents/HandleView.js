import React, { Component } from "react";
import Grid2 from "../../assets/icons/grid-two-up-16.png";
import Grid3 from "../../assets/icons/grid-three-up-16.png";
import Grid1 from "../../assets/icons/square-16.png";
import ListView from "../../assets/icons/list-2-16.png";

class HandleView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let { numberOfResults, time, handleView, items } = this.props;
    return (
      <div className="result_status_view_option_container">
        <label>
          {numberOfResults && time
            ? `${numberOfResults} results found in ${time}ms`
            : items
            ? `${items.length} items`
            : ""}
        </label>
        <div className="result_view_options">
          <img
            className="active"
            src={ListView}
            onClick={(e) => handleView(e, "List")}
          />
          <img src={Grid1} onClick={(e) => handleView(e, "Grid1")} />
          <img src={Grid2} onClick={(e) => handleView(e, "Grid2")} />
          <img src={Grid3} onClick={(e) => handleView(e, "Grid3")} />
        </div>
      </div>
    );
  }
}

export default HandleView;
