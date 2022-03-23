import React, { Component } from "react";
import { connect } from "react-redux";
import "./Bridal.scss";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};

class Bridal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="bridal_cover">
        <div className="bridal_cover_logo">
          <img src="https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg" />
        </div>
        <div className="bridal_cover_image">
          <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Bridal.jpg" />
        </div>
        <div className="bridal_cover_desc">
          {/* #{this.props.basketInputObj.orderNbr} */}
          <br />
          {this.props.basketInputObj.desc}
        </div>
        {/* <div className="bridal_cover_footer" id="bridal_footer">
          KWIAT.COM / NEW YORK / LAS VEGAS
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Bridal);
