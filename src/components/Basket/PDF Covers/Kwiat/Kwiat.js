import React, { Component } from "react";
import { connect } from "react-redux";
import "./Kwiat.scss";
// import KwiatCoverImage from "../../../../assets/icons/Kwiat-Cover-Image.jpg";

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartActions,
    basketInputObj: state.basketInputChange,
    tokenState: state.tokenState,
    loaderActions: state.loaderActions,
  };
};

class Kwiat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="kwiat_cover">
        <div className="kwiat_cover_logo">
          <img src="https://cdn4.kwiat.com/source-images/web/logos/kwiat.jpg" />
        </div>
        <div className="kwiat_cover_image">
          <img src="https://cdn.kwiat.com/apps/kwiat-elastic-search/icons/Kwiat-Cover.jpg" />
        </div>
        <div className="kwiat_cover_desc">
          {/* #{this.props.basketInputObj.orderNbr} */}
          <br />
          {this.props.basketInputObj.desc}
        </div>
        {/* <div className="kwiat_cover_footer" id="kwiat_footer">
          KWIAT.COM / NEW YORK / LAS VEGAS
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Kwiat);
