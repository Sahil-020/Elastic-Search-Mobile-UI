import React, { Component } from "react";
import { connect } from "react-redux";
import "./FredLeighton.scss";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};
class FredLeighton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="fl_cover">
        <div className="fl_cover_logo">
          <img src="https://cdn4.kwiat.com/source-images/web/logos/fredleighton.jpg" />
        </div>
        <div className="fl_cover_image">
          <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Fred-Cover.jpg" />
        </div>
        <div className="fl_cover_desc">
          {/* #{this.props.basketInputObj.orderNbr} */}
          <br />
          {this.props.basketInputObj.desc}
        </div>
        {/* <div className="fl_cover_footer" id="fl_footer">
          FREDLEIGHTON.COM / NEW YORK / LAS VEGAS
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(FredLeighton);
