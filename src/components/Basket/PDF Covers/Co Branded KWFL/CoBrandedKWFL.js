import React, { Component } from "react";
import { connect } from "react-redux";
import "./CoBrandedKWFL.scss";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};

class CoBrandedKWFL extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="kwfl_cover">
        <div className="kwfl_cover_logo">
          <img src="https://cdn4.kwiat.com/apps/kwiat-elastic-search/icons/KW-FL-Combined-Logos-Short-1000px.png" />
        </div>
        <div className="kwfl_cover_image">
          <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Co-Branded-KWFL-Cover.jpg" />
        </div>
        <div className="kwfl_cover_desc">
          {/* #{this.props.basketInputObj.orderNbr} */}
          <br />
          {this.props.basketInputObj.desc}
        </div>
        {/* <div className="kwfl_cover_footer" id="kwfl_footer">
          KWIAT.COM / FREDLEIGHTON.COM / NEW YORK / LAS VEGAS
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(CoBrandedKWFL);
